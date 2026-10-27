# Sundaze

A sunny, fictional surf club. Bold typography, real surf photography and a straightforward path from discovering the club to planning a session.

## Run

```sh
pnpm install
pnpm dev --port 3191
```

Next.js · React · Tailwind CSS · fully customized shadcn/ui (Base UI). Session tabs, FAQ accordion, mobile navigation and the session planner are keyboard accessible. Motion respects reduced-motion preferences; the scrolling band has a pause control. All fonts and photos are local.

The planner is a local demonstration. Prices and sessions are fictional; no bookings, payments or messages are sent, and no personal information is stored.

## Credits

Photography by Jess Loiterton, used under the [Pexels license](https://www.pexels.com/license/):
- [Person Surfing on Sea Waves](https://www.pexels.com/photo/person-surfing-on-sea-waves-4321460/)
- [People Surfing on Sea](https://www.pexels.com/photo/people-surfing-on-sea-7502346/)
- [Person Surfing on Sea Wave](https://www.pexels.com/photo/person-surfing-on-sea-wave-4783756/)

Archivo and Manrope: SIL Open Font License, included alongside the font files. Original SVG sun illustration. Code: MIT.

Designed and developed by [LN](https://lndev.me). [Support the project](https://lndev.mychariow.shop/prd_3cu1s0).

## Interactive field school

Explore the three parts of a wave, discover the board/leash/wetsuit notes, play a short timing game, and complete a three-question surf etiquette quiz. Three stamps reward exploration and understanding. Progress lives in React state only and resets on refresh; it is not a qualification or a real surf assessment. The timing game has a static alternative when reduced motion is enabled.

The ocean field guide uses Canvas UI's Liquid and Ripple effects, loaded near the viewport with modest GPU budgets. Text and controls remain normal HTML. GPU layers are optional, respect reduced motion and can be paused. Experimental HTML refraction depends on browser support; the ordinary WebGL overlay and page remain available without that API.

Surf safety and equipment notes reference the [RNLI surfing guide](https://rnli.org/safety/choose-your-activity/surfing). Always seek local advice and coaching for actual conditions.

### Third-party effects

[Canvas UI](https://canvasui.dev/) Liquid and Ripple by David Haz are included as part of this website under **MIT + Commons Clause**, not the repository's plain MIT license. Their original license is preserved in [components/canvasui/LICENSE.md](components/canvasui/LICENSE.md). The components may be used in websites and products; redistribution or resale of the components themselves is restricted by that license. Local changes cap pixel density for mobile rendering. All original Sundaze application code remains MIT.

The hero and sunset photo use Canvas UI Ripple with a local image-texture adapter: the original expanding wave shader refracts the actual photo in standard WebGL2, without the experimental HTML-in-Canvas API. Click or tap to create rings; hovering and scrolling do not trigger them. The renderer stops when idle or off-screen, images remain as fallbacks, and reduced motion disables refraction. Section titles reveal word by word as they enter the viewport; photos and illustrated panels have scroll choreography. The yellow band repeats two identical viewport-wide groups for a seamless loop, with a pause control.
