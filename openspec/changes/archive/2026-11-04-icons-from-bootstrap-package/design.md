## Context

`packages/ui-kit/src/Icon` has `Icon`, `IconDefaults` (size and color context for the Badge) and `glyphs.tsx`, which held two hand-copied icons and the Badge `dot`.
Icons render with `react-native-svg` and take their color from `currentColor` through NativeWind's `cssInterop` (`StyledSvg`).
The Bootstrap Icons package ships one SVG per icon, 16 px, `fill="currentColor"`, built from `<path>` elements. See proposal.md for the motivation.

## Goals / Non-Goals

**Goals:**
- Get glyph shapes from the package, never from a hand copy.
- Bundle only the icons the app lists.

**Non-Goals:**
- The filled, logo, filetype and custom icons of the Figma set.
- Changing `Icon`'s props, sizing, color or accessibility behavior.

## Decisions

### A generator writes a TypeScript file for the listed icons

`scripts/generate-icons.mjs` reads `scripts/icons.json`, finds each SVG in the installed package and writes `src/Icon/glyphs.generated.tsx`: one small component of `<Path>` elements per icon, a name union and a name-to-component record.
`glyphs.tsx` merges that record with `dot`, so `Icon` and its `IconName` type are unchanged.
The file is committed, so builds and tests need no extra step, and `pnpm icons` also formats it.
The script fails on any element other than `path`, so an icon it cannot draw is reported at generation time.

**Rejected alternatives:**
- Import `.svg` files through `react-native-svg-transformer` with a map of `require()` calls. Metro bundles every file the map names, so a map of the whole set would ship about 2,000 icons, and a map of the used ones needs the same list this design already has, plus Metro and Jest transformer setup.
- A Bootstrap Icons font. It ships every glyph in one file, draws text instead of SVG, and replaces `react-native-svg`, `currentColor` tinting and the existing tests.
- Hand-copy each icon from Figma. This is what the kit did, and it is what the change removes.

### `bootstrap-icons` is a development dependency

The package is read only when icons are generated, and its SVGs never ship, so it is a devDependency pinned in the workspace catalog.
knip cannot see the script's path-based read, so `knip.json` ignores the package for `packages/ui-kit`.

### `dot` stays hand-drawn

The leading dot is a Badge shape of the design, not an icon of the set, so it stays in `glyphs.tsx`.

## Risks / Trade-offs

- [The generated file drifts from the list] → A test compares the generated name list with `icons.json`.
- [An update of the package changes shapes] → The package is pinned, and an update shows up as a diff of the generated file.
- [The script parses SVG with a pattern, so a new element type is missed] → It throws on anything but `path`, so no icon is drawn wrongly without notice.
- [The Figma set uses 24 px frames and the package 16 px] → The `viewBox` scales the icon, and its default size stays 16 px as specified.
- [The `icon` spec is not archived yet] → Archive `add-badge-component` first, so this delta has a spec to extend.
