## Why

The Info tab of a pod (Figma "Mee - Tellipod App v4.0.3", node 820:14161) shows each form as a collapsible card: a header with an icon, a title and a chevron, an expandable list of read-only values with an edit action, and a footer button.
The same card, collapsed and with a right chevron, also opens Attachments, Subpods and Members.
The kit has Button, Icon and TextField, but no card, no value row and no divider, so the screen cannot be built from kit components.

**Example:** the "Contact info" card is expanded and lists First name "Sofia", Last name "Walker" and Date of birth "April 8, 2018", each with a pencil.
Below the list it shows "Add contact info", and below the card "Create form".
"Attachments" under it is the same card, collapsed, with a right chevron and no body.

## What Changes

- Add a `Card` to the UI kit (Figma `Card-Cell-Details-Preview`) with a header, an optional expandable body and an optional footer.
  It has two modes: expandable (down chevron, shows its body) and navigable (right chevron, calls `onPress`).
- Add a `CellInfo` row (Figma `cell-info`): a small label, a value and an optional trailing edit button.
- Add a `Divider` (Figma `Divider`).
- Add the Icon glyphs the screen uses: `chevron-down`, `pencil`, `plus`, `folder-plus`, `paperclip`, `diagram-3`, `people`, `person-vcard`.
- Add Storybook stories for the three components.
- Out of scope: the "FORMS" section label, the Avatar, the pod top bar, and the Info screen itself.

## Capabilities

### New Capabilities
- `components/ui-kit/card`: the expandable and navigable Card with header, body and footer slots.
- `components/ui-kit/cell-info`: the label, value and edit-action row shown in a Card body.
- `components/ui-kit/divider`: the hairline between groups.

### Modified Capabilities
- `components/ui-kit/icon`: the list of available glyph names grows by the eight above.

## Open questions

**Names.**
The kit names a component after its design-system component, and the Tellipod App file calls these `Card-Cell-Details-Preview` and `cell-info`.
The design-system file "Mee - Design System" may name them differently.

**Example:**

| Option | Kit names |
| --- | --- |
| Tellipod App names | `CardCellDetailsPreview`, `CellInfo`, `Divider` |
| Short names | `Card`, `CellInfo`, `Divider` |

This proposal assumes the short names until the design-system names are confirmed.

**One component or two.**
The expandable and the navigable card share one Figma component.
This proposal assumes one `Card` with two modes.
If the design system splits them, the navigable card becomes its own spec.

**Example:** "Contact info" (expandable) and "Members" (navigable) are the same header: icon in a circle, 16 px title, chevron.

**Section label.**
"FORMS" is a caption with no kit component to host it, because the kit has no `Text`.
Whether it becomes a `Text` component, a token or screen-level styling is left to a later change.

## Impact

- Code: `packages/ui-kit/src/Card/`, `CellInfo/`, `Divider/`, `Icon/glyphs.tsx`, `packages/ui-kit/src/index.ts`, Storybook stories.
- Specs: three new specs and one delta under `openspec/specs/components/ui-kit/`, and a row per new spec in `openspec/specs/components/ui-kit/README.md`.
- Depends on: the Button, Icon and tokens specs, and `code-practices/accessibility`.
- No data-layer or node impact.
  The components render what a screen passes them.
