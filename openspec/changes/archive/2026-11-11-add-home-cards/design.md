## Context

The kit (`packages/ui-kit/src`) holds one folder per component with the component, its stories and its tests, exported from `index.ts`.
Components are styled with NativeWind token classes and static class names (`components/ui-kit/tokens-and-theming`).
The existing `Card` draws its surface in two views, because the shadow is clipped by `overflow: hidden`: an outer view with the shadow and an inner view with the clip.
`Badge` already has the shape `dot`, `Breadcrumbs` already has size `s`, and the `Icon` list is closed.
See `proposal.md` for the motivation and the decisions.

## Goals / Non-Goals

**Goals:**

- Three kit components that match the design-system names and variants they implement: `Avatar`, `CardCell`, `CardCategory`.
- `CardCell` and `CardCategory` share one surface that matches the design's first-level shadow.

**Non-Goals:**

- No Home screen, no pod, category or "new info" data, no navigation.
- No disabled or loading looks, no Avatar badges, because no design shows them.

## Decisions

### The CardCell composes Avatar, Badge, Breadcrumbs and Icon

The `CardCell` takes the Avatar as a slot (`avatar`), draws the title itself and takes the second line as a slot (`subtitle`, text or `Breadcrumbs`).
The dot uses the existing `Badge` with shape `dot`, type `danger` and size `xs` (8 px) inside a 12 px wrapper with a 2 px `stroke/default/main` border, because the `Badge` has its own 1 px border and takes no class names; the theme gets the `stroke/default/main` token.
The kit gets no new badge variant, so the kit rule "exactly the variants of the design-system component" holds.
The Avatar slot is fixed to size `m` by the card, so a screen cannot place another size in the row.

**Rejected alternatives:**

- Props for the image, initials and icon on the `CardCell`.
  - **Cons:** repeats the Avatar's contents and sizes and grows with every Avatar variant.
- Drawing the avatar inside the `CardCell` without an `Avatar` component.
  - **Cons:** the design has an Avatar component, and the kit rule says each component takes the name of its design-system component.

### One shared surface for the two new cards

The surface of `CardCell` and `CardCategory` (surface color, 16 px radius, first-level shadow, clip) is one internal component, `CardSurface`, in its own file and not exported from `index.ts`.
It uses the two-view pattern of `Card/Card.tsx` because `overflow: hidden` would clip the shadow: an outer view with the shadow and an inner view with the clip.
The design's `Box shadow/1st Level` (a 1 px ring and a 20 px blur, both at 5 % dark) is not `shadow-3`, which the existing `Card` uses with a border, so the theme gets a new `shadow-level-1` token.
The surface adds a 1 px `stroke/gray/light` border to the design's shadow, which the Figma Card-Cell does not have, because the shadow is only 5 % dark and the edge does not show on a white screen; the existing `Card` has the same border.
The existing `Card` is left as it is, since its spec and design source (`Card-Cell-Details-Preview`) are unchanged by this change.

**Rejected alternatives:**

- Moving the `Frame` of `Card` into a shared file and using it in all three.
  - **Cons:** its shadow and border differ from the design's first-level shadow, so the new cards would not match the design, or `Card` would change without a spec change.
- Copying the `Frame` into each new component.
  - **Cons:** two copies of the clip-and-shadow workaround that must change together.
- Making `CardCell` and `CardCategory` modes of `Card`.
  - **Cons:** the design-system components are separate (`Card-Cell`, `Card-Category`, `Card-Cell-Details-Preview`), and the modes of `Card` have a header, a body and a footer that these cards do not.

### The CellInfo uses the same surface

`CellInfo` is wrapped in `CardSurface` with 12 px of leading padding, because the surface now bounds the row.
Inside the body of a `Card`, which has its own 12 px side padding, each row is a bordered tile, so the rows are nested in the card by design of this request, not of Figma.
The `Card` spec and tests are not changed.

### Press handling

`CardCell` is one `Pressable` with the role of button.
Its accessibility label is built from the title and the second line when the second line is text.
When the second line is a `Breadcrumbs`, the screen passes the label, because the kit cannot read text out of a slot.
`CardCategory` is a plain view without `onPress` and a `Pressable` with the role of button with it.
Both cards read `pressed` from the `Pressable` render function and pass it to `CardSurface`, which swaps `bg-surface-default-main` for `bg-surface-gray-soft`; the look is not in Figma.
`surface/gray/soft_hover` is the same gray as the icon circle, so it would hide the circle and is not used.

### Avatar content

`Avatar` takes `content` (`initials`, `image` or `icon`) and the matching value: `initials` text, an image `source`, or an icon `name` (default `person`).
The image uses `resizeMode="cover"` and is clipped to the shape.
Initials are truncated by the Avatar to one character at `xxs` and `xs` and two from `s`, so a screen passes the whole name or the initials it has.
Avatar sizes, text sizes and icon sizes come from a single static map of full class names.

## Risks / Trade-offs

- **Nested borders in a `Card` body** → each `CellInfo` row shows its own border inside the `Card` border, which the Figma does not; revisit with the designer if it looks heavy.
- **The gray Avatar in the Home card differs from the design-system Avatar** → the kit follows the design system, and the question is open in the proposal. A card built from the Home screen would show teal initials until it is answered.
- **The `person` glyph comes from Bootstrap Icons, not the design system's outline set** → the Icon spec already declares Bootstrap glyphs as the source, and a later change replaces the set.
- **Card height is open** → the card hugs its content with a 60 px minimum, so the "New info" card renders at 60 px until the question is answered.
- **Two card surfaces in the kit** (`Card` and `CardSurface`) → the difference is the design's, and a later change can align them if the design system does.
