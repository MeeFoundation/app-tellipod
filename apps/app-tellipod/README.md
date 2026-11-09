# app-tellipod

The Tellipod React Native app (iOS and Android), built with Expo.
Specs live in `openspec/specs/components/mobile-common`.

## Code layout

The app is organized in vertical slices, chosen over full Feature-Sliced Design because the app does not need the `widgets` and `entities` layers yet.

```
src/
├── app/        Expo Router routes; thin, import screens
│   ├── _layout.tsx   fonts and root providers
│   └── index.tsx     renders HelloScreen
├── screens/    screen components that combine UI from features
│   └── HelloScreen/  placeholder screen built from the UI kit
├── features/   one slice per domain (created with the first domain)
│   └── <domain>/
│       ├── api/      data access for the domain
│       ├── model/    domain types
│       ├── ui/       components of the domain
│       ├── @x/       exports for specific other slices
│       └── index.ts  public surface
└── shared/     code with no domain knowledge (created with its first content)
```

Shared UI components come from `packages/ui-kit`, not from `shared/`.

## Rules

- A route file only declares a route and renders a screen. It does not import from `features/` directly.
- Layers depend downward only: `app` → `screens` → `features` → `shared`. `shared` imports from no other layer. A feature never imports from `screens/` or `app/`.
- One folder in `features/` is one domain. A new domain gets a new folder; existing slices are not edited to hold its code.
- Code outside a slice imports from the slice's `index.ts`, not from its internal folders. `features/pods/ui/PodRow` is rejected; `features/pods` is allowed.
- When slice A needs something from slice B, B exposes it in `B/@x/A` and A imports it from there. `B/@x/A` is importable by A only. Slices do not import from each other in any other way.

Example: the `pods` slice needs the identifier type owned by `records`. `records/@x/pods.ts` exports it and `pods` imports it from `records/@x/pods`.

## Not decided yet

- Whether the rules are enforced by a lint tool or by review.
- Which domains exist.
- Whether `shared/` has internal structure (for example `shared/lib`).
