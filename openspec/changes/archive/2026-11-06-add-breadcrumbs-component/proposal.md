## Why

A pod sits somewhere in the ontology: "Home > Health > Medical records > Lab results". A screen showing a pod needs to tell the user where it is and let them go up a level.
A phone has no room for a full breadcrumb trail and no hover, so this is not a web breadcrumb: it is a single compact line of the pod's position, where each parent can be tapped.
The UI kit has no such component, so each screen would build its own line, with its own separators, spacing, overflow and touch targets.
The design system has the component: Figma "Mee - Design System v5.2.4", Breadcrumbs page (node 5:1063).

**Example:** the design's trail "Home icon, Label, ..., Label, Label, Label" in size `m` is 20 px high. Every parent is a link; the last item "Lab results" is the pod the user is in, plain text with no separator after it.

## What Changes

- Add a `Breadcrumbs` component to `packages/ui-kit`: a single-line container of `Breadcrumb` items, with separators between them.
- A `Breadcrumb` takes a `label`, an optional `onPress` and an optional leading icon. With `onPress` it is a link, with Default, pressed, focused and disabled looks. Without it, it is plain text: the current place.
- Sizes `s`, `m` and `l`, and styles `simple` and `outlined`, as in the design.
- Add the `house` and `chevron-right` glyphs to the Icon list. The design draws the first item with a house and every separator with a chevron.
- Add stories `UI/Breadcrumbs`.
- No new tokens: every color, radius and spacing the design uses is in the kit already.

Left out of the kit because the design does not show them or no screen uses them yet: a separator other than the chevron, a hover look as such (touch has the pressed look instead), and the behavior of the collapsed item "...".

**Example:** a pod nested six levels deep. The design shows the collapsed item "..." after the first label. What the user sees after tapping it is not in the design, so the kit renders "..." as an ordinary link and the screen decides what its `onPress` does.

## Capabilities

### New Capabilities

- `components/ui-kit/breadcrumbs`: the Breadcrumbs and Breadcrumb components, sizes, styles, link looks, touch states, overflow, accessibility and stories.

### Modified Capabilities

- `components/ui-kit/icon`: the Icon name list gains `house` and `chevron-right`.

## Impact

- `packages/ui-kit`: new `src/Breadcrumbs/`, exports in `src/index.ts`, two glyph imports in `src/Icon/glyphs.tsx`.
- `openspec/specs/components/ui-kit/README.md`: a row for `breadcrumbs` after `tabs`, in the main tree after archive.
- No new dependencies and no token changes.
- Sources: Figma file "Mee - Design System v5.2.4", Breadcrumbs page (node 5:1063): Breadcrumbs 2761:50255 (Style x Size), Breadcrumb 2761:49376 (Link x State x Size). Authoritative source for what a pod's position means: `MeeFoundation/pod-ontologies`. The kit shows labels it is given and does not read the ontology.

## Open questions

- **Overflow.** A trail can be wider than the screen. The design shows one line of eight items at 382 px in size `s` and no narrower case.
  The kit scrolls the line sideways, as the Tabs do, starting at the trailing end so the current place stays in view. This is not in the design and is listed as an addition.
  **Example:** "Home > Health > Medical records > Lab results > 2026 > October > Blood panel" in size `m` on a 390 pt screen.

  | Option | The user sees |
  | --- | --- |
  | Scroll, trailing end first (chosen) | "... > October > Blood panel", with the earlier items a swipe away |
  | Truncate each label | "Home > Hea... > Med... > Lab... > 20..." |
  | Wrap to a second line | Two lines, the second starting "October > Blood panel" |

- **Disabled text color.** The design colors a disabled link `text/default/body` in size `s` and `text/gray/solid` in sizes `m` and `l`, both at 60% opacity.
  The kit uses `text/gray/solid` for all three, as two of the three sizes do. Design is asked which is intended.
  **Example:** the size `s` disabled "Label" is `#1e293b` at 60%, while the size `m` one is `#334155` at 60%.
- **The collapsed item "...".** The design shows it as a link with a separator and no expanded state.
  The kit treats it as any other item. Design is asked what tapping it shows, such as a sheet listing the hidden parents.
  **Example:** the trail "Home > ... > Lab results > Blood panel" hides "Health" and "Medical records".
- **Touch targets.** Size `s` items are 16 px high and size `m` items 20 px, below 44 pt on iOS and 48 dp on Android.
  The kit pads the touch area vertically without changing the look and lists the sizes under accessibility exceptions, as the Tabs do.
