# icon (delta)

- Depends on: `../tokens-and-theming/spec.md`
- Read when: adding an icon to the kit or changing where icon glyphs come from
- Source: https://icons.getbootstrap.com, Figma file "Mee - Design System v5.2.4", Icons page (node 4:188)

## ADDED Requirements

### Requirement: Icon glyphs are the Bootstrap Icons glyphs

An Icon SHALL draw the glyph of the Bootstrap Icons icon with the same name, on the same 16 px grid, filled with the current text color.
The only exception SHALL be `dot`, which is the Badge's leading dot and is not a Bootstrap icon.

#### Scenario: A named icon matches the package

- WHEN an Icon is rendered with the name `info-circle`
- THEN it draws the shapes of the `info-circle` icon of the Bootstrap Icons package

#### Scenario: A different icon version

- WHEN the Bootstrap Icons package is updated and the icons are generated again
- THEN each listed icon draws the shapes of the new version, with no other change

### Requirement: Only the listed icons are available

An Icon SHALL accept only the names on the kit's icon list.
An icon that is not on the list SHALL NOT be part of the app.
Adding an icon SHALL need only its Bootstrap name on the list and one command, with no hand-written shapes.

#### Scenario: An unlisted name

- WHEN a developer writes an Icon with a name that is not on the list
- THEN type checking fails for that name

#### Scenario: Adding an icon

- WHEN a developer adds the name `bell` to the list and runs the icon command
- THEN an Icon with the name `bell` type checks and draws the Bootstrap `bell` glyph

#### Scenario: Unused icons stay out of the app

- WHEN the app is built with only `check-circle` and `info-circle` on the list
- THEN no other Bootstrap icon shapes are in the app bundle

### Requirement: The generated icons stay in step with the list

The generated icon file SHALL match the list, so the list and the file never disagree.

#### Scenario: A stale generated file

- WHEN a name is on the list but the icon command has not been run
- THEN a test fails and names the missing icon

## Open questions

- Filled, logo, filetype and custom icons are not added yet. Their Figma-to-package naming is decided when a screen first needs one.
