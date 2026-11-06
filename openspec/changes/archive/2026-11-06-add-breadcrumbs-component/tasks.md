## 1. Icons

- [x] 1.1 Add `house` and `chevron-right` to `RAW_GLYPHS` in `packages/ui-kit/src/Icon/glyphs.tsx` from the Bootstrap Icons package, and verify an `Icon.test.tsx` case renders each glyph and a type check rejects an unlisted name
- [x] 1.2 Add the two icons to `Icon.stories.tsx`, and verify they open in Storybook on iOS and Android

## 2. Breadcrumbs component

- [x] 2.1 Create `src/Breadcrumbs/breadcrumbsStyles.ts` with the sizes, styles and link looks of the spec as whole class strings, and verify `noArbitraryValues.test.ts` passes and every class resolves to a token
- [x] 2.2 Create `Breadcrumbs.tsx` with `size`, `style`, the sizes context, the "last item has no chevron" context and the outlined wrapper, and verify a render test shows the chevron after every item but the last and the outlined wrapper's fill, border and padding per size
- [x] 2.3 Create `Breadcrumb.tsx` with `label`, `onPress`, `disabled` and `leadingIcon`, rendering a link when `onPress` is given and text when not, and verify tests show `onPress` is called once for a link, not for plain text and not for a disabled link
- [x] 2.4 Add the pressed and focused looks and the Hover underline, and verify tests show the pressed look while pressing and the Focus fill after focus, and that they fail if the state tracking is removed
- [x] 2.5 Make the line a horizontal `ScrollView` that starts at the end, as wide as its items and no wider than its parent, and verify a test scrolls to the end when the content is wider, does not scroll when it fits and does not scroll again on a re-render with the same items
- [x] 2.6 Add the accessibility props of the spec (line label, link role and disabled state, hidden chevron and icon), and verify a test on the props, and a VoiceOver and TalkBack walk-through reads "Medical records, link" and does not read the chevron
- [x] 2.7 Add vertical `hitSlop` to the minimum of 44 pt on iOS and 48 dp on Android, reusing `hitSlopFor` from `Tabs` without copying it, and verify a test of the slop for sizes `s`, `m` and `l` and that `just knip` passes
- [x] 2.8 Export `Breadcrumbs`, `Breadcrumb` and their types from `src/index.ts`, and verify `just typecheck` passes for the kit and the Storybook app

## 3. Stories

- [x] 3.1 Add `src/Breadcrumbs/Breadcrumbs.stories.tsx` titled `UI/Breadcrumbs` covering sizes, styles, states (Default, pressed look, Focus, Disabled, plain text) and a long trail, and verify the stories open on iOS and Android and match the Figma screenshots of nodes 2761:50255 and 2761:49376
- [x] 3.2 Measure the contrast of every Default, Hover, Focus and plain text pair with `tailwind/contrast.ts`, and verify the "Accessibility exceptions" table lists every pair below 4.5:1 and no other

## 4. Specs and indexes

- [x] 4.1 Add a row for `breadcrumbs` after `tabs` to `openspec/specs/components/ui-kit/README.md`, reading "Using or changing the Breadcrumbs", in the main tree after archive
- [x] 4.2 Run the long-trail story on iOS and Android with the largest system font and the touch area of a size `s` link, and record any difference in the spec's open questions
- [x] 4.3 Run `just check` and `openspec validate add-breadcrumbs-component --strict`, inspect that every scenario heading has four hashes, and verify all pass
