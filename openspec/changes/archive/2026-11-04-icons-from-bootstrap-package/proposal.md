## Why

The kit's `Icon` draws two glyphs, `check-circle` and `info-circle`, whose paths were copied by hand from Figma.
The design system's icons are the Bootstrap Icons set (https://icons.getbootstrap.com), so every new icon would be another hand copy that can drift from the source.
The `icon` spec left "how the set is generated" open, and this change decides it for the icons the app uses.

**Example:** the Figma Icons page ("Mee - Design System v5.2.4", node 4:188) holds about 2,000 icons named `icon / outline / info-circle`, `icon / filled / info-circle` and so on, each on a 24 px frame.
A screen that needs `bell` today would need a Figma export and a hand-written path. With this change it adds `bell` to a list and runs one command.

## What Changes

- Add `bootstrap-icons` as a development dependency of `packages/ui-kit`, pinned in the workspace catalog.
- Add `packages/ui-kit/scripts/icons.json`, the list of Bootstrap icon names the app uses, starting with `check-circle` and `info-circle`.
- Add `packages/ui-kit/scripts/generate-icons.mjs` and a `pnpm icons` script. It reads the listed SVGs from the package and writes `src/Icon/glyphs.generated.tsx`.
- `Icon` draws its glyphs from the generated file. Only the listed icons are in the app bundle, so the unused icons of the set cost nothing.
- The Badge's leading `dot` stays hand-drawn, because it is not a Bootstrap icon.
- Add `Icon.stories.tsx` with a name selector and a size control.
- Make knip ignore `bootstrap-icons`, which only the script reads by path.

No visible change: the two glyphs have the same shapes as before, now taken from the package.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `components/ui-kit/icon`: icons come from the Bootstrap Icons package, only listed icons are available, and `pnpm icons` keeps the generated file in step with the list.
  This spec is still a delta in the unarchived change `add-badge-component`, so archive that change first, then this one.

## Impact

- New: `packages/ui-kit/scripts/`, `packages/ui-kit/src/Icon/glyphs.generated.tsx`, `packages/ui-kit/src/Icon/Icon.stories.tsx`.
- Edited: `packages/ui-kit/src/Icon/glyphs.tsx`, `packages/ui-kit/package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `knip.json`.
- Dependencies: `bootstrap-icons@1.13.2`, development only. Nothing new ships in the app besides the listed paths.
- Authoritative sources: https://icons.getbootstrap.com, Figma file "Mee - Design System v5.2.4" (Icons page, node 4:188).

## Open questions

### The rest of the Figma set

The Figma page also has filled, logo, filetype and 9 custom icons. This change adds none of them.

**Example:** Figma's `icon / filled / info-circle` should map to the package's `info-circle-fill`, and `icon / outline / filetype-pdf` to `filetype-pdf`. These mappings are unchecked, and the 9 custom icons are not in the package at all.

| Option | Consequence |
| --- | --- |
| A (recommended) | Add icons by their package name when a screen needs them, and decide the `-fill` naming and the custom icons then. |
| B | Add every Figma name now, which ships a mapping nobody has used or checked. |

This change takes A.
