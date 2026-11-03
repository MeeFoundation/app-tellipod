## MODIFIED Requirements

### Requirement: Tokens live in one Tailwind theme

The kit SHALL define every token once, in the Tailwind theme that NativeWind reads, and the app SHALL consume that theme from the kit.
The kit SHALL export that theme as a single Tailwind preset that the app and the Storybook app each add to their own Tailwind configuration.
The theme SHALL NOT use arbitrary-value classes such as `bg-[#1a2b3c]` or `p-[13px]`.

#### Scenario: Token used in the app and in Storybook

- WHEN the app and Storybook render the same component
- THEN both resolve its classes from the same theme

#### Scenario: Consuming the preset

- WHEN the Storybook app adds the kit's preset to its Tailwind configuration
- THEN every kit token class resolves in its stories, and no token is redefined outside the kit

#### Scenario: Arbitrary value in a class

- WHEN a class carries a literal value in square brackets
- THEN it is replaced with a token, and the token is added to the theme first if none covers it

### Requirement: Color pairs meet contrast

Color pairs used for text and controls SHALL meet the contrast ratios in `../../../code-practices/accessibility/spec.md`.
A color pair that the design system defines and that fails those ratios SHALL be built as designed, and the failure SHALL be documented as an exception in the spec of the component that uses it.

#### Scenario: New color pair

- WHEN a text and background token pair is added
- THEN its contrast ratio is checked against those minimums

#### Scenario: A designed pair fails

- WHEN a pair taken from the design system measures below its minimum
- THEN the pair keeps its designed values and the component spec lists it as an exception with its measured ratio
