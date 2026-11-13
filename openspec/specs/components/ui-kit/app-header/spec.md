# app-header

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../header-icon-button/spec.md`, `../search-entry/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the AppHeader
- Source: Figma file "Mee - Tellipod App v4.0.3", `home-topbar` (node 13:10657; instances 38:2886, 13:14410 and 364:11218)

## Purpose

The AppHeader is the kit's top bar of a screen: a rounded card under the status bar with a title row and an optional bottom slot.
It is one shell with slots and has no variant prop, so the Home, Pod and Filter layouts of the design are different content in the same slots.
It does not draw the status bar's clock, signal, Wi-Fi or battery, a large title, or a header that collapses on scroll, because the device draws the first and the design does not show the others.

## Requirements

### Requirement: The AppHeader has slots, not variants

`AppHeader` SHALL accept the optional slots `leading`, `media`, `title`, `subtitle` and `trailing`, which form the title row from left to right, and its `children` SHALL be a bottom slot below the title row.
A slot that is not given SHALL take no space, and the title row SHALL show the given slots in that order.
`AppHeader` SHALL NOT take a variant prop.

#### Scenario: The Home layout

- WHEN an AppHeader is given a `media` avatar "B", the title "Welcome, Bogdan", a subtitle line and a `SearchEntry` as its child
- THEN it shows the avatar, the title with the line under it, and the search entry below the row

#### Scenario: The Pod layout

- WHEN an AppHeader is given a back `HeaderIconButton`, an avatar, the title "About Sofia", the subtitle "People > Immediate Family" and a kebab `HeaderIconButton`
- THEN the row reads back button, avatar, title with subtitle, then the kebab at the right edge

#### Scenario: Only a title

- WHEN an AppHeader is given only the title "Filter by category" and a back button
- THEN the row shows the back button and the title, and no empty space is kept for the other slots

### Requirement: The title and subtitle take any node

`title` and `subtitle` SHALL accept any node, and SHALL show a node as given.
A string title SHALL be `Base/Medium` in `text/default/title` by default, and `XL/Semi Bold` when `titleSize` is `xl`.
A string subtitle SHALL be `XS/Regular` in `text/default/subtle`.
The title SHALL stay on one line and end with an ellipsis when it does not fit, and SHALL NOT wrap.
The subtitle SHALL sit 2 px under the title, and the text column SHALL take the width the other slots leave.
`titleAlign` SHALL be `start` by default, and `center` SHALL center the title and subtitle in the row, keeping a 44 px empty space on the side that has no `leading` or `trailing` so the title sits on the center of the header, as the design's hidden balancing button does.

#### Scenario: A long title

- WHEN the title is "A very long pod name that does not fit on a single line of the header"
- THEN it shows on one line ending with an ellipsis and the header's height does not change

#### Scenario: A centered title

- WHEN an AppHeader has a back button, no `trailing`, no `media`, `titleAlign` `center` and the title "Filter by category"
- THEN the title is centered on the header, with 44 px kept empty at the right edge to balance the back button

#### Scenario: A node as a subtitle

- WHEN the subtitle is a shield-lock icon with the text "Device-to-device sharing, pod members only."
- THEN the header shows that node under the title unchanged

### Requirement: Looks follow the design

The shell SHALL have a vertical gradient from `surface/brand/light` at the top to `surface/default/main` at the bottom, 28 px rounded bottom corners (`rounded/3xl`) and square top corners, a 1 px `stroke/default/main` bottom border, and the shadow of 0 px x, 1 px y, 15 px blur in `alpha/always/dark/15`.
The shell SHALL have 20 px side padding, 10 px between the top inset and the title row, 20 px below the last content, and 20 px between the title row and the bottom slot.
The title row SHALL be at least 48 px high, centered vertically, with 8 px between its slots.
The bottom slot SHALL be as wide as the shell's content, 362 px on a 402 px screen.

#### Scenario: Comparing with the design

- WHEN the Home layout is shown on a device with a 64 px top inset
- THEN the header is 206 px tall with the search entry and 142 px tall without it

### Requirement: The shell leaves room for the status bar

`AppHeader` SHALL pad its top by the safe-area top inset and SHALL draw nothing in that space except the gradient.
`AppHeader` SHALL NOT draw the clock, signal, Wi-Fi or battery.

#### Scenario: A device with a notch

- WHEN an AppHeader is shown on a device whose top inset is 59 px
- THEN the title row starts 10 px below the 59 px, under the device's own status bar

### Requirement: The height animates when a slot appears or disappears

`AppHeader` SHALL animate its height when its bottom slot or the title row's content appears or disappears, over 200 ms.
`AppHeader` SHALL change its height at once when the user has asked the system to reduce motion.
`AppHeader` SHALL NOT animate on its first render.

#### Scenario: Tabs appear

- WHEN a screen adds a `Tabs` child to an AppHeader that had none
- THEN the header grows to the taller height over 200 ms and the content below it follows

#### Scenario: Reduce Motion

- WHEN the system's Reduce Motion is on and a screen removes the bottom slot
- THEN the header takes its shorter height at once

### Requirement: The AppHeader has grouped stories

The stories of `UI/AppHeader` SHALL show the four layouts of the design: Home with a search entry, Pod with a kebab, Pod with `Tabs`, and Filter with a centered title.

#### Scenario: AppHeader stories

- WHEN the stories of `UI/AppHeader` are listed
- THEN they cover the Home, Pod, Pod with tabs and Filter layouts

## Accessibility exceptions

None. The title and subtitle measure at least 4.5:1 against `surface/brand/light`, the darkest point of the gradient, and the icons measure at least 3:1; the measurements are in `packages/ui-kit/tailwind/contrast.test.ts`.

## Accessibility notes

A walk-through with VoiceOver on iOS and TalkBack on Android found no problems: focus moves in the order back, title, kebab, then the bottom slot, and the icon buttons and the search entry read their labels and button roles.

## Open questions

- The 200 ms height animation is chosen here, not taken from the design.
- The Filter frame spaces its row by 16 px, the others by 8 px; this spec uses 8 px.
