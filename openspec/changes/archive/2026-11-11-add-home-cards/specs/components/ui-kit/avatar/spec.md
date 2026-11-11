# avatar

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Avatar
- Source: Figma file "Mee - Design System v5.2.4", Avatar page (node 28:1476)

## Purpose

The Avatar is the kit's small picture of a person or a pod: initials, an image or an icon, in a circle or a rounded square.
It implements the design-system Avatar with its contents, sizes and shapes, and styles every variant from tokens.
It does not implement the top badge (a count, or a dot at size `xxs`) or the bottom status dot, because no screen uses them yet.
It does not load or crop pod data: the screen gives it the initials, the image source or the icon name.

## ADDED Requirements

### Requirement: The Avatar has the design-system variants

An Avatar SHALL accept a content of `initials`, `image` or `icon`, a size of `xxs`, `xs`, `s`, `m`, `l` or `xl`, and a `circle` flag.
Every combination of content, size and circle flag SHALL be available.
The default content SHALL be `initials`, the default size `m` and the default `circle` true.
A `circle` Avatar SHALL be fully rounded, and one without `circle` SHALL have a corner radius of 8 px.

#### Scenario: An avatar with only initials

- WHEN an Avatar is rendered with only the initials "M"
- THEN it shows a 40 px circle with "M"

#### Scenario: A rounded square

- WHEN an Avatar of size `xl` is rendered with `circle` off and the initials "JD"
- THEN it shows a 64 px square with 8 px corners and "JD"

### Requirement: Sizes follow the design system

An Avatar SHALL be 16 px across at size `xxs`, 24 px at `xs`, 32 px at `s`, 40 px at `m`, 48 px at `l` and 64 px at `xl`.
Initials SHALL be bold, and initials and the icon SHALL scale with the size as follows.

| Size | Across | Initials | Icon |
| --- | --- | --- | --- |
| `xxs` | 16 px | 12 px on a 16 px line | 12 px |
| `xs` | 24 px | 12 px on a 16 px line | 16 px |
| `s` | 32 px | 14 px on a 20 px line | 18 px |
| `m` | 40 px | 16 px on a 24 px line | 20 px |
| `l` | 48 px | 18 px on a 28 px line | 24 px |
| `xl` | 64 px | 20 px on a 30 px line | 32 px |

#### Scenario: Comparing sizes

- WHEN Avatars of sizes `xxs`, `xs`, `s`, `m`, `l` and `xl` are shown together
- THEN their widths and heights are 16, 24, 32, 40, 48 and 64 px

### Requirement: Initials show on a brand surface

An Avatar of content `initials` SHALL show the initials it is given, centered, in the `surface/brand/main` color on the `surface/brand/light` surface.
At sizes `xxs` and `xs` it SHALL show one character, and from size `s` up at most two.

#### Scenario: Two initials

- WHEN an Avatar of size `l` is rendered with the initials "JD"
- THEN it shows "JD" in bold teal on a pale teal circle

#### Scenario: Initials at the smallest size

- WHEN an Avatar of size `xxs` is rendered with the initials "JD"
- THEN it shows "J"

### Requirement: An image fills the Avatar

An Avatar of content `image` SHALL show the image source it is given, scaled to cover the whole Avatar and clipped to its shape.

#### Scenario: A pod photo

- WHEN an Avatar of size `m` is rendered with the photo of "About Sofia"
- THEN the photo fills a 40 px circle

### Requirement: An icon shows on a brand surface

An Avatar of content `icon` SHALL show the icon it is given, by name, centered on the `surface/brand/light` surface.
The default icon SHALL be `person`.

#### Scenario: The default icon

- WHEN an Avatar of content `icon` and size `m` is rendered with no icon name
- THEN it shows a 20 px person glyph on a pale teal circle

### Requirement: The Avatar is described to assistive technology

An Avatar SHALL be hidden from assistive technology unless it is given an accessibility label.
An Avatar given a label SHALL have the role of image and that label.

#### Scenario: A decorative avatar

- WHEN VoiceOver or TalkBack reads a card with an Avatar that has no accessibility label
- THEN it does not stop on the Avatar

#### Scenario: A labelled avatar

- WHEN VoiceOver or TalkBack lands on an Avatar with the accessibility label "Sofia"
- THEN it announces "Sofia" and an image

### Requirement: Design exceptions to accessibility are documented

Where an Avatar variant as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the Avatar SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" in this spec with the variant, the measured value and the required value.

#### Scenario: Initials below 4.5:1

- WHEN the initials and their surface measure less than 4.5:1
- THEN the variant looks as designed and its measured ratio is listed under "Accessibility exceptions"

### Requirement: The Avatar has grouped stories

The stories of `UI/Avatar` SHALL cover the contents, sizes and shapes in a few stories, each showing several Avatars side by side.

#### Scenario: Avatar stories

- WHEN the stories of `UI/Avatar` are listed
- THEN they cover contents, sizes and shapes in a few stories, each showing several Avatars side by side

## Accessibility exceptions

| Variant | Measured | Required |
| --- | --- | --- |
| Initials in `surface/brand/main` on `surface/brand/light` (all sizes) | 3.38:1 | 4.5:1 |

The `icon` content uses the same pair as a non-text part, which needs 3:1 and reaches 3.38:1.

## Open questions

- The corner radius of the non-circle shape is read from size `xl` only; the other sizes are assumed to match.
