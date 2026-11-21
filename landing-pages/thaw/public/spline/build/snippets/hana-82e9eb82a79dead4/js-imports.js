export async function loadImageFromBytes(bytes) {
  return createImageBitmap(new Blob([bytes]))
}

export async function loadImageFromUrl(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`)
      }
      return response.blob()
    })
    .then((blob) => createImageBitmap(blob))
}

// Video Imports

let videoFrameSeq = 0

// Fallback tokens (see `videoFrameToken`) are the media clock offset per element
// by this stride, so two elements' ranges stay disjoint for any media under ~11.5 days.
const MEDIA_CLOCK_STRIDE = 1e6

// `HTMLMediaElement.HAVE_CURRENT_DATA` — a decoded frame the renderer can sample.
const HAVE_CURRENT_DATA = 2

// Generous, because a slow decode is not a failure — but bounded, because a source
// the browser silently declines must not wedge the load forever.
const VIDEO_READY_TIMEOUT_MS = 30000

// Maintains a token that changes exactly when the element presents a new frame,
// so the renderer can tell whether a GPU copy is needed at all.
//
// The callback chain re-arms itself and keeps `video` reachable until
// `disposeVideo` cancels it. It only fires on a presented frame, so a paused or
// stalled element costs nothing.
function trackPresentedFrames(video) {
  if (typeof video.requestVideoFrameCallback !== 'function') {
    // No presented-frame signal: `videoFrameToken` falls back to the media clock,
    // offset per element to keep the guarantee below.
    video.hanaClockBase = ++videoFrameSeq * MEDIA_CLOCK_STRIDE
    return
  }

  // One global sequence, so no two elements ever report the same token: when an
  // asset is replaced, the token the renderer still holds for the displaced
  // element cannot collide with the replacement's.
  video.hanaPresentedFrames = ++videoFrameSeq
  const bump = () => {
    // Disposal detaches the source, which fires `seeked` on the way out.
    if (video.hanaDisposed) return
    video.hanaPresentedFrames = ++videoFrameSeq
  }

  // A seek repaints a paused element without necessarily running the frame
  // callback, and the video export seeks frame by frame with the element paused —
  // it must never be handed the texture from the previous seek.
  video.addEventListener('seeked', bump)

  const onFrame = () => {
    bump()
    // Never re-arm a disposed element: that resurrects the cancelled chain.
    if (video.hanaDisposed) return
    video.hanaFrameCallback = video.requestVideoFrameCallback(onFrame)
  }
  video.hanaFrameCallback = video.requestVideoFrameCallback(onFrame)
}

// Read by the renderer once per frame per video. Where
// `requestVideoFrameCallback` is missing, falls back to the media clock: browsers
// advance `currentTime` at frame granularity, so it answers the same question. The
// per-element base keeps the cross-element guarantee across a reload, where
// `Assets::insert_video` replaces the element under the same id.
export function videoFrameToken(video) {
  const presented = video.hanaPresentedFrames
  return presented === undefined ? video.hanaClockBase + video.currentTime : presented
}

// Only for `Local(bytes)`, which has no URL to stream from. A blob: URL pins its
// Blob — the whole file — until revoked, so keep it on the element for
// `disposeVideo` to release.
function setVideoSourceFromBlob(video, blob) {
  video.hanaObjectUrl = URL.createObjectURL(blob)
  video.src = video.hanaObjectUrl
}

// Releases everything the element holds: the frame-callback chain, the blob: URL
// mapping, and the buffered media and decoder behind it. Runs from `OwnedVideo`'s
// `Drop` in `assets.rs`. Idempotent, and each step is independently conditional —
// an element loaded without a blob: URL still gets the rest of the teardown.
export function disposeVideo(video) {
  if (video.hanaDisposed) return
  // Set first: the steps below fire events that must not read as a live element.
  video.hanaDisposed = true

  const callback = video.hanaFrameCallback
  if (callback !== undefined) {
    video.hanaFrameCallback = undefined
    // A throw here must not skip the rest of the teardown.
    if (typeof video.cancelVideoFrameCallback === 'function') {
      video.cancelVideoFrameCallback(callback)
    }
  }

  const url = video.hanaObjectUrl
  if (url !== undefined) {
    video.hanaObjectUrl = undefined
    URL.revokeObjectURL(url)
  }

  video.pause()
  // Revoking only drops the URL -> Blob mapping. Detaching the source is what
  // actually releases the media the element has buffered and its decoder.
  video.removeAttribute('src')
  video.load()
}

// Resolves once the element holds a frame the renderer can sample, rejects if it
// never will. Every branch settles: an unsettled load holds its `PendingLoadGuard`,
// and headless hosts poll `Assets::pending_loads` to know a document is ready.
//
// Readiness is `loadeddata`, not `playing`: the video export drives the element
// paused, so `playing` never fires there, and a blocked autoplay is not a failure.
function whenSampleable(video) {
  const mediaError = (prefix) => {
    const err = video.error
    return new Error(err === null ? prefix : `${prefix} (code ${err.code}: ${err.message})`)
  }
  // A rejected load never becomes an `OwnedVideo`, so nothing else releases the
  // element: it would pin its blob: URL for the page lifetime and, if it buffers
  // after a timeout, decode invisibly on loop (`autoplay` and `loop` stay set). The
  // error is built first — `disposeVideo`'s `load()` clears `video.error`.
  const failure = (prefix) => {
    const err = mediaError(prefix)
    disposeVideo(video)
    return err
  }

  if (video.error !== null) return Promise.reject(failure('video failed to load'))
  if (video.readyState >= HAVE_CURRENT_DATA) return Promise.resolve(video)

  return new Promise((resolve, reject) => {
    // Armed first so `settle` can clear it; nothing below runs this tick.
    const timer = setTimeout(
      () => settle(reject, failure('video timed out before presenting a frame')),
      VIDEO_READY_TIMEOUT_MS,
    )
    const settle = (finish, value) => {
      clearTimeout(timer)
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      video.removeEventListener('error', onError)
      finish(value)
    }
    const onReady = () => settle(resolve, video)
    const onError = () => settle(reject, failure('video failed to load'))

    video.addEventListener('loadeddata', onReady)
    // A partly-loaded source can become sampleable without a fresh `loadeddata`.
    video.addEventListener('canplay', onReady)
    video.addEventListener('error', onError)
  })
}

function setupVideo(video) {
  video.preload = 'auto'
  video.autoplay = true //iOs hack to show the first frame
  video.loop = true
  video.muted = true
  video.playsInline = true
  video.currentTime = 0.01
  video.load()

  video.onloadeddata = () => {
    video.muted = true
    // DOMException: The play() request was interrupted by a new load request.
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    const playPromise = video.play()

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started! Do nothing all good!
        })
        .catch(() => {
          // for some reason the video could not be played (The play() request was interrupted by a new load request.)
          // so let's try to play it again
          video.play()
        })
        .finally(() => {
          video.pause()
        })
    }
  }

  trackPresentedFrames(video)

  return whenSampleable(video)
}

export async function loadVideoFromBytes(bytes) {
  const video = document.createElement('video')
  setVideoSourceFromBlob(video, new Blob([bytes]))
  return setupVideo(video)
}

// Streams from `url` instead of fetching it into a Blob first, so the browser can
// range-request it, playback starts before the last byte lands, and the file never
// sits in memory whole.
//
// `crossOrigin` must be set before `src`: without it a cross-origin element is
// tainted and every texture upload throws a SecurityError. It costs no reach — the
// `fetch` this replaces was already a CORS request, so any URL that used to load
// still does.
export async function loadVideoFromUrl(url) {
  const video = document.createElement('video')
  video.crossOrigin = 'anonymous'
  video.src = url
  return setupVideo(video)
}
