## MODIFIED Requirements

### Requirement: The Icon draws a named glyph

An Icon SHALL accept a name, which for now is `check-circle`, `info-circle`, `search`, `exclamation-circle`, `house` or `chevron-right`, and draw the matching glyph from the design system's outline set.
An Icon SHALL accept a size in px and a text color class.
The default size SHALL be 16 px and the default color SHALL be the `text/default/body` color.

#### Scenario: An icon with only a name

- WHEN an Icon is rendered with the name `check-circle`
- THEN it shows the outline check-circle glyph at 16 px in the default text color

#### Scenario: An icon at another size

- WHEN an Icon is rendered with the name `info-circle` and a size of 12
- THEN it shows the outline info-circle glyph at 12 px

#### Scenario: An icon for a text field

- WHEN an Icon is rendered with the name `search` at 14 px
- THEN it shows the outline search glyph at 14 px

#### Scenario: Icons for a breadcrumb trail

- WHEN an Icon is rendered with the name `house` at 16 px and another with the name `chevron-right` at 12 px
- THEN they show the outline house and chevron-right glyphs at those sizes
