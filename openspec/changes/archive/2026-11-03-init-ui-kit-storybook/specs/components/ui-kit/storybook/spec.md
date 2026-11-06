## ADDED Requirements

### Requirement: Stories group several variants

A story SHALL render several variants of a component together instead of one variant per story.
A component SHALL NOT have a story for every combination of its variants.

#### Scenario: Button stories

- WHEN the stories of `UI/Button` are listed
- THEN they cover sizes, styles, types and states in a few stories, each showing several buttons side by side

## MODIFIED Requirements

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
