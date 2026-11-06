# tabs

- Depends on: `../tokens-and-theming/spec.md`, `../icon/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: using or changing the Tabs
- Source: Figma file "Mee - Design System v5.2.4", Tabs page (node 0:1; Tab 4:7862, Tabs horizontal 6466:3053)

## Purpose

The Tabs is the kit's control for switching between a few views of the same content. It implements the horizontal Tabs bar of the design-system Tabs, with its sizes and states, and styles every variant from tokens.
It fills the width of its parent, and does not implement the background blur of the bar, vertical tabs, a disabled tab, a badge or count in a tab or tab panels, because the design does not show them or no screen uses them yet.

## Requirements

### Requirement: Tabs is a container of Tab buttons

`Tabs` SHALL be a container that renders its children, which are `Tab` buttons, in a bar.
A `Tab` SHALL take a `label`, an optional `active` flag, an optional `onPress` handler, and optional `leadingIcon` and `trailingIcon` slots.
A `Tab` SHALL read its size and layout from the `Tabs` around it.
A `Tab` SHALL show the Active look when `active` is true, and SHALL NOT change its own selection.
`Tabs` SHALL render the bar only, and the screen SHALL show the content of the Active tab.
`Tabs` SHALL always be as wide as its parent, whatever its layout and tabs.

#### Scenario: Choosing another tab

- WHEN the user taps the tab "Media" while "Posts" is Active
- THEN the `onPress` of "Media" is called once, and "Posts" stays Active until the screen passes `active` to "Media"

#### Scenario: Tapping the active tab

- WHEN the user taps the Active tab "Posts"
- THEN its `onPress` is not called

### Requirement: Sizes follow the design system

`Tabs` SHALL accept a size of `m` or `l`, and the default SHALL be `m`.
The sizes SHALL be as follows.

| Size | Bar height | Bar padding | Bar radius | Tab height | Tab horizontal padding | Tab radius |
| --- | --- | --- | --- | --- | --- | --- |
| `m` | 44 px | 4 px | 12 px | 36 px | 12 px | 10 px |
| `l` | 56 px | 6 px | 14 px | 44 px | 16 px | 10 px |

A `Tab` SHALL show, in this order, its optional leading icon, its label and its optional trailing icon, 8 px apart, with 1 px between tabs.
The label SHALL be semibold at the base size, and an `Icon` in a slot SHALL be 24 px and take the label's color.

#### Scenario: Comparing sizes

- WHEN a size `m` and a size `l` Tabs with the same tabs are shown together
- THEN their bars are 44 and 56 px high and their tabs are 36 and 44 px high

### Requirement: The layout is content or equal width

`Tabs` SHALL accept a layout of `content` or `equal`, and the default SHALL be `content`.
In `content` each tab SHALL be as wide as its content, as the design shows, and the tabs SHALL start at the leading edge of the bar.
When the tabs of a `content` bar are wider together than the bar, the tabs SHALL scroll horizontally inside the bar, without a scroll indicator, and the bar SHALL keep its width.
In `equal` the tabs SHALL share the width of the bar evenly, and each tab SHALL center its content.
An `equal` bar SHALL NOT scroll.
The scrolling and `equal` layouts are not in the design system, and they SHALL be listed as additions to the design until the design system has them.

#### Scenario: Content width

- WHEN a `content` Tabs shows "Posts", "Media" and "About"
- THEN each tab is as wide as its icons, label and padding, the tabs start at the leading edge, and the bar is as wide as its parent

#### Scenario: Content wider than the bar

- WHEN a `content` Tabs shows more tabs than fit in a bar 390 pt wide
- THEN the bar stays 390 pt wide and the user scrolls the tabs sideways to reach the others

#### Scenario: Equal width

- WHEN an `equal` Tabs shows "Posts", "Media" and "About" in a bar 390 pt wide
- THEN the three tabs have the same width and fill the bar

### Requirement: Looks follow the design system

A Default tab SHALL have no fill and the `text/gray/on-soft-background` text color.
An Active tab SHALL have the `surface/default/main` fill, a 1 px `alpha/dark/10` border and the `shadow-2` shadow, and the `text/gray/on-soft-background` text color.
A Hover tab SHALL have the `surface/gray/light` fill and the `text/default/body` text color.
A Focus tab SHALL have the `surface/gray/soft` fill, a 2 px `stroke/brand/strong` border and the `text/default/body` text color.
The bar SHALL have the `alpha/dark/5` fill, a 1 px `alpha/dark/10` border and no blur.

#### Scenario: Comparing states

- WHEN a Default, Hover, Focus and Active tab are shown together
- THEN the Default tab has no fill, the Hover tab a light gray fill, the Focus tab a teal outline on a pale fill, and the Active tab a white raised look

### Requirement: States map to touch interaction

A tab SHALL have the states default, pressed, focused and active.
Pressed SHALL show the design system's Hover look, because touch devices have no hover.
Focused SHALL show the design system's Focus look.
An Active tab that is pressed or focused SHALL keep the Active look.

#### Scenario: Pressing a tab

- WHEN the user presses and holds a Default tab
- THEN it shows the Hover look until the user lifts the finger

#### Scenario: Moving focus to a tab

- WHEN a keyboard or screen reader moves focus to a Default tab
- THEN the tab shows the Focus look

### Requirement: The Tabs is described to assistive technology

The bar SHALL have the role of tab list, and each tab SHALL have the role of tab, an accessibility label that defaults to its label, and a selected state that is true only for the Active tab.
A tab SHALL show its icons to assistive technology only when they have an accessibility label.
The touch target of a tab SHALL be at least 44 pt on iOS and 48 dp on Android, unless an exception is listed under "Accessibility exceptions".

#### Scenario: Reading a tab aloud

- WHEN VoiceOver or TalkBack lands on the Active tab "Posts"
- THEN it announces "Posts", tab and selected

### Requirement: Design exceptions to accessibility are documented

Where a Tabs variant as designed fails an applicable criterion of `../../../code-practices/accessibility/spec.md`, the Tabs SHALL be built as designed and the failure SHALL be listed under "Accessibility exceptions" in this spec with the variant, the measured value and the required value.

#### Scenario: A color pair below 4.5:1

- WHEN a variant's text and background measure less than 4.5:1
- THEN the variant looks as designed and its measured ratio is listed under "Accessibility exceptions"

#### Scenario: A size `m` tab below the touch target

- WHEN a size `m` tab is 36 px high on a platform whose minimum is 44 pt or 48 dp
- THEN the tab keeps its designed size and its touch area is padded to the minimum without changing its look

### Requirement: The Tabs has grouped stories

The stories of `UI/Tabs` SHALL cover sizes, layouts and states in a few stories, each showing several bars side by side.

#### Scenario: Tabs stories

- WHEN the stories of `UI/Tabs` are listed
- THEN they cover sizes, layouts and states in a few stories

## Accessibility exceptions

| Variant | Measured | Required | Note |
| --- | --- | --- | --- |
| Active tab, white fill against the `alpha/dark/5` track over a white screen | 1.11:1 | 3:1 | Built as designed. The Active tab is also marked by its border and shadow, and VoiceOver and TalkBack announce it as selected. |
| Size `m` tab, 36 px high | 36 px | 44 pt iOS, 48 dp Android | Built as designed. The touch area is padded above and below to the minimum. |

Every text pair of the Default, Hover, Focus and Active tabs reaches 4.5:1, and the Focus outline reaches 3:1.

## Open questions

- Equal layout and the scrolling `content` bar: not in the design system. Design is asked to add them to the Tabs page.
