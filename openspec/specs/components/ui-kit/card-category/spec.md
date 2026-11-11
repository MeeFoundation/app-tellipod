# card-category

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the CardCategory
- Source: Figma file "Mee - Tellipod App v4.0.3", Home screen (node 13:11241), component `Card-Category` (instance 13:10733)

## Purpose

The CardCategory is the kit's tile card: an icon in a circle, a title and a line of text under it, built to sit in a grid.
It does not lay out the grid, count pods or know what a category is: the screen gives it the icon, the title and the line.
The design shows a plain tile, so the press behavior below is added at the request of the design review.

## Requirements

### Requirement: The CardCategory shows an icon, a title and a line

A CardCategory SHALL show, from the top, an icon in a circle, a title and a line of text.
The icon SHALL be passed by name, drawn at 24 px in a 48 px circle with the `surface/gray/light` surface.
The title SHALL be medium weight, 16 px on a 24 px line, in the `text/default/title` color.
The line SHALL be regular weight, 14 px on a 20 px line, in the `text/default/subtle` color.
The title and the line SHALL have 4 px of padding at their sides and 4 px below the line.

#### Scenario: A category with pods

- WHEN a CardCategory is rendered with the icon `people`, the title "People" and the line "2 pods"
- THEN it shows the people icon in a circle, "People" and "2 pods" under it

#### Scenario: A category without pods

- WHEN a CardCategory is rendered with the title "People" and the line "No pods yet"
- THEN it shows "People" and "No pods yet" under the icon

### Requirement: The CardCategory fills the width its parent gives it

A CardCategory SHALL fill the width of its parent and SHALL grow in height with its text.
With one-line texts it SHALL be 128 px high: 12 px of padding, the 48 px circle, 8 px, the 48 px of text with its bottom padding, and 12 px of padding.
A title that does not fit SHALL continue on another line.

#### Scenario: Two cards in a row

- WHEN two CardCategories are placed side by side in a parent of 362 pt with a 12 pt gap
- THEN each is 175 pt wide and 128 pt high

#### Scenario: A long title

- WHEN the title "Health & Wellness" does not fit on one line
- THEN it continues on a second line and the card grows in height

### Requirement: The CardCategory looks like a card

A CardCategory SHALL have the `surface/default/main` surface, a 16 px corner radius, a 1 px `stroke/gray/light` border, 12 px of padding, an 8 px gap between the circle and the text, and the first-level box shadow.
Its content SHALL be clipped to the rounded corners, and the shadow SHALL NOT be clipped.

#### Scenario: A tile in a grid

- WHEN four CardCategories are shown in two columns
- THEN each shows its own surface, rounded corners and shadow

### Requirement: A CardCategory with onPress is a button that shows it is pressed

A CardCategory given `onPress` SHALL call it once when the user taps the tile, and SHALL have the role of button.
While the user presses it, its surface SHALL be `surface/gray/soft` in place of `surface/default/main`, and it SHALL return to `surface/default/main` when the touch ends.
A CardCategory without `onPress` SHALL be a plain tile with no press look.

#### Scenario: Opening a category

- WHEN the user taps the CardCategory "People" that has `onPress`
- THEN its `onPress` is called once

#### Scenario: Pressing a tile

- WHEN the user touches and holds the CardCategory "People" that has `onPress`
- THEN its surface turns pale gray, and it turns white again when the user lets go

#### Scenario: A plain tile

- WHEN a CardCategory has no `onPress`
- THEN it is not a button and does not change when touched

### Requirement: The CardCategory is described to assistive technology

A CardCategory SHALL be one stop for assistive technology with the title followed by the line as its label, and the icon SHALL be hidden.
When it has `onPress`, a stop at its touch target SHALL be at least 44 × 44 pt on iOS and 48 × 48 dp on Android, which the 128 px tile reaches.

#### Scenario: Reading a tile aloud

- WHEN VoiceOver or TalkBack lands on the CardCategory "People" with the line "2 pods"
- THEN it announces "People, 2 pods"

### Requirement: The CardCategory has grouped stories

The stories of `UI/CardCategory` SHALL cover a count line, "No pods yet", a long title and two tiles in a row, in a few stories.

#### Scenario: CardCategory stories

- WHEN the stories of `UI/CardCategory` are listed
- THEN they cover a count line, "No pods yet", a long title and two tiles in a row, in a few stories
