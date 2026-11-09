## Context

`apps/app-tellipod` has only `package.json`, `tsconfig.json` and an empty `src/index.ts`.
`apps/storybook` already runs Expo 57, NativeWind 4, the kit's Tailwind preset and the SVG Metro helper, so the toolchain is proven in this repo.
`apps/app-tellipod/README.md` fixes the layers (`app → screens → features → shared`) and says routes are thin.
[ADR-0001](../../specs/architecture/adr/0001-react-native-cross-platform.md) picks Expo Router with routes in `app/`.
See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- `pnpm --filter @tellipod/app start` boots the app on iOS and Android and shows the hello screen.
- The app consumes the UI kit exactly as Storybook does, so tokens and fonts behave the same.
- `just check` (lint, typecheck, knip) stays green.

**Non-Goals:**
- Launch routing, auth, tabs, data access, icons and splash artwork.
- Creating `features/` or `shared/` folders with no content.
- EAS build configuration and CI.

## Decisions

**Entry through Expo Router.** `package.json` sets `"main": "expo-router/entry"` and `app.json` enables the `expo-router` plugin.
The route directory is `src/app`, which Expo Router finds automatically when `src/` exists.
This follows ADR-0001; no new ADR is needed.

**Copy the storybook toolchain, do not share it.** `babel.config.js`, `metro.config.js`, `tailwind.config.ts`, `global.css` and `nativewind-env.d.ts` mirror those in `apps/storybook`, with the Tailwind `content` globs pointing at `./src/**/*` and `../../packages/ui-kit/src/**/*`.
Duplicating about 40 lines keeps the two apps independent, as [ADR-0003](../../specs/architecture/adr/0003-storybook-in-own-expo-app.md) intends.

**Root layout owns providers and fonts.** `src/app/_layout.tsx` imports `global.css`, loads the four Public Sans weights with `useFonts`, returns `null` until loaded, and wraps `<Slot />` in `GestureHandlerRootView` and `SafeAreaProvider`.
`BottomSheetModalProvider` is added later with the first screen that opens a kit `Modal`.

**Thin route, screen in `screens/`.** `src/app/index.tsx` is `export { HelloScreen as default } from "../screens/HelloScreen"` via the screen's `index.ts`.
`HelloScreen` uses `useSafeAreaInsets` padding on a `View`, a React Native `Text` with kit classes (`font-public-sans-semibold text-2xl`, a kit text color), and the kit `Button`.
The kit has no `Text` component, so adding one is left to a kit change.

**Versions through the catalog.** `expo-router`, `expo-linking`, `expo-constants`, `expo-status-bar` and `react-native-screens` are added to `pnpm-workspace.yaml` at the versions `npx expo install` reports for Expo 57, checked against the 7-day `minimumReleaseAge`.
Dependencies that Storybook already lists use the existing `catalog:` entries.

**Rejected alternatives:**
- Plain React Native `Text` and `View` without the kit: quicker, but leaves NativeWind, the preset and font loading untested in the real app.
- Registering the app with `registerRootComponent` and no router: contradicts ADR-0001 and would be replaced as soon as there is a second screen.
- Hosting the app inside `apps/storybook`: contradicts ADR-0003.

## Risks / Trade-offs

- [`expo-router` version too new for `minimumReleaseAge`] → pick the newest release older than 7 days, or add an exclude entry with the user's approval.
- [Duplicated toolchain files drift from Storybook] → accepted; revisit if a third app appears.
- [Typecheck with TypeScript 7 and Expo Router typed routes] → leave `typedRoutes` off for now.
- [knip flags config-only dependencies] → add `ignoreDependencies` for `app-tellipod` like the storybook entry does.
