# storybook

- Depends on: `../components/spec.md`
- Read when: adding or changing a component story

## Purpose

How kit components are documented and checked on device.

## MODIFIED Requirements

### Requirement: Story titles are grouped under UI

Component stories SHALL be titled `UI/<Component>/<Story>`, for example `UI/<Component>/Sizes`.
Stories that document a token group SHALL be titled `Foundations/<Group>`, for example `Foundations/Colors`.

#### Scenario: Naming a story

- WHEN a story for the variants of a component's sizes is added
- THEN it is titled `UI/<Component>/Sizes`

#### Scenario: Naming a token story

- WHEN a story that shows the color tokens is added
- THEN it is titled `Foundations/Colors` and is listed in the selector beside the `UI` group
