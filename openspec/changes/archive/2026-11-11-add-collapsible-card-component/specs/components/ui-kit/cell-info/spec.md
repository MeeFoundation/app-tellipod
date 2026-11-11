# cell-info

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the CellInfo
- Source: Figma file "Mee - Tellipod App v4.0.3", Info tab (node 820:14161), component `cell-info`

## Purpose

The CellInfo is the kit's row for one labelled value with an optional edit action.
It shows a value; it is not an input, and editing happens where the screen sends the user.

## ADDED Requirements

### Requirement: The CellInfo shows a label and a value

A CellInfo SHALL show a small label above a value.
It SHALL fill the width of its parent and grow in height with its text.

#### Scenario: A first name

- WHEN a CellInfo is rendered with the label "First name" and the value "Sofia"
- THEN it shows "First name" in small text above "Sofia"

### Requirement: The CellInfo offers an edit action

A CellInfo given `onEdit` SHALL show a pencil button at its trailing edge and call `onEdit` when the user taps it.
A CellInfo without `onEdit` SHALL show no button.
The button SHALL have the role of button and the accessibility label "Edit" followed by the label of the row.
The button's touch target SHALL be at least 44 × 44 pt on iOS and 48 × 48 dp on Android.

#### Scenario: Editing a date of birth

- WHEN the user taps the pencil of the CellInfo "Date of birth" with the value "April 8, 2018"
- THEN its `onEdit` is called once

#### Scenario: Reading the edit button aloud

- WHEN VoiceOver or TalkBack lands on the pencil of the CellInfo "Last name"
- THEN it announces "Edit Last name" and a button

#### Scenario: A row that cannot be edited

- WHEN a CellInfo is rendered without `onEdit`
- THEN it shows the label and the value and no pencil

### Requirement: The CellInfo is read as one item

A CellInfo SHALL be read by VoiceOver and TalkBack as its label followed by its value.

#### Scenario: Reading a row aloud

- WHEN VoiceOver or TalkBack reads the CellInfo "Last name" with the value "Walker"
- THEN it announces "Last name, Walker"

### Requirement: The CellInfo has grouped stories

The stories of `UI/CellInfo` SHALL cover a row with and without the edit action and a long value, in a few stories.

#### Scenario: CellInfo stories

- WHEN the stories of `UI/CellInfo` are listed
- THEN they cover a row with and without the edit action and a long value
