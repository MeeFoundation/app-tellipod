## Context

See proposal.md for motivation and scope.

- The repo is a pnpm workspace (`apps/*`, `packages/*`) with `node-linker=hoisted`, Biome, knip and TypeScript 7.0.2. `packages/` is empty and `apps/app-tellipod` holds only `package.json` and `src/.gitkeep`.
- `pnpm-workspace.yaml` sets `minimumReleaseAge: 10080` (7 days), `strictDepBuilds: true` and an empty `allowBuilds`. `packageManager` says `pnpm@9.1.1`, which does not read those settings.
- Authoritative contracts already exist: [ADR-0002](../../specs/architecture/adr/0002-ui-component-library.md), [tokens-and-theming](../../specs/components/ui-kit/tokens-and-theming/spec.md), [storybook](../../specs/components/ui-kit/storybook/spec.md), [components](../../specs/components/ui-kit/components/spec.md) and [accessibility](../../specs/code-practices/accessibility/spec.md). This design does not restate them.
- The Figma Button has 192 variants: 4 sizes, 3 styles, 4 types, 4 states. Token values are not yet read (see Open Questions).

## Goals / Non-Goals

**Goals:**

- One Tailwind preset in the kit that both the Storybook app and, later, the Tellipod app consume.
- A Button whose variants are data (lookup tables of complete class strings), so adding a variant is a table entry.
- Scenario checks that fail when the mechanism is removed: press handling, disabled behavior, role and state, variant look.

**Non-Goals:**

- Wiring `apps/app-tellipod` to the kit or creating an Expo app there.
- A published or web Storybook, a dark theme, Badge, icons, opacity and overlay tokens.
- Code Connect mappings between Figma and the kit.

## Decisions

### Layout

```
packages/ui-kit/
  package.json            name @tellipod/ui-kit, main -> src/index.ts
  tailwind/preset.ts      the one theme; default export is a Tailwind preset
  tailwind/tokens/        colors.ts outlines.ts shadows.ts spacing.ts typography.ts
  src/index.ts            public surface: Button
  src/Button/Button.tsx
  src/Button/Button.stories.tsx
  src/Button/Button.test.tsx
apps/storybook/
  package.json            name @tellipod/storybook, Expo SDK 57
  app.json                userInterfaceStyle "light"
  tailwind.config.ts      presets: [kit preset]; content: kit src + app
  metro.config.js         NativeWind + Storybook wrappers, monorepo watch folders
  .rnstorybook/           main.ts (story globs into packages/ui-kit/src), preview.tsx
```

The kit ships TypeScript source, not a build. Metro compiles it, so there is no build step to maintain.

### Tokens become Tailwind theme keys, one file per Figma foundation

Each foundation maps to one token file, spread into the preset's `theme`:

| Figma foundation | Theme keys |
| --- | --- |
| Colors | `colors` |
| Outlines | `borderWidth`, `ringWidth`, `ringColor` |
| Shadows | `boxShadow` |
| Spacing | `spacing` |
| Typography | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` |

The preset sets these keys under `theme`, not `theme.extend`.
A utility with no token then has no class, which turns "a design value has no token" from a review comment into a missing class.
Token names follow Figma's names; the values are read from Figma during apply.

### Button variants are complete class strings in two tables

- `SIZE_CLASSES`: four entries (height, horizontal padding, text style, gap).
- `STYLE_TYPE_CLASSES`: twelve entries, one per style and type, each holding the full string for default, `active:` (Figma Hover), `focus:` (Figma Focus) and `disabled:` looks.

`Button` picks one entry from each table and joins them. No class name is assembled by concatenation, so NativeWind's static scan sees every class ([tokens-and-theming](../../specs/components/ui-kit/tokens-and-theming/spec.md)).
It renders a `Pressable` with `accessibilityRole="button"`, `accessibilityLabel` defaulting to its text, and `accessibilityState={{ disabled }}`.

### Light theme only

`app.json` sets `userInterfaceStyle: "light"` and no component uses `dark:` classes, so a device in dark mode still shows the light theme.

### Storybook runs in its own Expo app

`apps/storybook` renders the `@storybook/react-native` UI from its entry point. Its story globs point into `packages/ui-kit/src`, so stories stay next to the component.
Controls and actions use the on-device addons.
The choice is durable, so it is recorded as ADR-0003, which refines [ADR-0002](../../specs/architecture/adr/0002-ui-component-library.md).
Stories are titled `UI/Button/<Story>` and are few and grouped: `Types`, `Styles`, `Sizes`, `States`, each rendering several buttons. A `Playground` story takes controls for a single button.

### Tests

The kit uses `jest-expo` with `@testing-library/react-native`.
Tests assert behavior: the handler runs once on press, not when disabled, the role and label are exposed, and the chosen size, style and type select their class strings.

### Tooling versions

| Piece | Version | Why |
| --- | --- | --- |
| pnpm | `11.28.9` | `allowBuilds` and `strictDepBuilds` are pnpm 11 settings, and it is older than the 7-day window. |
| Expo | SDK 57 (`sdk-57` tag) | SDK 58 (`58.0.22`, 2026-10-31) is inside the 7-day window. |
| NativeWind | `4.2.7` | The newest stable. v5 is a release candidate published 2026-11-02. |
| Tailwind | `3.4.19` | NativeWind v4 targets Tailwind 3. |

**Rejected alternatives:**

- Storybook inside `apps/app-tellipod`: the app has no Expo setup, and ADR-0002 wants Storybook isolated from the app.
- Storybook with its own host inside `packages/ui-kit`: a package that owns a Metro app blurs the package boundary.
- NativeWind v5 and Tailwind 4: release candidate, and too fresh for `minimumReleaseAge`.
- Expo SDK 58: too fresh for `minimumReleaseAge`, and less tested against NativeWind 4.
- pnpm 10: needs `onlyBuiltDependencies`, so the existing workspace config would be rewritten.
- pnpm 12: its releases are inside the 7-day window.
- Staying on pnpm 9.1.1: `minimumReleaseAge` and `strictDepBuilds` would be ignored.
- `theme.extend`: the default Tailwind scale would stay available next to the tokens, so literal values would still have classes.
- Variant libraries (`class-variance-authority`, `tailwind-variants`): an extra dependency for two lookup tables.
- A dedicated ADR for the preset: it follows from the existing tokens spec and needs no ADR.

## Risks / Trade-offs

- [NativeWind 4.2.7 against SDK 57's React Native version may have gaps] → Verify on a device early in apply, before building the full variant tables.
- [NativeWind maps `shadow-*` to React Native shadow props, which cannot express every Figma shadow] → Compare the rendered shadow with Figma and list differences in the Button spec.
- [Public Sans weights are separate font families on React Native] → The typography tokens name one family per weight, and the Storybook app loads them with `expo-font`.
- [A new dependency under `strictDepBuilds` can fail the install] → Add only the packages whose build scripts are needed to `allowBuilds`, one at a time, each with a reason.
- [Hover mapped to pressed means a pressed look that was designed for hover] → Accepted; the mapping is in the Button spec.

## Migration Plan

1. Bump `packageManager`, regenerate `pnpm-lock.yaml`, and confirm `just check` passes before adding the kit.
2. Add the kit, then the Storybook app.
3. Rollback is reverting the change: nothing else in the repo depends on the new packages.

## Open Questions

- Token values and names must be read from Figma during apply. This needs a node selected in Figma desktop, or a `use_figma` read. It does not change the layout or tasks.
- Which `allowBuilds` entries the Expo, Storybook and Jest dependencies need is known only after the first install.
