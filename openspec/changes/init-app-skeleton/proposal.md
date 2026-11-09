## Why

`apps/app-tellipod` is an empty shell: `src/index.ts` is `export {}` and the package has no Expo configuration or dependencies, so the app cannot be started.
Every feature spec under `components/mobile-common` assumes a running app with Expo Router, the UI kit and the layered layout from `apps/app-tellipod/README.md`.
A minimal bootable app proves that toolchain end to end before feature work starts.

**Example:** `just app` starts Metro, and the iOS simulator and an Android emulator show a screen with the heading "Hello, Tellipod" and a UI-kit `Button`, styled with the kit's tokens and set in Public Sans.

## What Changes

- Turn `apps/app-tellipod` into an Expo app (Expo Router entry, `app.json`, Babel, Metro, Tailwind and NativeWind configuration), following the setup already working in `apps/storybook`.
- Add the root layout `src/app/_layout.tsx`: loads Public Sans, and mounts the safe-area and gesture providers.
- Add one route, `src/app/index.tsx`, that only renders `HelloScreen` from `src/screens/`.
- Add `HelloScreen`, built from the UI kit (`@tellipod/ui-kit`) and kit tokens only.
- Add `expo-router` and any missing Expo packages to the pnpm catalog and to the app.
- Add a `just app` recipe, extend `knip.json` for the new workspace, and update the root and app READMEs.
- Out of scope: launch state machine, onboarding, identities, unlock, navigation tabs, pods, data layer, app icon and splash artwork.

## Capabilities

### New Capabilities

- `components/mobile-common/shell/app-bootstrap`: how the app starts and what it shows before any feature exists: Expo Router entry, root providers, fonts, and the hello screen.

### Modified Capabilities

None. [launch-and-unlock](../../specs/components/mobile-common/shell/launch-and-unlock/spec.md) will later replace the hello route; that is not part of this change.

## Impact

- Code: `apps/app-tellipod` (new files and `package.json`, `tsconfig.json`), `pnpm-workspace.yaml` (catalog), `pnpm-lock.yaml`, `knip.json`, `justfile`, `README.md`, `apps/app-tellipod/README.md`.
- Dependencies: `expo-router` and its peers (for example `expo-linking`, `expo-constants`, `react-native-screens`) at versions compatible with Expo 57 and older than the 7-day `minimumReleaseAge`.
- Specs: new `shell/app-bootstrap` spec; `components/mobile-common/shell/README.md` gains a row.
- Authoritative sources: [ADR-0001](../../specs/architecture/adr/0001-react-native-cross-platform.md) (Expo Router, routes in `app/`), [ADR-0002](../../specs/architecture/adr/0002-ui-component-library.md) (UI kit), `apps/app-tellipod/README.md` (layers).

## Open questions

- Bundle identifier and Android package: proposed `com.tellipod.app`, matching the existing `com.tellipod.storybook`.
  **Example:** if the store identifier is `org.mee.tellipod`, it replaces `com.tellipod.app` in `app.json`; nothing else changes.
- The UI kit has no text component yet, so the heading uses React Native `Text` with kit token classes.
  **Example:** `className="text-2xl font-semibold text-..."` from the kit's Tailwind preset, not literal colors.
