/* @ts-self-types="./hana.d.ts" */
import { loadImageFromUrl, loadVideoFromUrl } from './snippets/hana-82e9eb82a79dead4/js-imports.js';
import * as import1 from "./snippets/hana-82e9eb82a79dead4/js-imports.js"
import * as import2 from "./snippets/hana-82e9eb82a79dead4/js-imports.js"
import * as import3 from "./snippets/hana-82e9eb82a79dead4/js-imports.js"
import * as import4 from "./snippets/hana-82e9eb82a79dead4/js-imports.js"


export class DeviceLostPromise {
    static __wrap(ptr) {
        const obj = Object.create(DeviceLostPromise.prototype);
        obj.__wbg_ptr = ptr;
        DeviceLostPromiseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeviceLostPromiseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_devicelostpromise_free(ptr, 0);
    }
    /**
     * @returns {Promise<string>}
     */
    wait() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.devicelostpromise_wait(ptr);
        return ret;
    }
}
if (Symbol.dispose) DeviceLostPromise.prototype[Symbol.dispose] = DeviceLostPromise.prototype.free;

export class Engine {
    static __wrap(ptr) {
        const obj = Object.create(Engine.prototype);
        obj.__wbg_ptr = ptr;
        EngineFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EngineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_engine_free(ptr, 0);
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {DocumentData} document_data
     * @param {boolean} force_webgl
     * @returns {Promise<Engine>}
     */
    static create(canvas, document_data, force_webgl) {
        const ret = wasm.engine_create(canvas, document_data, force_webgl);
        return ret;
    }
    /**
     * @returns {DeviceLostPromise | undefined}
     */
    getDeviceLostPromise() {
        const ret = wasm.engine_getDeviceLostPromise(this.__wbg_ptr);
        return ret === 0 ? undefined : DeviceLostPromise.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    getGpuFrameTimeMs() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.engine_getGpuFrameTimeMs(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {boolean}
     */
    isWebgpu() {
        const ret = wasm.engine_isWebgpu(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number | null} [dt]
     */
    onFrame(dt) {
        wasm.engine_onFrame(this.__wbg_ptr, !isLikeNone(dt), isLikeNone(dt) ? 0 : dt);
    }
    /**
     * @param {ID} id
     */
    removeTexture(id) {
        wasm.engine_removeTexture(this.__wbg_ptr, id);
    }
    /**
     * @param {Float2} world_min
     * @param {Float2} world_max
     * @param {number} long_side_px
     * @returns {PixelReadPromise}
     */
    renderRegion(world_min, world_max, long_side_px) {
        const ret = wasm.engine_renderRegion(this.__wbg_ptr, world_min, world_max, long_side_px);
        return PixelReadPromise.__wrap(ret);
    }
    /**
     * @param {DocumentData} document_data
     */
    reset(document_data) {
        wasm.engine_reset(this.__wbg_ptr, document_data);
    }
    /**
     * @param {UInt2} logical_size
     * @param {number} scale_factor
     */
    resize(logical_size, scale_factor) {
        wasm.engine_resize(this.__wbg_ptr, logical_size, scale_factor);
    }
    /**
     * @param {Float2} size
     * @param {Float2} pos
     * @returns {PixelReadPromise}
     */
    samplePixels(size, pos) {
        const ret = wasm.engine_samplePixels(this.__wbg_ptr, size, pos);
        return PixelReadPromise.__wrap(ret);
    }
}
if (Symbol.dispose) Engine.prototype[Symbol.dispose] = Engine.prototype.free;

/**
 * The editor's engine without a renderer: the scene, its layout, text and
 * path geometry, with no canvas, GPU or surface. The headless 2D editor
 * (`packages/editor-headless`) holds one per document in Node, where the
 * editor's commands and reactions drive it exactly as they drive `Engine`
 * in a tab, minus drawing.
 *
 * Laid out like `Engine` (`#[repr(C)]`, the scene controller first), so the
 * editor's `.scene` getter (`apps/editor/EditorEngine.ts`), which reads a
 * `SceneController` at the engine's own pointer, works on it unchanged.
 *
 * Never call `SceneController.onFrame` on it, nor play mode: their clock
 * (`wasm_timer::Instant`) needs a browser window. Layout is flushed on
 * demand (`flushLayout`), not per frame.
 */
export class HeadlessEngine {
    static __wrap(ptr) {
        const obj = Object.create(HeadlessEngine.prototype);
        obj.__wbg_ptr = ptr;
        HeadlessEngineFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HeadlessEngineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_headlessengine_free(ptr, 0);
    }
    /**
     * `logical_size`: the viewport the editor would have, in CSS pixels
     * (the camera's size, for screen/world conversions).
     * @param {DocumentData} document_data
     * @param {UInt2} logical_size
     * @returns {HeadlessEngine}
     */
    static create(document_data, logical_size) {
        const ret = wasm.headlessengine_create(document_data, logical_size);
        return HeadlessEngine.__wrap(ret);
    }
    /**
     * Rebuild the scene from `document_data`, keeping the camera (as
     * `Engine.reset` does).
     * @param {DocumentData} document_data
     */
    reset(document_data) {
        wasm.headlessengine_reset(this.__wbg_ptr, document_data);
    }
    /**
     * `Engine.resize` without a surface: only the camera's size changes.
     * @param {UInt2} logical_size
     * @param {number} _scale_factor
     */
    resize(logical_size, _scale_factor) {
        wasm.headlessengine_resize(this.__wbg_ptr, logical_size, _scale_factor);
    }
}
if (Symbol.dispose) HeadlessEngine.prototype[Symbol.dispose] = HeadlessEngine.prototype.free;

export class PixelReadPromise {
    static __wrap(ptr) {
        const obj = Object.create(PixelReadPromise.prototype);
        obj.__wbg_ptr = ptr;
        PixelReadPromiseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PixelReadPromiseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pixelreadpromise_free(ptr, 0);
    }
    /**
     * @returns {Promise<Uint8Array>}
     */
    wait() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.pixelreadpromise_wait(ptr);
        return ret;
    }
}
if (Symbol.dispose) PixelReadPromise.prototype[Symbol.dispose] = PixelReadPromise.prototype.free;

export class SceneController {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SceneControllerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scenecontroller_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get is_play_mode() {
        const ret = wasm.__wbg_get_scenecontroller_is_play_mode(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get needs_video_update() {
        const ret = wasm.__wbg_get_scenecontroller_needs_video_update(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get show_pixel_grid() {
        const ret = wasm.__wbg_get_scenecontroller_show_pixel_grid(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Register multicolor art for an inline emoji, keyed by its Twemoji codepoint
     * (e.g. `"1f44b"` or the flag `"1f1fa-1f1f8"`). `art` is the svg-to-hana subtree
     * for the emoji — a frame whose children are its per-color vec-net shapes. The
     * text layout reserves an inline box for any grapheme whose codepoint is
     * registered here, and the scene graph draws this art at that box. Runtime-only:
     * the art is warmed in per session, never written back to the document.
     * @param {string} codepoint
     * @param {any} art
     */
    addEmojiArt(codepoint, art) {
        const ptr0 = passStringToWasm0(codepoint, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_addEmojiArt(this.__wbg_ptr, ptr0, len0, art);
    }
    /**
     * @param {ID} id
     * @param {UrlOrPlatformUInt8Array} image
     */
    addImage(id, image) {
        wasm.scenecontroller_addImage(this.__wbg_ptr, id, image);
    }
    /**
     * The optional args name a face inside a font collection (`.ttc` — common for
     * macOS system fonts): the matching face is parsed instead of face 0. Omitting
     * them (existing 2-arg callers) keeps the old behavior.
     *
     * Returns whether the asset now holds a parsed font — false when the bytes
     * aren't parseable by the engine (or on a no-text build). Hosts use it to
     * decide whether an overlay `TextSimple` may reference the asset via
     * `font_id`: an id whose font never parses would silently render with the
     * built-in fallback and sit in the overlay's pending-font set forever.
     * @param {ID} id
     * @param {Uint8Array} data
     * @param {string | null} [postscript_name]
     * @param {string | null} [family]
     * @param {string | null} [style]
     * @returns {boolean}
     */
    addLocalFont(id, data, postscript_name, family, style) {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = isLikeNone(postscript_name) ? 0 : passStringToWasm0(postscript_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(family) ? 0 : passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(style) ? 0 : passStringToWasm0(style, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_export3(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_export3(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_export3(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.scenecontroller_addLocalFont(this.__wbg_ptr, id, data, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret !== 0;
    }
    /**
     * @param {ID} id
     * @param {Model3DGeometryData} data
     */
    addModel3DGeometry(id, data) {
        wasm.scenecontroller_addModel3DGeometry(this.__wbg_ptr, id, data);
    }
    /**
     * @param {ID} id
     * @param {UrlOrPlatformUInt8Array} video
     */
    addVideo(id, video) {
        wasm.scenecontroller_addVideo(this.__wbg_ptr, id, video);
    }
    /**
     * Returns a Promise that resolves once the web font has been fetched and parsed.
     * Callers that need to react to font-load completion (e.g. to re-anchor auto-sized
     * text shapes whose natural size depends on glyph metrics) should await this.
     * @param {ID} id
     * @param {string} url
     * @returns {Promise<any>}
     */
    addWebFont(id, url) {
        const ptr0 = passStringToWasm0(url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_addWebFont(this.__wbg_ptr, id, ptr0, len0);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @param {Float2} delta
     * @returns {Uint8Array | undefined}
     */
    applyDeltaToVectorVertexPositionSelection(data, selected_verts, delta) {
        const ret = wasm.scenecontroller_applyDeltaToVectorVertexPositionSelection(this.__wbg_ptr, data, selected_verts, delta);
        return ret;
    }
    /**
     * @param {ID} id
     * @returns {BoundingBox | undefined}
     */
    axisAlignedBoundingBox(id) {
        const ret = wasm.scenecontroller_axisAlignedBoundingBox(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @returns {BoundingBox | undefined}
     */
    boundingBox() {
        const ret = wasm.scenecontroller_boundingBox(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Float2} start
     * @param {Float2} end
     * @param {boolean} isolate
     * @param {boolean} fully
     * @param {ID | null} [root]
     * @returns {ID[]}
     */
    boxIntersectsObjects(start, end, isolate, fully, root) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            const val1 = +isolate;
            const val2 = +fully;
            wasm.scenecontroller_boxIntersectsObjects(retptr, this.__wbg_ptr, start, end, val1, val2, isLikeNone(root) ? 0 : addToExternrefTable0(root));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayJsValueFromWasm0(r0, r1);
            wasm.__wbindgen_export3(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {ID} id
     * @param {number | null} [width]
     * @returns {Float2 | undefined}
     */
    calcTextAutoSize(id, width) {
        const ret = wasm.scenecontroller_calcTextAutoSize(this.__wbg_ptr, id, isLikeNone(width) ? Number.MAX_SAFE_INTEGER : Math.fround(width));
        return ret;
    }
    /**
     * @param {ID} id
     * @returns {Float2}
     */
    centerPencilData(id) {
        const ret = wasm.scenecontroller_centerPencilData(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @returns {Float2}
     */
    centerVectorData() {
        const ret = wasm.scenecontroller_centerVectorData(this.__wbg_ptr);
        return ret;
    }
    /**
     * Drop the export-time frame override for one video asset (see
     * `setVideoExportFrame`): the renderer resumes sampling its `<video>`
     * element and `seekVideos` drives it again. The export loop's per-video
     * fallback for a WebCodecs source that stopped delivering mid-export.
     * @param {ID} id
     */
    clearVideoExportFrame(id) {
        wasm.scenecontroller_clearVideoExportFrame(this.__wbg_ptr, id);
    }
    /**
     * Drop every export-time video frame override (see `setVideoExportFrame`).
     */
    clearVideoExportFrames() {
        wasm.scenecontroller_clearVideoExportFrames(this.__wbg_ptr);
    }
    /**
     * @param {any} network
     * @param {Float2} size
     * @returns {VecNetShapeData | undefined}
     */
    figmaVectorToVecNet(network, size) {
        const ret = wasm.scenecontroller_figmaVectorToVecNet(this.__wbg_ptr, network, size);
        return ret;
    }
    /**
     * Text on path: lays out `data` (which must carry a `path`) and returns
     * the box around its glyphs and path: the path recentered on that box,
     * the box's center in the text's current local space, and its size. The
     * editor stores these so the text's bounds follow the curve. `None` while
     * the font is still loading.
     * @param {TextShapeData} data
     * @returns {TextOnPathFit | undefined}
     */
    fitTextOnPath(data) {
        const ret = wasm.scenecontroller_fitTextOnPath(this.__wbg_ptr, data);
        return ret;
    }
    /**
     * @param {ID} shape
     * @returns {ParseSvgPathResult | undefined}
     */
    flattenShape(shape) {
        const ret = wasm.scenecontroller_flattenShape(this.__wbg_ptr, shape);
        return ret;
    }
    /**
     * Re-solve layout + constraints for the subtree affected by an edit to `id`, returning the
     * objects whose geometry changed for the editor to persist via `dispatchNoUndo`. The caller
     * does NOT choose directions: this walks up to the highest affected ancestor (the layout root)
     * and runs the full measure/arrange solve down through every frame. Because the solve is a pure,
     * idempotent function of geometry, this maximal pass is correct for every trigger (resize,
     * reorder, reparent, layout-prop change, scale, visibility) — an unaffected node re-solves to
     * its current geometry and simply isn't reported. Structural-edit path — does not consume
     * `needs_layout_resolve` dirty marks.
     * @param {ID} id
     * @returns {LayoutResult[]}
     */
    flushLayout(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_flushLayout(retptr, this.__wbg_ptr, id);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1);
            wasm.__wbindgen_export3(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {number | undefined}
     */
    getCurrentFrameIndex() {
        const ret = wasm.scenecontroller_getCurrentFrameIndex(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    getTotalFramesAmount() {
        const ret = wasm.scenecontroller_getTotalFramesAmount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {VecNetShapeData | undefined}
     */
    getUpdatedPencilData() {
        const ret = wasm.scenecontroller_getUpdatedPencilData(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {VecNetShapeData | undefined}
     */
    getUpdatedVecNetData() {
        const ret = wasm.scenecontroller_getUpdatedVecNetData(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get the oriented bounding box of selected vertices in local coordinates.
     * `box_orientation_radians` is the orientation angle of the box.
     * Returns [half_w, half_h, m00, m01, m10, m11, tx, ty] or null if no selection.
     * The first two values are the half-size. The remaining six are the local matrix
     * (2x2 rotation columns + translation) mapping from box space to parent space.
     * @param {number} box_orientation_radians
     * @returns {Float32Array | undefined}
     */
    getVectorBoxSelectionBoundsAndLocalMatrix(box_orientation_radians) {
        const ret = wasm.scenecontroller_getVectorBoxSelectionBoundsAndLocalMatrix(this.__wbg_ptr, box_orientation_radians);
        return ret;
    }
    /**
     * @returns {any}
     */
    getVectorCursor() {
        const ret = wasm.scenecontroller_getVectorCursor(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    getVectorEditMode() {
        const ret = wasm.scenecontroller_getVectorEditMode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {PlatformUInt8Array | undefined}
     */
    getVectorEditingState() {
        const ret = wasm.scenecontroller_getVectorEditingState(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    getVectorSelectedVerts() {
        const ret = wasm.scenecontroller_getVectorSelectedVerts(this.__wbg_ptr);
        return ret;
    }
    /**
     * Get the count of selected vertices (including vertices from selected segments)
     * @returns {number}
     */
    getVectorSelectionCount() {
        const ret = wasm.scenecontroller_getVectorSelectionCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    hasFontAssetsChanges() {
        const ret = wasm.scenecontroller_hasFontAssetsChanges(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Check if any segments are selected (as opposed to individual vertices)
     * @returns {boolean}
     */
    hasSingleVectorSelectedSegment() {
        const ret = wasm.scenecontroller_hasSingleVectorSelectedSegment(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The instance-root collab id that a (possibly virtual / realized) object id
     * belongs to, or `null` if it is not inside a virtual instance. The editor
     * uses this to redirect an edit on an instance's inner node into an override
     * on the instance root, instead of a no-op edit against the un-persisted node.
     * @param {any} id
     * @returns {any}
     */
    instanceRootOf(id) {
        const ret = wasm.scenecontroller_instanceRootOf(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * Single object intersection that does not consider parent, visibility or clipping
     * @param {Float2} pos
     * @param {ID} object
     * @param {number | null} [stroke_margin]
     * @param {boolean | null} [is_selected]
     * @returns {boolean}
     */
    intersectsObject(pos, object, stroke_margin, is_selected) {
        const ret = wasm.scenecontroller_intersectsObject(this.__wbg_ptr, pos, object, isLikeNone(stroke_margin) ? Number.MAX_SAFE_INTEGER : Math.fround(stroke_margin), isLikeNone(is_selected) ? 0xFFFFFF : is_selected ? 1 : 0);
        return ret !== 0;
    }
    /**
     * @param {Float2} pos
     * @param {boolean | null} [include_locked]
     * @param {number | null} [stroke_margin]
     * @returns {ID[]}
     */
    intersectsObjects(pos, include_locked, stroke_margin) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_intersectsObjects(retptr, this.__wbg_ptr, pos, isLikeNone(include_locked) ? 0xFFFFFF : include_locked ? 1 : 0, isLikeNone(stroke_margin) ? Number.MAX_SAFE_INTEGER : Math.fround(stroke_margin));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1);
            wasm.__wbindgen_export3(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Whether the document is in Display P3, i.e. whether the pixels the
     * engine renders and reads back are Display P3 values rather than sRGB.
     * @returns {boolean}
     */
    isDisplayP3() {
        const ret = wasm.scenecontroller_isDisplayP3(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isEditedVectorEmpty() {
        const ret = wasm.scenecontroller_isEditedVectorEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {ID} id
     * @returns {boolean}
     */
    isObjectInViewport(id) {
        const ret = wasm.scenecontroller_isObjectInViewport(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * Whether the built-in editor/UI font (the font the immediate-mode
     * `updateUiShapes` overlay renders text with when a shape names no
     * `font_id`, and the fallback while a named font asset is still
     * loading) has been fetched and parsed.
     * The load kicks off asynchronously at controller creation
     * (`Assets::load_ui_font`), so overlay text pushed before it lands
     * tessellates to nothing until the next frame after the load completes.
     * Hosts that rasterize on demand (the spline editor / runtime UI-frame
     * canvases) poll this to know when to re-render — without it a canvas
     * rasterized once at boot shows every shape except its texts.
     * @returns {boolean}
     */
    isUiFontLoaded() {
        const ret = wasm.scenecontroller_isUiFontLoaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isVectorBoxSelectAllowed() {
        const ret = wasm.scenecontroller_isVectorBoxSelectAllowed(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns true if a vector point (vert or visible control point) is under the given
     * world position. Used to give point interactions priority over the resize box.
     * @param {Float2} pos
     * @returns {boolean}
     */
    isVectorPointUnderCursor(pos) {
        const ret = wasm.scenecontroller_isVectorPointUnderCursor(this.__wbg_ptr, pos);
        return ret !== 0;
    }
    /**
     * Drain pending `needs_layout_resolve` dirty marks (set via `markNeedsLayoutResolve`) through
     * the constraint + autolayout re-solve and return the objects whose geometry changed. Capturing
     * counterpart of `layout()`, for the size-change write-back path.
     * @returns {LayoutResult[]}
     */
    layoutFromResize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_layoutFromResize(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1);
            wasm.__wbindgen_export3(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    layout() {
        wasm.scenecontroller_layout(this.__wbg_ptr);
    }
    /**
     * Mark an object's subtree for a layout + constraint re-solve on the next `update_cached`
     * (drained by `compute_layout_and_constraints_from_resize`). The editor calls this after a
     * non-base-state resize, where layout results must be applied purely in the runtime rather than
     * written to the data layer.
     * @param {ID} id
     */
    markNeedsLayoutResolve(id) {
        wasm.scenecontroller_markNeedsLayoutResolve(this.__wbg_ptr, id);
    }
    /**
     * Measures the natural size for a text shape given its data. Used by the editor
     * before dispatching auto-size mutations so it can shift `position` to keep the
     * alignment-anchored corner in place. Returns `data.size` unchanged if the font is
     * not loaded yet or `autoSize` is None.
     * @param {TextShapeData} data
     * @returns {Float2}
     */
    measureTextNaturalSize(data) {
        const ret = wasm.scenecontroller_measureTextNaturalSize(this.__wbg_ptr, data);
        return ret;
    }
    /**
     * Returns the currently selected clip index for the shape, or null if no clip
     * is bound.
     * @param {ID} id
     * @returns {number | undefined}
     */
    model3DAnimationClipIndex(id) {
        const ret = wasm.scenecontroller_model3DAnimationClipIndex(this.__wbg_ptr, id);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns whether the shape's animation is currently playing.
     * @param {ID} id
     * @returns {boolean}
     */
    model3DAnimationIsPlaying(id) {
        const ret = wasm.scenecontroller_model3DAnimationIsPlaying(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * Current playhead in seconds for the shape's bound clip, or null when no
     * clip is selected.
     * @param {ID} id
     * @returns {number | undefined}
     */
    model3DAnimationLocalTime(id) {
        const ret = wasm.scenecontroller_model3DAnimationLocalTime(this.__wbg_ptr, id);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Move selected vertices by a delta
     * @param {Float2} delta
     */
    moveVectorSelectionByDelta(delta) {
        wasm.scenecontroller_moveVectorSelectionByDelta(this.__wbg_ptr, delta);
    }
    /**
     * @param {ID} id
     * @returns {BoundingBox | undefined}
     */
    objectAlignedBoundingBox(id) {
        const ret = wasm.scenecontroller_objectAlignedBoundingBox(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * The current data of an object by collab id, read from the runtime slotmap.
     * Works for *virtual* instance descendants (which exist only in the slotmap,
     * realized from the component registry, not in the collab tree), so the editor
     * can read a realized node's properties — e.g. to populate the inspector for a
     * node selected inside an instance. Returns `null` if the id is unknown.
     * @param {any} id
     * @returns {any}
     */
    objectData(id) {
        const ret = wasm.scenecontroller_objectData(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @param {ID} id
     * @returns {Affine2 | undefined}
     */
    objectLocalMatrix(id) {
        const ret = wasm.scenecontroller_objectLocalMatrix(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * Text on path: the centerline of `path_object` (a vector or shape) as
     * SVG path data in `target`'s local space, where its glyphs are laid out.
     * @param {ID} path_object
     * @param {ID} target
     * @returns {string | undefined}
     */
    objectPathInObjectSpace(path_object, target) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_objectPathInObjectSpace(retptr, this.__wbg_ptr, path_object, target);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getStringFromWasm0(r0, r1);
                wasm.__wbindgen_export3(r0, r1 * 1, 1);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * The object's box corners after its 3D transform, in world coordinates (see
     * `Objects::object_projected_corners`). Undefined for an object drawn flat.
     * @param {ID} id
     * @returns {Float32Array | undefined}
     */
    objectProjectedCorners(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_objectProjectedCorners(retptr, this.__wbg_ptr, id);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            let v1;
            if (r0 !== 0) {
                v1 = getArrayF32FromWasm0(r0, r1).slice();
                wasm.__wbindgen_export3(r0, r1 * 4, 4);
            }
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {ID} id
     * @returns {Affine2 | undefined}
     */
    objectWorldMatrixWithChildrenOffset(id) {
        const ret = wasm.scenecontroller_objectWorldMatrixWithChildrenOffset(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @param {ID} id
     * @returns {Affine2 | undefined}
     */
    objectWorldMatrix(id) {
        const ret = wasm.scenecontroller_objectWorldMatrix(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * Figma's "Offset path": grows (positive) or shrinks (negative) the
     * shape's outline by `distance` px.
     * @param {ID} shape
     * @param {number} distance
     * @param {string} join
     * @returns {ParseSvgPathResult | undefined}
     */
    offsetShape(shape, distance, join) {
        const val2 = +distance;
        const ptr0 = passStringToWasm0(join, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_offsetShape(this.__wbg_ptr, shape, val2, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} key
     */
    onKeyDown(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_onKeyDown(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} key
     */
    onKeyUp(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_onKeyUp(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float2} pos
     * @param {boolean} is_touch
     * @param {number} button
     */
    onPointerDown(pos, is_touch, button) {
        wasm.scenecontroller_onPointerDown(this.__wbg_ptr, pos, is_touch, button);
    }
    onPointerEnter() {
        wasm.scenecontroller_onPointerEnter(this.__wbg_ptr);
    }
    onPointerLeave() {
        wasm.scenecontroller_onPointerLeave(this.__wbg_ptr);
    }
    /**
     * @param {Float2} pos
     * @param {boolean} is_touch
     * @param {number} button
     */
    onPointerMove(pos, is_touch, button) {
        wasm.scenecontroller_onPointerMove(this.__wbg_ptr, pos, is_touch, button);
    }
    /**
     * @param {Float2} pos
     * @param {boolean} is_touch
     * @param {number} button
     */
    onPointerUp(pos, is_touch, button) {
        wasm.scenecontroller_onPointerUp(this.__wbg_ptr, pos, is_touch, button);
    }
    /**
     * The *outermost* (top-level, collab-addressable) instance root that a possibly
     * virtual / nested realized object id belongs to, or `null` if it is not inside
     * any instance. Unlike [`instanceRootOf`](Self::instance_root_of) (nearest), this
     * walks past nested instance hosts. The editor folds an edit on a node inside a
     * (possibly nested) instance into *this* instance's overrides; for a node inside a
     * nested instance the override is a composite path that composes across the
     * boundary.
     * @param {any} id
     * @returns {any}
     */
    outermostInstanceRootOf(id) {
        const ret = wasm.scenecontroller_outermostInstanceRootOf(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @param {ID} child_id
     * @param {ID} parent_id
     * @returns {BoundingBox | undefined}
     */
    parentAlignedBoundingBox(child_id, parent_id) {
        const ret = wasm.scenecontroller_parentAlignedBoundingBox(this.__wbg_ptr, child_id, parent_id);
        return ret;
    }
    /**
     * @param {string} path
     * @param {number} fill_rule
     * @returns {ParseSvgPathResult | undefined}
     */
    parseSvgPath(path, fill_rule) {
        const val2 = +fill_rule;
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_parseSvgPath(this.__wbg_ptr, ptr0, len0, val2);
        return ret;
    }
    pencilShiftDown() {
        wasm.scenecontroller_pencilShiftDown(this.__wbg_ptr);
    }
    pencilShiftUp() {
        wasm.scenecontroller_pencilShiftUp(this.__wbg_ptr);
    }
    /**
     * How many async document-asset loads (images, videos, web fonts) are
     * still in flight. Editor-only: the video export preview polls this on
     * its standalone engine to start recording only once the freshly-created
     * scene is fully loaded (the `has*AssetsChanges` flags can only say
     * "something landed this frame", never "nothing is still loading").
     * @returns {number}
     */
    pendingAssetLoads() {
        const ret = wasm.scenecontroller_pendingAssetLoads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {ID} frame_id
     */
    playInEditorFrame(frame_id) {
        wasm.scenecontroller_playInEditorFrame(this.__wbg_ptr, frame_id);
    }
    /**
     * @param {ID | null} [start_frame]
     * @param {boolean | null} [autoplay_videos]
     */
    present(start_frame, autoplay_videos) {
        wasm.scenecontroller_present(this.__wbg_ptr, isLikeNone(start_frame) ? 0 : addToExternrefTable0(start_frame), isLikeNone(autoplay_videos) ? 0xFFFFFF : autoplay_videos ? 1 : 0);
    }
    /**
     * Editor-only: live-preview a single transition tween on `object_id`, animating
     * from the object's current look to `to_state` (null = base state) using the
     * easing/duration/params in `tween_data` (a `TweenData`). Plays once; forward-only.
     * Snap the object to the desired start state via `resetAllStates` before calling,
     * and `stopPreviewTransition` + `resetAllStates` to revert.
     * @param {ID} object_id
     * @param {ID | null | undefined} to_state
     * @param {any} tween_data
     */
    previewTransition(object_id, to_state, tween_data) {
        wasm.scenecontroller_previewTransition(this.__wbg_ptr, object_id, isLikeNone(to_state) ? 0 : addToExternrefTable0(to_state), tween_data);
    }
    /**
     * @param {ID} id
     * @returns {BoundingBox | undefined}
     */
    projectionEffectBoundingBox(id) {
        const ret = wasm.scenecontroller_projectionEffectBoundingBox(this.__wbg_ptr, id);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @returns {Float64Array}
     */
    readVectorCornerRadiiForSelection(data, selected_verts) {
        const ret = wasm.scenecontroller_readVectorCornerRadiiForSelection(this.__wbg_ptr, data, selected_verts);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @returns {number}
     */
    readVectorCornerSmoothing(data) {
        const ret = wasm.scenecontroller_readVectorCornerSmoothing(this.__wbg_ptr, data);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @returns {Float64Array}
     */
    readVectorVertexPositionsForSelection(data, selected_verts) {
        const ret = wasm.scenecontroller_readVectorVertexPositionsForSelection(this.__wbg_ptr, data, selected_verts);
        return ret;
    }
    /**
     * Derive the pure-resolution constraint anchor for `child` within `parent` from their current
     * Re-derive a constrained child's runtime-only inset anchor from its current base geometry and
     * stored [`crate::data::AnchorMode`]s. The editor calls this after a *direct* geometry edit of
     * the child (drag/resize/paste/reparent) — NOT on a parent-resize-induced move — so subsequent
     * parent resizes resolve the child purely and drift-free. The insets are never persisted (a pure
     * function of geometry, derived at scene load); this only refreshes the runtime cache.
     * @param {ID} id
     */
    reanchorObject(id) {
        wasm.scenecontroller_reanchorObject(this.__wbg_ptr, id);
    }
    /**
     * @param {ID | null | undefined} frame
     * @param {ObjectStateSelection[]} overrides
     */
    resetAllStates(frame, overrides) {
        const ptr0 = passArrayJsValueToWasm0(overrides, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_resetAllStates(this.__wbg_ptr, isLikeNone(frame) ? 0 : addToExternrefTable0(frame), ptr0, len0);
    }
    /**
     * Resize a group to `(width, height)` by scaling its contents (geometry only), returning the
     * descendants whose geometry changed for the editor to persist. Group self-resize entry point
     * — a group has no size, so free-resizing it scales its children.
     * @param {ID} id
     * @param {number} width
     * @param {number} height
     * @returns {LayoutResult[]}
     */
    resizeGroup(id, width, height) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_resizeGroup(retptr, this.__wbg_ptr, id, width, height);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1);
            wasm.__wbindgen_export3(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Save the initial positions of selected vertices and control points
     * Must be called before transform_vector_selection for transforms to work correctly
     */
    saveVectorSelectionInitialPositions() {
        wasm.scenecontroller_saveVectorSelectionInitialPositions(this.__wbg_ptr);
    }
    /**
     * @param {Float2} pos
     * @returns {Float2}
     */
    screenToWorld(pos) {
        const ret = wasm.scenecontroller_screenToWorld(this.__wbg_ptr, pos);
        return ret;
    }
    /**
     * Resolves to whether any video seeked backward (wrapped across its
     * loop point) — the export loop renders throwaway frames after a wrap
     * to keep cold-path video→RGB conversion transients off captured frames.
     * @param {number} dt
     * @returns {Promise<boolean>}
     */
    seekVideos(dt) {
        const ret = wasm.scenecontroller_seekVideos(this.__wbg_ptr, dt);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @param {number} radius
     * @returns {Uint8Array | undefined}
     */
    setBytesForVectorCornerRadiusSelection(data, selected_verts, radius) {
        const ret = wasm.scenecontroller_setBytesForVectorCornerRadiusSelection(this.__wbg_ptr, data, selected_verts, radius);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {number} corner_smoothing
     * @returns {Uint8Array | undefined}
     */
    setBytesForVectorCornerSmoothing(data, corner_smoothing) {
        const ret = wasm.scenecontroller_setBytesForVectorCornerSmoothing(this.__wbg_ptr, data, corner_smoothing);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @param {number} x
     * @param {number} y
     * @returns {Uint8Array | undefined}
     */
    setBytesForVectorVertexPositionSelection(data, selected_verts, x, y) {
        const ret = wasm.scenecontroller_setBytesForVectorVertexPositionSelection(this.__wbg_ptr, data, selected_verts, x, y);
        return ret;
    }
    /**
     * Switches the document's color profile. Takes effect on the next frame.
     * @param {ColorProfileData} profile
     */
    setColorProfile(profile) {
        wasm.scenecontroller_setColorProfile(this.__wbg_ptr, profile);
    }
    /**
     * Scrub the shape's clip to the given local time in seconds. The renderer
     * picks the new pose up on the next frame.
     * @param {ID} id
     * @param {number} time
     */
    setModel3DAnimationLocalTime(id, time) {
        wasm.scenecontroller_setModel3DAnimationLocalTime(this.__wbg_ptr, id, time);
    }
    /**
     * Drive playback of an imported glTF animation on a Model3D shape.
     * `clipIndex` indexes into the shape's Model3DData.animations array; pass null
     * (or a value paired with `isPlaying = false`) to pause.
     * @param {ID} id
     * @param {number | null | undefined} clip_index
     * @param {boolean} is_playing
     */
    setModel3DAnimation(id, clip_index, is_playing) {
        wasm.scenecontroller_setModel3DAnimation(this.__wbg_ptr, id, isLikeNone(clip_index) ? Number.MAX_SAFE_INTEGER : (clip_index) >>> 0, is_playing);
    }
    /**
     * Outline mode: draw every layer as a thin outline, without fills or effects.
     * @param {boolean} enabled
     */
    setOutlineMode(enabled) {
        wasm.scenecontroller_setOutlineMode(this.__wbg_ptr, enabled);
    }
    /**
     * Pixel preview: `scale` 1 or 2 rasterizes the page at that many pixels per document
     * pixel and shows them enlarged when zoomed in further; 0 turns it off.
     * @param {number} scale
     */
    setPixelPreview(scale) {
        wasm.scenecontroller_setPixelPreview(this.__wbg_ptr, scale);
    }
    /**
     * @param {Float4} padding
     */
    setPresentationPadding(padding) {
        wasm.scenecontroller_setPresentationPadding(this.__wbg_ptr, padding);
    }
    /**
     * @param {boolean} show
     */
    setShowPixelGrid(show) {
        wasm.scenecontroller_setShowPixelGrid(this.__wbg_ptr, show);
    }
    /**
     * @param {Uint8Array} state
     */
    setVectorEditingState(state) {
        wasm.scenecontroller_setVectorEditingState(this.__wbg_ptr, state);
    }
    /**
     * @param {any} tool
     */
    setVectorTool(tool) {
        wasm.scenecontroller_setVectorTool(this.__wbg_ptr, tool);
    }
    /**
     * Register an export-time frame override for a video asset: the renderer
     * uploads this WebCodecs frame instead of sampling the `<video>` element,
     * and `seekVideos` leaves the element alone. The caller keeps ownership
     * of the frame — it must stay unclosed until the override is replaced or
     * cleared, and `clearVideoExportFrames` must run before anything renders
     * outside the export loop. WebGPU backend only (`isWebgpu`); the WebGL
     * path still samples the element.
     * @param {ID} id
     * @param {VideoFrame} frame
     */
    setVideoExportFrame(id, frame) {
        wasm.scenecontroller_setVideoExportFrame(this.__wbg_ptr, id, frame);
    }
    /**
     * Figma's "Simplify vector": refits the shape's outline with fewer
     * curves, within `tolerance` px.
     * @param {ID} shape
     * @param {number} tolerance
     * @returns {ParseSvgPathResult | undefined}
     */
    simplifyShape(shape, tolerance) {
        const ret = wasm.scenecontroller_simplifyShape(this.__wbg_ptr, shape, tolerance);
        return ret;
    }
    /**
     * Snap a world-space resize handle position against other (non-selected) vertices.
     * `snap_x`/`snap_y` indicate which axes may snap. Returns the snapped world position.
     * @param {Float2} pos
     * @param {boolean} snap_x
     * @param {boolean} snap_y
     * @returns {Float2}
     */
    snapVectorResizeHandle(pos, snap_x, snap_y) {
        const ret = wasm.scenecontroller_snapVectorResizeHandle(this.__wbg_ptr, pos, snap_x, snap_y);
        return ret;
    }
    /**
     * @param {ID} id
     * @param {number} stroke_width
     * @param {Float4} color
     */
    startPencil(id, stroke_width, color) {
        wasm.scenecontroller_startPencil(this.__wbg_ptr, id, stroke_width, color);
    }
    /**
     * @param {ID} id
     * @param {boolean} creation
     */
    startVectorEditing(id, creation) {
        wasm.scenecontroller_startVectorEditing(this.__wbg_ptr, id, creation);
    }
    start() {
        wasm.scenecontroller_start(this.__wbg_ptr);
    }
    stopInEditorFrame() {
        wasm.scenecontroller_stopInEditorFrame(this.__wbg_ptr);
    }
    stopPencil() {
        wasm.scenecontroller_stopPencil(this.__wbg_ptr);
    }
    stopPresenting() {
        wasm.scenecontroller_stopPresenting(this.__wbg_ptr);
    }
    /**
     * Editor-only: stop the transition-curve hover preview. Pair with
     * `resetAllStates` to restore the object to its current state.
     */
    stopPreviewTransition() {
        wasm.scenecontroller_stopPreviewTransition(this.__wbg_ptr);
    }
    stopVectorEditing() {
        wasm.scenecontroller_stopVectorEditing(this.__wbg_ptr);
    }
    /**
     * Width tool: the world position at `t` (0..1 by length) along the
     * shape's first stroke subpath, for drawing width handles.
     * @param {ID} id
     * @param {number} t
     * @returns {Float2 | undefined}
     */
    strokePointAt(id, t) {
        const ret = wasm.scenecontroller_strokePointAt(this.__wbg_ptr, id, t);
        return ret;
    }
    /**
     * Width tool: projects a world point onto the shape's stroke centerline.
     * Returns `[t, distance]`: the position along the nearest subpath by
     * length (0..1, the space width profiles use) and the distance from the
     * centerline in the shape's local units.
     * @param {ID} id
     * @param {Float2} world
     * @returns {Float2 | undefined}
     */
    strokeProjection(id, world) {
        const ret = wasm.scenecontroller_strokeProjection(this.__wbg_ptr, id, world);
        return ret;
    }
    /**
     * @param {ID} shape
     * @returns {ParseSvgPathResult | undefined}
     */
    strokeShape(shape) {
        const ret = wasm.scenecontroller_strokeShape(this.__wbg_ptr, shape);
        return ret;
    }
    /**
     * @param {SceneData} scene_data
     */
    switchScene(scene_data) {
        wasm.scenecontroller_switchScene(this.__wbg_ptr, scene_data);
    }
    /**
     * @param {Float2} min
     * @param {Float2} max
     * @param {Affine2} world_matrix
     * @param {ID} align_id
     * @returns {BoundingBox | undefined}
     */
    transformBoundingBoxByAlignObject(min, max, world_matrix, align_id) {
        const ret = wasm.scenecontroller_transformBoundingBoxByAlignObject(this.__wbg_ptr, min, max, world_matrix, align_id);
        return ret;
    }
    /**
     * Transform selected vertices and control points around a center point
     * center: [x, y] in local coordinates
     * scale: [scale_x, scale_y] scale factors
     * rotation_radians: additional rotation in radians
     * box_rotation_radians: orientation of the resize box (for scaling in rotated space)
     * @param {Float2} center
     * @param {Float2} scale
     * @param {number} rotation_radians
     * @param {number} box_rotation_radians
     * @returns {boolean}
     */
    transformVectorSelection(center, scale, rotation_radians, box_rotation_radians) {
        const ret = wasm.scenecontroller_transformVectorSelection(this.__wbg_ptr, center, scale, rotation_radians, box_rotation_radians);
        return ret !== 0;
    }
    /**
     * @param {ID[]} ids
     */
    triggerEventForObjectIds(ids) {
        const ptr0 = passArrayJsValueToWasm0(ids, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_triggerEventForObjectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {DocumentUpdate} message
     */
    updateByOp(message) {
        wasm.scenecontroller_updateByOp(this.__wbg_ptr, message);
    }
    updateCached() {
        wasm.scenecontroller_updateCached(this.__wbg_ptr);
    }
    /**
     * @param {CameraDiff} diff
     */
    updateCamera(diff) {
        wasm.scenecontroller_updateCamera(this.__wbg_ptr, diff);
    }
    /**
     * Mirror the document's component-definitions registry into the runtime and
     * re-expand every virtual instance. The editor calls this after a scene
     * (re)build (e.g. after `switchScene`) and whenever `DocumentData.components`
     * or a main component changes. Instance content is realized into the slotmap
     * from this registry, never stored in the synced document, so there is no
     * per-instance propagation op and nothing to drift.
     * @param {any} components
     */
    updateComponents(components) {
        wasm.scenecontroller_updateComponents(this.__wbg_ptr, components);
    }
    /**
     * @param {PublishDiff} diff
     */
    updatePublish(diff) {
        wasm.scenecontroller_updatePublish(this.__wbg_ptr, diff);
    }
    /**
     * @param {UpdateScene} op
     */
    updateSceneOp(op) {
        wasm.scenecontroller_updateSceneOp(this.__wbg_ptr, op);
    }
    /**
     * @param {any} ui_shapes
     */
    updateUiShapes(ui_shapes) {
        wasm.scenecontroller_updateUiShapes(this.__wbg_ptr, ui_shapes);
    }
    /**
     * @param {boolean} allowed
     */
    vectorAllowMultiSelect(allowed) {
        wasm.scenecontroller_vectorAllowMultiSelect(this.__wbg_ptr, allowed);
    }
    /**
     * @param {Float2} start
     * @param {Float2} end
     */
    vectorBoxSelect(start, end) {
        wasm.scenecontroller_vectorBoxSelect(this.__wbg_ptr, start, end);
    }
    /**
     * The pointer left the canvas, or the pen is no longer armed: remove the pen's hover
     * preview (both the one before a vector exists and the one while editing).
     */
    vectorClearPenHoverPreview() {
        wasm.scenecontroller_vectorClearPenHoverPreview(this.__wbg_ptr);
    }
    /**
     * Clear any active snap lines/dots (call when a box-driven drag-move ends)
     */
    vectorClearSnapping() {
        wasm.scenecontroller_vectorClearSnapping(this.__wbg_ptr);
    }
    /**
     * @param {boolean} connect
     */
    vectorDeleteSelection(connect) {
        wasm.scenecontroller_vectorDeleteSelection(this.__wbg_ptr, connect);
    }
    /**
     * The selected points' point mode: "None", "Angle", "AngleAndLength",
     * "" when unset (inferred), or "Mixed".
     * @returns {string}
     */
    vectorGetHandleMirroring() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
            wasm.scenecontroller_vectorGetHandleMirroring(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export3(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Figma's "Join selection": connects the two selected open endpoints.
     * @returns {boolean}
     */
    vectorJoinSelection() {
        const ret = wasm.scenecontroller_vectorJoinSelection(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Lasso point selection: `points` is a flat `[x0, y0, x1, y1, …]` list
     * of world-space positions.
     * @param {Float32Array | number[]} points
     */
    vectorLassoSelect(points) {
        const ptr0 = passArrayF32ToWasm0(points, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_vectorLassoSelect(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Uint8Array} data
     * @param {Float2} size_delta
     * @param {number} applied_scale
     * @returns {VecNetShapeData | undefined}
     */
    vectorResizeWithCornerRadii(data, size_delta, applied_scale) {
        const ret = wasm.scenecontroller_vectorResizeWithCornerRadii(this.__wbg_ptr, data, size_delta, applied_scale);
        return ret;
    }
    /**
     * @param {ID} id
     * @param {Float2} size_delta
     * @returns {VecNetShapeData | undefined}
     */
    vectorResize(id, size_delta) {
        const ret = wasm.scenecontroller_vectorResize(this.__wbg_ptr, id, size_delta);
        return ret;
    }
    /**
     * Point mode for the selected points: "None", "Angle" or
     * "AngleAndLength"; anything else clears it back to the inferred mode.
     * @param {string} mode
     * @returns {boolean}
     */
    vectorSetHandleMirroring(mode) {
        const ptr0 = passStringToWasm0(mode, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_vectorSetHandleMirroring(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {boolean} value
     */
    vectorSetIsAltPressed(value) {
        wasm.scenecontroller_vectorSetIsAltPressed(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    vectorSetIsSnappingControlAngles(value) {
        wasm.scenecontroller_vectorSetIsSnappingControlAngles(this.__wbg_ptr, value);
    }
    /**
     * Snap vector points to the pixel grid while editing (the editor's "Snap to pixel
     * grid" setting). Independent of `vectorSetIsSnapping` (snapping to other points).
     * @param {boolean} value
     */
    vectorSetIsSnappingToPixelGrid(value) {
        wasm.scenecontroller_vectorSetIsSnappingToPixelGrid(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    vectorSetIsSnapping(value) {
        wasm.scenecontroller_vectorSetIsSnapping(this.__wbg_ptr, value);
    }
    /**
     * The pen tool is armed and hovering at `pos` (screen space) with no vector being
     * edited yet: show the dot where the first point of the new vector will land on the
     * pixel grid. No-op while a vector is edited (the edit session draws its own preview)
     * and when snapping to the pixel grid is off.
     * @param {Float2} pos
     */
    vectorSetPenHoverPreview(pos) {
        wasm.scenecontroller_vectorSetPenHoverPreview(this.__wbg_ptr, pos);
    }
    vectorStopContinueSubpath() {
        wasm.scenecontroller_vectorStopContinueSubpath(this.__wbg_ptr);
    }
    /**
     * The video fills the export loop should decode with WebCodecs, as
     * `{ id, src }` objects (`src` is the loaded `<video>` element's source:
     * the asset's own URL for streamed loads, a `blob:` URL for byte-loaded
     * ones — either way the same URL the element itself fetched). Enumerated from the start events' video actions — the exact set
     * `seekVideos` drives — so the WebCodecs path animates precisely the
     * fills the element path would: a fill without a play action stays a
     * static frame on both paths and both backends. Scoped to actions
     * targeting `frame_id`'s subtree on purpose: enumerating the whole
     * document put a live decoder behind every video in the file (74 in one
     * real doc), turning a 5s export into 74 decode streams. Videos still
     * loading are omitted, and videos outside the subtree stay on the
     * seek-driven element path — both remain correct, just less
     * stable/deterministic.
     * @param {ID} frame_id
     * @returns {Array<any>}
     */
    videoFillSources(frame_id) {
        const ret = wasm.scenecontroller_videoFillSources(this.__wbg_ptr, frame_id);
        return ret;
    }
    /**
     * @param {Float2} pos
     * @returns {Float2}
     */
    worldToScreen(pos) {
        const ret = wasm.scenecontroller_worldToScreen(this.__wbg_ptr, pos);
        return ret;
    }
    /**
     * @param {boolean} arg0
     */
    set is_play_mode(arg0) {
        wasm.__wbg_set_scenecontroller_is_play_mode(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set needs_video_update(arg0) {
        wasm.__wbg_set_scenecontroller_needs_video_update(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set show_pixel_grid(arg0) {
        wasm.__wbg_set_scenecontroller_show_pixel_grid(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) SceneController.prototype[Symbol.dispose] = SceneController.prototype.free;

/**
 * Add an instance-only child under a realized node inside a virtual instance,
 * returning the updated thin link. Adding a node *inside* an instance is recorded
 * as an `extraChildren` override (the parent isn't a real synced object), so it
 * survives main edits and re-expansion. Returns `null` if the instance/component
 * is unknown or `parentRealizedId` is not part of the instance.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} parent_realized_id
 * @param {any} child
 * @returns {any}
 */
export function addRealizedChild(components, instance_id, link, parent_realized_id, child) {
    const ret = wasm.addRealizedChild(components, instance_id, link, parent_realized_id, child);
    return ret;
}

/**
 * Compute the ops that bring an instance's `current` materialized subtree back in
 * sync with its main component (e.g. after the main was edited). Returns a
 * `DocumentUpdate[]`: one `UpdateObject` per changed node, plus add/delete for
 * structural changes. Applying them keeps node identity (realized ids are
 * stable), so undo/redo and collab behave like any other edit.
 * @param {any} components
 * @param {any} scene
 * @param {any} instance_id
 * @param {any} link
 * @param {any} current
 * @returns {any}
 */
export function componentInstanceRefreshOps(components, scene, instance_id, link, current) {
    const ret = wasm.componentInstanceRefreshOps(components, scene, instance_id, link, current);
    return ret;
}

/**
 * Capture the overrides implied by a *materialized* instance subtree (the legacy
 * on-disk form: the root carries `link` and every realized descendant is stored
 * as a real child) into the thin `ComponentInstanceData`. The editor writes the
 * returned link back onto the instance root and drops the stored descendants,
 * completing the materialized -> virtual migration for that instance. Returns
 * `null` if the component referenced by `link` is unknown.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} materialized
 * @returns {any}
 */
export function dematerializeInstance(components, instance_id, link, materialized) {
    const ret = wasm.dematerializeInstance(components, instance_id, link, materialized);
    return ret;
}

/**
 * Realize a duplicate of an existing instance: a new instance (root id
 * `newInstanceId`) that copies `sourceLink`'s overrides, re-keyed for the new
 * root. Returns the materialized `TreeItem<ObjectData>`, or `null` if the source
 * component is unknown.
 * @param {any} components
 * @param {any} source_instance_id
 * @param {any} source_link
 * @param {any} new_instance_id
 * @returns {any}
 */
export function duplicateComponentInstance(components, source_instance_id, source_link, new_instance_id) {
    const ret = wasm.duplicateComponentInstance(components, source_instance_id, source_link, new_instance_id);
    return ret;
}

/**
 * Fold an edit on a *realized* node (a node inside a virtual instance, as
 * returned by hit-testing / shown in the layer tree) into the instance's
 * overrides, returning the updated thin link to write back onto the instance
 * root. `newData` is the node's full data after the edit (the editor runs its
 * command on the realized node, then passes the result here); the delta against
 * the node's current realized data becomes the override. This is how an
 * in-instance edit is persisted without materializing. The root's canvas
 * placement is instance-local and must be applied to the root object directly,
 * not routed here. Returns `null` if the instance/component is unknown or
 * `realizedId` is not part of the instance.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} realized_id
 * @param {any} new_data
 * @returns {any}
 */
export function overrideForRealizedEdit(components, instance_id, link, realized_id, new_data) {
    const ret = wasm.overrideForRealizedEdit(components, instance_id, link, realized_id, new_data);
    return ret;
}

/**
 * Realize an instance into its materialized subtree, with the component link
 * stamped onto the root. Returns the `TreeItem<ObjectData>`, or `null` if the
 * component referenced by `link` is unknown.
 *
 * Pass a freshly generated `instanceId` to place a new instance (e.g. when
 * duplicating a component); the realized descendants get deterministic ids
 * derived from it.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @returns {any}
 */
export function realizeComponentInstance(components, instance_id, link) {
    const ret = wasm.realizeComponentInstance(components, instance_id, link);
    return ret;
}

/**
 * Mark a realized node inside a virtual instance as structurally removed and
 * return the updated thin link. Deleting a node inside an instance is expressed
 * as a `removed` override (the node is not a real synced object), mirroring
 * Spline's "delete-in-instance becomes an override".
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} realized_id
 * @returns {any}
 */
export function removeRealizedNode(components, instance_id, link, realized_id) {
    const ret = wasm.removeRealizedNode(components, instance_id, link, realized_id);
    return ret;
}

export function web_init() {
    wasm.web_init();
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_208446807d0d1e30: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_ff192a72a0dcdf6d: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_Window_fef571b39b470387: function(arg0) {
            const ret = arg0.Window;
            return ret;
        },
        __wbg_WorkerGlobalScope_3ed6dee4573270f6: function(arg0) {
            const ret = arg0.WorkerGlobalScope;
            return ret;
        },
        __wbg___wbindgen_bigint_get_as_i64_11da4b52cd0aedef: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64((arg0 >>> 0) + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_4f1baf9a00be3c74: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_f249a2a76caa9a55: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_3f58a9d3b3a7eed2: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_5fa10641e039d3ef: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_741ff2bb612836f5: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_c22311b1cc228e3a: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_object_8b968c3ab8e96595: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_fc456fee5d3317de: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_be5b34249ff1fc15: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_38d7bfbe4cc84039: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_b2f214e2e4b30e36: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_934b640d0889af78: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64((arg0 >>> 0) + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_7ce8eee7fd327545: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_4c88d8bf264fd984: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_09736879a3f67559: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_activeTexture_45b425a49df733ce: function(arg0, arg1) {
            arg0.activeTexture(arg1 >>> 0);
        },
        __wbg_activeTexture_89cef8c297ad0698: function(arg0, arg1) {
            arg0.activeTexture(arg1 >>> 0);
        },
        __wbg_addEventListener_f2d27251d333a631: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_arrayBuffer_2c99a9ba14ba536c: function() { return handleError(function (arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        }, arguments); },
        __wbg_assign_fb94d6eb5054e51b: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.assign(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_attachShader_3ed301cc92db59f6: function(arg0, arg1, arg2) {
            arg0.attachShader(arg1, arg2);
        },
        __wbg_attachShader_817dcec9e79fd18f: function(arg0, arg1, arg2) {
            arg0.attachShader(arg1, arg2);
        },
        __wbg_beginComputePass_431a159006c13c7c: function(arg0, arg1) {
            const ret = arg0.beginComputePass(arg1);
            return ret;
        },
        __wbg_beginRenderPass_a4373284aaed4f43: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.beginRenderPass(arg1);
            return ret;
        }, arguments); },
        __wbg_bindBuffer_b3bb001fdbee089a: function(arg0, arg1, arg2) {
            arg0.bindBuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindBuffer_cbc9075f76fffa51: function(arg0, arg1, arg2) {
            arg0.bindBuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindFramebuffer_79534f24b57b7b95: function(arg0, arg1, arg2) {
            arg0.bindFramebuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindFramebuffer_b245cd93a150dd96: function(arg0, arg1, arg2) {
            arg0.bindFramebuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindRenderbuffer_3458a69a6dc55057: function(arg0, arg1, arg2) {
            arg0.bindRenderbuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindRenderbuffer_612f27d9b3b97b9f: function(arg0, arg1, arg2) {
            arg0.bindRenderbuffer(arg1 >>> 0, arg2);
        },
        __wbg_bindTexture_6f822943b2790466: function(arg0, arg1, arg2) {
            arg0.bindTexture(arg1 >>> 0, arg2);
        },
        __wbg_bindTexture_a23350e1b573ddfd: function(arg0, arg1, arg2) {
            arg0.bindTexture(arg1 >>> 0, arg2);
        },
        __wbg_bindVertexArrayOES_5161c1f5b1fea3f9: function(arg0, arg1) {
            arg0.bindVertexArrayOES(arg1);
        },
        __wbg_bindVertexArray_cc64c48bf67ab8d4: function(arg0, arg1) {
            arg0.bindVertexArray(arg1);
        },
        __wbg_blendEquation_847eb360af3b2786: function(arg0, arg1) {
            arg0.blendEquation(arg1 >>> 0);
        },
        __wbg_blendEquation_cd72c0ac181cd88d: function(arg0, arg1) {
            arg0.blendEquation(arg1 >>> 0);
        },
        __wbg_blendFunc_378a3be8ab6cb7d0: function(arg0, arg1, arg2) {
            arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendFunc_68b4cfb9bd98a13f: function(arg0, arg1, arg2) {
            arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blitFramebuffer_d17b7bddf5e86dbc: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
        },
        __wbg_bufferData_2fb8740d60478bf0: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_41b591a9f2d502ad: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_9305dba3ba9cba4e: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_9eb9c4c5053ac480: function(arg0, arg1, arg2, arg3) {
            arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferSubData_8acfdcd4b9f7edeb: function(arg0, arg1, arg2, arg3) {
            arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
        },
        __wbg_bufferSubData_9bec93d67e98757e: function(arg0, arg1, arg2, arg3) {
            arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
        },
        __wbg_call_40b008ba32f73991: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_a410eb4b59ed5965: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_clearBufferfv_474b28c18db287a8: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_clearBufferiv_a89cfdf7da6f2819: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
        },
        __wbg_compileShader_11eb6754e9b15970: function(arg0, arg1) {
            arg0.compileShader(arg1);
        },
        __wbg_compileShader_54c3771819e6caba: function(arg0, arg1) {
            arg0.compileShader(arg1);
        },
        __wbg_configure_31516cc3b0858ec8: function() { return handleError(function (arg0, arg1) {
            arg0.configure(arg1);
        }, arguments); },
        __wbg_constructor_76ad3e2c50d259de: function(arg0) {
            const ret = arg0.constructor;
            return ret;
        },
        __wbg_copyBufferSubData_b10635982222cbc4: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
        },
        __wbg_copyBufferToBuffer_9cfd4f1ea63080df: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_copyBufferToBuffer_f4eaee084ac4e202: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_copyExternalImageToTexture_bb5c9c9bb4087fa1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyExternalImageToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyTextureToBuffer_64f15f38fe2323d8: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyTextureToBuffer(arg1, arg2, arg3);
        }, arguments); },
        __wbg_createBindGroupLayout_4f241660bcf17970: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createBindGroupLayout(arg1);
            return ret;
        }, arguments); },
        __wbg_createBindGroup_655c6e6c0258530e: function(arg0, arg1) {
            const ret = arg0.createBindGroup(arg1);
            return ret;
        },
        __wbg_createBuffer_2c27ad5f899d418d: function(arg0) {
            const ret = arg0.createBuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createBuffer_6cf1a721b324813a: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createBuffer(arg1);
            return ret;
        }, arguments); },
        __wbg_createBuffer_ca6ca40e9fb13678: function(arg0) {
            const ret = arg0.createBuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createCommandEncoder_ec1f40f0cb4d09df: function(arg0, arg1) {
            const ret = arg0.createCommandEncoder(arg1);
            return ret;
        },
        __wbg_createComputePipelineAsync_afe7021ac5a02993: function(arg0, arg1) {
            const ret = arg0.createComputePipelineAsync(arg1);
            return ret;
        },
        __wbg_createFramebuffer_cdf686778c61014d: function(arg0) {
            const ret = arg0.createFramebuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createFramebuffer_f52399034cb1a200: function(arg0) {
            const ret = arg0.createFramebuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createPipelineLayout_2c8cd4528b06c108: function(arg0, arg1) {
            const ret = arg0.createPipelineLayout(arg1);
            return ret;
        },
        __wbg_createProgram_de0881c688a8e43b: function(arg0) {
            const ret = arg0.createProgram();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createProgram_ea784724f6f0074f: function(arg0) {
            const ret = arg0.createProgram();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createQuerySet_ed36084b508e9ed7: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createQuerySet(arg1);
            return ret;
        }, arguments); },
        __wbg_createRenderPipelineAsync_eecad1e54ef27acf: function(arg0, arg1) {
            const ret = arg0.createRenderPipelineAsync(arg1);
            return ret;
        },
        __wbg_createRenderPipeline_cb618c5e21e50a2d: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createRenderPipeline(arg1);
            return ret;
        }, arguments); },
        __wbg_createRenderbuffer_19c2eec619a37a15: function(arg0) {
            const ret = arg0.createRenderbuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createRenderbuffer_e45c14c918a72668: function(arg0) {
            const ret = arg0.createRenderbuffer();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createSampler_c8ffb3c8d565f704: function(arg0, arg1) {
            const ret = arg0.createSampler(arg1);
            return ret;
        },
        __wbg_createShaderModule_2e44fc7677c6288b: function(arg0, arg1) {
            const ret = arg0.createShaderModule(arg1);
            return ret;
        },
        __wbg_createShader_9754a1e4ef374e84: function(arg0, arg1) {
            const ret = arg0.createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createShader_d2d90020273cef2b: function(arg0, arg1) {
            const ret = arg0.createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createTexture_0550382a3890c559: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createTexture(arg1);
            return ret;
        }, arguments); },
        __wbg_createTexture_3287f26407473071: function(arg0) {
            const ret = arg0.createTexture();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createTexture_eec9a1994aabeca7: function(arg0) {
            const ret = arg0.createTexture();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createVertexArrayOES_3eaf087ef22da1cb: function(arg0) {
            const ret = arg0.createVertexArrayOES();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createVertexArray_1293d2ffa8346be2: function(arg0) {
            const ret = arg0.createVertexArray();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_createView_472059ff382a2e65: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createView(arg1);
            return ret;
        }, arguments); },
        __wbg_cullFace_208151a46885a1fa: function(arg0, arg1) {
            arg0.cullFace(arg1 >>> 0);
        },
        __wbg_cullFace_9eaca57652d7ed37: function(arg0, arg1) {
            arg0.cullFace(arg1 >>> 0);
        },
        __wbg_currentTime_5acf805e7b52f9c5: function(arg0) {
            const ret = arg0.currentTime;
            return ret;
        },
        __wbg_debug_29e5044b8c3730bb: function(arg0) {
            console.debug(arg0);
        },
        __wbg_deleteBuffer_673584ba5a55669d: function(arg0, arg1) {
            arg0.deleteBuffer(arg1);
        },
        __wbg_deleteBuffer_ffa760fd3b0b5ef1: function(arg0, arg1) {
            arg0.deleteBuffer(arg1);
        },
        __wbg_deleteFramebuffer_0ec884f89db72a3e: function(arg0, arg1) {
            arg0.deleteFramebuffer(arg1);
        },
        __wbg_deleteFramebuffer_ffdb1bee4c92ae4c: function(arg0, arg1) {
            arg0.deleteFramebuffer(arg1);
        },
        __wbg_deleteProgram_8c38fff0f4a88dea: function(arg0, arg1) {
            arg0.deleteProgram(arg1);
        },
        __wbg_deleteProgram_c07d952a1b0c1cb6: function(arg0, arg1) {
            arg0.deleteProgram(arg1);
        },
        __wbg_deleteRenderbuffer_3a6e1676ab926e0f: function(arg0, arg1) {
            arg0.deleteRenderbuffer(arg1);
        },
        __wbg_deleteRenderbuffer_895ff607251243a9: function(arg0, arg1) {
            arg0.deleteRenderbuffer(arg1);
        },
        __wbg_deleteShader_320530dd636bc187: function(arg0, arg1) {
            arg0.deleteShader(arg1);
        },
        __wbg_deleteShader_ac74568b64a1c3c7: function(arg0, arg1) {
            arg0.deleteShader(arg1);
        },
        __wbg_deleteTexture_1653a9994a44215e: function(arg0, arg1) {
            arg0.deleteTexture(arg1);
        },
        __wbg_deleteTexture_89bd1d49ae4fb309: function(arg0, arg1) {
            arg0.deleteTexture(arg1);
        },
        __wbg_deleteVertexArrayOES_2214ecdf65be031d: function(arg0, arg1) {
            arg0.deleteVertexArrayOES(arg1);
        },
        __wbg_deleteVertexArray_2589b74b67ba20c8: function(arg0, arg1) {
            arg0.deleteVertexArray(arg1);
        },
        __wbg_depthMask_276856a569045897: function(arg0, arg1) {
            arg0.depthMask(arg1 !== 0);
        },
        __wbg_depthMask_2ba7e83178c3cec3: function(arg0, arg1) {
            arg0.depthMask(arg1 !== 0);
        },
        __wbg_description_5eb53b355f0598bc: function(arg0, arg1) {
            const ret = arg1.description;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_disable_2ead6c11cefd0322: function(arg0, arg1) {
            arg0.disable(arg1 >>> 0);
        },
        __wbg_disable_8a9e81e6d64d046b: function(arg0, arg1) {
            arg0.disable(arg1 >>> 0);
        },
        __wbg_dispatchWorkgroups_afb2344298c62227: function(arg0, arg1, arg2, arg3) {
            arg0.dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_displayHeight_fb2700c23cca6739: function(arg0) {
            const ret = arg0.displayHeight;
            return ret;
        },
        __wbg_displayWidth_9e9d6031a3036613: function(arg0) {
            const ret = arg0.displayWidth;
            return ret;
        },
        __wbg_document_3b5c3071b43e97ee: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_done_57e08d0be6e30c02: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_drawArrays_a9c18db2e94f4a82: function(arg0, arg1, arg2, arg3) {
            arg0.drawArrays(arg1 >>> 0, arg2, arg3);
        },
        __wbg_drawArrays_fe5a51410bfabb5b: function(arg0, arg1, arg2, arg3) {
            arg0.drawArrays(arg1 >>> 0, arg2, arg3);
        },
        __wbg_drawBuffersWEBGL_49c672d0ddcdfe71: function(arg0, arg1) {
            arg0.drawBuffersWEBGL(arg1);
        },
        __wbg_drawBuffers_e296659ce384e721: function(arg0, arg1) {
            arg0.drawBuffers(arg1);
        },
        __wbg_drawElements_c70e0887282fa70e: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_drawElements_d76df94ac144b73b: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_drawIndexed_d31913e79d58fbac: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
        },
        __wbg_draw_6877f98847e1e36c: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_duration_eac1f0c358a3c029: function(arg0) {
            const ret = arg0.duration;
            return ret;
        },
        __wbg_enableVertexAttribArray_d485706ade6bebf8: function(arg0, arg1) {
            arg0.enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enableVertexAttribArray_eeecc6185af24227: function(arg0, arg1) {
            arg0.enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enable_c3c00565c89d3175: function(arg0, arg1) {
            arg0.enable(arg1 >>> 0);
        },
        __wbg_enable_e955d456ef6b93f7: function(arg0, arg1) {
            arg0.enable(arg1 >>> 0);
        },
        __wbg_end_c36889de8ddef882: function(arg0) {
            arg0.end();
        },
        __wbg_end_f99ebed53d4e198a: function(arg0) {
            arg0.end();
        },
        __wbg_engine_new: function(arg0) {
            const ret = Engine.__wrap(arg0);
            return ret;
        },
        __wbg_entries_7bb1459bd9b5c2b9: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_export3(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_d1fc0193610e0e39: function(arg0) {
            console.error(arg0);
        },
        __wbg_features_50600f3c70f40724: function(arg0) {
            const ret = arg0.features;
            return ret;
        },
        __wbg_features_6ea4d8cc3e9ee29c: function(arg0) {
            const ret = arg0.features;
            return ret;
        },
        __wbg_fetch_7fd335c0dfee5b4e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = fetch(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_finish_4d91de5e927dd13f: function(arg0, arg1) {
            const ret = arg0.finish(arg1);
            return ret;
        },
        __wbg_finish_6e06b68ab68cd9f6: function(arg0) {
            const ret = arg0.finish();
            return ret;
        },
        __wbg_flush_4911c503a18d091d: function(arg0) {
            arg0.flush();
        },
        __wbg_flush_a9981e0bd1a44897: function(arg0) {
            arg0.flush();
        },
        __wbg_framebufferRenderbuffer_1c89563506a7d0ac: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
        },
        __wbg_framebufferRenderbuffer_ffaba93222aea77c: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
        },
        __wbg_framebufferTexture2D_2c69ac0ce67faf7d: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
        },
        __wbg_framebufferTexture2D_b6250a0c37eb48c2: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
        },
        __wbg_from_eac91875c8a5ffa4: function(arg0) {
            const ret = Array.from(arg0);
            return ret;
        },
        __wbg_generateMipmap_41bc066b35a6cd3d: function(arg0, arg1) {
            arg0.generateMipmap(arg1 >>> 0);
        },
        __wbg_generateMipmap_e1a3b00736bb27bf: function(arg0, arg1) {
            arg0.generateMipmap(arg1 >>> 0);
        },
        __wbg_getActiveUniform_4d82b7834e1b4ef8: function(arg0, arg1, arg2) {
            const ret = arg0.getActiveUniform(arg1, arg2 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getActiveUniform_7d405d07694ad340: function(arg0, arg1, arg2) {
            const ret = arg0.getActiveUniform(arg1, arg2 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getContext_1938edb9a972f63d: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_9d32151c28a36ed6: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_d93f904b714852ae: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getCurrentTexture_e8a9a61398a831a1: function() { return handleError(function (arg0) {
            const ret = arg0.getCurrentTexture();
            return ret;
        }, arguments); },
        __wbg_getExtension_30c10f49f67eb05d: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getMappedRange_f8c63a57e1268e4b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getMappedRange(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_getParameter_4c67158a3cef7a34: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getParameter(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getParameter_7fbe79a0114e119f: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getParameter(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getPreferredCanvasFormat_8b57039d1801a506: function(arg0) {
            const ret = arg0.getPreferredCanvasFormat();
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 102) - 1;
        },
        __wbg_getProgramInfoLog_01799fd7b07b7f3c: function(arg0, arg1, arg2) {
            const ret = arg1.getProgramInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getProgramInfoLog_92d61551e1ab39ea: function(arg0, arg1, arg2) {
            const ret = arg1.getProgramInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getProgramParameter_1e7562e7d66170c3: function(arg0, arg1, arg2) {
            const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getProgramParameter_3edd526f9e5f6c10: function(arg0, arg1, arg2) {
            const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_getRandomValues_5af07e81d3f17bd6: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getRandomValues_5d8c030b527203a6: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getShaderInfoLog_3cfe5b3e097d0f2d: function(arg0, arg1, arg2) {
            const ret = arg1.getShaderInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getShaderInfoLog_8758e8aea7960121: function(arg0, arg1, arg2) {
            const ret = arg1.getShaderInfoLog(arg2);
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_getSupportedExtensions_f48b337512e8f8ce: function(arg0) {
            const ret = arg0.getSupportedExtensions();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getUniformLocation_6352e0669c8f5393: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getUniformLocation_e0d11c86376cdd26: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_0c55869fe53c7d14: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_2080c49015e35254: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_635eea311fa1a291: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_d7176cfb76d71114: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_ff57aa2f75d9456b: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_unchecked_e6325ad374eff861: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_with_ref_key_c9e710b1473229f6: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_get_with_ref_key_fc601247060b7204: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_gpu_e058e0d4226b6ad9: function(arg0) {
            const ret = arg0.gpu;
            return ret;
        },
        __wbg_has_0c97053e877f47cc: function(arg0, arg1, arg2) {
            const ret = arg0.has(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_has_2c4d5cf25ec8c1cf: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_height_a587c99454238459: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_info_166f8675cbf261b8: function(arg0) {
            const ret = arg0.info;
            return ret;
        },
        __wbg_info_ef9e889444913d2f: function(arg0) {
            console.info(arg0);
        },
        __wbg_innerHeight_63bad5524492f70a: function() { return handleError(function (arg0) {
            const ret = arg0.innerHeight;
            return ret;
        }, arguments); },
        __wbg_innerWidth_3bc249efddc56481: function() { return handleError(function (arg0) {
            const ret = arg0.innerWidth;
            return ret;
        }, arguments); },
        __wbg_instanceof_ArrayBuffer_12cdaa4161423e6b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuOutOfMemoryError_8ae000311acd3c96: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUOutOfMemoryError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuValidationError_a5ae06cf97b1e648: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUValidationError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlVideoElement_64f13b58baf30810: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLVideoElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageBitmap_536fdba57df2c6ac: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ImageBitmap;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_5b0b4f7f1daeae51: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_d7aeb0dcb3108fea: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WebGl2RenderingContext_de6feb460369d6c6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebGL2RenderingContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_5cf453f5639aa1a2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_invalidateFramebuffer_33206c632642a1bd: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
        }, arguments); },
        __wbg_isArray_bcf1376d0d732d08: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isFallbackAdapter_10204c602a8b8ce0: function(arg0) {
            const ret = arg0.isFallbackAdapter;
            return ret;
        },
        __wbg_isSafeInteger_1a35ba4d31e71d38: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_iterator_e4c5e8f68ada7b58: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_label_36559528632f5c02: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_length_186163212ffe79c3: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_b03a0fabb109b1e9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_c702d06d28b96b72: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_limits_004e9b9176e42b5a: function(arg0) {
            const ret = arg0.limits;
            return ret;
        },
        __wbg_limits_e31d779796c3ee27: function(arg0) {
            const ret = arg0.limits;
            return ret;
        },
        __wbg_linkProgram_99848b73f1ebab5f: function(arg0, arg1) {
            arg0.linkProgram(arg1);
        },
        __wbg_linkProgram_dee7cda98bacb12f: function(arg0, arg1) {
            arg0.linkProgram(arg1);
        },
        __wbg_loadImageFromUrl_50be99dbf040255b: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                const ret = loadImageFromUrl(getStringFromWasm0(arg0, arg1));
                return ret;
            } finally {
                wasm.__wbindgen_export3(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_loadVideoFromUrl_7997ffb030d4b08b: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                const ret = loadVideoFromUrl(getStringFromWasm0(arg0, arg1));
                return ret;
            } finally {
                wasm.__wbindgen_export3(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_location_7320782274fc691b: function(arg0) {
            const ret = arg0.location;
            return ret;
        },
        __wbg_log_ff86bbb34c295e21: function(arg0) {
            console.log(arg0);
        },
        __wbg_lost_83c927e8629f0968: function(arg0) {
            const ret = arg0.lost;
            return ret;
        },
        __wbg_mapAsync_52b01fa9e8f765fd: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
            return ret;
        },
        __wbg_maxBindGroupsPlusVertexBuffers_69cb88a30b370f22: function(arg0) {
            const ret = arg0.maxBindGroupsPlusVertexBuffers;
            return ret;
        },
        __wbg_maxBindGroups_5349434f04dfe574: function(arg0) {
            const ret = arg0.maxBindGroups;
            return ret;
        },
        __wbg_maxBindingsPerBindGroup_e5abb97f3633e3e2: function(arg0) {
            const ret = arg0.maxBindingsPerBindGroup;
            return ret;
        },
        __wbg_maxBufferSize_f98e2db09a228def: function(arg0) {
            const ret = arg0.maxBufferSize;
            return ret;
        },
        __wbg_maxColorAttachmentBytesPerSample_168d239d0758170c: function(arg0) {
            const ret = arg0.maxColorAttachmentBytesPerSample;
            return ret;
        },
        __wbg_maxColorAttachments_cadaa65e5d5418c0: function(arg0) {
            const ret = arg0.maxColorAttachments;
            return ret;
        },
        __wbg_maxComputeInvocationsPerWorkgroup_50f5f93641dd75f6: function(arg0) {
            const ret = arg0.maxComputeInvocationsPerWorkgroup;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeX_3c3bd0b6d623cf60: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeX;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeY_20d139a1ff9fb647: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeY;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeZ_e52391c32200733c: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeZ;
            return ret;
        },
        __wbg_maxComputeWorkgroupStorageSize_251ef2439d10f56a: function(arg0) {
            const ret = arg0.maxComputeWorkgroupStorageSize;
            return ret;
        },
        __wbg_maxComputeWorkgroupsPerDimension_d236d7ce817aa30a: function(arg0) {
            const ret = arg0.maxComputeWorkgroupsPerDimension;
            return ret;
        },
        __wbg_maxDynamicStorageBuffersPerPipelineLayout_57ef8577fcb28389: function(arg0) {
            const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxDynamicUniformBuffersPerPipelineLayout_dff4af4418fb000f: function(arg0) {
            const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxInterStageShaderVariables_3f6e16b309a04a3b: function(arg0) {
            const ret = arg0.maxInterStageShaderVariables;
            return ret;
        },
        __wbg_maxSampledTexturesPerShaderStage_c37c627cf5627f7b: function(arg0) {
            const ret = arg0.maxSampledTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxSamplersPerShaderStage_0bbc3266ffd62c7a: function(arg0) {
            const ret = arg0.maxSamplersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageBufferBindingSize_dbd810e2b1429e9e: function(arg0) {
            const ret = arg0.maxStorageBufferBindingSize;
            return ret;
        },
        __wbg_maxStorageBuffersPerShaderStage_9cb5ad869bdf5e70: function(arg0) {
            const ret = arg0.maxStorageBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageTexturesPerShaderStage_5ffcf5ffbee340da: function(arg0) {
            const ret = arg0.maxStorageTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxTextureArrayLayers_6c0ca4e58060a6d0: function(arg0) {
            const ret = arg0.maxTextureArrayLayers;
            return ret;
        },
        __wbg_maxTextureDimension1D_56bf564ae9425b84: function(arg0) {
            const ret = arg0.maxTextureDimension1D;
            return ret;
        },
        __wbg_maxTextureDimension2D_881bb516c9fc7101: function(arg0) {
            const ret = arg0.maxTextureDimension2D;
            return ret;
        },
        __wbg_maxTextureDimension3D_d6c0d2ae3fae66c7: function(arg0) {
            const ret = arg0.maxTextureDimension3D;
            return ret;
        },
        __wbg_maxUniformBufferBindingSize_68dcfbeb2a7d904f: function(arg0) {
            const ret = arg0.maxUniformBufferBindingSize;
            return ret;
        },
        __wbg_maxUniformBuffersPerShaderStage_f63870e64b1ccfe8: function(arg0) {
            const ret = arg0.maxUniformBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxVertexAttributes_a88dee81cc8d8d34: function(arg0) {
            const ret = arg0.maxVertexAttributes;
            return ret;
        },
        __wbg_maxVertexBufferArrayStride_ed14769769bead3e: function(arg0) {
            const ret = arg0.maxVertexBufferArrayStride;
            return ret;
        },
        __wbg_maxVertexBuffers_18328b6e2bcccea5: function(arg0) {
            const ret = arg0.maxVertexBuffers;
            return ret;
        },
        __wbg_message_4c75c59aa4f38c75: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_message_7edc18bf257de1a4: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_minStorageBufferOffsetAlignment_2a758f06e9ae6048: function(arg0) {
            const ret = arg0.minStorageBufferOffsetAlignment;
            return ret;
        },
        __wbg_minUniformBufferOffsetAlignment_56a700cb14852d0b: function(arg0) {
            const ret = arg0.minUniformBufferOffsetAlignment;
            return ret;
        },
        __wbg_name_52bccd784c3d27a8: function(arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_name_fd11f69c917c5670: function(arg0) {
            const ret = arg0.name;
            return ret;
        },
        __wbg_navigator_9641ab32fa612dd1: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_navigator_c17f443a6fe5d38d: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_new_13de428334042d26: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_2bfd0f45e60518b1: function() { return handleError(function (arg0, arg1) {
            const ret = new OffscreenCanvas(arg0 >>> 0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_37eb45aaf5eeb820: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_ba40181b3f24ac80: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wasm_bindgen_func_elem_14919(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_bb74001155cb8ca8: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_cd4348290afae586: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_from_slice_3512352010266e02: function(arg0, arg1) {
            const ret = new Uint32Array(getArrayU32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_355c10c5d8f2addb: function(arg0, arg1) {
            const ret = new Float32Array(getArrayF32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_aaf85a9746711968: function(arg0, arg1) {
            const ret = new Float64Array(getArrayF64FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_b8daf545a41c6aa0: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_typed_6b60b99917da27d6: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_typed_e09da9dae6ee5935: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wasm_bindgen_func_elem_14919(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_byte_offset_and_length_3cd32055a417f095: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_length_01b143a7e5dd5a3e: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_07edd8a7019b8c30: function(arg0) {
            const ret = new Float64Array(arg0 >>> 0);
            return ret;
        },
        __wbg_next_178c1651c11432b3: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_next_af5ac6a08bb0a717: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_now_043d245551b22f9c: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_of_027eb15371aac932: function(arg0) {
            const ret = Array.of(arg0);
            return ret;
        },
        __wbg_ok_670a05555db5f713: function(arg0) {
            const ret = arg0.ok;
            return ret;
        },
        __wbg_onSubmittedWorkDone_270d6b5a45520e79: function(arg0) {
            const ret = arg0.onSubmittedWorkDone();
            return ret;
        },
        __wbg_open_25109992994e4492: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_open_df8f03ea7b6074f9: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_ownKeys_c9890d5405932253: function() { return handleError(function (arg0) {
            const ret = Reflect.ownKeys(arg0);
            return ret;
        }, arguments); },
        __wbg_pause_35cb701edb524778: function() { return handleError(function (arg0) {
            arg0.pause();
        }, arguments); },
        __wbg_performance_50e6a3f8dc80bbca: function(arg0) {
            const ret = arg0.performance;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_pixelStorei_43dc7945a0d4d49c: function(arg0, arg1, arg2) {
            arg0.pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_pixelStorei_6dd56b4da047c480: function(arg0, arg1, arg2) {
            arg0.pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_play_26a96ac37b543ddc: function() { return handleError(function (arg0) {
            const ret = arg0.play();
            return ret;
        }, arguments); },
        __wbg_popErrorScope_8e7f4cbff8b758dd: function(arg0) {
            const ret = arg0.popErrorScope();
            return ret;
        },
        __wbg_prototypesetcall_13162965d1fe7aa3: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_4aea6470234c8414: function(arg0, arg1, arg2) {
            Uint32Array.prototype.set.call(getArrayU32FromWasm0(arg0, arg1), arg2);
        },
        __wbg_provokingVertexWEBGL_82182e07e660bfa9: function(arg0, arg1) {
            arg0.provokingVertexWEBGL(arg1 >>> 0);
        },
        __wbg_pushErrorScope_fa23d1206bc26dce: function(arg0, arg1) {
            arg0.pushErrorScope(__wbindgen_enum_GpuErrorFilter[arg1]);
        },
        __wbg_push_c9f4893fc209f768: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_querySelectorAll_6c1bd81d448fb480: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_queueMicrotask_1e8503a8a690f0a3: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_queueMicrotask_4a1a4d8dd332373b: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queue_7a77200c3739a9e0: function(arg0) {
            const ret = arg0.queue;
            return ret;
        },
        __wbg_readBuffer_49d4b278b9838d40: function(arg0, arg1) {
            arg0.readBuffer(arg1 >>> 0);
        },
        __wbg_readPixels_22316d250d820aff: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readPixels_56a96c4d106afcbc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readPixels_7c7b54a733248182: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readyState_38109b2408eb7368: function(arg0) {
            const ret = arg0.readyState;
            return ret;
        },
        __wbg_reason_f6ee0d33e9bd555d: function(arg0) {
            const ret = arg0.reason;
            return (__wbindgen_enum_GpuDeviceLostReason.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_renderbufferStorageMultisample_d5b01825cc08514b: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_renderbufferStorage_0d080ee86520d3bd: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
        },
        __wbg_renderbufferStorage_ebe429f577dae949: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
        },
        __wbg_requestAdapter_2e6718811c735a57: function(arg0, arg1) {
            const ret = arg0.requestAdapter(arg1);
            return ret;
        },
        __wbg_requestDevice_ab46d0519ea1cc34: function(arg0, arg1) {
            const ret = arg0.requestDevice(arg1);
            return ret;
        },
        __wbg_resolveQuerySet_0f32dc3de3f09701: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.resolveQuerySet(arg1, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
        },
        __wbg_resolve_dbf78ab4942478b0: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_scissor_17956d9d23dfe025: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_scissor_bb7201f050f220ac: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_setBindGroup_321201b16f238e6e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_c22a1b95c0b17f37: function(arg0, arg1, arg2) {
            arg0.setBindGroup(arg1 >>> 0, arg2);
        },
        __wbg_setBindGroup_ce0fb34a09a7f575: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_f0de6cb2c7dbfc2c: function(arg0, arg1, arg2) {
            arg0.setBindGroup(arg1 >>> 0, arg2);
        },
        __wbg_setIndexBuffer_2531a9103450445e: function(arg0, arg1, arg2, arg3) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
        },
        __wbg_setIndexBuffer_7f3cf667b4d71566: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
        },
        __wbg_setPipeline_c41bf46790f27f9e: function(arg0, arg1) {
            arg0.setPipeline(arg1);
        },
        __wbg_setPipeline_d73f019e98c76d2d: function(arg0, arg1) {
            arg0.setPipeline(arg1);
        },
        __wbg_setStencilReference_66c74be6232bb9da: function(arg0, arg1) {
            arg0.setStencilReference(arg1 >>> 0);
        },
        __wbg_setTimeout_9ef22b48643bd7de: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setVertexBuffer_1e448859663dd400: function(arg0, arg1, arg2, arg3) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
        },
        __wbg_setVertexBuffer_7cf533d694e747f3: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
        },
        __wbg_setViewport_d9fc3eac343de7d0: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setViewport(arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_set_118fefd528ab0a79: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_1df39e5baa0fbe5a: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_set_2793479888329cb6: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_a_25fd56c334b361f6: function(arg0, arg1) {
            arg0.a = arg1;
        },
        __wbg_set_access_ddf5bc1142da753c: function(arg0, arg1) {
            arg0.access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
        },
        __wbg_set_address_mode_u_2e3339d942d1d816: function(arg0, arg1) {
            arg0.addressModeU = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_address_mode_v_bb71ed7a1ee3082c: function(arg0, arg1) {
            arg0.addressModeV = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_address_mode_w_20c15a3757d35eae: function(arg0, arg1) {
            arg0.addressModeW = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_alpha_9763c7a5009aa55d: function(arg0, arg1) {
            arg0.alpha = arg1;
        },
        __wbg_set_alpha_mode_3d05a2ae7e7155a3: function(arg0, arg1) {
            arg0.alphaMode = __wbindgen_enum_GpuCanvasAlphaMode[arg1];
        },
        __wbg_set_alpha_to_coverage_enabled_a27f32ce5bb1520c: function(arg0, arg1) {
            arg0.alphaToCoverageEnabled = arg1 !== 0;
        },
        __wbg_set_array_layer_count_bb1314af7ba2adf6: function(arg0, arg1) {
            arg0.arrayLayerCount = arg1 >>> 0;
        },
        __wbg_set_array_stride_f64_d6b4b9e1093ecd7b: function(arg0, arg1) {
            arg0.arrayStride = arg1;
        },
        __wbg_set_aspect_18f77453fcc2d25b: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_220220c02f709e59: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_2d19eb9adfc79353: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_attributes_342352ab85ea64c7: function(arg0, arg1, arg2) {
            arg0.attributes = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_b_910ba843232bed0c: function(arg0, arg1) {
            arg0.b = arg1;
        },
        __wbg_set_base_array_layer_21ec4d44eff4ef84: function(arg0, arg1) {
            arg0.baseArrayLayer = arg1 >>> 0;
        },
        __wbg_set_base_mip_level_55b25b38ea34513e: function(arg0, arg1) {
            arg0.baseMipLevel = arg1 >>> 0;
        },
        __wbg_set_beginning_of_pass_write_index_403a66d3c41accff: function(arg0, arg1) {
            arg0.beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_beginning_of_pass_write_index_a38c1eb301f5ffbc: function(arg0, arg1) {
            arg0.beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_bind_group_layouts_bf0107d2b88d66de: function(arg0, arg1, arg2) {
            arg0.bindGroupLayouts = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_binding_d62e109966e563ec: function(arg0, arg1) {
            arg0.binding = arg1 >>> 0;
        },
        __wbg_set_binding_ed47acf725936562: function(arg0, arg1) {
            arg0.binding = arg1 >>> 0;
        },
        __wbg_set_blend_dbc72004efbd3982: function(arg0, arg1) {
            arg0.blend = arg1;
        },
        __wbg_set_buffer_16467db3b91a9b71: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffer_1e9e10792fa1b998: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffer_a9e5b3bb7e3a10bc: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffers_5ff78e4e9c8a6ad9: function(arg0, arg1, arg2) {
            arg0.buffers = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_bytes_per_row_2634ef64a0d8d5f1: function(arg0, arg1) {
            arg0.bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_bytes_per_row_dbe2e934185dd540: function(arg0, arg1) {
            arg0.bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_clear_value_gpu_color_dict_7eb6ffb20ec36ead: function(arg0, arg1) {
            arg0.clearValue = arg1;
        },
        __wbg_set_code_637630b8d31cb7b4: function(arg0, arg1, arg2) {
            arg0.code = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_color_7a94f5ece7e288d0: function(arg0, arg1) {
            arg0.color = arg1;
        },
        __wbg_set_color_attachments_9e5df5092865dbb1: function(arg0, arg1, arg2) {
            arg0.colorAttachments = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_compare_0421b2a0208812ee: function(arg0, arg1) {
            arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_compare_10026fe17cc62aef: function(arg0, arg1) {
            arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_compute_1f4b847c9c2427da: function(arg0, arg1) {
            arg0.compute = arg1;
        },
        __wbg_set_count_630ce5a883ff9d36: function(arg0, arg1) {
            arg0.count = arg1 >>> 0;
        },
        __wbg_set_count_7105c52dd294a5c6: function(arg0, arg1) {
            arg0.count = arg1 >>> 0;
        },
        __wbg_set_cull_mode_5ce7e63a5f1d8684: function(arg0, arg1) {
            arg0.cullMode = __wbindgen_enum_GpuCullMode[arg1];
        },
        __wbg_set_currentTime_394068ede1cd71d4: function(arg0, arg1) {
            arg0.currentTime = arg1;
        },
        __wbg_set_depth_bias_928f0d61c2d20b7e: function(arg0, arg1) {
            arg0.depthBias = arg1;
        },
        __wbg_set_depth_bias_clamp_b9f088fc47d72113: function(arg0, arg1) {
            arg0.depthBiasClamp = arg1;
        },
        __wbg_set_depth_bias_slope_scale_1e50fde5cae9c677: function(arg0, arg1) {
            arg0.depthBiasSlopeScale = arg1;
        },
        __wbg_set_depth_clear_value_73e1965c57cb9097: function(arg0, arg1) {
            arg0.depthClearValue = arg1;
        },
        __wbg_set_depth_compare_b45878c8b844cf85: function(arg0, arg1) {
            arg0.depthCompare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_depth_fail_op_3823397c0cb4668c: function(arg0, arg1) {
            arg0.depthFailOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_depth_load_op_fa3bc4511290bdeb: function(arg0, arg1) {
            arg0.depthLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_depth_or_array_layers_a01b4cb1a712d7cf: function(arg0, arg1) {
            arg0.depthOrArrayLayers = arg1 >>> 0;
        },
        __wbg_set_depth_read_only_14a1fca20e360f8b: function(arg0, arg1) {
            arg0.depthReadOnly = arg1 !== 0;
        },
        __wbg_set_depth_stencil_attachment_5298ae1194cbb059: function(arg0, arg1) {
            arg0.depthStencilAttachment = arg1;
        },
        __wbg_set_depth_stencil_fb9864acd2052ec0: function(arg0, arg1) {
            arg0.depthStencil = arg1;
        },
        __wbg_set_depth_store_op_8fa805a3a2112715: function(arg0, arg1) {
            arg0.depthStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_depth_write_enabled_efe384a193a890e2: function(arg0, arg1) {
            arg0.depthWriteEnabled = arg1 !== 0;
        },
        __wbg_set_device_67621191a95d153f: function(arg0, arg1) {
            arg0.device = arg1;
        },
        __wbg_set_dimension_1c263c711333ab28: function(arg0, arg1) {
            arg0.dimension = __wbindgen_enum_GpuTextureDimension[arg1];
        },
        __wbg_set_dimension_6dec042632b18d39: function(arg0, arg1) {
            arg0.dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_drawing_buffer_color_space_a927bb13b75520b6: function(arg0, arg1, arg2) {
            arg0.drawingBufferColorSpace = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_dst_factor_17dc5757348f4e8c: function(arg0, arg1) {
            arg0.dstFactor = __wbindgen_enum_GpuBlendFactor[arg1];
        },
        __wbg_set_end_of_pass_write_index_039c673eb97c1b17: function(arg0, arg1) {
            arg0.endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_end_of_pass_write_index_a0e3eb1a7d8089e2: function(arg0, arg1) {
            arg0.endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_entries_bc9933019fb72023: function(arg0, arg1, arg2) {
            arg0.entries = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_entries_dda5610305831fc4: function(arg0, arg1, arg2) {
            arg0.entries = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_4e13637145b86de8: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_e8391bcc627bfd7a: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_fc7b5eb7d2f51f8d: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_external_texture_eb0ec97ea384a27f: function(arg0, arg1) {
            arg0.externalTexture = arg1;
        },
        __wbg_set_fail_op_0d594a84c500382c: function(arg0, arg1) {
            arg0.failOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_feb3714f475485ba: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_flip_y_4904413642af0332: function(arg0, arg1) {
            arg0.flipY = arg1 !== 0;
        },
        __wbg_set_format_2533d499e6a6576a: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_35213fd1a55af90b: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_3f132b447eacf268: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuVertexFormat[arg1];
        },
        __wbg_set_format_88e217388ce12466: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_970667cfa8e78ff0: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_a9419838bd932fa3: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_ee8c52e81d585b82: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_fragment_ada8bef562cbbbf0: function(arg0, arg1) {
            arg0.fragment = arg1;
        },
        __wbg_set_front_face_8f76f64ecaba04ec: function(arg0, arg1) {
            arg0.frontFace = __wbindgen_enum_GpuFrontFace[arg1];
        },
        __wbg_set_g_6ac06c1cd7780fb1: function(arg0, arg1) {
            arg0.g = arg1;
        },
        __wbg_set_has_dynamic_offset_8f837a860cb3ee15: function(arg0, arg1) {
            arg0.hasDynamicOffset = arg1 !== 0;
        },
        __wbg_set_height_ae0610d318c3428c: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_ae24c2f7d580ae0a: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_d7334962b8c2e40a: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_label_32e62c8eccad8454: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_3523c65da040a1f6: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_511773c4cc798bb4: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5847b0c1fdf05193: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5e943103caf16279: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_736dd61ff4b9916f: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_77f8bc1cc68ff026: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_82d22e30c4229277: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_b3f9c9ca506e9194: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_bf9328689f43830c: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_bfb14af009ce5e1e: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_d81ddd0687910f84: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_e402ec5de663f45b: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_efbe5fde122ea186: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_f4fa245a715d9069: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_fd93ddd34066b39a: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_layout_0220366f82dddb2f: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_279c18d2dcccd30c: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_3322348438535672: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_gpu_auto_layout_mode_54aab1b19ae2aec2: function(arg0, arg1) {
            arg0.layout = __wbindgen_enum_GpuAutoLayoutMode[arg1];
        },
        __wbg_set_layout_gpu_auto_layout_mode_76d6261989700e8e: function(arg0, arg1) {
            arg0.layout = __wbindgen_enum_GpuAutoLayoutMode[arg1];
        },
        __wbg_set_load_op_2f2ab9d352e4088d: function(arg0, arg1) {
            arg0.loadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_lod_max_clamp_5f643360ed4d6f69: function(arg0, arg1) {
            arg0.lodMaxClamp = arg1;
        },
        __wbg_set_lod_min_clamp_b0f1ed9b824f91ae: function(arg0, arg1) {
            arg0.lodMinClamp = arg1;
        },
        __wbg_set_loop_d9bbf869a2402fb8: function(arg0, arg1) {
            arg0.loop = arg1 !== 0;
        },
        __wbg_set_mag_filter_5e6d164e0727893b: function(arg0, arg1) {
            arg0.magFilter = __wbindgen_enum_GpuFilterMode[arg1];
        },
        __wbg_set_mapped_at_creation_c4a4f1182236bbc1: function(arg0, arg1) {
            arg0.mappedAtCreation = arg1 !== 0;
        },
        __wbg_set_mask_32d69aa23974b37a: function(arg0, arg1) {
            arg0.mask = arg1 >>> 0;
        },
        __wbg_set_max_anisotropy_ea0bfd586ff6bf1b: function(arg0, arg1) {
            arg0.maxAnisotropy = arg1;
        },
        __wbg_set_method_639e69af35614d36: function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_min_binding_size_f64_22199885684ea4fe: function(arg0, arg1) {
            arg0.minBindingSize = arg1;
        },
        __wbg_set_min_filter_577b643a9c37edb1: function(arg0, arg1) {
            arg0.minFilter = __wbindgen_enum_GpuFilterMode[arg1];
        },
        __wbg_set_mip_level_17a4055d5b968ae1: function(arg0, arg1) {
            arg0.mipLevel = arg1 >>> 0;
        },
        __wbg_set_mip_level_bd6181e018deb81f: function(arg0, arg1) {
            arg0.mipLevel = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_3c23fd442389a059: function(arg0, arg1) {
            arg0.mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_59b5798d09a533f5: function(arg0, arg1) {
            arg0.mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mipmap_filter_63c2b7912dfa21ae: function(arg0, arg1) {
            arg0.mipmapFilter = __wbindgen_enum_GpuMipmapFilterMode[arg1];
        },
        __wbg_set_mode_07e051ad8b4e2126: function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_RequestMode[arg1];
        },
        __wbg_set_mode_d9a5ac8ae2a0d68d: function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_GpuCanvasToneMappingMode[arg1];
        },
        __wbg_set_module_2f90ce6c7718a2a6: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_module_5f7233cffe195628: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_module_b3fc342e86148265: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_multisample_76e8f45b4ada1f3a: function(arg0, arg1) {
            arg0.multisample = arg1;
        },
        __wbg_set_multisampled_70aab13c32c1a87a: function(arg0, arg1) {
            arg0.multisampled = arg1 !== 0;
        },
        __wbg_set_muted_d288b35e5b608c31: function(arg0, arg1) {
            arg0.muted = arg1 !== 0;
        },
        __wbg_set_offset_f64_1f0b71977a07be8f: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_f64_1f266e993a6ca5bd: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_f64_23f7bf7cddeacee2: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_f64_838b5c0d752ca796: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_once_ee3e8ed5823add1f: function(arg0, arg1) {
            arg0.once = arg1 !== 0;
        },
        __wbg_set_operation_1d7c7ed02f3d8e82: function(arg0, arg1) {
            arg0.operation = __wbindgen_enum_GpuBlendOperation[arg1];
        },
        __wbg_set_origin_gpu_origin_2d_dict_20beb4846d85a3fd: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_origin_gpu_origin_3d_dict_0898da455eccfaa8: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_origin_gpu_origin_3d_dict_18d6e07161f16ee6: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_pass_op_b24fa44077ba1797: function(arg0, arg1) {
            arg0.passOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_power_preference_7a817796c62ca83e: function(arg0, arg1) {
            arg0.powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
        },
        __wbg_set_premultiplied_alpha_df7277cf495a2b9f: function(arg0, arg1) {
            arg0.premultipliedAlpha = arg1 !== 0;
        },
        __wbg_set_primitive_ab42ac6bf2686c0a: function(arg0, arg1) {
            arg0.primitive = arg1;
        },
        __wbg_set_query_set_d9ddc9a570b0a62f: function(arg0, arg1) {
            arg0.querySet = arg1;
        },
        __wbg_set_query_set_f081d68f37643e32: function(arg0, arg1) {
            arg0.querySet = arg1;
        },
        __wbg_set_r_2c70c406bf10f4b9: function(arg0, arg1) {
            arg0.r = arg1;
        },
        __wbg_set_required_features_95a49d09051b3efe: function(arg0, arg1, arg2) {
            arg0.requiredFeatures = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_required_limits_19d9b17160f9510e: function(arg0, arg1) {
            arg0.requiredLimits = arg1;
        },
        __wbg_set_resolve_target_gpu_texture_view_b804b29664204f75: function(arg0, arg1) {
            arg0.resolveTarget = arg1;
        },
        __wbg_set_resource_921009b19cab3884: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_resource_gpu_buffer_binding_edc31995170c05cd: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_resource_gpu_texture_view_3b63a2f023735509: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_rows_per_image_89823e09c428d933: function(arg0, arg1) {
            arg0.rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_rows_per_image_dcdda7897b0981a8: function(arg0, arg1) {
            arg0.rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_sample_count_8260338c573fad44: function(arg0, arg1) {
            arg0.sampleCount = arg1 >>> 0;
        },
        __wbg_set_sample_type_bbe4a8b25dd655e3: function(arg0, arg1) {
            arg0.sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
        },
        __wbg_set_sampler_7bc9215bf0c7cba2: function(arg0, arg1) {
            arg0.sampler = arg1;
        },
        __wbg_set_shader_location_a9b065a65cddc988: function(arg0, arg1) {
            arg0.shaderLocation = arg1 >>> 0;
        },
        __wbg_set_size_f64_21e77cbc2ec6e5cb: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_size_f64_22466f3c617cae73: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_size_gpu_extent_3d_dict_45e785abd5e731f1: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_source_dbaab43481410304: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_html_canvas_element_029fc42c4dc4c968: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_html_image_element_a7b79a2bcac41c42: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_html_video_element_f7d35ee38e59c79d: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_image_data_17046c4094344a92: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_offscreen_canvas_2f75e7cf69e76d4c: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_video_frame_f628e62e09edcc4f: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_src_factor_127aa7b4209b16e6: function(arg0, arg1) {
            arg0.srcFactor = __wbindgen_enum_GpuBlendFactor[arg1];
        },
        __wbg_set_stencil_back_0567eacd877f0678: function(arg0, arg1) {
            arg0.stencilBack = arg1;
        },
        __wbg_set_stencil_clear_value_7f767698a156d841: function(arg0, arg1) {
            arg0.stencilClearValue = arg1 >>> 0;
        },
        __wbg_set_stencil_front_efe8f32622a112bf: function(arg0, arg1) {
            arg0.stencilFront = arg1;
        },
        __wbg_set_stencil_load_op_add032c209e9cacf: function(arg0, arg1) {
            arg0.stencilLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_stencil_read_mask_0ac35b5019a62a11: function(arg0, arg1) {
            arg0.stencilReadMask = arg1 >>> 0;
        },
        __wbg_set_stencil_read_only_99fcb05614ddd4b6: function(arg0, arg1) {
            arg0.stencilReadOnly = arg1 !== 0;
        },
        __wbg_set_stencil_store_op_e7cb0b8fdea4aebb: function(arg0, arg1) {
            arg0.stencilStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_stencil_write_mask_12a794da02fe909f: function(arg0, arg1) {
            arg0.stencilWriteMask = arg1 >>> 0;
        },
        __wbg_set_step_mode_f9ff795cc6c810f5: function(arg0, arg1) {
            arg0.stepMode = __wbindgen_enum_GpuVertexStepMode[arg1];
        },
        __wbg_set_storage_texture_cec5aa7837053d08: function(arg0, arg1) {
            arg0.storageTexture = arg1;
        },
        __wbg_set_store_op_591a1abd08613c6c: function(arg0, arg1) {
            arg0.storeOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_strip_index_format_dbad821d7567c23c: function(arg0, arg1) {
            arg0.stripIndexFormat = __wbindgen_enum_GpuIndexFormat[arg1];
        },
        __wbg_set_targets_8f70d76579cedbee: function(arg0, arg1, arg2) {
            arg0.targets = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_texture_0d32608010f8db45: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_texture_ad2e09b8390f1536: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_texture_f6cd9af8c18c4383: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_timestamp_writes_48795eb915d64cc8: function(arg0, arg1) {
            arg0.timestampWrites = arg1;
        },
        __wbg_set_timestamp_writes_a92ce23e47d3c7a9: function(arg0, arg1) {
            arg0.timestampWrites = arg1;
        },
        __wbg_set_tone_mapping_d6a2f7ab4c678a6a: function(arg0, arg1) {
            arg0.toneMapping = arg1;
        },
        __wbg_set_topology_15f02e73ac133259: function(arg0, arg1) {
            arg0.topology = __wbindgen_enum_GpuPrimitiveTopology[arg1];
        },
        __wbg_set_type_13b6d8e98bfc41e4: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuSamplerBindingType[arg1];
        },
        __wbg_set_type_99dfde9ca84e5c0f: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuQueryType[arg1];
        },
        __wbg_set_type_a258902cd2aacc07: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuBufferBindingType[arg1];
        },
        __wbg_set_unclipped_depth_c4ab5f1fb3af1f8c: function(arg0, arg1) {
            arg0.unclippedDepth = arg1 !== 0;
        },
        __wbg_set_unpack_color_space_2b589876d21810f8: function(arg0, arg1, arg2) {
            arg0.unpackColorSpace = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_usage_05dc0ccc989f3ef5: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_9bc666c5370b969b: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_a608d9bb12cfab80: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_fc09a76f83339d1b: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_vertex_6706ba251cf794eb: function(arg0, arg1) {
            arg0.vertex = arg1;
        },
        __wbg_set_view_dimension_06d628317bed5152: function(arg0, arg1) {
            arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_dimension_d96d10b6a6187558: function(arg0, arg1) {
            arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_formats_37b2fb50a8663344: function(arg0, arg1, arg2) {
            arg0.viewFormats = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_view_formats_52aa2653ad77c5f3: function(arg0, arg1, arg2) {
            arg0.viewFormats = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_view_gpu_texture_view_033c23f730814624: function(arg0, arg1) {
            arg0.view = arg1;
        },
        __wbg_set_view_gpu_texture_view_fb3517be78315e4d: function(arg0, arg1) {
            arg0.view = arg1;
        },
        __wbg_set_visibility_c200e52cd4eb51b4: function(arg0, arg1) {
            arg0.visibility = arg1 >>> 0;
        },
        __wbg_set_volume_df841d42ef221858: function(arg0, arg1) {
            arg0.volume = arg1;
        },
        __wbg_set_width_5f89a551b5472887: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_e61fe13191c8c4a6: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_eb3001e1dcabb909: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_write_mask_cba5d1d12c4e3cad: function(arg0, arg1) {
            arg0.writeMask = arg1 >>> 0;
        },
        __wbg_set_x_62c1844cae55f838: function(arg0, arg1) {
            arg0.x = arg1 >>> 0;
        },
        __wbg_set_x_699dd8066e2c813e: function(arg0, arg1) {
            arg0.x = arg1 >>> 0;
        },
        __wbg_set_y_beb3edda7d0de400: function(arg0, arg1) {
            arg0.y = arg1 >>> 0;
        },
        __wbg_set_y_f90f8650ffbdece1: function(arg0, arg1) {
            arg0.y = arg1 >>> 0;
        },
        __wbg_set_z_7f7b74fb39689f38: function(arg0, arg1) {
            arg0.z = arg1 >>> 0;
        },
        __wbg_shaderSource_519d0f56b613b2f9: function(arg0, arg1, arg2, arg3) {
            arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
        },
        __wbg_shaderSource_c4c06a3cbc2e7bf3: function(arg0, arg1, arg2, arg3) {
            arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
        },
        __wbg_size_772812b17f38f9bf: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_src_9b84873af2849565: function(arg0, arg1) {
            const ret = arg1.src;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_stack_575c4e0918581b9c: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_THIS_003ee833af9699fc: function() {
            const ret = typeof globalThis === 'undefined' ? undefined : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_e4293fb22cbe77da: function() {
            const ret = typeof global === 'undefined' ? undefined : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_53bb20457401453d: function() {
            const ret = typeof self === 'undefined' ? undefined : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_b5e0810bfecb7feb: function() {
            const ret = typeof window === 'undefined' ? undefined : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_stencilFunc_46daf5f131c1c9e1: function(arg0, arg1, arg2, arg3) {
            arg0.stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_stencilFunc_4eff2293c1db9e2b: function(arg0, arg1, arg2, arg3) {
            arg0.stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_stencilOp_7b7cd344e58c9244: function(arg0, arg1, arg2, arg3) {
            arg0.stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_stencilOp_8303d59486f93ed5: function(arg0, arg1, arg2, arg3) {
            arg0.stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_subgroupMaxSize_a83c7e32d6dfdac5: function(arg0) {
            const ret = arg0.subgroupMaxSize;
            return ret;
        },
        __wbg_subgroupMinSize_6d35168d9f0ccfb9: function(arg0) {
            const ret = arg0.subgroupMinSize;
            return ret;
        },
        __wbg_submit_ce44115121cd166c: function(arg0, arg1, arg2) {
            arg0.submit(getArrayJsValueViewFromWasm0(arg1, arg2));
        },
        __wbg_texImage2D_20b5002326193fe6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_29e073330256c756: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, arg6);
        }, arguments); },
        __wbg_texImage2D_2e982169a06298a4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, arg6);
        }, arguments); },
        __wbg_texImage2D_5048d2cd8540da16: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_84bdef619a1ea935: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_b9d5862aa9d40a5e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, arg6);
        }, arguments); },
        __wbg_texImage2D_bcf41cdaf248aac4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, arg6);
        }, arguments); },
        __wbg_texParameteri_0afc5d515132fed2: function(arg0, arg1, arg2, arg3) {
            arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texParameteri_e24e4fdc17153838: function(arg0, arg1, arg2, arg3) {
            arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texStorage2D_e0ebb5940fa1fc5e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_texSubImage2D_4343af4633b8b8f8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_4aef07460a86c81e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_a26a8700e734449a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_cf20b3d331b9369e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_texSubImage2D_d16e27bfab9aa28d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_then_3a4f899454bcf8c9: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_then_656f253a5dd7d8ea: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_e3f7f2d365708be8: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_toString_55ffdf586349746b: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_type_9c887dd8c3d0ba23: function(arg0) {
            const ret = arg0.type;
            return ret;
        },
        __wbg_unconfigure_0a07a0a40de8988d: function(arg0) {
            arg0.unconfigure();
        },
        __wbg_uniform1f_0b36dc15cb2b4991: function(arg0, arg1, arg2) {
            arg0.uniform1f(arg1, arg2);
        },
        __wbg_uniform1f_fe417acc7c7a1dc5: function(arg0, arg1, arg2) {
            arg0.uniform1f(arg1, arg2);
        },
        __wbg_uniform1fv_19f7e96820e32a42: function(arg0, arg1, arg2, arg3) {
            arg0.uniform1fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform1fv_a71814c5c9b8550c: function(arg0, arg1, arg2, arg3) {
            arg0.uniform1fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform1i_385ebc488d4d763f: function(arg0, arg1, arg2) {
            arg0.uniform1i(arg1, arg2);
        },
        __wbg_uniform1i_778a02a48ecdceed: function(arg0, arg1, arg2) {
            arg0.uniform1i(arg1, arg2);
        },
        __wbg_uniform1ui_79071fccd0396b88: function(arg0, arg1, arg2) {
            arg0.uniform1ui(arg1, arg2 >>> 0);
        },
        __wbg_uniform2f_6bd82d6e7f81060b: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2f(arg1, arg2, arg3);
        },
        __wbg_uniform2f_7e4c627c4106dd3f: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2f(arg1, arg2, arg3);
        },
        __wbg_uniform2fv_486658e6bcddfbaf: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2fv_71fe605c72879b61: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2i_6a4b371f1eaad138: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2i(arg1, arg2, arg3);
        },
        __wbg_uniform2i_8ac27a406bbc816d: function(arg0, arg1, arg2, arg3) {
            arg0.uniform2i(arg1, arg2, arg3);
        },
        __wbg_uniform3f_6f94179d13a10f48: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniform3f(arg1, arg2, arg3, arg4);
        },
        __wbg_uniform3f_b9f8bdb406b70135: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniform3f(arg1, arg2, arg3, arg4);
        },
        __wbg_uniform4f_14a3638afe93aa8f: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_uniform4f_5c31fb6dab645ad8: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_uniformMatrix3fv_15b2b1f5505b8506: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3fv_df1958f8b617c8d6: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3x2fv_6730abc8ef13d7d3: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4fv_cd0ba72d1d780759: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4fv_edd2b51dbb1caffd: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4x3fv_b6f9b241f392f245: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_unmap_adaf93276fdf9aaf: function(arg0) {
            arg0.unmap();
        },
        __wbg_useProgram_d9c24a7d8632c4c1: function(arg0, arg1) {
            arg0.useProgram(arg1);
        },
        __wbg_useProgram_f6341ea2eeea1e5a: function(arg0, arg1) {
            arg0.useProgram(arg1);
        },
        __wbg_userAgent_a20b4771d027eeaa: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_valueOf_6db341d77a0b1da4: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_value_e0f328965e184931: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_vertexAttrib4f_2e912ec96b05f4d2: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.vertexAttrib4f(arg1 >>> 0, arg2, arg3, arg4, arg5);
        },
        __wbg_vertexAttrib4f_f5d55b54cd5e7da9: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.vertexAttrib4f(arg1 >>> 0, arg2, arg3, arg4, arg5);
        },
        __wbg_vertexAttribIPointer_a6240b64263fb63b: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_vertexAttribPointer_39b706eb26c50057: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_vertexAttribPointer_9e0e4517b8d274bd: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_videoHeight_0d108b7f03cde4ef: function(arg0) {
            const ret = arg0.videoHeight;
            return ret;
        },
        __wbg_videoWidth_34b4e257cb35c6ca: function(arg0) {
            const ret = arg0.videoWidth;
            return ret;
        },
        __wbg_viewport_aaac6dd8cff1831a: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_viewport_cdae9e8b2f33343d: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_warn_228ff2257384d295: function(arg0) {
            console.warn(arg0);
        },
        __wbg_width_f84552448726a9a9: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_writeTexture_ddf1f089a7ceba85: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeTexture(arg1, getArrayU8FromWasm0(arg2, arg3), arg4, arg5);
        }, arguments); },
        __wbindgen_generic_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1049, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_14917);
            return ret;
        },
        __wbindgen_generic_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 35, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_5557);
            return ret;
        },
        __wbindgen_generic_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUComputePipeline")], shim_idx: 936, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11905);
            return ret;
        },
        __wbindgen_generic_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUDevice")], shim_idx: 936, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11905_171);
            return ret;
        },
        __wbindgen_generic_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUDeviceLostInfo")], shim_idx: 937, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11906);
            return ret;
        },
        __wbindgen_generic_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPURenderPipeline")], shim_idx: 936, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11905_173);
            return ret;
        },
        __wbindgen_generic_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("any")], shim_idx: 936, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11905_174);
            return ret;
        },
        __wbindgen_generic_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("undefined")], shim_idx: 936, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11905_175);
            return ret;
        },
        __wbindgen_generic_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1032, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_13268);
            return ret;
        },
        __wbindgen_generic_000000000000000a: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_generic_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
            const ret = getArrayF32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000c: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I16)) -> NamedExternref("Int16Array")`.
            const ret = getArrayI16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000d: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I32)) -> NamedExternref("Int32Array")`.
            const ret = getArrayI32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000e: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I8)) -> NamedExternref("Int8Array")`.
            const ret = getArrayI8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_000000000000000f: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U16)) -> NamedExternref("Uint16Array")`.
            const ret = getArrayU16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_0000000000000010: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
            const ret = getArrayU32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_0000000000000011: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_0000000000000012: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_generic_0000000000000013: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_generic_0000000000000014: function(arg0, arg1) {
            var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_export3(arg0, arg1 * 1, 1);
            // Cast intrinsic for `Vector(U8) -> Externref`.
            const ret = v0;
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            table.set(0, undefined);
            table.set(1024, undefined);
            table.set(1025, null);
            table.set(1026, true);
            table.set(1027, false);
        },
    };
    return {
        __proto__: null,
        "./hana_bg.js": import0,
        "./snippets/hana-82e9eb82a79dead4/js-imports.js": import1,
        "./snippets/hana-82e9eb82a79dead4/js-imports.js": import2,
        "./snippets/hana-82e9eb82a79dead4/js-imports.js": import3,
        "./snippets/hana-82e9eb82a79dead4/js-imports.js": import4,
    };
}

function __wasm_bindgen_func_elem_13268(arg0, arg1) {
    wasm.__wasm_bindgen_func_elem_13268(arg0, arg1);
}

function __wasm_bindgen_func_elem_5557(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_5557(arg0, arg1, arg2);
}

function __wasm_bindgen_func_elem_11906(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_11906(arg0, arg1, arg2);
}

function __wasm_bindgen_func_elem_14919(arg0, arg1, arg2, arg3) {
    wasm.__wasm_bindgen_func_elem_14919(arg0, arg1, arg2, arg3);
}

function __wasm_bindgen_func_elem_14917(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.__wasm_bindgen_func_elem_14917(retptr, arg0, arg1, arg2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeFromExternrefTable0(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11905(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.__wasm_bindgen_func_elem_11905(retptr, arg0, arg1, arg2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeFromExternrefTable0(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11905_171(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.__wasm_bindgen_func_elem_11905_171(retptr, arg0, arg1, arg2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeFromExternrefTable0(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11905_173(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.__wasm_bindgen_func_elem_11905_173(retptr, arg0, arg1, arg2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeFromExternrefTable0(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11905_174(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.__wasm_bindgen_func_elem_11905_174(retptr, arg0, arg1, arg2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeFromExternrefTable0(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11905_175(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16) >>> 0;
        wasm.__wasm_bindgen_func_elem_11905_175(retptr, arg0, arg1, arg2);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeFromExternrefTable0(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}


const __wbindgen_enum_GpuAddressMode = ["clamp-to-edge", "repeat", "mirror-repeat"];


const __wbindgen_enum_GpuAutoLayoutMode = ["auto"];


const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"];


const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];


const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];


const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];


const __wbindgen_enum_GpuCanvasToneMappingMode = ["standard", "extended"];


const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];


const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];


const __wbindgen_enum_GpuDeviceLostReason = ["unknown", "destroyed"];


const __wbindgen_enum_GpuErrorFilter = ["validation", "out-of-memory", "internal"];


const __wbindgen_enum_GpuFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];


const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];


const __wbindgen_enum_GpuLoadOp = ["load", "clear"];


const __wbindgen_enum_GpuMipmapFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];


const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];


const __wbindgen_enum_GpuQueryType = ["occlusion", "timestamp"];


const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];


const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];


const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];


const __wbindgen_enum_GpuStoreOp = ["store", "discard"];


const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];


const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];


const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];


const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];


const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];


const __wbindgen_enum_GpuVertexFormat = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"];


const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];


const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
const DeviceLostPromiseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_devicelostpromise_free(ptr, 1));
const EngineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_engine_free(ptr, 1));
const HeadlessEngineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_headlessengine_free(ptr, 1));
const PixelReadPromiseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pixelreadpromise_free(ptr, 1));
const SceneControllerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_scenecontroller_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__wbindgen_export5();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_export6(state.a, state.b));

function debugString(val) {
    switch (typeof val) {
        // primitive types
        case 'number':
        case 'boolean':
        case 'undefined':
        return `${val}`;
        case 'string':
        return JSON.stringify(val);
        case 'bigint':
        return `${val}n`;
        case 'symbol':
        return val.description !== undefined
            ? `Symbol(${val.description})`
            : 'Symbol';
        case 'function':
        return typeof val.name === 'string' && val.name !== ''
            ? `Function(${val.name})`
            : 'Function';
        case 'object': {
            if (val === null) {
                return 'null';
            }
            // objects
            if (Array.isArray(val)) {
                return '[' + Array.from(val, debugString).join(', ') + ']';
            }
            // errors
            if (val instanceof Error) {
                return `${val.name}: ${val.message}\n${val.stack}`;
            }

            const toStringOutput = toString.call(val);
            // Test for built-in
            const className = /\[object ([^\]]+)\]/.exec(toStringOutput)?.[1];

            // Failed to match the standard '[object ClassName]'
            if (className === undefined) {
                return toStringOutput;
            }
            if (className === 'Object') {
                // we're a user defined class or Object
                // JSON.stringify avoids problems with cycles, and is generally much
                // easier than looping through ownProperties of `val`.
                try {
                    return 'Object(' + JSON.stringify(val) + ')';
                } catch (_) {
                    return 'Object';
                }
            }
            // TODO we could test for more things here, like `Set`s and `Map`s.
            return className;
        }
        // Per MDN: 'This list of values is exhaustive.'
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
    }
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__wbindgen_export7(ptr, len);
    return result;
}

function getArrayJsValueViewFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    return result;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

let cachedInt16ArrayMemory0 = null;
function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.byteLength === 0) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

let cachedInt8ArrayMemory0 = null;
function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_export4(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_export6(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__wbindgen_export8(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(bytes) {
    numBytesDecoded += bytes.length;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
        cachedTextDecoder.decode();
        numBytesDecoded = bytes.length;
    }
    return cachedTextDecoder.decode(bytes);
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

let __wbg_init_promise;
async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;
    if (__wbg_init_promise === undefined) {
        __wbg_init_promise = __wbg_init_once(module_or_path);
        __wbg_init_promise.catch(() => { __wbg_init_promise = undefined; });
    }
    return __wbg_init_promise;
}

async function __wbg_init_once(module_or_path) {

    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL(/* @vite-ignore */ 'hana-ui.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
