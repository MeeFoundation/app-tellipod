## 1. Colors story

- [x] 1.1 Add a helper in `packages/ui-kit/src/Colors/flattenColors.ts` (kept out of the stories file so Jest can import it) that flattens `colors` into dotted-path and value pairs, with a unit test on a small sample object. The test fails if nesting is not followed.
- [x] 1.2 Add `Swatch` (filled square, name caption below) and the checkerboard backdrop for translucent values.
- [x] 1.3 Add stories `Palette`, `Surface`, `Text`, `Stroke` and `Overlays` under the title `Foundations/Colors`, each showing its groups with a section header.
- [x] 1.4 Add a header comment stating why the swatch fill uses inline `style`.

- [x] 1.5 Remove the global `TouchableWithoutFeedback` decorator in `apps/storybook/.rnstorybook/preview.tsx` so stories can scroll.
- [x] 1.6 Draw the checkerboard per swatch for translucent values (`isTranslucent`), with its size derived from the swatch size.

## 2. Verification

- [x] 2.1 Test that every leaf of `colors` appears in the flattened list, so a new token cannot be missed. Remove a group from the helper and confirm the test fails.
- [x] 2.2 Run `just lint`, `just typecheck`, `just knip` and the kit tests, including `noArbitraryValues.test.ts`.
- [x] 2.3 Open the story selector in the Storybook app on iOS and Android and confirm a tap outside a focused `TextField` still dismisses the keyboard, that `Foundations/Colors` is listed and each story shows swatches with names and a visible checkerboard under `outline.*`, `alpha.*` and `transparent`, and that each story scrolls.

## 3. Specs and indexes

- [x] 3.1 Update `openspec/specs/components/ui-kit/README.md`: change the `storybook` row's Read when to "Adding or changing a component story or a token story" and the `tokens-and-theming` row to include "browsing the color tokens".
- [x] 3.2 Run `openspec validate --all --strict` and check scenario headings are `#### Scenario:`.
