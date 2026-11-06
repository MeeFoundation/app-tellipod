## MODIFIED Requirements

### Requirement: Components match the design system

Each kit component SHALL have the name of its design-system component.
It SHALL have exactly the variants of that component, or of the part of it that its spec says it implements.
A spec that implements only part of a design-system component SHALL name the parts left out.

#### Scenario: Kit component matches the design

- WHEN a kit component is compared with its design-system component
- THEN it has the same name and exactly the same variants, such as Badge sizes `xxs`, `xs`, `s` and `m`

#### Scenario: Variant not in the design

- WHEN a screen needs a variant that is not in the design system
- THEN the kit does not get it until the design system has it

#### Scenario: A component implements part of a design component

- WHEN the TextField is compared with the design-system Text Field
- THEN it has the input variants, and its spec names Select, Multiselect, add-ons, the label tooltip and the strength meter as left out
