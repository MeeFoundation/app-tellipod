## 1. Tokens

- [x] 1.1 Add `alpha.dark` `5` and `10` (`rgba(2, 6, 23, 0.05)` and `rgba(2, 6, 23, 0.1)`) to `packages/ui-kit/tailwind/tokens/colors.ts`, and verify in `preset.test.ts` that `bg-alpha-dark-5` and `border-alpha-dark-10` resolve to those values
- [x] 1.2 Read the Figma variables of the Default, Hover, Focus and Active tab at sizes `M` and `L` and of both bars, and verify each fill, border, text color and shadow in `specs/components/ui-kit/tabs/spec.md` maps to a token, or update the spec

## 2. Tabs

- [x] 2.1 Add `Tabs` (the container, with a context for size and layout) and `Tab` in `packages/ui-kit/src/Tabs/` with the size table and the state-look table, and verify with a test that every size and layout renders its `Tab` children in order with their labels
- [x] 2.2 Render each tab's `leadingIcon`, label and `trailingIcon` in order inside `IconDefaultsProvider` with size 24 and the tab's text color class, and verify in a test that a slotted `Icon` takes that size and color and that an icon without an accessibility label is hidden
- [x] 2.3 Mark the tab with `active` as Active, call its `onPress` once when a Default tab is pressed, and verify in a test that pressing the Active tab calls nothing and that the Tabs does not change its own selection
- [x] 2.4 Show the Hover look while a tab is pressed and the Focus look while it is focused, keep the Active look in both, and verify each look's classes in a test
- [x] 2.5 Implement the `content` and `equal` layouts with a bar that is always 100% wide, and verify in a test that the bar is `w-full`, `equal` tabs each take `flex-1` and do not scroll, and the bar does not clip
- [x] 2.6 Wrap the tabs of a `content` bar in a horizontal `ScrollView` without a scroll indicator that keeps the bar's width, and verify in a test that a `content` bar scrolls horizontally and an `equal` bar has no scroll view
- [x] 2.7 Add the tab list and tab roles, the selected state, the default accessibility label and the `hitSlop` that pads a tab to 44 pt on iOS and 48 dp on Android, and verify with role and state queries and a hit-slop assertion in a test
- [x] 2.8 Extend `noArbitraryValues.test.ts` coverage to the Tabs files and verify it passes
- [x] 2.9 Measure every text and background pair with `tailwind/contrast.test.ts`, list failures under "Accessibility exceptions" in the Tabs spec, and verify each listed ratio matches the test output
- [x] 2.10 Check `hitSlop` of neighboring size `m` tabs in the Storybook app on iOS and Android, and verify a touch on a tab's edge selects that tab, or switch to vertical-only padding and note it in the spec

## 3. Stories and exports

- [x] 3.1 Add `Tabs.stories.tsx` with the grouped stories Sizes, Layouts, States and Playground, and verify they run in `apps/storybook` and each group shows several bars
- [x] 3.2 Export `Tabs`, `Tab` and their prop types from `packages/ui-kit/src/index.ts`, and verify `pnpm` type checking passes for the kit and the Storybook app
- [x] 3.3 Compare each story with the Figma Tab and Tabs horizontal frames and verify heights, paddings, colors and spacing match, noting any intentional difference in the spec

## 4. Specs and indexes

- [x] 4.1 Add a row for `tabs` ("Using or changing the Tabs") to `openspec/specs/components/ui-kit/README.md` in the main tree, and verify the link resolves
- [x] 4.2 Run `openspec validate add-tabs-component --strict` and verify it passes
