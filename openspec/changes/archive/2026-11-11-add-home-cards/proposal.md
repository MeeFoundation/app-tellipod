## Why

The Home screen ("Home - 3", node 13:11241 of the Figma file "Mee - Tellipod App v4.0.3") lists new shared info, recent pods and categories as cards.
The ui-kit has no component for these cards, and none for the Avatar they show.
Without them, the Home screen would build the cards from raw markup, which the kit rule "components match the design system" forbids.

**Example:** The "Recent pods" list shows "About Sofia" with a photo, the trail "People > Immediate Family" and a chevron, and "Mom & Dad" with a photo and the trail "Health & Wellness".
The "Categories" grid shows "People" with a people icon and a count line, in two columns.

## What Changes

- Add the `Avatar` to the kit with the design-system variants: content `initials`, `image` or `icon`, six sizes (`xxs` 16 px to `xl` 64 px) and the circle and non-circle shapes.
- Add the `CardCell`: a tappable row card with an avatar, a title, a second line, a trailing chevron and an optional dot badge on the avatar corner.
- Add the `CardCategory`: a tile card, tappable when given `onPress`, with an icon in a circle, a title and a count line, sized to sit in a two-column grid.
- List the three components in the ui-kit `README.md` index and export them from the kit.
- Add the icon `person` to the Icon list, which the Avatar draws by default for its `icon` content.
- Give the `CellInfo` the same border and shadow surface as the new cards, at the request of the design review; the Figma `cell-info` has neither.
- Both cards show a pressed look (`surface/gray/soft`), which the design does not show.
- Add stories for each component.

The Home screen, its data (pods, categories, "new info" events) and its behavior are out of scope.
The existing `Card` (header, body, footer; `Card-Cell-Details-Preview`) is unchanged.

## Capabilities

### New Capabilities

- `components/ui-kit/avatar`: the Avatar with its content, size and shape variants.
- `components/ui-kit/card-cell`: the row card with avatar, title, second line, chevron and optional dot badge.
- `components/ui-kit/card-category`: the tile card with icon, title and count line.

### Modified Capabilities

- `components/ui-kit/icon`: the list of icon names gains `person`.
- `components/ui-kit/card`: the body of a Card puts a vertical gap between its rows.
- `components/ui-kit/cell-info`: the CellInfo gets its own surface: border, shadow and rounded corners.

`components/ui-kit/README.md` also gets three index rows; it is an index, not a spec.

## Impact

- New code in `packages/ui-kit/src/Avatar`, `CardCell` and `CardCategory`, plus exports in `packages/ui-kit/src/index.ts`.
- `CellInfo` uses the new `CardSurface`, which changes how its rows look inside a `Card` body.
- Adds `person` to `packages/ui-kit/src/Icon/glyphs.tsx` and its test.
- Reuses `Badge` (shape `dot`), `Breadcrumbs`, `Icon` and the tokens in `components/ui-kit/tokens-and-theming`.
- No change to apps or to pod data.
- Sources: "Mee - Tellipod App v4.0.3" (Card-Cell 13:11470 and 380:22480, Card-Category 13:10733) and "Mee - Design System v5.2.4" (Avatar page, node 28:1476).

## Decisions

- **Second line of the CardCell.** One `subtitle` slot that takes text or Breadcrumbs.
- **Avatar shape.** The kit implements `Circle=False` too, through the `circle` prop.
- **Avatar colors in the Card-Cell.** The card follows the design system (`surface/brand/main` on `surface/brand/light`), and the Home screen design is updated to match.
- **Avatar badges.** Left out, and named in the Avatar spec.
- **Height of the CardCell.** The card has a 60 px minimum height, and a screen sets a taller height when it needs one, such as the 72 px "New info" card.
- **Pressed look.** `surface/gray/soft`, chosen here because the design shows none. The CardCategory is tappable only when it is given `onPress`.
- **CardCategory count line.** The kit takes the line as text from the screen and does not format counts.
- **Icons of the Home grid.** `heart-pulse` and the others are not added here; the kit adds an icon when a screen needs it.
