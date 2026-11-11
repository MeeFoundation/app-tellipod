## ADDED Requirements

### Requirement: The CellInfo has a surface

A CellInfo SHALL have the `surface/default/main` surface, a 16 px corner radius, a 1 px `stroke/gray/light` border, the first-level box shadow, 12 px of padding at the top, bottom and leading edge and 8 px at the trailing edge.
The border and shadow SHALL show when a CellInfo is on a white screen.

#### Scenario: A row on a white screen

- WHEN a CellInfo "First name" with the value "Sofia" is shown on a white screen
- THEN it shows its own surface with rounded corners, a border and a shadow

#### Scenario: Rows in a card body

- WHEN three CellInfo rows are shown in the body of the "Contact info" Card
- THEN each row shows its own surface, border and shadow
