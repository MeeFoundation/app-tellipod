# divider

- Depends on: `../tokens-and-theming/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Divider
- Source: Figma file "Mee - Tellipod App v4.0.3", Info tab (node 820:14161), component `Divider`

## Purpose

The Divider is the kit's hairline that separates groups of content.
It is horizontal only, because the design shows no other direction.

## Requirements

### Requirement: The Divider is a horizontal hairline

A Divider SHALL fill the width of its parent, be a single hairline high and use a stroke color token.

#### Scenario: Between two groups

- WHEN a Divider is placed between the "Contact info" Card and the "Attachments" Card
- THEN a thin line as wide as the screen content separates them

### Requirement: The Divider is hidden from assistive technology

A Divider SHALL be hidden from assistive technology.

#### Scenario: Reading past a divider

- WHEN VoiceOver or TalkBack moves from the "Contact info" Card to the "Attachments" Card
- THEN focus moves between them with nothing announced for the Divider
