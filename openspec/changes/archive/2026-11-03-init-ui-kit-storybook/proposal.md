## Why

`packages/` is empty and `apps/app-tellipod` has no Expo app, yet the specs already require a shared `packages/ui-kit` styled with NativeWind and documented in on-device Storybook (ADR-0002, `components/ui-kit`).
No screen can be built from Figma until the kit, its design tokens and a way to view components on a device exist.

**Example:** the Figma Button ("Mee - Design System v5.2.4", Buttons) has 192 variants: Size `S`, `M`, `L`, `XXL` (heights 30, 36, 44, 56), Style `Filled`, `Outlined`, `Link`, Type `Primary`, `Secondary`, `Tertiary`, `Danger`, State `Default`, `Hover`, `Focus`, `Disabled`.
Today a screen would have to hard-code these colors and sizes.

## What Changes

- Add `packages/ui-kit`: a from-scratch React Native package styled with NativeWind v4 and Tailwind 3.4.
- The kit exports one Tailwind preset holding the foundation tokens read from Figma: colors, outlines, shadows, spacing and typography. Icons, opacity and overlays stay out until a component needs them.
- Add a `Button` component with the Figma name and variants, and its stories next to it.
- Add `apps/storybook`: a separate Expo SDK 57 app that exists only to run on-device Storybook (`@storybook/react-native`). It consumes the kit's preset.
- Hover maps to the pressed state and Focus to a visible focus ring, because touch devices have no hover.
- The Button carries role, label and state. Where the design cannot meet WCAG 2.2 AA, it is built as designed and the exception is documented.
- Stories are compact: each story renders several buttons, not all 192 variants.
- Bump `packageManager` from `pnpm@9.1.1` to `pnpm@11.28.9` so the existing `minimumReleaseAge`, `strictDepBuilds` and `allowBuilds` settings in `pnpm-workspace.yaml` take effect.
- Add an ADR: on-device Storybook lives in its own Expo app.

## Capabilities

### New Capabilities

- `components/ui-kit/button`: the Button's variants, states, content slots and accessibility contract.

### Modified Capabilities

- `components/ui-kit/storybook`: stories run in a dedicated Storybook app on iOS and Android, and each story groups several variants.
- `components/ui-kit/tokens-and-theming`: the kit exports its theme as one Tailwind preset, and a design color pair that fails contrast is built as designed and documented as an exception.

## Impact

- New: `packages/ui-kit`, `apps/storybook`, `openspec/specs/architecture/adr/0003-*.md`.
- Edited: `package.json` (`packageManager`), `pnpm-workspace.yaml` (`allowBuilds` entries for native dependencies), `knip.json` (new workspaces), `justfile` (Storybook recipe), `.gitignore` if Expo generates new ignorable folders.
- Indexes: `openspec/specs/components/ui-kit/README.md` (new Button row) and `openspec/specs/architecture/adr/README.md` (new ADR row).
- Dependencies: `expo` 57, `nativewind` 4.2.7, `tailwindcss` 3.4.19, `@storybook/react-native`, and `jest-expo` with `@testing-library/react-native` for the Button's checks. Each must be at least 7 days old (`minimumReleaseAge: 10080`).
- `apps/app-tellipod` is untouched. Wiring the real app to the kit is a later change.
- Authoritative sources: Figma file "Mee - Design System v5.2.4" (Buttons, Colors, Outlines, Shadows, Spacing, Typography), WCAG 2.2 AA through `code-practices/accessibility`.

## Open questions

### Token values

The Figma metadata gives structure only: 8 color columns, and typography in Public Sans with weights Light to Bold over the styles Caption, H1 to H6, Paragraph and Body.
The values need `get_variable_defs` or `get_design_context`, which currently need a node selected in Figma desktop.
Until they are read, the contrast of each color pair is unknown.

**Example:** read the Button's `Primary` + `Filled` + `Default` background and label color, then check the pair against 4.5:1 before the token pair is added.

### Counter badge and icons in the Button

The Figma Button shows a leading `+` icon, a label, a counter badge ("99+") and a trailing chevron.
The kit holds only components a screen uses, the Badge component is not in the kit, and the kit has no icon set.

**Example:** the `M` Filled Primary button reads `[+] Button [99+] [v]`.

| Option | Button in this change | Consequence |
| --- | --- | --- |
| A (recommended) | Label, plus `leadingIcon` and `trailingIcon` slots that take any element | No icon set or Badge is needed. Badge joins when a screen needs it. |
| B | Label only | Smallest scope, but the design's icons cannot be shown. |
| C | All four parts, with the Badge and an icon set built now | Matches Figma fully, but adds two components no screen uses yet. |

### Accessibility exceptions

Disabled controls are exempt from WCAG contrast, but `Link` and `Tertiary` pairs may fail 4.5:1 in Default.
Where and how an exception is marked is undecided.

**Example:** a failing `Tertiary` + `Outlined` pair is built as designed and listed in the Button spec under an exceptions heading, with its measured ratio.
