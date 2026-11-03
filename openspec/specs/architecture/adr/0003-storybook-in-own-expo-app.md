---
status: accepted
date: 2026-11-03
---
# Run Storybook in its own Expo app

- Read when: changing where Storybook runs, how stories are loaded, or which tools the UI kit uses to share its theme

## Context and Problem Statement

[ADR-0002](0002-ui-component-library.md) puts UI components in `packages/ui-kit` and wants Storybook isolated from the app.
Stories are viewed on iOS and Android devices.
Where does the Storybook host live?

## Decision Drivers

* Storybook stays isolated from the Tellipod app.
* The kit stays a package and does not own a Metro app.
* Stories resolve classes from the same Tailwind theme as the app.
* Dependencies respect the 7-day `minimumReleaseAge`.

## Considered Options

* `apps/storybook`, a separate Expo app that loads stories from `packages/ui-kit`
* Storybook inside `apps/app-tellipod`
* Storybook with its own host inside `packages/ui-kit`

## Decision Outcome

Chosen option: "`apps/storybook`, a separate Expo app", because it isolates Storybook from the app and keeps the kit a plain package.
Its story globs point into `packages/ui-kit/src`, so stories stay next to their component.
The kit exports one Tailwind preset that the Storybook app adds to its own Tailwind configuration.

### Consequences

* Good, because the Tellipod app carries no Storybook code or dependencies.
* Good, because the kit has no Metro or Expo app setup.
* Bad, because there is a second Expo app to keep on the same SDK and NativeWind versions as the Tellipod app.

## Pros and Cons of the Options

### `apps/storybook`, a separate Expo app

* Good, because it matches the isolation ADR-0002 asks for.
* Good, because the kit ships TypeScript source and needs no build.
* Bad, because the app needs its own Metro, Babel and Tailwind configuration.

### Storybook inside `apps/app-tellipod`

* Good, because there is one app.
* Bad, because the app has no Expo setup yet, and Storybook would not be isolated from it.

### Storybook with its own host inside `packages/ui-kit`

* Good, because stories and host sit together.
* Bad, because a package that owns a Metro app blurs the package boundary.

## More Information

Refines ADR-0002.
