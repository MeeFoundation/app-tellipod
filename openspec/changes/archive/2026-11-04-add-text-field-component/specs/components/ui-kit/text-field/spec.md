# text-field

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the TextField
- Source: Figma file "Mee - Design System v5.2.4", Text Field page (node 4:10661)

## Purpose

The TextField is the kit's text entry control. It implements the input part of the design-system Text Field, with its styles, sizes and states, and styles every variant from tokens.
It does not implement Select, Multiselect, add-ons, the label tooltip or the password strength meter, because no screen uses them yet.

## ADDED Requirements

### Requirement: The TextField has the design-system variants of the input

The TextField SHALL accept a style of `label-above`, `label-on-edge` or `label-inside`, and a size of `s`, `m` or `l`.
Every combination of style and size SHALL be available, with or without a placeholder.
The default style SHALL be `label-above` and the default size `m`.
The TextField SHALL NOT offer the design's Multiselect variant, its add-ons, its label tooltip or its strength meter.

#### Scenario: A field with only a label

- WHEN a TextField is rendered with only the label "Email"
- THEN it shows a size `m` Label above field with "Email" over an empty field

### Requirement: Sizes follow the design system

A TextField SHALL have the field height, text size, icon size and horizontal padding of the following table.
The gap between the leading icon and the text SHALL be 8 px, and 12 px in the `label-inside` style.
The label above the field SHALL have the text size of its size and sit 2, 6 and 8 px above the field at sizes `s`, `m` and `l`, and a label that floats SHALL be 12 px at every size.
The helper line SHALL be 12 px and sit 2 px below the field.

| Size | Field height | Field height, `label-inside` | Text | Leading icon | Error icon | Horizontal padding |
| --- | --- | --- | --- | --- | --- | --- |
| `s` | 30 px | 40 px | 12 px | 14 px | 14 px | 12 px |
| `m` | 36 px | 48 px | 14 px | 16 px | 14 px | 12 px |
| `l` | 44 px | 56 px | 16 px | 20 px | 20 px | 12 px |

#### Scenario: Comparing sizes

- WHEN fields of sizes `s`, `m` and `l` in the `label-above` style are shown together
- THEN their fields are 30, 36 and 44 px high

### Requirement: The label follows the style

In the `label-above` style the label SHALL sit above the field at every state.
In the `label-on-edge` style the label SHALL sit inside the field while the field is empty, not focused and has no placeholder, and on the top border of the field otherwise.
In the `label-inside` style the label SHALL sit in the field in the place of the text while the field is empty, not focused and has no placeholder, and above the text otherwise.
A required field SHALL show a `*` after its label.

#### Scenario: A label moving to the border

- WHEN the user focuses an empty `label-on-edge` field labelled "Password"
- THEN "Password*" sits on the top border of the field

#### Scenario: A label with a placeholder

- WHEN a `label-inside` field labelled "Email" has the placeholder "paula@mee.org" and is not focused
- THEN "Email" sits above "paula@mee.org" inside the field

### Requirement: The label moves with an animation

In the `label-on-edge` and `label-inside` styles the label SHALL move and shrink between its two places in 150 ms, and SHALL move back when the field is emptied and loses focus.
The label SHALL move at once while the system's reduce-motion setting is on.
A label on the edge SHALL have a strip of the field's fill behind it, so the border does not run through the text.

#### Scenario: Focusing an empty field

- WHEN the user taps an empty `label-inside` field labelled "Password"
- THEN "Password" moves up from the middle of the field and shrinks to sit above the text

#### Scenario: Reduced motion

- WHEN the user has turned on reduce motion and taps an empty `label-on-edge` field
- THEN the label is on the top border as soon as the field is focused

#### Scenario: A label on the edge

- WHEN the label of a `label-on-edge` field has moved to the top border
- THEN the border is not drawn through the label text

### Requirement: States follow the design system

A field SHALL have a white surface and a gray stroke by default.
A focused field SHALL show a brand stroke and the brand focus ring.
A field with an error SHALL show an error stroke, an error label, the error icon and its message in the error text color, and a focused field with an error SHALL show the error focus ring.
A disabled field SHALL show the soft gray surface, the disabled text color at half opacity, and SHALL NOT take focus.
A field with no value SHALL show its placeholder in the placeholder text color, and a field with a value SHALL show the value in the body text color.

#### Scenario: Focusing a field

- WHEN the user taps an empty field
- THEN it shows the brand stroke and focus ring, and the keyboard opens

#### Scenario: A field with an error

- WHEN a field labelled "Email" is rendered with the error "Enter a valid email"
- THEN its stroke, label and the message "Enter a valid email" are in the error color and the error icon shows in the field

#### Scenario: A disabled field

- WHEN a disabled field is tapped
- THEN it does not focus, and it keeps the disabled look

### Requirement: The field shows its content

A field SHALL show, in this order, an optional leading icon, its text, an optional error icon and an optional trailing element.
An `Icon` in the leading or trailing position SHALL take the size and text color of the field.
Helper text SHALL show below the field, and an error message SHALL replace it while the field has an error.
A field with a maximum length and its counter turned on SHALL show the current length and the maximum on the right of the helper line, as `0 / 20`.

#### Scenario: A field with an icon and a counter

- WHEN a field with a leading `search` icon, a maximum length of 20 and the counter turned on holds "coffee"
- THEN it shows the search icon, "coffee" and the counter "6 / 20"

### Requirement: The field takes text input

A TextField SHALL accept the value, change handling, keyboard type, secure entry and submit handling of a native text input.
A tap anywhere in the field, including the extended touch area, SHALL focus it.
The touch area of a field SHALL extend to at least 44 × 44 pt on iOS and 48 × 48 dp on Android without changing the look of the field.

#### Scenario: Tapping beside a small field

- WHEN the user taps just above a size `m` field
- THEN the field takes focus

### Requirement: The TextField is described to assistive technology

A TextField SHALL read its label, its value and its disabled state to VoiceOver and TalkBack, and SHALL mark a required field as required.
A TextField with an error SHALL announce the error message when it appears and read it with the field.
Decorative icons SHALL stay hidden from assistive technology.

#### Scenario: Reading a field aloud

- WHEN VoiceOver or TalkBack lands on a required field labelled "Email" that holds "paula@mee.org"
- THEN it announces "Email", "required" and "paula@mee.org"

#### Scenario: An error appears

- WHEN the field labelled "Email" gets the error "Enter a valid email"
- THEN VoiceOver or TalkBack announces "Enter a valid email"

### Requirement: Design exceptions to accessibility are documented

Where a TextField variant as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the TextField SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" in this spec with the variant, the measured value and the required value.

#### Scenario: A color pair below 4.5:1

- WHEN a variant's text and background measure less than 4.5:1
- THEN the variant looks as designed and its measured ratio is listed under "Accessibility exceptions"

### Requirement: The TextField has grouped stories

The stories of `UI/TextField` SHALL cover styles, sizes, states and content in a few stories, each showing several fields side by side.

#### Scenario: TextField stories

- WHEN the stories of `UI/TextField` are listed
- THEN they cover styles, sizes, states and content in a few stories, each showing several fields side by side

## Accessibility exceptions

Measured from the Figma token values with `packages/ui-kit/tailwind/contrast.test.ts`. Every text pair of the TextField, on the white field surface, measures at least 4.5:1, and Disabled fields are exempt.

| Variant | Pair | Measured | Required |
| --- | --- | --- | --- |
| Default | stroke `stroke/gray/accent` on `surface/default/main`, the boundary of the field | 1.48:1 | 3:1 |

## Open questions

- Label motion: the design shows the label in its two places but no motion between them. The 150 ms ease-out used here is a choice, not a Figma value.
