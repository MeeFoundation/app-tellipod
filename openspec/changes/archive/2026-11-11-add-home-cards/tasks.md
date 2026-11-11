## 1. Icon

- [x] 1.1 Add `person` to the Bootstrap glyph map in `packages/ui-kit/src/Icon/glyphs.tsx` and to the list in `Icon.test.tsx`; verify `pnpm --filter ui-kit test` passes and the test fails when the glyph entry is removed (scenario "An icon for an avatar")

## 2. Shared card surface

- [x] 2.1 Check that the tokens behind `Frame` in `packages/ui-kit/src/Card/Card.tsx` draw the design's first-level shadow (1 px ring at 5 % dark and a 20 px blur at 5 % dark); they do not, so add the `level-1` shadow token to `tailwind/tokens/shadows.ts` and verify the kit tests, including `noArbitraryValues`, pass
- [x] 2.2 Add the internal `CardSurface` (outer shadow view, inner clipping view, `shadow-level-1`, `bg-surface-default-main`, `rounded-2xl`) in its own file, leave `Card` unchanged, and verify a test shows the shadow class on the outer view and the clip on the inner view

## 3. Avatar

- [x] 3.1 Implement `packages/ui-kit/src/Avatar/Avatar.tsx` with content, size and `circle` variants, the size map, the brand colors and initials truncation, and verify tests cover every scenario of "The Avatar has the design-system variants", "Sizes follow the design system" and "Initials show on a brand surface"
- [x] 3.2 Add the image content (cover, clipped to the shape) and the icon content (default `person`), and verify tests cover "An image fills the Avatar" and "An icon shows on a brand surface"
- [x] 3.3 Hide the Avatar from assistive technology unless it has a label, and verify tests cover both scenarios of "The Avatar is described to assistive technology"
- [x] 3.4 Measure the contrast of the initials and icon variants against `code-practices/accessibility/spec.md`, list any failures under "Accessibility exceptions" in the main spec, and verify the contrast test lists the Avatar pairs
- [x] 3.5 Add `UI/Avatar` stories for contents, sizes and shapes and verify they render in Storybook

## 4. CardCell

- [x] 4.1 Implement `packages/ui-kit/src/CardCell/CardCell.tsx` with the Avatar slot at size `m`, the title, the `subtitle` slot, the chevron, the surface and the 60 px minimum height, and verify tests cover "The CardCell shows an avatar, a title, a second line and a chevron" and "The second line can be text or Breadcrumbs"
- [x] 4.2 Add the `badge` flag with the `dot` Badge (type `danger`, size `xs`, in a 12 px wrapper with a 2 px `stroke/default/main` border) over the Avatar's top leading corner, and verify tests cover both scenarios of "The CardCell can show a dot on the Avatar"
- [x] 4.3 Add `onPress`, the role of button, the default label from the title and text subtitle, the label override and the hidden Avatar, dot and chevron, and verify tests cover "The CardCell opens something" and "The CardCell is described to assistive technology"
- [x] 4.4 Add `UI/CardCell` stories for a text subtitle, a Breadcrumbs subtitle, the dot and a long title, and verify they render in Storybook

## 5. CardCategory

- [x] 5.1 Implement `packages/ui-kit/src/CardCategory/CardCategory.tsx` with the icon circle, title, line and surface, and verify tests cover "The CardCategory shows an icon, a title and a line" and "The CardCategory fills the width its parent gives it"
- [x] 5.2 Make the tile one accessibility stop labelled with the title and the line, and verify a test covers "The CardCategory is described to assistive technology"
- [x] 5.3 Add `UI/CardCategory` stories for a count line, "No pods yet", a long title and two tiles in a row, and verify they render in Storybook

## 6. Exports and indexes

- [x] 6.1 Export `Avatar`, `CardCell`, `CardCategory` and their prop types from `packages/ui-kit/src/index.ts`, and verify `pnpm --filter ui-kit typecheck` passes
- [x] 6.2 Add rows for `avatar`, `card-cell` and `card-category` to `openspec/specs/components/ui-kit/README.md` in the main tree (read when: "Using or changing the Avatar", "Using or changing the CardCell", "Using or changing the CardCategory"), and verify the table lists them
- [x] 6.3 Run `openspec validate add-home-cards --strict` and the ui-kit tests, typecheck and lint, and verify all pass

## 6a. CellInfo surface

- [x] 6a.1 Wrap `CellInfo` in `CardSurface` with 12 px leading padding and verify the `CellInfo` test for the border and shadow classes passes and the `Card` tests still pass

- [x] 6a.2 Add an 8 px vertical gap (`gap-2`) to the `Card` body and the `UI/CellInfo` list story, and verify the new `Card` test passes

- [x] 6a.3 Add a `pressed` prop to `CardSurface` and a pressed look to `CardCell` and to `CardCategory` (optional `onPress`, role of button), and verify the press tests for both cards pass

## 7. Open questions to resolve before 4.1, 5.1 and 3.1 are finished

- [x] 7.1 Get the answers to the proposal's open questions (gray or teal Avatar in the card, card height, tappable tile, second-line props), update the delta specs to match, and verify no "Open questions" entry they cover remains
