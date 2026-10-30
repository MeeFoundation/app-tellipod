# tokens-and-theming

- Depends on: `../../../code-practices/accessibility/spec.md`
- Read when: using a color, size, spacing or type value in UI
- Source: Figma file "Mee - Design System v5.2.4", pages under FOUNDATIONS

## Purpose

Design tokens the kit exposes and how components consume them.

## Requirements

### Requirement: Components use tokens, not literal values

Components SHALL take colors, spacing, typography, shadows, outlines, opacity and overlays from named tokens.
A component SHALL NOT hard-code a literal value for these.

#### Scenario: Changing a token

- WHEN a token value changes
- THEN every component that uses it changes, without editing the components

### Requirement: Token groups follow the design system

The kit SHALL provide token groups matching the design system's foundations: colors, icons, opacity, overlays, outlines, shadows, spacing and typography.

#### Scenario: A design value has no token

- WHEN a screen needs a value that no token covers
- THEN the token is added to the kit first, then used

### Requirement: Styling uses NativeWind

Components SHALL be styled with NativeWind utility classes in `className`.
A component SHALL NOT use `StyleSheet.create` or inline `style` objects for values a token covers.

#### Scenario: Styling a component

- WHEN a component needs a background color and padding
- THEN it applies the token-backed classes in `className`

### Requirement: Tokens live in one Tailwind theme

The kit SHALL define every token once, in the Tailwind theme that NativeWind reads, and the app SHALL consume that theme from the kit.
The theme SHALL NOT use arbitrary-value classes such as `bg-[#1a2b3c]` or `p-[13px]`.

#### Scenario: Token used in the app and in Storybook

- WHEN the app and Storybook render the same component
- THEN both resolve its classes from the same theme

#### Scenario: Arbitrary value in a class

- WHEN a class carries a literal value in square brackets
- THEN it is replaced with a token, and the token is added to the theme first if none covers it

### Requirement: Class names are static

A component SHALL build its `className` from complete class names, chosen by variant or state.
A component SHALL NOT assemble a class name by string concatenation.

#### Scenario: Variant class

- WHEN a button has the variants `primary` and `secondary`
- THEN each variant maps to its full class string

### Requirement: One theme

The kit SHALL provide a single light theme and SHALL NOT provide a dark one.

#### Scenario: Device in dark mode

- WHEN the device is set to dark mode
- THEN the app still shows the light theme

### Requirement: Color pairs meet contrast

Color pairs used for text and controls SHALL meet the contrast ratios in `../../../code-practices/accessibility/spec.md`.

#### Scenario: New color pair

- WHEN a text and background token pair is added
- THEN its contrast ratio is checked against those minimums
