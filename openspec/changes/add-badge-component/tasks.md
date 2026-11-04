## 1. Read the design

- [x] 1.1 Read the Figma variables of one `filled-solid`, `filled-light` and `outlined-light` Badge for each of `success`, `danger` and `warning` and of every `circle` and `dot` style, and verify each surface, stroke and text color maps to a token in `packages/ui-kit/tailwind/tokens/colors.ts`
- [x] 1.2 Read the paddings, radii and label sizes of the `s`, `xs` and `xxs` `circle` Badges, and verify the size table in `specs/components/ui-kit/badge/spec.md` matches them or update the table
- [x] 1.3 Download the Figma `check-circle` and `info-circle` outline SVGs and verify both files are non-empty and keep their root width and height

## 2. Icon

- [x] 2.1 Add `packages/ui-kit/src/Icon/` with the two icon components, the name map and `Icon`, and verify `check-circle` and `info-circle` render at the default 16 px in a test
- [x] 2.2 Add the size and text color context, and verify in a test that an `Icon` takes the context size and color and that an explicit size or color wins
- [x] 2.3 Hide the Icon from assistive technology unless it has an accessibility label, and verify both cases in a test
- [ ] 2.4 Verify NativeWind applies the text color class to the SVG color on iOS or in the Storybook app, or move the mapping into the Icon as the design allows

## 3. Badge

- [x] 3.1 Add `packages/ui-kit/src/Badge/Badge.tsx` with the style-by-type look table, size table and shape rules, and verify with a test that every combination of type, style, size and shape renders without error
- [x] 3.2 Render the leading dot, `leadingIcon`, label and `trailingIcon` in order for `rounded` and `pill`, and verify the order and the icon size and color in a test
- [x] 3.3 Render `circle` with its count and `dot` with no text, and verify the minimum width of `circle` and the dot size at each Badge size in a test
- [x] 3.4 Add the text role and the default accessibility label, hide an unlabelled `dot`, and verify announcements by role and label queries in a test
- [x] 3.5 Extend `noArbitraryValues.test.ts` coverage to the Badge files and verify it passes
- [x] 3.6 Measure every text and background pair with `contrast.test.ts`, list failures under "Accessibility exceptions" in the Badge spec, and verify each listed ratio matches the test output

## 4. Stories and exports

- [ ] 4.1 Add `Badge.stories.tsx` with the grouped stories Types, Styles, Sizes, Shapes, Content and Playground, and verify they run in `apps/storybook` and each group shows several badges
- [x] 4.2 Export `Badge`, `Icon` and their prop types from `packages/ui-kit/src/index.ts`, and verify `pnpm` type checking passes for the kit and the Storybook app
- [ ] 4.3 Compare each story with its Figma frames and verify heights, colors and spacing match, noting any intentional difference in the spec

## 5. Specs and indexes

- [ ] 5.1 Add rows for `badge` and `icon` to `openspec/specs/components/ui-kit/README.md` with their "Read when", and verify the links resolve
- [x] 5.2 Run `openspec validate add-badge-component --strict` and verify it passes
