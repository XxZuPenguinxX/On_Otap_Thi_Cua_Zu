# Design system

## Surface and use

The app is an **Operate** workspace for repeated study sessions on a personal computer. It should make the next study task, available source material, AI state, and evidence behind an answer easy to find without presenting generated output as authoritative.

## Visual language

- **Canvas:** cool mist `#f5f7f8`; working surfaces are white `#ffffff` in the default Arctic preset. Theme Studio lets the student choose a saved palette or customize colors.
- **Ink:** deep blue-green `#172d3a`; secondary text `#647781`; fine separators `#e2e8ea` in the default preset. Text/background contrast is checked before saving a custom theme.
- **Action:** teal `#087c78`, with a pale teal state `#e8f4f2` in the default preset; warm coral and gold are reserved for subject marks and small emphasis.
- **Typography:** native Segoe UI / Arial sans-serif stack so the interface works offline and does not request third-party fonts.
- **Composition:** fixed desktop navigation rail, thin top bar, an explicit exam-combination strip, then subject-first working content. Mobile moves primary navigation to a bottom rail.
- **Content:** ruled lists and subject tiles carry the hierarchy; AI output cites the user's local sources and is separated from the source inventory.
- **Personality:** curriculum emojis and a small locally bundled looping study-book GIF. Motion levels are user-configurable, reduced-motion preferences are respected, and ambient animation pauses while the page is hidden or AI is generating.

## Interaction

Use clear selected, hover, loading, error, and empty states. Keep focus rings visible. Do not silently substitute cloud AI or make unsupported claims about official marks or source accuracy. Users can change language and exam combinations without losing saved documents.
