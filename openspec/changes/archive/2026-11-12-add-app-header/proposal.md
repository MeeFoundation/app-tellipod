## Why

Every main screen of the Tellipod design starts with the same top bar: a rounded, light-teal-to-white card under the status bar with a title row and sometimes a search entry or tabs below it (Figma layer `home-topbar`, node 13:10657 of "Mee - Tellipod App v4.0.3", used on about 80 frames).
The ui-kit has no such component, so each screen would rebuild the gradient, the corners, the shadow, the safe-area padding and the title row, and the screens would drift apart.

**Example:** The Home screen shows an avatar "B", the title "Welcome, Bogdan", a shield-lock line "Device-to-device sharing, pod members only." and a search entry "Search, or ask Telli...".
The Pod screen shows a back chevron, a photo avatar, the title "About Sofia", the line "People > Immediate Family", a kebab button and, below, the tabs "Notes", "Chat" and "Info".
Both are the same card with different content in the same places.

## What Changes

- Add the `AppHeader` to the kit: one shell with slots, and no variant prop.
  - The shell draws the brand-light to white gradient, the 28 px bottom corners, the white bottom border and the shadow, and pads the top by the safe-area inset.
  - The slots are `leading`, `media`, `title`, `subtitle` and `trailing` in the title row, and `children` as a full-width bottom slot.
  - `title` and `subtitle` take any node; a string gets the design's title or subtitle look. The title stays on one line and ends with an ellipsis when it does not fit.
  - The shell animates its height when a slot appears or disappears, and does not animate when the user asks to reduce motion.
- Add the `HeaderIconButton` for the back chevron and the kebab: an icon button with a required accessibility label, a pressed look and a 44 pt (iOS) or 48 dp (Android) touch target.
- Add the `SearchEntry`: a tappable, search-field-looking row that opens search, because the `TextField` is a labelled text input and cannot be a button.
- Add the icons `chevron-left`, `three-dots-vertical` and `shield-lock` to the Icon list.
- List the three components in the ui-kit `README.md` index, export them from the kit, and add stories for the four layouts the design shows.

Out of scope:
- The status bar's clock, signal, Wi-Fi and battery: the device draws them, and the shell only leaves room for them.
- The Navigation section's top bars (`Nav / Type 1` to `Type 3`), which this change did not compare with the header.
- The `bottom-menu`, the `Ask-Banner` and any screen that mounts the header.
- A `variant` prop, a collapse-on-scroll header and a large-title header, none of which the design shows.

## Capabilities

### New Capabilities

- `components/ui-kit/app-header`: the `AppHeader` shell, its slots, its looks, its safe-area handling and its height animation.
- `components/ui-kit/header-icon-button`: the 44 pt icon button for the back chevron and the kebab.
- `components/ui-kit/search-entry`: the tappable search row that opens search.

### Modified Capabilities

- `components/ui-kit/icon`: the list of icon names gains `chevron-left`, `three-dots-vertical` and `shield-lock`.

`components/ui-kit/README.md` also gets three index rows; it is an index, not a spec.

## Impact

- New code in `packages/ui-kit/src/AppHeader`, plus exports in `packages/ui-kit/src/index.ts`.
- Adds three glyphs to `packages/ui-kit/src/Icon/glyphs.tsx` and its test.
- Reuses `Icon`, `Avatar`, `Tabs` (layout `equal`) and `Breadcrumbs` as slot content in stories, and `expo-linear-gradient`, `react-native-reanimated`, `react-native-safe-area-context`, `touchTarget.ts` and `useReduceMotion`. The kit already depends on all of them.
- Adds a shadow token for the header (0 px x, 1 px y, 15 px blur, `alpha/always/dark/15`) if the shadow tokens have none like it.
- No change to pod data or to any screen.
- Sources: "Mee - Tellipod App v4.0.3" (`home-topbar` symbol 13:10657 and its instances 38:2886, 13:14410 and 364:11218; the status bar part is "Mobile screen elements", node 1909:39432, which links Apple's status bar guidelines).

## Decisions

- **One shell with slots.** The design has one `home-topbar` symbol whose instances differ only in what the title row and the bottom slot hold, so the kit has one component, and each layout is a story.
- **Name.** The kit calls it `AppHeader`, not `home-topbar`, because it is also the Pod, Chat and filter header. The kit rule "a component has the name of its design-system component" does not apply, because the design system file has no such component yet; the spec records the Figma layer name as its source.
- **Status bar.** The shell leaves the safe-area top inset free and draws nothing in it. The Figma frames contain a drawn clock, signal and battery as a mock of the device.
- **Title.** A title is one line with an ellipsis. This differs from the `Modal`, whose title wraps, because a wrapping header would push the screen below it down.
- **Slots take nodes.** `title` and `subtitle` take any node, so the shield-lock line and the breadcrumb are the screen's content, and a string gets the default look.
- **Height animation.** The shell animates its height with a reanimated layout transition when a slot appears or disappears, and changes it at once under Reduce Motion, as the Toast host does.
- **Search entry.** The design draws the search entry with the text field's look, but it is a link to the Search screen, not an input. `SearchEntry` is a separate component for that reason.

## Resolved questions

- **Title size:** `titleSize` of `base` (default) or `xl`, because the Home title is `XL/Semi Bold` and the Pod and Filter titles are `Base/Medium`.
- **Centered title:** an explicit `titleAlign` of `start` (default) or `center`, as in the Filter layout (node 364:11218).
- **Avatar gap:** 8 px everywhere, so the Pod layout is 4 px tighter than the design's 12 px.
- **Pressed look:** a `surface/gray/light` fill on the icon button and a `surface/gray/soft` fill on the search entry, because the design shows none and the search placeholder on `surface/gray/light` measures 4.34:1.
- **Top spacing:** the Figma header is 142 px tall without a bottom slot and 206 px with the search entry, measured with a 64 px status bar area (14 px, a 36 px Dynamic Island and 14 px). The kit pads the top by the device's real safe-area inset, so its height differs from Figma by the difference between that inset and 64 px.
