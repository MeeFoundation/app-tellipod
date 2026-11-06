## Why

The design system's Text Field is the control every form screen needs, and the kit has none.
No screen that asks the user to type, such as sign-in, search or naming a pod, can be built from Figma until it exists.

**Example:** the Figma Text Field ("Mee - Design System v5.2.4", page "Text Field - Input / Select / Multiselect", node 4:10661) has 180 variants: Style `Label on edge`, `Label above field`, `Label inside field`, Size `S`, `M`, `L`, and the states Default, Filled, Focus, Alert and Disabled, with and without a placeholder.
A size `M` Label above field reads `Label*`, then a 36 px field with a leading `search` icon and the text, then the helper text `Helper text` and the counter `0 / 20`.

## What Changes

- Add `TextField` to `packages/ui-kit` with the Figma styles, sizes and states, and its grouped stories next to it.
- The TextField shows an optional label with a required marker, a text input with an optional placeholder, an optional leading icon, an optional trailing slot, helper or error text, and an optional counter.
- It wraps the React Native `TextInput`: value, change and keyboard props pass through, and the Focus and Filled looks follow the field itself, while Alert and Disabled follow props.
- The TextField styles every look from the kit's tokens. The Focus ring uses the existing `outline-brand` and `outline-error` shadows, so no new tokens are needed.
- Add the Bootstrap icons the design draws in the field to the kit's icon list: `search` and `exclamation-circle`.
- This change builds the **input** part of the Figma Text Field only. Select, Multiselect, the add-on chips, the label tooltip and the password strength meter are not built, because no screen uses them yet. The `components` spec is amended so a kit component may implement a documented part of a design-system component.
- Add the `text-field` row to the ui-kit spec index and the `TextField` export to the kit index.

## Capabilities

### New Capabilities

- `components/ui-kit/text-field`: the TextField's styles, sizes, states, content and accessibility contract.

### Modified Capabilities

- `components/ui-kit/components`: a kit component may implement a documented part of a design-system component, and its spec names what is left out.
- `components/ui-kit/icon`: the list of icon names gains `search` and `exclamation-circle`, and the requirement for a generated icon file is removed because the kit imports icons from the Bootstrap Icons package by name and has no generator.

## Impact

- New: `packages/ui-kit/src/TextField/`.
- Edited: `packages/ui-kit/src/Icon/` (icon list), `packages/ui-kit/src/index.ts`, `openspec/specs/components/ui-kit/README.md`.
- Dependencies: none new. `bootstrap-icons` and `react-native-svg` are already used by the kit.
- `apps/storybook` picks up the new stories through its existing story glob. `apps/app-tellipod` is untouched.
- Authoritative sources: Figma file "Mee - Design System v5.2.4" (Text Field page, node 4:10661), WCAG 2.2 AA through `code-practices/accessibility`.

## Open questions

### The Figma Text Field is also a select, a multiselect and a password field

The Figma variants carry a `Multiselect` property, a chevron, chips with a `+3` counter, add-ons such as `A-1` and a flag, and a strength meter.
The components spec says a kit component has exactly the variants of its design-system component.

**Example:** a size `M` Filled field with `Multiselect` on shows an avatar chip `Label ×` and `+3`, which has no counterpart in a plain input.

| Option | Consequence |
| --- | --- |
| A (recommended) | Build the input part, name the parts left out in the spec, and amend the `components` spec to allow it. Select, Multiselect, add-ons and the strength meter are added by their own changes when a screen needs them. |
| B | Build every Figma variant now. The kit then holds a select and a multiselect that no screen uses, against its own rule. |

This change takes A.

### Space between the field and the helper text

Figma shows the helper text 11 px below the field only when the strength meter is on: the meter layer (`progressBar`) is a toggled 7 px strip, and the stack has a 2 px gap around it.
With the meter off, as in this change, the stack has only the 2 px gap.

**Example:** in size `M` Label above field the field ends at 58 px, the strip is 60 to 67 px and the helper starts at 69 px with the meter on. With the meter off the helper starts at 60 px.

| Option | Consequence |
| --- | --- |
| A (recommended) | The helper sits 2 px below the field, as in the Figma variants without the meter. No spacing token is needed. |
| B | Reserve the 7 px strip so the meter can be added later without moving the helper. The field is then taller than Figma shows without a meter. |

This change takes A. The strength meter's own change adds the strip when it is built.

### Size of the touch area

The field is 30 px high at `S`, 36 px at `M` and 44 px at `L` (Label inside field: 40, 48 and 56 px), below the 44 pt and 48 dp minimum of `code-practices/accessibility` for the smaller sizes.

**Example:** a size `M` Label above field is 36 px high, so a tap 6 px above the field misses it.

| Option | Consequence |
| --- | --- |
| A (recommended) | Keep the design's height and extend the touch area to the minimum around the field, so a tap anywhere in it focuses the input. |
| B | List the sizes as accessibility exceptions in the spec and extend nothing. |

This change takes A.

### Contrast of the placeholder and disabled looks

The placeholder uses `text/default/placeholder` on `surface/default/main`, and the Disabled look uses `text/default/disabled` on `surface/gray/light` at 50% opacity.
Their contrast is unmeasured until the pairs are checked against 4.5:1.

**Example:** the placeholder pair is measured in the tasks, and a failing pair is built as designed and listed under "Accessibility exceptions" in the TextField spec, as the Button and Badge do. Disabled controls are exempt from the minimum.
