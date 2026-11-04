## 1. Read the design

- [x] 1.1 Read the Figma variables of a Default, Focus, Alert, Alert and Focus, Disabled and Filled field for each style at size `m`, and verify every stroke, surface and text color maps to a token in `packages/ui-kit/tailwind/tokens/colors.ts`
- [x] 1.2 Read the corner radius, the label and helper text styles, the required-marker color and the spacing between label, field and helper text, and verify the size table in `specs/components/ui-kit/text-field/spec.md` matches or update the table
- [x] 1.3 Read the Label on edge and Label inside field looks at sizes `s` and `l` and verify where the label sits at each state, or record a difference in the spec
- [x] 1.4 Read the space between the field and the helper text and verify whether a spacing token covers it, adding one to `packages/ui-kit/tailwind/tokens/spacing.ts` with a Figma source comment if not
- [x] 1.5 Add the missing `surface.default.main` color (white) to `packages/ui-kit/tailwind/tokens/colors.ts` with a Figma source comment, and verify `preset.test.ts` still passes
- [x] 1.6 Add the Figma `outline-thickness` as a `3` border width in `packages/ui-kit/tailwind/tokens/outlines.ts` and a `0.75` spacing in `spacing.ts`, and verify `preset.test.ts` passes and the focus ring test finds `border-3` and `-inset-0.75`

## 2. Icons

- [x] 2.1 Import the Bootstrap `search` and `exclamation-circle` SVGs in `packages/ui-kit/src/Icon/glyphs.tsx` and add them to `RAW_GLYPHS`, and verify `Icon.test.tsx` renders both
- [x] 2.2 Add `search` and `exclamation-circle` to the Icon stories and verify they appear in `apps/storybook`

## 3. TextField

- [x] 3.1 Add `packages/ui-kit/src/TextField/textFieldStyles.ts` with the size, style and state class tables, and verify `noArbitraryValues.test.ts` covers the new files and passes
- [x] 3.2 Add `TextField.tsx` with the label, field, leading icon, error icon, trailing element, helper line and counter, and verify a test that every combination of style and size renders without error
- [x] 3.3 Derive Focus from the input's focus events, Filled from the value, Alert from `error` and Disabled from `disabled`, and verify tests that each state applies its stroke, ring and text classes and that a disabled field does not focus
- [x] 3.4 Place the label by style and state, and verify tests for `label-above`, `label-on-edge` and `label-inside` that one label exists before and after focus and after a value is entered, with the colors and the strip of each state
- [x] 3.4a Animate the label with one progress value over 150 ms, instant under reduce motion, and verify tests that the animation runs to 1 on focus, filled and placeholder, back to 0 on blur, with a duration of 0 under reduce motion, and unit tests of the target of the move at every style and size
- [x] 3.5 Show the counter as `length / maximum` and replace the helper text with the error message, and verify tests for "6 / 20" and for the error replacing the helper text
- [x] 3.6 Wrap the leading and trailing elements in `IconDefaultsProvider` and verify a test that a bare `Icon` takes the field's icon size and text color
- [x] 3.7 Extend the touch area to 44 pt on iOS and 48 dp on Android with `hitSlop` and focus the input on press, and verify a test of the `hitSlop` values per size and per platform and that pressing the field focuses the input

## 4. Accessibility

- [x] 4.1 Set the label, required, disabled and error hint on the input and announce an appearing error, and verify tests that fail if the label, the ", required" suffix, the hint or the announcement call is removed
- [x] 4.2 Measure every text and background pair with `contrast.test.ts`, list failures under "Accessibility exceptions" in the TextField spec, and verify each listed ratio matches the test output
- [x] 4.3 Walk the stories with VoiceOver on iOS and TalkBack on Android and verify the label, value, required, disabled and error are read as the spec says

## 5. Stories and exports

- [x] 5.1 Add `TextField.stories.tsx` with the grouped stories Styles, Sizes, States, Content and Playground, and verify they run in `apps/storybook` and each group shows several fields
- [x] 5.2 Export `TextField` and its prop types from `packages/ui-kit/src/index.ts`, and verify `just typecheck` passes for the kit and the Storybook app
- [x] 5.3 Compare each story with its Figma frames on a device and verify heights, colors, spacing and the focus ring on both iOS and Android, noting any intentional difference in the spec

## 6. Specs and indexes

- [x] 6.1 Add the row `[text-field](text-field/spec.md)` with "Using or changing the TextField" to `openspec/specs/components/ui-kit/README.md` and verify the link resolves
- [x] 6.2 Update the Read when of `openspec/specs/components/ui-kit/README.md` row `icon` only if the new names change its trigger, and verify the row still matches `icon/spec.md`
- [x] 6.3 Run `openspec validate add-text-field-component --strict` and `just check` and verify both pass
