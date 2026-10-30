---
status: accepted
date: 2026-10-29
---
# Build the UI component library from scratch in its own package

## Context and Problem Statement

Screens combine UI from several features, and the Mee design system exists in Figma ("Mee - Design System").
Where do shared UI components live, and are they built or adopted?

## Decision Drivers

* The design system defines the components, tokens and variants to follow.
* Components are documented in Storybook, for example badge sizes `xxs`, `xs`, `s` and `m`.
* Slices and screens should share UI without importing from each other (see the code layout in `apps/app-tellipod/README.md`).

## Considered Options

* A from-scratch package, `packages/ui-kit`, documented in Storybook
* Components inside the app only
* A third-party component library

## Decision Outcome

Chosen option: "A from-scratch package, `packages/ui-kit`", because it can follow the Mee design system exactly and be shared by every slice and screen.
Feature-specific components stay inside their slice's `ui/` folder.

### Consequences

* Good, because variants and tokens match the design system.
* Good, because slices and screens import UI from one package.
* Bad, because every component has to be built and maintained by the team.

## Pros and Cons of the Options

### A from-scratch package, `packages/ui-kit`

* Good, because it matches the design system with no translation layer.
* Good, because Storybook is isolated from the app.
* Bad, because building every component costs time.

### Components inside the app only

* Good, because it is the simplest setup.
* Bad, because there is no reuse outside the app, and isolating Storybook is harder.

### A third-party component library

* Good, because components exist already.
* Bad, because it would have to be restyled to match the design system.

## More Information

Depends on ADR-0001.
 