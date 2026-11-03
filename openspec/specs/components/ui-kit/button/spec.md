# button

- Depends on: `../tokens-and-theming/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Button
- Source: Figma file "Mee - Design System v5.2.4", Buttons page

## Purpose

The Button is the kit's tappable control. It has the name and variants of the design-system Button and styles every variant from tokens.

## Requirements

### Requirement: The Button has the design-system variants

The Button SHALL accept a size of `s`, `m`, `l` or `xxl`, a style of `filled`, `outlined` or `link`, and a type of `primary`, `secondary`, `tertiary` or `danger`.
Every combination of size, style and type SHALL be available.
The default size SHALL be `m`, the default style `filled` and the default type `primary`.

#### Scenario: A secondary outlined button

- WHEN a Button is rendered with style `outlined` and type `secondary`
- THEN it shows the Secondary outlined look from the design system

#### Scenario: A button with no variant chosen

- WHEN a Button is rendered with only a label
- THEN it shows a size `m` Primary filled button

### Requirement: Sizes follow the design system

A Button SHALL be 30 px high at size `s`, 36 px at `m`, 44 px at `l` and 56 px at `xxl`.

#### Scenario: Comparing sizes

- WHEN buttons of sizes `s`, `m`, `l` and `xxl` are shown together
- THEN their heights are 30, 36, 44 and 56 px

### Requirement: States map to touch interaction

A Button SHALL have the states default, pressed, focused and disabled.
Pressed SHALL show the design system's Hover look, because touch devices have no hover.
Focused SHALL show the design system's Focus look, including its visible focus ring.

#### Scenario: Pressing a button

- WHEN the user presses and holds a Primary filled Button
- THEN it shows the Hover look of a Primary filled button until the user lifts the finger

#### Scenario: Moving focus to a button

- WHEN a keyboard or screen reader moves focus to a Button
- THEN the Button shows the Focus look with its focus ring

### Requirement: A disabled Button does not act

A disabled Button SHALL show the design system's Disabled look and SHALL NOT call its press handler.

#### Scenario: Pressing a disabled button

- WHEN the user presses a disabled Button
- THEN nothing happens, and the Button keeps its Disabled look

#### Scenario: Pressing an enabled button

- WHEN the user taps an enabled Button
- THEN its press handler is called once

### Requirement: The Button is described to assistive technology

A Button SHALL have the role of button, an accessibility label that defaults to its visible text, and its disabled state.

#### Scenario: Reading a button aloud

- WHEN VoiceOver or TalkBack lands on a Button labelled "Save"
- THEN it announces "Save, button", and "dimmed" or "disabled" when the Button is disabled

### Requirement: Design exceptions to accessibility are documented

Where a Button variant as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the Button SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" in this spec with the variant, the measured value and the required value.

#### Scenario: A color pair below 4.5:1

- WHEN a variant's label and background measure less than 4.5:1
- THEN the variant looks as designed and its measured ratio is listed under "Accessibility exceptions"

### Requirement: The Button has grouped stories

The stories of `UI/Button` SHALL cover sizes, styles, types and states in a few stories, each showing several buttons side by side.

#### Scenario: Button stories

- WHEN the stories of `UI/Button` are listed
- THEN they cover sizes, styles, types and states in a few stories, each showing several buttons side by side

## Accessibility exceptions

Measured from the Figma token values with `packages/ui-kit/tailwind/contrast.test.ts`. All other text and background pairs of the Button measure at least 4.5:1, and Disabled controls are exempt.

| Variant | Pair | Measured | Required |
| --- | --- | --- | --- |
| Filled Primary, Default | label `text/brand/on-solid-background` on the light end of the fill gradient, `auxiliary/brand/500` | 4.09:1 | 4.5:1 |
| Filled Primary, Default | the same label at the top of the light end, where the 15% white sheen lies over `auxiliary/brand/500` | 3.19:1 | 4.5:1 |

## Open questions

- Content slots: the design shows a leading icon, a counter badge and a trailing icon around the label. This change covers the label only. See the proposal for the options.
