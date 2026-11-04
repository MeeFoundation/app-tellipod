## Context

`packages/ui-kit` has the Button, a Tailwind preset with the `surface`, `stroke` and `text` color groups for `brand`, `error`, `gray`, `success` and `warning`, a `fontSize` scale that already has `xxs`, a `borderRadius` scale (`DEFAULT` 4 px, `md` 6 px, `full`), and `react-native-svg` in the workspace.
The Button splits its looks over `ButtonBase` and three variant files and styles them with NativeWind class strings.
The kit has no icon component. See proposal.md for motivation and the two open questions that this design resolves.

Figma values read from the Badge page: Size `M` is 28 px high with 8 px horizontal padding, a 6 px radius, 16 px label and 16 px icons. Sizes `S`, `XS` and `XXS` use 6, 4 and 4 px padding, a 4 px radius and labels of 14, 12 and 10 px.
`Pill`, `Circle` and `Dot` use `rounded/full`.
Only the Primary and Secondary looks at size `M`, plus the Primary look at the other sizes, were read in full. The tasks read the rest before the class tables are written.

## Goals / Non-Goals

**Goals:**
- One `Badge` that covers all 5 types, 3 styles, 4 sizes and 4 shapes of the design.
- A small `Icon` that a Badge can color and size, written so a larger icon set can replace its contents.

**Non-Goals:**
- The full icon set, and generating it from Figma.
- Resolving the Button's content-slot question. The Badge only offers a convention for it.
- Interactive badges. The design shows none.

## Decisions

### The label is the `label` prop

The Badge takes its text as `label`, as the Button does.
The accessibility label defaults to it, and the Badge alone styles the text, so it always has the size, weight and color of its variant.
A `circle` Badge uses `label` for its count.
A `dot` Badge has no label and takes only an optional `accessibilityLabel`.

**Rejected alternatives:**
- Label as children. It reads well in JSX, but a string child and an element child both need handling, and the text style is harder to guarantee.

### Icons are `ReactNode` slots, colored through context

The Badge takes `leadingIcon` and `trailingIcon` as `ReactNode` and a boolean `dot` for the leading dot.
The Badge wraps its slots in a small context that holds the size and the text color class of the current look.
`Icon` reads that context for its default size and color, and an explicit `size` or `color` wins.

**Rejected alternatives:**
- Render function slots, `leadingIcon={(color) => ...}`. Explicit, but every use site repeats the plumbing.
- Cloning the slot element to inject props. It breaks when the slot holds a wrapper or fragment.
- The consumer passes size and color. The icon can drift from the label when a type or size changes.

### One component with literal class tables

A single `Badge` holds three tables of complete class strings: looks by style and type (15 entries), size classes by size (4 entries) and the shape rules.
Class strings are written out in full because Tailwind finds classes by scanning, and `noArbitraryValues.test.ts` forbids arbitrary values.
The Button needs three files because its looks differ in structure. The Badge looks differ only in colors, so one file with tables is smaller and easier to compare with Figma.

**Rejected alternatives:**
- One file per style, as the Button does. It adds files without adding structure.
- Building class names from the type, such as `` `bg-surface-${type}-solid` ``. Tailwind would not find those classes.

### Color tokens map from the Figma names

Figma `Primary` maps to `brand`, `Secondary` to `gray`, `Danger` to `error`, and `Success` and `Warning` to the groups of the same name, as the Figma variables show for Primary and Secondary and the token groups show for the rest.
The tasks check each type's Figma variables before the tables are written, and a mismatch is an open question, not a silent choice.

### Layout

- `rounded` uses `rounded` at `xxs`, `xs` and `s` and `rounded-md` at `m`. `pill`, `circle` and `dot` use `rounded-full`.
- Figma puts the same horizontal padding inside the label as around the badge. The Badge reproduces the design's spacing, so a label-only `m` badge has 16 px between its edge and its text.
- `circle` has a minimum width equal to its height.
- `dot` is a square sized 4, 8, 12 or 16 px from the size, with the `solid` fill and stroke of its type for `filled-solid`. The `light` and `outlined` dots are read from Figma in the tasks.

### The Icon is a map of SVG components

`Icon` draws one `react-native-svg` component per name from a small map, so adding an icon means adding an entry and its test.
The two entries are the Figma `check-circle` and `info-circle` outline assets, downloaded from Figma and converted to components, not redrawn.
`Icon` takes a size in px for `width` and `height`, which are not styling values covered by tokens, and a text color class that NativeWind maps to the SVG `color`.

**Rejected alternatives:**
- An icon font. It adds a font to load and cannot take a token color.
- Adding the whole icon set now. No screen uses it, and the kit only holds what screens use.

### Accessibility

The Badge has the role `text`, and its label defaults to `label`.
A `dot` with no accessibility label and an `Icon` with no accessibility label are hidden from assistive technology.
Contrast of every text and background pair is measured with `contrast.test.ts`, and failures are listed in the Badge spec, as for the Button.

## Risks / Trade-offs

- [The unread Figma types may not follow the token pattern] → Read each type's variables in the first task before writing the tables.
- [Light and outlined pairs may fail 4.5:1] → Build as designed and list the exceptions, as the Button does.
- [NativeWind may not map a class to the SVG color] → Check it in the Icon task. If it does not, pass the resolved color through a style prop in the Icon only.
- [Two icons may mislead readers into thinking the set is final] → The Icon spec says so, and the next change replaces it.
