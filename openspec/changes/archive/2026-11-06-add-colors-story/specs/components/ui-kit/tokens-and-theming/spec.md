# tokens-and-theming

- Depends on: `../../../code-practices/accessibility/spec.md`
- Read when: using a color, size, spacing or type value in UI
- Source: Figma file "Mee - Design System v5.2.4", pages under FOUNDATIONS

## Purpose

Design tokens the kit exposes and how components consume them.

## ADDED Requirements

### Requirement: Colors are browsable on a device

The kit SHALL provide a story that shows every color token as a swatch with its token name.
The story SHALL read the colors from the kit's token definition, so a token added to the theme appears without editing the story.
Swatches of translucent colors SHALL sit over a checkerboard.

#### Scenario: Finding a token name

- WHEN a developer opens the colors story on a device
- THEN each color is shown as a swatch filled with its value, with its token name, such as `surface.brand.soft_hover`, under it

#### Scenario: Adding a color token

- WHEN a color token is added to the theme
- THEN its swatch and name appear in the colors story with no change to the story

#### Scenario: A translucent color

- WHEN the story shows `outline.brand`
- THEN its swatch is visible over a checkerboard instead of blending into the white page
