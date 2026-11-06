# components/ui-kit/badge Specification

## Purpose
The Badge is the kit's small status and count marker. It has the name and variants of the design-system Badge and styles every variant from tokens.

## Requirements

### Requirement: The Badge has the design-system variants

The Badge SHALL accept a type of `primary`, `secondary`, `success`, `danger` or `warning`, a style of `filled-solid`, `filled-light` or `outlined-light`, a size of `xxs`, `xs`, `s` or `m`, and a shape of `rounded`, `pill`, `circle` or `dot`.
Every combination of type, style, size and shape SHALL be available.
The default type SHALL be `primary`, the default style `filled-solid`, the default size `m` and the default shape `rounded`.

#### Scenario: A badge with only a label

- WHEN a Badge is rendered with only the label "Active"
- THEN it shows a size `m` Primary Filled - solid Rounded badge reading "Active"

#### Scenario: A success badge in the light style

- WHEN a Badge is rendered with type `success` and style `filled-light`
- THEN it shows the Success Filled - light look from the design system

### Requirement: Sizes follow the design system

A Badge SHALL be 16 px high at size `xxs`, 20 px at `xs`, 24 px at `s` and 28 px at `m`.
The label, the leading dot and the icons of a Badge SHALL scale with its size as follows.

| Size | Height | Horizontal padding of `rounded` and `pill` | Label | Dot and icons |
| --- | --- | --- | --- | --- |
| `xxs` | 16 px | 4 px | 10 px | 10 px |
| `xs` | 20 px | 4 px | 12 px | 12 px |
| `s` | 24 px | 6 px | 14 px | 14 px |
| `m` | 28 px | 8 px | 16 px | 16 px |

#### Scenario: Comparing sizes

- WHEN badges of sizes `xxs`, `xs`, `s` and `m` are shown together
- THEN their heights are 16, 20, 24 and 28 px

### Requirement: Shapes follow the design system

A `rounded` Badge SHALL have a corner radius of 4 px at sizes `xxs`, `xs` and `s` and 6 px at size `m`.
A `pill` Badge SHALL be fully rounded and show the same content as a `rounded` Badge.
A `circle` Badge SHALL show a short count in place of a label, be fully rounded and be at least as wide as it is high.
A `dot` Badge SHALL show no text, be fully rounded and be 4, 8, 12 and 16 px across at sizes `xxs`, `xs`, `s` and `m`.

#### Scenario: A count badge

- WHEN a `circle` Badge is rendered with the count "9+" at size `m`
- THEN it shows "9+" in a fully rounded badge that is 28 px high and at least 28 px wide

#### Scenario: A dot badge

- WHEN a `dot` Badge is rendered at size `m`
- THEN it shows a 16 px filled circle with no text

### Requirement: Styles follow the design system

A `filled-solid` Badge SHALL use the `solid` surface and stroke of its type and the `on-solid-background` text color.
A `filled-light` Badge SHALL use the `soft` surface, the `light` stroke and the `solid` text color of its type.
An `outlined-light` Badge SHALL use the `light` stroke and the `solid` text color of its type, with no fill.
The type `secondary` SHALL use the `gray` colors and the type `danger` SHALL use the `error` colors.

#### Scenario: Comparing styles

- WHEN Primary badges of the three styles are shown together
- THEN the solid one is filled dark with white text, the light one is filled pale with dark text, and the outlined one shows only the pale border with dark text

### Requirement: The Badge shows a dot and icons around its label

A `rounded` or `pill` Badge SHALL show, in this order, an optional leading dot, an optional leading icon, its label and an optional trailing icon.
The leading icon and the trailing icon SHALL be passed as slots, and an `Icon` in a slot SHALL take the size and text color of the Badge.

#### Scenario: A badge with icons

- WHEN a Badge labelled "Active" is rendered with a leading `check-circle` icon and a trailing `info-circle` icon
- THEN it reads icon, "Active", icon, and both icons have the size and text color of the label

#### Scenario: A badge with a dot

- WHEN a Badge labelled "Live" is rendered with its dot turned on
- THEN a dot of the badge's type shows before the label

### Requirement: The Badge is described to assistive technology

A Badge SHALL have the role of text and an accessibility label that defaults to its label.
A `dot` Badge with no accessibility label SHALL be hidden from assistive technology.

#### Scenario: Reading a badge aloud

- WHEN VoiceOver or TalkBack lands on a Badge labelled "Active"
- THEN it announces "Active"

#### Scenario: A labelled dot

- WHEN VoiceOver or TalkBack lands on a `dot` Badge with the accessibility label "Unread"
- THEN it announces "Unread"

### Requirement: Design exceptions to accessibility are documented

Where a Badge variant as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the Badge SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" in this spec with the variant, the measured value and the required value.

#### Scenario: A color pair below 4.5:1

- WHEN a variant's text and background measure less than 4.5:1
- THEN the variant looks as designed and its measured ratio is listed under "Accessibility exceptions"

### Requirement: The Badge has grouped stories

The stories of `UI/Badge` SHALL cover types, styles, sizes, shapes and content in a few stories, each showing several badges side by side.

#### Scenario: Badge stories

- WHEN the stories of `UI/Badge` are listed
- THEN they cover types, styles, sizes, shapes and content in a few stories, each showing several badges side by side
