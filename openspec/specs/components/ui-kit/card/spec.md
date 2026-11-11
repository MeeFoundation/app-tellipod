# card

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../button/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Card
- Source: Figma file "Mee - Tellipod App v4.0.3", Info tab (node 820:14161), component `Card-Cell-Details-Preview`

## Purpose

The Card is the kit's grouped container with a header, an optional body and an optional footer.
It expands to show its body, or opens another screen, and styles every part from tokens.
It does not implement a header without an icon, because the design does not show one.

## Requirements

### Requirement: The Card has a header

A Card SHALL show a header with a leading icon in a circle, a title and a trailing chevron.
The header SHALL be 48 px high and the Card SHALL fill the width of its parent.
The leading icon SHALL be passed by name.

#### Scenario: A collapsed card

- WHEN a Card is rendered with the icon `paperclip` and the title "Attachments"
- THEN it shows a 48 px high header with the icon in a circle, the title "Attachments" and a chevron

### Requirement: An expandable Card shows and hides its body

A Card in the `expandable` mode SHALL show a down chevron and, when expanded, its body and footer under the header.
Tapping the header SHALL toggle the Card, and the chevron SHALL show the state.
A Card SHALL accept `expanded` and `onExpandedChange` for a screen that owns the state, and an initial state for a screen that does not.
A collapsed Card SHALL show its header only.

#### Scenario: Expanding a card

- WHEN the user taps the header of the collapsed "Contact info" Card
- THEN the Card shows its body of values and its footer button, and the chevron shows the expanded state

#### Scenario: Collapsing a card

- WHEN the user taps the header of the expanded "Contact info" Card
- THEN the Card shows its header only

#### Scenario: A screen owns the state

- WHEN a screen passes `expanded` as true
- THEN the Card is expanded and calls `onExpandedChange` with false when the user taps its header

### Requirement: A navigable Card opens another screen

A Card in the `navigable` mode SHALL show a right chevron and no body, and tapping it SHALL call `onPress`.

#### Scenario: Opening Members

- WHEN the user taps the navigable Card "Members"
- THEN its `onPress` is called once

### Requirement: The body and footer are slots

The body SHALL render the children passed to the Card, such as a list of `CellInfo` rows and a `Divider`.
The footer SHALL render a slot, such as an outlined `Button`, under the body inside the Card's border.
A Card without a body SHALL NOT show an empty body area.

#### Scenario: Contact info with a footer

- WHEN the expanded "Contact info" Card has three `CellInfo` rows and the footer button "Add contact info"
- THEN the rows show in order and the button shows under them, inside the Card

### Requirement: The Card is described to assistive technology

The header SHALL have the role of button and the title as its label.
An `expandable` header SHALL expose its expanded or collapsed state.
The leading icon and the chevron SHALL be hidden from assistive technology.
The header's touch target SHALL be at least 44 × 44 pt on iOS and 48 × 48 dp on Android.

#### Scenario: Reading an expandable card aloud

- WHEN VoiceOver or TalkBack lands on the header of the collapsed "Contact info" Card
- THEN it announces "Contact info", a button, collapsed

#### Scenario: Reading a navigable card aloud

- WHEN VoiceOver or TalkBack lands on the navigable Card "Members"
- THEN it announces "Members" and a button

### Requirement: The body grows and shrinks

An expandable Card SHALL grow its body from no height to its full height when it expands, and shrink it to no height when it collapses.
The body SHALL stay shown until it has finished shrinking.
The chevron SHALL turn while the body moves.

#### Scenario: Expanding a card

- WHEN the user taps the header of the collapsed "Contact info" Card
- THEN the body grows to its full height while the chevron turns, and then shows its values and footer button

#### Scenario: Collapsing a card

- WHEN the user taps the header of the expanded "Contact info" Card
- THEN the body shrinks to nothing while the chevron turns back, and then only the header shows

### Requirement: Motion follows the system setting

A Card SHALL change state without animation when the system setting reduces motion.

#### Scenario: Reduce motion is on

- WHEN the user has turned on Reduce Motion and expands the "Contact info" Card
- THEN the body shows at its full height at once

### Requirement: The Card has grouped stories

The stories of `UI/Card` SHALL cover the expandable and navigable modes, a body with a footer and the expanded and collapsed states, in a few stories.

#### Scenario: Card stories

- WHEN the stories of `UI/Card` are listed
- THEN they cover the modes, the body with a footer and both states in a few stories
