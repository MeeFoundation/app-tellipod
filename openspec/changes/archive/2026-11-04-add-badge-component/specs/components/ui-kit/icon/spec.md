# icon

- Depends on: `../tokens-and-theming/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using an icon in UI or adding an icon to the kit
- Source: Figma file "Mee - Design System v5.2.4", Badge page (icons `check-circle` and `info-circle`)

## Purpose

The Icon is the kit's simple, single place for glyphs. It holds only the icons a screen or component uses, and a later change replaces its contents with the full design-system icon set.

## ADDED Requirements

### Requirement: The Icon draws a named glyph

An Icon SHALL accept a name, which for now is `check-circle` or `info-circle`, and draw the matching glyph from the design system's outline set.
An Icon SHALL accept a size in px and a text color class.
The default size SHALL be 16 px and the default color SHALL be the `text/default/body` color.

#### Scenario: An icon with only a name

- WHEN an Icon is rendered with the name `check-circle`
- THEN it shows the outline check-circle glyph at 16 px in the default text color

#### Scenario: An icon at another size

- WHEN an Icon is rendered with the name `info-circle` and a size of 12
- THEN it shows the outline info-circle glyph at 12 px

### Requirement: An Icon in a Badge takes the Badge's look

An Icon placed in a Badge slot and given no size or color SHALL take the size and text color of that Badge.
An Icon given a size or a color SHALL keep it.

#### Scenario: An icon in a light warning badge

- WHEN an Icon with no size or color is placed in a size `s` Warning Filled - light Badge
- THEN it is 14 px and has the badge's `warning` solid text color

### Requirement: The Icon is decorative by default

An Icon SHALL be hidden from assistive technology unless it is given an accessibility label.

#### Scenario: A decorative icon

- WHEN VoiceOver or TalkBack reads a Badge labelled "Active" with a leading Icon that has no accessibility label
- THEN it announces "Active" only

#### Scenario: A labelled icon

- WHEN VoiceOver or TalkBack lands on an Icon with the accessibility label "Information"
- THEN it announces "Information"

## Open questions

- Icon set: this spec holds two icons. The full set, its naming and how it is generated from Figma are decided in the next change.
