## Why

The design system's Badge is a small status and count marker that screens will use next to titles, rows and buttons.
It is not in the kit, and the kit has no icon component, although the Badge shows icons in its design.
No screen can show a status or a count from Figma until both exist.

**Example:** the Figma Badge ("Mee - Design System v5.2.4", Badge page) has Type `Primary`, `Secondary`, `Success`, `Danger`, `Warning`, Style `Filled - solid`, `Filled - light`, `Outlined - light`, Size `XXS`, `XS`, `S`, `M` (heights 16, 20, 24, 28), and Shape `Rounded`, `Pill`, `Circle`, `Dot`.
The Size `M` Primary solid Rounded badge reads `[dot] [check-circle] Label [info-circle]`.

## What Changes

- Add `Badge` to `packages/ui-kit` with the Figma name and variants, and its grouped stories next to it.
- Rounded and Pill badges show a label, an optional leading dot, and optional leading and trailing icons.
- Circle badges show a short count such as `9+`. Dot badges show no text.
- Add a simple `Icon` component to the kit. It holds the two icons the Badge design uses, `check-circle` and `info-circle`, and takes a size and a color. A later change replaces its contents with the full icon set.
- The Badge takes icons as slots, `leadingIcon` and `trailingIcon`, and gives its text color to an `Icon` placed in a slot, so a slotted icon always matches the label.
- Secondary uses the `gray` color tokens, and Primary uses `brand`, as the Figma variables show. No new color tokens are needed.
- Add the `Badge` and `Icon` exports to the kit index and rows to the ui-kit spec index.

## Capabilities

### New Capabilities

- `components/ui-kit/badge`: the Badge's variants, sizes, shapes, content slots and accessibility contract.
- `components/ui-kit/icon`: the simple Icon component and how a Badge colors an icon in its slots.

### Modified Capabilities

None. The Button's "Content slots" open question is not resolved here, but the Badge's slot names and the Icon give it a convention to follow.

## Impact

- New: `packages/ui-kit/src/Badge/`, `packages/ui-kit/src/Icon/`, with SVG sources for the two icons read from Figma.
- Edited: `packages/ui-kit/src/index.ts`, `openspec/specs/components/ui-kit/README.md`.
- Dependencies: none new. `react-native-svg` is already installed in the workspace and is added to `packages/ui-kit` if it is not yet one of its dependencies.
- `apps/storybook` picks up the new stories through its existing story glob. `apps/app-tellipod` is untouched.
- Authoritative sources: Figma file "Mee - Design System v5.2.4" (Badge page, node 4:8701), WCAG 2.2 AA through `code-practices/accessibility`.

## Open questions

### Label as a prop or as children

Button takes its text as `label`. The Badge could instead take it as children.

**Example:** `Active` with a check icon.

| Option | Usage | Consequence |
| --- | --- | --- |
| A (recommended) | `<Badge label="Active" leadingIcon={<Icon name="check-circle" />} />` | Same as Button, the accessibility label defaults to `label`, and the Badge always controls the text style. |
| B | `<Badge leadingIcon={<Icon name="check-circle" />}>Active</Badge>` | Reads naturally in JSX, but a string child and an element child both need handling, and the text style is harder to guarantee. |

This change takes A. Moving Button and Badge to children together is possible later.

### Accessibility of light and outlined looks

The Figma light and outlined looks use `text/<type>/solid` on `surface/<type>/soft` and on the screen background.
Their contrast is unmeasured until the pairs are checked against 4.5:1.

**Example:** `Warning` light uses `text/warning/solid` (`warning/700`) on `surface/warning/soft` (`warning/50`). It is measured in the tasks, and a failing pair is built as designed and listed under "Accessibility exceptions" in the Badge spec, as the Button does.
