## 1. Resolve the open questions

- [x] 1.1 Get the user's answers to the proposal's open questions (`titleAlign`, `titleSize`, the avatar-to-text gap of 8 px or 12 px, the pressed look): all four recommended options chosen and update the proposal, the three specs and the design to match; verify no "Open questions" entry that the answer settles remains
- [x] 1.2 Open the Pod (13:14410) and Filter (364:11218) frames in "Mee - Tellipod App v4.0.3", measure the title row, the gaps and the centered title, and verify the numbers in the `app-header` spec agree with them

## 2. Icon and shadow token

- [x] 2.1 Add `chevron-left`, `three-dots-vertical` and `shield-lock` to the Bootstrap glyph map in `packages/ui-kit/src/Icon/glyphs.tsx` and to the list in `Icon.test.tsx`; verify `pnpm --filter ui-kit test` passes and the test fails when a glyph entry is removed (scenario "Icons for a header")
- [x] 2.2 Add the header shadow (0 px x, 1 px y, 15 px blur, `alpha/always/dark/15`) to `packages/ui-kit/tailwind/tokens/shadows.ts` and verify `preset.test.ts` lists it and `noArbitraryValues.test.ts` still passes

## 3. HeaderIconButton

- [x] 3.1 Implement `packages/ui-kit/src/AppHeader/HeaderIconButton.tsx` (44 px square, 10 px padding, `rounded-xl`, 24 px icon, pressed `surface/gray/light` fill) and verify tests cover "A back button" and "Pressing the button" and the 44 px size
- [x] 3.2 Make `accessibilityLabel` a required prop and verify a type test (`@ts-expect-error`) covers "A missing label"
- [x] 3.3 Add the button role, the label and the hidden icon, and a `hitSlop` from `hitSlopFor` that reaches 44 pt on iOS and 48 dp on Android, and verify tests cover "Reading the kebab" and the touchable area without a size change

## 4. SearchEntry

- [x] 4.1 Implement `packages/ui-kit/src/AppHeader/SearchEntry.tsx` as a `Pressable` with the field look (44 px high, 1 px `stroke/gray/accent` border, `rounded-xl`, 12 px padding, 20 px `search` icon, `Base/Regular` placeholder) and verify tests cover "Comparing with the design" and that no `TextInput` is rendered
- [x] 4.2 Add `onPress`, the button role, the placeholder as its label, the hidden icon and the touch area, and verify tests cover "Opening search" and "Reading the search entry"

## 5. AppHeader

- [x] 5.1 Implement the shell in `packages/ui-kit/src/AppHeader/AppHeader.tsx`: the outer shadow view, the clipped gradient with the 28 px bottom corners and the 1 px bottom border, the side padding and the gaps; verify tests cover "Comparing with the design" for the 20 px paddings and the 362 px bottom slot
- [x] 5.2 Add the slots `leading`, `media`, `title`, `subtitle`, `trailing` and `children` in the title row and the bottom slot, with unused slots taking no space, and verify tests cover all three scenarios of "The AppHeader has slots, not variants"
- [x] 5.3 Add the string looks (`Base/Medium` title, `XL/Semi Bold` with `titleSize`, `XS/Regular` subtle subtitle), the one-line ellipsis title and `titleAlign`, and verify tests cover all three scenarios of "The title and subtitle take any node", including that the header height does not change for a long title
- [x] 5.4 Pad the top by `useSafeAreaInsets().top` and verify tests cover "A device with a notch" and that no clock, signal or battery is rendered
- [x] 5.5 Add the height transition (200 ms `LinearTransition`, fades on the bottom slot, no `entering` on first render) with the Reduce Motion fallback, and verify tests cover "Tabs appear" and "Reduce Motion" by asserting the layout transition is set or absent
- [x] 5.6 Measure the contrast of the title and subtitle against `surface/brand/light` (`code-practices/accessibility/spec.md`), list any failure under "Accessibility exceptions" in the spec, and verify `packages/ui-kit/tailwind/contrast.test.ts` lists the pairs

## 6. Stories

- [x] 6.1 Add `UI/AppHeader` stories for Home with a search entry, Pod with a kebab, Pod with `Tabs` (layout `equal`) and Filter with a centered title, inside a decorator with a top inset of 64, and verify they render in Storybook at 142 px and 206 px as in the design
- [x] 6.2 Add a story with a toggle that adds and removes the bottom slot, and verify in Storybook that the height eases and, with Reduce Motion on, changes at once

## 7. Exports and indexes

- [x] 7.1 Export `AppHeader`, `HeaderIconButton`, `SearchEntry` and their prop types from `packages/ui-kit/src/index.ts`, and verify `pnpm --filter ui-kit typecheck` passes
- [x] 7.2 Add rows for `app-header`, `header-icon-button` and `search-entry` to `openspec/specs/components/ui-kit/README.md` in the main tree (read when: "Using or changing the AppHeader", "Using or changing the HeaderIconButton", "Using or changing the SearchEntry"), and verify the table lists them
- [x] 7.3 Run `openspec validate add-app-header --strict` and the ui-kit tests, typecheck and lint, and verify all pass

## 8. Walk-through on devices

- [x] 8.1 Walk the header through with VoiceOver on iOS and TalkBack on Android (focus order back, title, kebab, then the bottom slot; labels and roles of the icon buttons and the search entry) and verify the result is recorded in the accessibility notes of the `app-header` spec
