# card-cell

- Depends on: `../tokens-and-theming/spec.md`, `../avatar/spec.md`, `../badge/spec.md`, `../breadcrumbs/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the CardCell
- Source: Figma file "Mee - Tellipod App v4.0.3", Home screen (node 13:11241), component `Card-Cell` (instances 13:11470 and 380:22480)

## Purpose

The CardCell is the kit's tappable row card: an Avatar, a title, a second line and a chevron that opens something.
It is not the `Card` of the kit, which groups a header, a body and a footer, and it is not an input.
It does not implement a disabled look or the hidden `Badge` line of the design, because the design does not show them.
Its pressed look is not in the design either: it is added at the request of the design review.
It does not read pod data: the screen gives it the Avatar, the title and the second line.

## Requirements

### Requirement: The CardCell shows an avatar, a title, a second line and a chevron

A CardCell SHALL show, from the leading edge, an Avatar, then a title with a second line under it, then a trailing `chevron-right` icon.
The Avatar SHALL be passed as a slot and the CardCell SHALL show it at size `m` (40 px).
The title SHALL be medium weight, 16 px on a 24 px line, in the `text/default/title` color, and the second line SHALL be regular weight, 12 px on a 16 px line, in the `text/default/subtle` color.
The chevron SHALL be 16 px.
The CardCell SHALL fill the width of its parent and SHALL be at least 60 px high.
The text column SHALL take the space between the Avatar and the chevron and SHALL show a long title or second line on its own lines.

#### Scenario: New info shared with the user

- WHEN a CardCell is rendered with the initials Avatar "M", the title "Carpathian MTB Event" and the second line "New info shared by Andrew 2 hours ago."
- THEN it shows "M" in an avatar, the title above the second line, and a chevron at the trailing edge

#### Scenario: A long title

- WHEN the title does not fit between the Avatar and the chevron
- THEN the title continues on a second line and the card grows in height

### Requirement: The second line can be text or Breadcrumbs

The second line SHALL accept text or a `Breadcrumbs` of size `s`, passed by the screen.
A CardCell without a second line SHALL show the title only, vertically centered, with no empty line.

#### Scenario: A pod in a category

- WHEN a CardCell is rendered with the photo Avatar, the title "About Sofia" and a Breadcrumbs of "People" with a people icon, then "Immediate Family"
- THEN the trail "People > Immediate Family" shows under the title

#### Scenario: A pod in one category

- WHEN a CardCell is rendered with the title "Mom & Dad" and a Breadcrumbs of "Health & Wellness" with its icon
- THEN the trail shows under the title with no chevron after it

#### Scenario: No second line

- WHEN a CardCell is rendered with the title "Carpathian MTB Event" and no second line
- THEN the title shows centered next to the Avatar

### Requirement: The CardCell can show a dot on the Avatar

A CardCell with its `badge` flag on SHALL show a `dot` Badge of type `danger` and size `xs` (8 px) inside a 2 px border in the `stroke/default/main` color, 12 px across in all, over the top leading corner of the Avatar.
A CardCell without the flag SHALL show no dot.

#### Scenario: A card with unread info

- WHEN a CardCell is rendered with the `badge` flag on
- THEN a 12 px red dot with a white border shows on the top leading corner of the Avatar

#### Scenario: A card that has been read

- WHEN a CardCell is rendered without the `badge` flag
- THEN no dot shows

### Requirement: The CardCell looks like a card

A CardCell SHALL have the `surface/default/main` surface, a 16 px corner radius, a 1 px `stroke/gray/light` border, 10 px of padding at the top, bottom and leading edge, 16 px at the trailing edge, a 10 px gap between its parts and the first-level box shadow.
The Avatar, the dot and the content SHALL be clipped to the rounded corners, and the shadow SHALL NOT be clipped.

#### Scenario: A card in a list

- WHEN two CardCells are shown one under the other
- THEN each shows its own surface, rounded corners and shadow

### Requirement: The CardCell opens something

A CardCell SHALL call `onPress` once when the user taps anywhere on it.

#### Scenario: Opening a pod

- WHEN the user taps the CardCell "About Sofia"
- THEN its `onPress` is called once

### Requirement: The CardCell shows that it is pressed

While the user presses a CardCell, its surface SHALL be `surface/gray/soft` in place of `surface/default/main`, and it SHALL return to `surface/default/main` when the touch ends.

#### Scenario: Pressing a card

- WHEN the user touches the CardCell "About Sofia" and holds
- THEN its surface turns pale gray, and it turns white again when the user lets go

### Requirement: The CardCell is described to assistive technology

A CardCell SHALL have the role of button.
Its accessibility label SHALL default to the title followed by the text of the second line, and the screen MAY pass another label.
The Avatar, the dot and the chevron SHALL be hidden from assistive technology, and the Breadcrumbs of the second line SHALL NOT be separate stops.
The CardCell's touch target SHALL be at least 44 × 44 pt on iOS and 48 × 48 dp on Android.

#### Scenario: Reading a card aloud

- WHEN VoiceOver or TalkBack lands on the CardCell "Carpathian MTB Event"
- THEN it announces "Carpathian MTB Event, New info shared by Andrew 2 hours ago." and a button

#### Scenario: A card with a custom label

- WHEN the screen passes the accessibility label "New: Carpathian MTB Event"
- THEN VoiceOver or TalkBack announces "New: Carpathian MTB Event" and a button

### Requirement: The CardCell has grouped stories

The stories of `UI/CardCell` SHALL cover a text second line, a Breadcrumbs second line, the dot and a long title in a few stories.

#### Scenario: CardCell stories

- WHEN the stories of `UI/CardCell` are listed
- THEN they cover a text second line, a Breadcrumbs second line, the dot and a long title in a few stories
