## 1. Source of the icons

- [x] 1.1 Add `bootstrap-icons@1.13.2` to the workspace catalog and as a development dependency of `packages/ui-kit`, and verify `pnpm install` succeeds and the package's `icons/info-circle.svg` exists
- [x] 1.2 Add `scripts/icons.json` with `check-circle` and `info-circle`, and `scripts/generate-icons.mjs` with the `pnpm icons` script, and verify the command writes `src/Icon/glyphs.generated.tsx` with only those two icons
- [x] 1.3 Make `glyphs.tsx` merge the generated icons with `dot`, and verify the existing `Icon` and `Badge` tests still pass
- [x] 1.4 Add `bootstrap-icons` to knip's ignored dependencies for `packages/ui-kit`, and verify `pnpm knip` and `biome check` pass

## 2. Tests

- [x] 2.1 Add a test that every name in `scripts/icons.json` has a glyph, and that a name missing from the generated file fails it
- [x] 2.2 Add a test that each generated glyph's path data equals the path data in the installed package's SVG for that name, and verify it fails when a generated path is changed
- [x] 2.3 Add a type test that an unlisted name is rejected, with `// @ts-expect-error`, and verify `pnpm typecheck` passes
- [x] 2.4 Add `bell` to the list, run `pnpm icons`, verify an Icon named `bell` type checks and renders, then remove it again

## 3. Bundle and stories

- [x] 3.1 Add `Icon.stories.tsx` with a name selector and a size control
- [x] 3.2 Run the Storybook story on iOS or Android and verify both icons draw and take the text color
- [x] 3.3 Build the Storybook app bundle and verify the `bell` path data is not in it while `bell` is off the list

## 4. Specs and indexes

- [x] 4.1 After `add-badge-component` is archived, archive this change and verify `openspec/specs/components/ui-kit/icon/spec.md` holds the new requirements
- [x] 4.2 Update the `icon` row of `openspec/specs/components/ui-kit/README.md` so its Read when mentions where icon glyphs come from, and verify the link resolves
