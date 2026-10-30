# components

- Depends on: `../tokens-and-theming/spec.md`
- Read when: building UI or adding a component
- Source: Figma file "Mee - Design System v5.2.4", COMPONENTS and FORMS pages

## Purpose

How the components in the UI kit relate to the components of the design system they are built from.

## Requirements

### Requirement: Components match the design system

Each kit component SHALL have the name and variants of its design-system component.

#### Scenario: Kit component matches the design

- WHEN a kit component is compared with its design-system component
- THEN it has the same name and exactly the same variants, such as Badge sizes `xxs`, `xs`, `s` and `m`

#### Scenario: Variant not in the design

- WHEN a screen needs a variant that is not in the design system
- THEN the kit does not get it until the design system has it

### Requirement: The kit holds only components the app uses

A component SHALL be added to the kit when a screen needs it, not before.

#### Scenario: Component not used by any screen

- WHEN no screen uses a design-system component
- THEN it is not in the kit
