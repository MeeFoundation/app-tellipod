# components/ui-kit/icon Specification

## Purpose
The Icon is the kit's simple, single place for glyphs. It holds only the icons a screen or component uses, and a later change replaces its contents with the full design-system icon set.

## Requirements

### Requirement: The Icon draws a named glyph

An Icon SHALL accept a name, which for now is `check-circle`, `info-circle`, `search`, `exclamation-circle`, `exclamation-octagon`, `house`, `chevron-right`, `chevron-down`, `pencil`, `plus`, `folder-plus`, `paperclip`, `diagram-3`, `people`, `person`, `person-vcard`, `x`, `chevron-left`, `three-dots-vertical` or `shield-lock`, and draw the matching glyph from the design system's outline set.
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

#### Scenario: Icons for a card

- WHEN an Icon is rendered with the name `chevron-down` and another with the name `person-vcard`
- THEN they show the outline chevron-down and person-vcard glyphs

#### Scenario: Icons for a value row and its actions

- WHEN Icons are rendered with the names `pencil`, `plus` and `folder-plus`
- THEN they show the outline pencil, plus and folder-plus glyphs

#### Scenario: Icons for pod sections

- WHEN Icons are rendered with the names `paperclip`, `diagram-3` and `people`
- THEN they show the outline paperclip, diagram-3 and people glyphs

#### Scenario: An icon for an avatar

- WHEN an Icon is rendered with the name `person` at 20 px
- THEN it shows the outline person glyph at 20 px

#### Scenario: Icons for a toast

- WHEN an Icon is rendered with the name `x` at 20 px and another with the name `exclamation-octagon` at 16 px
- THEN they show the outline x glyph at 20 px and the outline exclamation-octagon glyph at 16 px

#### Scenario: Icons for a header

- WHEN Icons are rendered with the names `chevron-left` and `three-dots-vertical` at 24 px and `shield-lock` at 14 px
- THEN they show the outline chevron-left, three-dots-vertical and shield-lock glyphs at those sizes

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
