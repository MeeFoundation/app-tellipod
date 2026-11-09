# storybook

- Depends on: `../components/spec.md`
- Read when: adding or changing a component story

## Purpose

How kit components are documented and checked on device.

## Requirements

### Requirement: Every kit component has stories

Each component in `packages/ui-kit` SHALL have stories covering its variants.

#### Scenario: Adding a component

- WHEN a component is added to the kit
- THEN stories for its variants are added in the same change

### Requirement: Stories live next to their component

A component's stories SHALL be in the same folder as the component.

#### Scenario: Finding the stories

- WHEN the kit contains `<Component>/<Component>.tsx`
- THEN its stories are in `<Component>/`, and no separate stories folder exists

### Requirement: Story titles are grouped under UI

Component stories SHALL be titled `UI/<Component>/<Story>`, for example `UI/<Component>/Sizes`.
Stories that document a token group SHALL be titled `Foundations/<Group>`, for example `Foundations/Colors`.

#### Scenario: Naming a story

- WHEN a story for the variants of a component's sizes is added
- THEN it is titled `UI/<Component>/Sizes`

#### Scenario: Naming a token story

- WHEN a story that shows the color tokens is added
- THEN it is titled `Foundations/Colors` and is listed in the selector beside the `UI` group

### Requirement: Stories run on a device

Stories SHALL be viewable on iOS and Android in a dedicated Storybook app, `apps/storybook`, that is separate from the Tellipod app.
The Storybook app SHALL load its stories from `packages/ui-kit` and SHALL resolve classes from the kit's Tailwind theme.
Stories are viewed on a device only; there is no published web Storybook.

#### Scenario: Opening stories on a phone

- WHEN a developer opens the story selector in the Storybook app on a device
- THEN all stories are listed and open

#### Scenario: Same look as the app

- WHEN a story and a screen of the Tellipod app render the same component
- THEN both resolve its classes from the same kit theme

### Requirement: Stories group several variants

A story SHALL render several variants of a component together instead of one variant per story.
A component SHALL NOT have a story for every combination of its variants.

#### Scenario: A component with several variants

- WHEN a component has several sizes, styles or states
- THEN a few stories each show several of them together, and each component's spec lists what its stories cover
