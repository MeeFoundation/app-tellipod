# breadcrumbs

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Breadcrumbs
- Source: Figma file "Mee - Design System v5.2.4", Breadcrumbs page (node 5:1063; Breadcrumbs 2761:50255, Breadcrumb 2761:49376)

## Purpose

The Breadcrumbs is the kit's single line that shows where something sits in a hierarchy, such as a pod's position in the ontology, and lets the user go up to a parent.
It is not a web breadcrumb: it has no hover and is built for touch.
It implements the design-system Breadcrumbs with its sizes, styles and link states, and styles every variant from tokens.
It does not implement a separator other than the chevron, a hover look as such, or an expanded state of the collapsed item "...", because the design does not show them or no screen uses them yet.
It does not read the ontology: the screen gives it the labels.

## ADDED Requirements

### Requirement: Breadcrumbs is a container of Breadcrumb items

`Breadcrumbs` SHALL render its children, which are `Breadcrumb` items, in one line, in the order given.
A `Breadcrumb` SHALL take a `label`, an optional `onPress` handler, an optional `disabled` flag and an optional `leadingIcon` slot, and SHALL read its size from the `Breadcrumbs` around it.
A `Breadcrumb` with `onPress` SHALL be a link, and one without SHALL be plain text.
`Breadcrumbs` SHALL draw a chevron after every item except the last.
The screen SHALL pass the current place as the last item, without `onPress`.

#### Scenario: A trail of a pod

- WHEN a `Breadcrumbs` shows a house icon with "Home", then "Health", "Medical records" and "Lab results" without `onPress`
- THEN the user sees "Home > Health > Medical records > Lab results", with three links and the plain text "Lab results" with no chevron after it

#### Scenario: Going up a level

- WHEN the user taps "Medical records"
- THEN the `onPress` of "Medical records" is called once

#### Scenario: Tapping the current place

- WHEN the user taps "Lab results", which has no `onPress`
- THEN nothing is called and the item keeps its plain look

### Requirement: Sizes follow the design system

`Breadcrumbs` SHALL accept a size of `s`, `m` or `l`, and the default SHALL be `m`.
The sizes SHALL be as follows.

| Size | Item height | Label | Leading icon | Chevron | Gap in an item | Item padding start, end |
| --- | --- | --- | --- | --- | --- | --- |
| `s` | 16 px | 12 px, line 16 px | 14 px | 10 px | 4 px | 2 px, 2 px |
| `m` | 20 px | 14 px, line 20 px | 16 px | 12 px | 6 px | 2 px, 4 px |
| `l` | 24 px | 16 px, line 24 px | 20 px | 14 px | 8 px | 2 px, 6 px |

The label SHALL be regular weight, and an `Icon` in the leading slot SHALL have the size in the table and the color of the label.
The items SHALL touch each other: the space between two labels is the end padding, the gap and the chevron.

#### Scenario: Comparing sizes

- WHEN a size `s`, `m` and `l` Breadcrumbs with the same items are shown together
- THEN their items are 16, 20 and 24 px high and their labels are 12, 14 and 16 px

### Requirement: Styles are simple or outlined

`Breadcrumbs` SHALL accept a style of `simple` or `outlined`, and the default SHALL be `simple`.
A `simple` line SHALL have no fill, border or padding.
An `outlined` line SHALL have the `surface/gray/soft` fill, a 1 px `stroke/gray/light` border, a 6 px radius, 4 px vertical padding and horizontal padding of 6 px in size `s`, 8 px in `m` and 10 px in `l`.
Either style SHALL be as wide as its items and no wider than its parent.

#### Scenario: Outlined line

- WHEN an `outlined` size `m` Breadcrumbs shows "Home" and "Health"
- THEN the items sit in a pale rounded box with a thin gray border, as wide as the items plus 8 px at each side

### Requirement: Looks follow the design system and touch

A Default link SHALL have the `text/brand/solid` text color and no underline.
A Hover link SHALL have the `text/brand/solid_hover` text color and a 1 px underline.
A Focus link SHALL have the `text/brand/solid_hover` text color, no underline and a 4 px radius `surface/brand/light` fill that covers the item, its chevron included.
A Disabled link SHALL look like a Default link with the `text/gray/solid` text color at 60% opacity, and SHALL NOT call `onPress`.
Plain text SHALL have the `text/gray/solid` text color and no underline.
The house and the chevron SHALL take the text color of their item.
Pressed SHALL show the Hover look, because touch has no hover, and focused SHALL show the Focus look.

#### Scenario: Pressing a link

- WHEN the user presses and holds "Health"
- THEN it shows the Hover look until the user lifts the finger

#### Scenario: Moving focus to a link

- WHEN a keyboard or screen reader moves focus to "Health"
- THEN it shows the Focus look: dark teal text on a pale teal fill

#### Scenario: Tapping a disabled link

- WHEN the user taps a disabled "Health"
- THEN its `onPress` is not called and it stays faded

### Requirement: A long trail scrolls sideways

The line SHALL stay on one line, and when its items are wider than its parent it SHALL scroll horizontally inside the parent, without a scroll indicator.
It SHALL start scrolled to the trailing end, so the last item is in view.
This is not in the design system, and SHALL be listed as an addition to the design until the design system has it.

#### Scenario: A trail wider than the screen

- WHEN "Home > Health > Medical records > Lab results > 2026 > October > Blood panel" in size `m` is shown in 390 pt
- THEN the line shows "Blood panel" at its end, and the user swipes right to reach "Home"

#### Scenario: A short trail

- WHEN "Home > Health" is shown in 390 pt
- THEN the line is as wide as its items, starts at the leading edge and does not scroll

### Requirement: The Breadcrumbs is described to assistive technology

The line SHALL have an accessibility label that defaults to "Breadcrumbs".
A link SHALL have the role of link, an accessibility label that defaults to its label and its disabled state.
Plain text SHALL be read as text.
A chevron, and a leading icon without an accessibility label, SHALL be hidden from assistive technology.
The touch target of a link SHALL be at least 44 pt on iOS and 48 dp on Android, unless an exception is listed under "Accessibility exceptions".

#### Scenario: Reading a link aloud

- WHEN VoiceOver or TalkBack lands on "Medical records"
- THEN it announces "Medical records" and link, and does not announce the chevron

#### Scenario: A link below the touch target

- WHEN a size `s` link is 16 px high on a platform whose minimum is 44 pt or 48 dp
- THEN the link keeps its designed size and its touch area is padded above and below to the minimum without changing its look

### Requirement: The Breadcrumbs has grouped stories

The stories of `UI/Breadcrumbs` SHALL cover sizes, styles, states and a long trail in a few stories, each showing several lines together.

#### Scenario: Breadcrumbs stories

- WHEN the stories of `UI/Breadcrumbs` are listed
- THEN they cover sizes, styles, states and a long trail in a few stories

## Additions to the design

| Addition | Why |
| --- | --- |
| A long trail scrolls sideways and starts at its trailing end | The design shows one line of eight items at 382 px and no narrower case. |
| An `onPress` on the collapsed item "..." | The design shows "..." as a link and no expanded state. |

## Accessibility exceptions

| Variant | Measured | Required | Note |
| --- | --- | --- | --- |
| Links of sizes `s`, `m` and `l` | 16, 20 and 24 px high | 44 pt iOS, 48 dp Android | Built as designed. The touch area is padded above and below, not sideways, because the items touch, so a link is as wide as its label. |
| Disabled link at 60% opacity, on the screen or in the outlined box | 3.35:1 and 3.29:1 | 4.5:1 | Built as designed. WCAG 2.2 exempts inactive components from the contrast criterion. |

Every text pair of the Default, Hover, Focus and plain text looks, on the screen and in the outlined box, reaches 4.5:1.

## Open questions

- Overflow by scrolling is not in the design system. Design is asked to add it to the Breadcrumbs page.
- Disabled text color is `text/default/body` in size `s` and `text/gray/solid` in sizes `m` and `l`. The kit uses `text/gray/solid`.
- The collapsed item "..." has no expanded state in the design. The kit renders it as any other link.
