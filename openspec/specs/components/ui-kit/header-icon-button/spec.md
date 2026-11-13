# header-icon-button

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the HeaderIconButton
- Source: Figma file "Mee - Tellipod App v4.0.3", `Button icon` in `home-topbar` (node 38:2886)

## Purpose

The HeaderIconButton is the kit's icon-only button for the title row of the AppHeader, such as the back chevron and the kebab menu.
It is not the design system's Button and does not implement its types, sizes or labels.

## Requirements

### Requirement: The HeaderIconButton shows one icon and handles a tap

`HeaderIconButton` SHALL take an `icon` name, a required `accessibilityLabel` and an optional `onPress`, and SHALL call `onPress` once per tap.
The type of `accessibilityLabel` SHALL make it required, so an icon button without a label fails type checking.

#### Scenario: A back button

- WHEN a HeaderIconButton has the icon `chevron-left` and the label "Back", and the user taps it
- THEN `onPress` is called once

#### Scenario: A missing label

- WHEN a developer writes a HeaderIconButton without an `accessibilityLabel`
- THEN type checking fails

### Requirement: Looks follow the design

The button SHALL be 44 px square with 10 px padding and `rounded/xl` (12 px) corners, and SHALL draw a 24 px icon in `text/default/body`.
The button SHALL show a `surface/gray/light` fill while it is pressed.
The button SHALL have a touchable area of at least 44 × 44 pt on iOS and 48 × 48 dp on Android, without changing its drawn size.

#### Scenario: Comparing with the design

- WHEN a HeaderIconButton with `three-dots-vertical` is shown
- THEN it is a 44 px square with a 24 px icon centered in it

#### Scenario: Pressing the button

- WHEN the user holds a finger on the button
- THEN it shows the light gray fill until the finger lifts

### Requirement: The HeaderIconButton is described to assistive technology

The button SHALL have the role of button and its label, and its icon SHALL be hidden from assistive technology.

#### Scenario: Reading the kebab

- WHEN VoiceOver or TalkBack lands on the kebab button labelled "More actions"
- THEN it announces "More actions" and a button

## Open questions

- None. The design shows no pressed state; the `surface/gray/light` fill was confirmed by the user.
