## 1. Icons

- [x] 1.1 Import `chevron-down`, `pencil`, `plus`, `folder-plus`, `paperclip`, `diagram-3`, `people` and `person-vcard` in `packages/ui-kit/src/Icon/glyphs.tsx`, and verify in `Icon.test.tsx` that each name renders its glyph, which fails if an import is removed
- [x] 1.2 Add the eight icons to the `Icon` story and verify they show in `apps/storybook`

## 2. Shared hook

- [x] 2.1 Move `useReduceMotion` from `packages/ui-kit/src/TextField/` to the kit root and update its imports, and verify the TextField tests still pass

## 3. Divider

- [x] 3.1 Add `Divider` in `packages/ui-kit/src/Divider/` as a full-width hairline in a stroke color token, hidden from assistive technology, and verify in a test that it is hidden and uses the token class
- [x] 3.2 Read the Divider stroke color from the Figma variables, and verify it maps to a token in `tailwind/tokens/colors.ts` or add the token with a `preset.test.ts` assertion

## 4. CellInfo

- [x] 4.1 Add `CellInfo` in `packages/ui-kit/src/CellInfo/` with the label above the value, and verify in a test that the label and value render in order and a long value wraps
- [x] 4.2 Add the optional pencil button with `onEdit`, the label "Edit" followed by the row label, and `hitSlopFor` padding to `MIN_TARGET`, and verify in a test that pressing it calls `onEdit` once, that no button renders without `onEdit`, and that the hit slop reaches the minimum
- [x] 4.3 Make the row read as "label, value" for screen readers, and verify the accessibility label in a test

## 5. Card

- [x] 5.1 Add `Card` in `packages/ui-kit/src/Card/` with the 48 px header, the icon in a circle and the title, and verify in a test that the icon, title and chevron render in order
- [x] 5.2 Implement `expandable` mode with `expanded`, `onExpandedChange` and `defaultExpanded`, and verify in tests that tapping the header toggles an uncontrolled Card and calls `onExpandedChange` with the opposite value for a controlled Card, which fails if the header stops toggling
- [x] 5.3 Render the body from `children` and the `footer` slot only when expanded, and verify in a test that a collapsed Card does not render them and a Card without children shows no body area
- [x] 5.4 Implement `navigable` mode with the right chevron and `onPress`, and verify in a test that pressing calls `onPress` once and no body renders
- [x] 5.5 Animate the body height, the body opacity and the chevron turn from one `Animated` value, keep the body mounted until the collapse finishes, and use zero duration under `useReduceMotion`, and verify in tests that the body stays until the collapse ends, that its height follows the measured height, and that Reduce Motion gives a zero duration and motion allowed a positive one
- [x] 5.6 Add the button role, the title as label, the expanded state for `expandable` and hidden icons, and verify with role and state queries in a test
- [x] 5.7 Read the Card fill, radius and edge from the Figma variables, and verify each maps to an existing token (`surface/default/main`, `rounded/2xl`, `stroke/gray/light`, `shadow-3`), noting in design.md that the edge is a visible border and shadow rather than the Figma 5% effect
- [x] 5.8 Extend `noArbitraryValues.test.ts` coverage to the Divider, CellInfo and Card files and verify it passes
- [x] 5.9 Measure every text and background pair with `tailwind/contrast.test.ts`, list failures under "Accessibility exceptions" in the affected spec, and verify each listed ratio matches the test output

## 6. Stories and exports

- [x] 6.1 Add `Divider.stories.tsx`, `CellInfo.stories.tsx` and `Card.stories.tsx` with the grouped stories from the specs, and verify they run in `apps/storybook` on iOS and Android
- [x] 6.2 Add a story that builds the "Contact info", "Attachments", "Subpods" and "Members" cards of the Info tab, and compare it with Figma node 820:14161 for heights, insets and colors, noting any intentional difference in the specs
- [x] 6.3 Check on iOS and Android that expanding "Contact info" does not flicker, and verify the body height animates once
- [x] 6.4 Export `Card`, `CellInfo`, `Divider` and their prop types from `packages/ui-kit/src/index.ts`, and verify `just typecheck` and `just knip` pass

## 7. Specs and indexes

- [x] 7.1 Add rows for `card` ("Using or changing the Card"), `cell-info` ("Using or changing the CellInfo") and `divider` ("Using or changing the Divider") to `openspec/specs/components/ui-kit/README.md` in the main tree, and verify each link resolves
- [x] 7.2 Confirm the component names with the design-system file, and rename the specs, folders and exports if they differ, and verify `rg` finds no stale name
- [x] 7.3 Run `openspec validate add-collapsible-card-component --strict` and `just check`, and verify both pass
