# toast

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Toast
- Source: Figma file "Mee - Design System v5.2.4", Toast page (node 28:11001)

## Purpose

The Toast is the kit's short message card: an icon, a title, an optional description and the actions the message offers.
It implements the design-system Toast with the types `primary`, `secondary`, `success` and `danger`, and styles every type from tokens.

## ADDED Requirements

### Requirement: The Toast has the design-system types

The Toast SHALL accept a type of `primary`, `secondary`, `success` or `danger`, and the default type SHALL be `secondary`.
The Toast SHALL NOT implement the types `tertiary`, `dark` and `warning`, the Toast with an Avatar, or the Toast's resting position, which the `toast-host` spec covers.

#### Scenario: A toast with only a title

- WHEN a Toast is rendered with only the title "Just a notification"
- THEN it shows a Secondary toast with that title

#### Scenario: A danger toast

- WHEN a Toast is rendered with type `danger`, the title "Server error!" and the description "Try to refresh your page."
- THEN it shows the Danger look from the design system with both lines

### Requirement: Looks follow the design

The Toast SHALL have a 1 px border, 8 px rounded corners (`rounded-lg`), the `shadow-3` shadow, 16 px side padding and 12 px vertical padding, and SHALL clip its content to the corners.
The Toast SHALL draw its fill, border and text colors from the type, as in the table.

| Type | Fill | Border | Title | Description |
| --- | --- | --- | --- | --- |
| `primary` | `primary/brand/50` | `primary/brand/300` | `primary/brand/900` | `primary/brand/800` |
| `secondary` | `primary/base/white` | `primary/gray/200` | `primary/gray/900` | `primary/gray/800` |
| `success` | `primary/success/50` | `primary/success/300` | `primary/success/900` | `primary/success/800` |
| `danger` | `primary/error/50` | `primary/error/300` | `primary/error/900` | `primary/error/800` |

The title SHALL be `SM/Semi Bold` and the description SHALL be `SM/Regular`.
The Toast SHALL fill the width its parent gives it, and its title and description SHALL wrap onto more lines when they do not fit, and SHALL NOT be clipped or cut with an ellipsis.

#### Scenario: Comparing with the design

- WHEN the four types are shown one above the other with the same title
- THEN each has the fill, border and text colors of its row in the table

#### Scenario: A long title

- WHEN the title is longer than one line
- THEN it wraps onto further lines and the Toast grows taller

### Requirement: The Toast shows an icon, a title and a description

The Toast SHALL show an optional leading icon, then the title, and below the title an optional description.
The icon SHALL be passed as a slot, and an `Icon` in the slot SHALL be 16 px and take the title color of the Toast's type.
A description SHALL start under the title text, not under the icon, when the Toast has an icon.

#### Scenario: A success toast with an icon

- WHEN a Toast of type `success` is rendered with a `check-circle` icon and the title "All suggested contact info added"
- THEN it reads the icon and the title on one line, with the icon in the dark green of the title

#### Scenario: A description under an icon

- WHEN a Toast of type `primary` is rendered with an `info-circle` icon, the title "Title" and the description "Description"
- THEN the description starts at the left edge of the title, not at the left edge of the icon

### Requirement: The Toast offers a right link or bottom links

The Toast SHALL accept one `action` and SHALL show it on the right, in the title row.
The Toast SHALL accept `actions`, a list of links, and SHALL show them in a row below the description, aligned with the text and spaced 16 px apart.
Each link SHALL be `SM/Regular`; in the types `primary` and `secondary` it SHALL be `text/brand/solid`, in the type `success` it SHALL be `text/success/solid`, and in the type `danger` it SHALL be `text/error/solid`.
A link SHALL call its handler when the user taps it.

#### Scenario: A toast with one right link

- WHEN a Toast is rendered with the title "Your order is ready!" and the action "View"
- THEN "View" shows at the right edge of the title row

#### Scenario: A toast with two bottom links

- WHEN a Toast is rendered with the description "Description" and the actions "Action 1" and "Action 2"
- THEN the links show side by side below the description, under the text

#### Scenario: Tapping a link

- WHEN the user taps "Refresh" on the Danger toast
- THEN the handler given to "Refresh" is called once

### Requirement: The close button is shown when the screen handles it

The Toast SHALL accept an optional `onClose` and SHALL show a 20 px `x` close button at the right edge of the title row only when `onClose` is given.
The Toast SHALL call `onClose` once when the user taps the close button, and SHALL NOT hide itself.
The close button SHALL have a touchable area of at least 44 × 44 pt on iOS and 48 × 48 dp on Android, without making the Toast taller.

#### Scenario: A toast with a close button

- WHEN a Toast is rendered with `onClose` and the user taps the close button
- THEN `onClose` is called once and the Toast is still shown until its owner removes it

#### Scenario: A toast without a close button

- WHEN a Toast is rendered with the action "View" and no `onClose`
- THEN no close button shows

### Requirement: The Toast is described to assistive technology

The Toast SHALL read its title and then its description as one text, and SHALL give each link and the close button the role of button.
The close button SHALL have the accessibility label "Close".
The leading icon SHALL be hidden from assistive technology, because the title carries its meaning.

#### Scenario: Reading a toast aloud

- WHEN VoiceOver or TalkBack reads the Danger toast
- THEN it announces "Server error! Try to refresh your page." and then "Refresh", a button

#### Scenario: Reading the close button

- WHEN VoiceOver or TalkBack lands on the close button
- THEN it announces "Close" and a button

### Requirement: Design exceptions to accessibility are documented

Where a Toast type as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the Toast SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" in this spec with the type, the measured value and the required value.

#### Scenario: A link below 4.5:1

- WHEN a link color and its type's fill measure less than 4.5:1
- THEN the type looks as designed and its measured ratio is listed under "Accessibility exceptions"

### Requirement: The Toast has grouped stories

The stories of `UI/Toast` SHALL cover the types, the slot combinations (title only, right link, description with bottom links) and a long title in a few stories, each showing several Toasts one above the other.

#### Scenario: Toast stories

- WHEN the stories of `UI/Toast` are listed
- THEN they cover types, slot combinations and a long title in a few stories, each showing several Toasts

## Accessibility exceptions

None. The title, the description and the link of each type measure at least 4.5:1 against the type's fill, and the icon and the close button measure at least 3:1; the measurements are in `packages/ui-kit/tailwind/contrast.test.ts`.

## Open questions

- None. The `secondary` and `success` types were compared with their design-system frames (nodes 2685:28205 and 2686:31133) and match the table above.
