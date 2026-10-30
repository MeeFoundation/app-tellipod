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

- WHEN the kit contains `Badge/Badge.tsx`
- THEN its stories are in `Badge/`, and no separate stories folder exists

### Requirement: Story titles are grouped under UI

Stories SHALL be titled `UI/<Component>/<Story>`, for example `UI/Badge/Sizes`.

#### Scenario: Badge sizes

- WHEN the story `UI/Badge/Sizes` is opened
- THEN Badge sizes XXS, XS, S and M are shown together

### Requirement: Stories run on a device

Stories SHALL be viewable in the app on iOS and Android.
Stories are viewed on a device only; there is no published web Storybook.

#### Scenario: Opening stories on a phone

- WHEN a developer opens the story selector on a device
- THEN all stories are listed and open
