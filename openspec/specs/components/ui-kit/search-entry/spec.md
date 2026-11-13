# search-entry

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the SearchEntry
- Source: Figma file "Mee - Tellipod App v4.0.3", `Text-field` link in `home-topbar` (node 13:9694)

## Purpose

The SearchEntry is the kit's search-field-looking row that opens search when the user taps it, as in the Home header.
It is a button, not an input: it does not take text, and the `TextField` stays the kit's only text entry.

## Requirements

### Requirement: The SearchEntry opens search when tapped

`SearchEntry` SHALL take a `placeholder` and an `onPress`, and SHALL call `onPress` once per tap.
`SearchEntry` SHALL NOT show a keyboard or take focus.

#### Scenario: Opening search

- WHEN the Home header shows a SearchEntry with the placeholder "Search, or ask Telli..." and the user taps it
- THEN `onPress` is called once and no keyboard shows on the Home screen

### Requirement: Looks follow the design

The row SHALL be as wide as its parent and 44 px high, with a 1 px `stroke/gray/accent` border, a `surface/default/main` fill, `rounded/xl` (12 px) corners and 12 px padding.
The row SHALL show a 20 px `search` icon, 8 px from the placeholder, and the placeholder SHALL be `Base/Regular` in `text/default/placeholder` on one line.
The row SHALL show a `surface/gray/soft` fill while it is pressed, because the placeholder on `surface/gray/light` measures 4.34:1, below the 4.5:1 minimum.
The row SHALL have a touchable area of at least 44 pt on iOS and 48 dp on Android.

#### Scenario: Comparing with the design

- WHEN a SearchEntry is shown in a 362 px wide parent
- THEN it is 362 px wide and 44 px high with the icon and the placeholder on one line

#### Scenario: Pressing the entry

- WHEN the user holds a finger on the row
- THEN it shows the soft gray fill until the finger lifts

### Requirement: The SearchEntry is described to assistive technology

The row SHALL have the role of button and the placeholder as its label, and its icon SHALL be hidden from assistive technology.

#### Scenario: Reading the search entry

- WHEN VoiceOver or TalkBack lands on the SearchEntry with the placeholder "Search, or ask Telli..."
- THEN it announces "Search, or ask Telli..." and a button

## Open questions

- None. The design shows no pressed state; the `surface/gray/soft` fill was chosen with the user after the `surface/gray/light` fill failed the contrast minimum.
