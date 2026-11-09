## 1. Dependencies and package setup

- [x] 1.1 Add `expo-router`, `expo-linking`, `expo-constants`, `expo-status-bar` and `react-native-screens` to the `catalog:` in `pnpm-workspace.yaml` at Expo 57 compatible versions that satisfy `minimumReleaseAge`
- [x] 1.2 Rewrite `apps/app-tellipod/package.json`: `main: expo-router/entry`, `start`, `ios`, `android` and `typecheck` scripts, dependencies from the catalog (mirror `apps/storybook` plus the router packages), `@tellipod/ui-kit` as `workspace:*`
- [x] 1.3 Run `pnpm install` and confirm the lockfile updates without errors

## 2. Expo and styling configuration

- [x] 2.1 Add `apps/app-tellipod/app.json` (name Tellipod, slug, portrait, `com.tellipod.app` for iOS and Android, `expo-router` plugin)
- [x] 2.2 Add `babel.config.js`, `metro.config.js` (NativeWind and `withSvgComponents`), `tailwind.config.ts` (kit preset, content globs for `src` and the kit), `global.css` and `nativewind-env.d.ts`
- [x] 2.3 Update `apps/app-tellipod/tsconfig.json` to include the new files; delete `src/index.ts` and `src/.gitkeep`
- [x] 2.4 Extend the `apps/app-tellipod` entry in `knip.json` (entry `metro.config.js`, ignored config-only dependencies, `metro: false` as storybook does)

## 3. App code

- [x] 3.1 Add `src/app/_layout.tsx`: import `global.css`, load Public Sans, render nothing until loaded, wrap `Slot` in `GestureHandlerRootView` and `SafeAreaProvider` (scenario: heading typography)
- [x] 3.2 Add `src/screens/HelloScreen/HelloScreen.tsx` and `index.ts`: safe-area padded view, heading "Hello, Tellipod", kit `Button` "Get started", kit token classes only (scenarios: opening the app, tapping the button, device with a notch)
- [x] 3.3 Add `src/app/index.tsx` that only re-exports `HelloScreen` as the default route
- [x] 3.4 Add a Jest test for `HelloScreen` that renders it and asserts the heading and the button label, and that fails if the heading is removed (set up `jest-expo` for the app if not present)

## 4. Verification

- [x] 4.1 Run `just check` (lint, typecheck, knip) and fix findings
- [ ] 4.2 Run `pnpm --filter @tellipod/app ios` and `android` and confirm the hello screen shows the Public Sans heading and the pressable button; check on a device or simulator with a notch

## 5. Docs and indexes

- [x] 5.1 Add a `just app` recipe to `justfile` that starts the app (`pnpm --filter @tellipod/app start`)
- [x] 5.2 Update `README.md` (Getting started and Commands) with `just app`
- [x] 5.3 Update `apps/app-tellipod/README.md`: layout tree shows `src/app/_layout.tsx`, `src/app/index.tsx` and `src/screens/HelloScreen`; note that `features/` and `shared/` are created with their first content
- [x] 5.4 Add a row for `app-bootstrap` to `openspec/specs/components/mobile-common/shell/README.md`, Read when: "Changing how the app starts, the root layout, the root providers or the placeholder hello screen"
