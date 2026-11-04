## MODIFIED Requirements

### Requirement: The Icon draws a named glyph

An Icon SHALL accept a name, which for now is `check-circle`, `info-circle`, `search` or `exclamation-circle`, and draw the matching glyph from the design system's outline set.
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

### Requirement: Icon glyphs are the Bootstrap Icons glyphs

An Icon SHALL draw the glyph of the Bootstrap Icons icon with the same name, on the same 16 px grid, filled with the current text color.
The only exception SHALL be `dot`, which is the Badge's leading dot and is not a Bootstrap icon.

#### Scenario: A named icon matches the package

- WHEN an Icon is rendered with the name `info-circle`
- THEN it draws the shapes of the `info-circle` icon of the Bootstrap Icons package

#### Scenario: A different icon version

- WHEN the Bootstrap Icons package is updated
- THEN each listed icon draws the shapes of the new version, with no other change

### Requirement: Only the listed icons are available

An Icon SHALL accept only the names on the kit's icon list.
An icon that is not on the list SHALL NOT be part of the app.
Adding an icon SHALL need only its Bootstrap name on the list, with no hand-written shapes and no generation step.

#### Scenario: An unlisted name

- WHEN a developer writes an Icon with a name that is not on the list
- THEN type checking fails for that name

#### Scenario: Adding an icon

- WHEN a developer adds the name `bell` to the list
- THEN an Icon with the name `bell` type checks and draws the Bootstrap `bell` glyph

#### Scenario: Unused icons stay out of the app

- WHEN the app is built with only `check-circle` and `info-circle` on the list
- THEN no other Bootstrap icon shapes are in the app bundle

## REMOVED Requirements

### Requirement: The generated icons stay in step with the list

**Reason**: Icons are imported from the Bootstrap Icons package by name, so there is no generated file that can fall out of step with the list.
**Migration**: None. Adding an icon needs only its name on the list.
