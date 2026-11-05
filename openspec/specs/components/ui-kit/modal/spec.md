# modal

- Depends on: `../tokens-and-theming/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Modal
- Source: Figma file "Mee - Tellipod App v4.0.3", Modal (node 119:9506)

## Purpose

The Modal is the kit's bottom sheet for a short list of actions or details about one item. It implements the design's Modal, with a title, a subtitle, an optional badge and a free-form body, and it can be locked so the user cannot dismiss it.
It does not implement a centered dialog, a close button, a pinned footer, a half-open resting height or a sheet that coexists with the screen behind it, because the design does not show them or no screen uses them yet.

## Requirements

### Requirement: The screen controls whether the Modal is open

`Modal` SHALL take an `open` flag, and the Modal SHALL be shown when `open` is true and hidden when it is false.
`Modal` SHALL take an optional `onClose` handler, and SHALL call it once when the user asks to dismiss a closable Modal.
`Modal` SHALL NOT change `open` itself, and SHALL NOT call `onClose` when the screen sets `open` to false.
`Modal` SHALL appear from the bottom edge, as wide as the screen, above the content of the screen.

#### Scenario: Opening from a screen

- WHEN the screen sets `open` to true
- THEN the Modal slides up from the bottom edge and stays open until `open` becomes false

#### Scenario: The screen closes the Modal

- WHEN the screen sets `open` to false after the user taps "Copy value"
- THEN the Modal slides down and `onClose` is not called

### Requirement: The header shows a title, a subtitle and a badge

`Modal` SHALL show a grabber, then a title, then an optional subtitle, then an optional badge beside the title, and then its body.
The title SHALL accept formatted text, so part of it can be bold, as in "Email: **bogdan@gmail.com**".
The title and the subtitle SHALL wrap onto more lines when they do not fit, and SHALL NOT be clipped or cut with an ellipsis.
The header SHALL stay in place while the body scrolls.

#### Scenario: The design's header

- WHEN a Modal has the title "Email: **bogdan@gmail.com**" and the subtitle "Shared by Geo yesterday"
- THEN the title is shown in medium weight with the bold part bold, and the subtitle is shown below it

#### Scenario: A long title

- WHEN the title is longer than one line of the sheet
- THEN it wraps onto further lines and the subtitle follows the last line

### Requirement: Looks follow the design

The sheet SHALL have the `surface/default/main` fill, 28 px rounded top corners (`rounded/3xl`) and square bottom corners, and an upward shadow of `alpha/always/dark/10` offset 1 px up with a 30 px blur.
The grabber SHALL be a 60 px wide, 4 px high pill of `surface/gray/accent`, centered, 5 px from the top, in a 16 px high strip.
The header SHALL have 16 px side padding and 8 px vertical padding.
The title SHALL be `XL/Medium` in `text/default/title`, and the subtitle SHALL be `SM/Regular` in `text/default/subtle`.
The body SHALL have 16 px padding on all sides, and the sheet SHALL end with 8 px of padding below the body plus the bottom safe-area inset.
The backdrop SHALL fill the screen behind the sheet with `alpha/always/dark/80` over a background blur of 10 px.
The sheet SHALL NOT draw the home indicator, because the device draws it.

#### Scenario: Comparing with the design

- WHEN the Modal is shown with three buttons in its body
- THEN it is as wide as the screen, with a grabber, a header and the buttons at the 16 px padding of the design, and 331 pt high above the safe area

#### Scenario: The backdrop

- WHEN a Modal is open over a screen
- THEN the screen behind it is blurred and dimmed, and the sheet is not

### Requirement: The Modal is as tall as its content, up to a limit

The Modal SHALL be as tall as its header and body together while they fit.
When they do not fit, the Modal SHALL stop 16 px below the top safe area of the screen, the header SHALL stay visible and the body SHALL scroll.
The last item of a scrolling body SHALL be reachable above the bottom safe area.

#### Scenario: Short content

- WHEN the body holds three buttons
- THEN the Modal is as tall as its content and the body does not scroll

#### Scenario: Content taller than the screen

- WHEN the body holds 40 buttons on a screen 844 pt high
- THEN the Modal stops 16 px below the status bar area, "Email: bogdan@gmail.com" and "Shared by Geo yesterday" stay visible and the user scrolls the buttons

#### Scenario: Reaching the last item

- WHEN the user scrolls a long body to its end
- THEN the last button is fully visible and clear of the home indicator

### Requirement: A closable Modal can be dismissed

A Modal without `locked` SHALL show the grabber and SHALL call `onClose` when the user swipes the sheet down, taps outside the sheet or presses the Android back button.
A swipe down that starts in a scrolling body SHALL scroll the body first, and SHALL move the sheet only when the body is at its top.

#### Scenario: Swiping down

- WHEN the user drags the header of a closable Modal down and lets go
- THEN `onClose` is called once

#### Scenario: Tapping outside

- WHEN the user taps the dimmed screen above a closable Modal
- THEN `onClose` is called once

#### Scenario: Scrolling a long body

- WHEN the user swipes down on a long body that is scrolled halfway
- THEN the body scrolls up and `onClose` is not called

### Requirement: A locked Modal cannot be dismissed

A Modal with `locked` SHALL hide the grabber and SHALL NOT be dismissed by a swipe down, a tap outside the sheet or the Android back button.
A locked Modal SHALL NOT call `onClose`, and SHALL stay open until the screen sets `open` to false.
A locked Modal SHALL keep the dimmed backdrop, and its body SHALL still scroll.

#### Scenario: Trying to dismiss a locked Modal

- WHEN the user swipes down, taps the dimmed screen or presses Android back on a locked Modal
- THEN the Modal stays open and `onClose` is not called

#### Scenario: Leaving a locked Modal

- WHEN the user taps a button in the body and the screen sets `open` to false
- THEN the Modal slides down

### Requirement: The Modal is described to assistive technology

An open Modal SHALL be announced as a modal, and screen reader focus SHALL move into it when it opens and return to the element that opened it when it closes.
While a Modal is open, screen reader focus SHALL NOT reach the screen behind it.
A screen reader user SHALL be able to dismiss a closable Modal with the platform's dismiss gesture.
The grabber SHALL be hidden from assistive technology.
The Modal SHALL leave the accessibility of its body to the content in it.

#### Scenario: Opening with VoiceOver

- WHEN a Modal opens while VoiceOver is on
- THEN focus lands on the title "Email: bogdan@gmail.com" and the elements behind the Modal are not reachable

#### Scenario: Dismissing with a screen reader

- WHEN a VoiceOver or TalkBack user performs the dismiss gesture on a closable Modal
- THEN `onClose` is called once

#### Scenario: Text at the largest system size

- WHEN the user sets the largest system font size
- THEN the title and the subtitle wrap, and the body scrolls so every action stays reachable

### Requirement: Design exceptions to accessibility are documented

Where the Modal as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the Modal SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" with the variant, the measured value and the required value.

#### Scenario: A locked Modal has no dismiss gesture

- WHEN a screen reader user is in a locked Modal
- THEN the platform's dismiss gesture does nothing, and the exception is listed under "Accessibility exceptions"

### Requirement: The Modal has grouped stories

The stories of `UI/Modal` SHALL cover closable and locked, content that fits and content that scrolls, and the header with and without a subtitle and a badge, in a few stories.

#### Scenario: Modal stories

- WHEN the stories of `UI/Modal` are listed
- THEN they cover closable and locked, short and long content, and the header variants in a few stories

## Additions to the design

| Addition | Why | Until |
| --- | --- | --- |
| The backdrop's tap behavior | The Modal node shows the sheet only | The design system shows what a tap on the backdrop does |
| `locked`: no grabber, no dismissal | The design shows only the closable sheet | The design system shows a locked sheet |

## Accessibility exceptions

| Variant | Measured | Required | Note |
| --- | --- | --- | --- |
| Locked Modal | No dismiss gesture or back action | A way out for every user | Built as locked. The screen must put an action that sets `open` to false in the body. |

## Open questions

- The 10 px backdrop blur is built with the platform's blur, whose strength is not set in pixels. It is matched by eye, so it may differ slightly from the design.
