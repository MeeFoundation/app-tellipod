## 1. Toolchain

- [x] 1.1 Set `packageManager` to `pnpm@11.28.9` in `package.json`, run `pnpm install`, and verify `pnpm --version` reports 11.28.9 and `pnpm-lock.yaml` regenerates without errors
- [x] 1.2 Run `just check` on the unchanged repo under pnpm 11 and verify lint, typecheck and knip still pass
- [x] 1.3 Confirm each planned dependency (`expo` 57.x, `nativewind` 4.2.7, `tailwindcss` 3.4.19, `@storybook/react-native`, `jest-expo`, `@testing-library/react-native`) has a version published at least 7 days ago with `npm view <pkg> time`, and record the pinned versions in the task notes
  - Pinned (all older than 7 days on 2026-11-02): `expo` 57.0.31 (2026-10-21), `nativewind` 4.2.7 (2026-09-14), `tailwindcss` 3.4.19 (2025-12-10), `@storybook/react-native` 10.7.0 (2026-10-13; 10.7.1 is 3 days old), `jest-expo` 57.0.6 (2026-10-12), `@testing-library/react-native` 14.1.0 (2026-10-08). `storybook` peer is ^10.5.4, so use a release older than 7 days, such as 10.6.3 (2026-10-20).

## 2. Read tokens from Figma

- [x] 2.1 With the Colors, Outlines, Shadows, Spacing and Typography nodes selected in Figma desktop (or via `use_figma`), read their variables and verify every foundation in the preset table of design.md has its values listed in a scratch file
- [x] 2.2 Read the Button's Primary, Secondary, Tertiary and Danger variants in all four states and verify each style and type maps to named color tokens, with no value left unnamed

## 3. UI kit package

- [x] 3.1 Create `packages/ui-kit` with `package.json`, `tsconfig.json` and `src/index.ts`, and verify `pnpm typecheck` includes it
- [x] 3.2 Add the five token files and `tailwind/preset.ts`, and verify a Jest test loads the preset and finds each token group, and fails when a token file is removed from the preset
- [x] 3.3 Add a test that scans the kit sources for arbitrary-value classes such as `bg-[#` and `p-[13px]` and verify it fails when one is added
- [x] 3.4 Add contrast measurement for text and background token pairs used by the Button, and verify it reports a ratio for every pair; record any pair below 4.5:1 under "Accessibility exceptions" in the Button spec
- [x] 3.5 Set up `jest-expo` with `@testing-library/react-native` in the kit and verify `pnpm --filter @tellipod/ui-kit test` runs

## 4. Button

- [x] 4.1 Implement `Button` with the `SIZE_CLASSES` and `STYLE_TYPE_CLASSES` tables, with defaults `m`, `filled` and `primary`, and verify tests show a bare Button selects the size `m` Primary filled classes and an `outlined` `secondary` Button selects the Secondary outlined classes
- [x] 4.2 Verify with a test that sizes `s`, `m`, `l` and `xxl` select classes giving heights 30, 36, 44 and 56
- [x] 4.3 Map the Figma Hover look to `active:` classes and the Focus look to `focus:` classes in every table entry, and verify a test finds both class sets on each of the 12 style and type entries
- [x] 4.4 Implement press handling and the disabled look, and verify tests show one call on press, no call when disabled, and the Disabled classes applied
- [x] 4.5 Add `accessibilityRole`, the label defaulting to the visible text, and `accessibilityState`, and verify tests find role `button`, label "Save" and `disabled: true` for a disabled Button
- [x] 4.6 Verify no `StyleSheet.create`, inline `style` or string-built class names exist in `Button.tsx` with a lint or test check that fails when one is added

## 5. Storybook app

- [x] 5.1 Create `apps/storybook` as an Expo SDK 57 app with `app.json` (`userInterfaceStyle: "light"`), `tailwind.config.ts` using the kit preset, and `metro.config.js`, and verify `pnpm --filter @tellipod/storybook exec expo export --platform ios` succeeds
- [x] 5.2 Add `@storybook/react-native` with on-device controls and actions, with story globs into `packages/ui-kit/src`, and verify the story selector lists the Button stories
- [x] 5.3 Add `Button.stories.tsx` next to the Button with the stories `Types`, `Styles`, `Sizes`, `States` and `Playground`, titled `UI/Button/<Story>`, and verify each opens and shows several buttons side by side
- [x] 5.4 Load Public Sans weights in the Storybook app and verify the Button label renders in the typography token's family
- [x] 5.5 Run the app on an iOS simulator and an Android emulator and verify the selector lists all stories, the pressed look appears on press, the focus ring appears with focus, and a dark-mode device still shows the light theme
- [x] 5.6 Compare the rendered Button with the Figma Button for sizes, colors, outlines and shadows, and list any difference under "Accessibility exceptions" or in the design's Risks section

## 6. Workspace wiring

- [x] 6.1 Add `packages/ui-kit` and `apps/storybook` to `knip.json` and verify `just knip` passes
- [x] 6.2 Add `allowBuilds` entries to `pnpm-workspace.yaml` only for dependencies whose build scripts the install needs, and verify a clean `pnpm install` with `strictDepBuilds` succeeds
- [x] 6.3 Add a `storybook` recipe to `justfile` that starts the Storybook app, and verify `just --list` shows it and it starts Metro
- [x] 6.4 Run `just check` and verify lint, typecheck and knip pass for the whole workspace

## 7. Documentation and indexes

- [x] 7.1 Add `openspec/specs/architecture/adr/0003-storybook-in-own-expo-app.md` recording the decision and its rejected alternatives, and verify it opens with a Read when line
- [x] 7.2 In `openspec/specs/architecture/adr/README.md`, add a row for ADR 0003 whose Read when matches the ADR, and verify it matches
- [x] 7.3 In `openspec/specs/components/ui-kit/README.md`, add a row for `button` with Read when "Using or changing the Button", and verify the link opens
- [x] 7.4 Run `openspec validate init-ui-kit-storybook --strict` and verify it passes, then check by eye that every scenario heading has exactly four hashes
