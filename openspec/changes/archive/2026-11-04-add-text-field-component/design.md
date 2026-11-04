## Context

`packages/ui-kit` has the Button, the Badge and the Icon. Components are styled with NativeWind class strings written out in full, `noArbitraryValues.test.ts` forbids arbitrary values, and `Icon` takes its default size and color from `IconDefaultsProvider` when it sits inside a Badge.
The Button already draws its focus ring with `focus:shadow-outline-brand` and `focus:shadow-outline-error`, and the spacing scale has `h-7.5` (30 px), `h-9`, `h-10`, `h-11`, `h-12` and `h-14`.
The icon list is the `RAW_GLYPHS` map in `src/Icon/glyphs.tsx`, which imports each Bootstrap SVG by name.
See proposal.md for motivation and the four open questions that this design takes the recommended option of.

Figma values read from the Text Field page, Label above field unless noted: the field is 30, 36 and 44 px high at `S`, `M` and `L`, with 12 px horizontal padding, an 8 px gap after the leading icon, 12, 14 and 16 px text on 16, 20 and 24 px lines, and 14, 16 and 20 px icons. Label inside field is 40, 48 and 56 px high.
The Focus look uses `stroke/brand/solid` and the `outline/brand` effect (a 3 px ring, `alpha/outline/brand`), the Alert look uses `stroke/error/solid`, `text/error/solid` and `outline/error`, and the Disabled look uses `surface/gray/light`, `text/default/disabled` and `opacity/50`.
The Default stroke is `stroke/gray/accent`, the field has a 1 px border, a `rounded/xl` (12 px) corner radius at all sizes and a `surface/default/main` white fill, which has no token in the kit yet. The label above the field has the text size of its size (12/16, 14/20, 16/24) and `text/default/body`, turning `text/error/solid` in Alert, and sits 2, 6 and 8 px above the field. The helper and counter are 12/16 `text/default/subtle`, turning `text/error/solid` in Alert. A floating label is 12/16, `text/default/body` when filled and `text/brand/solid` when focused,. The helper sits 2 px below the field when the strength meter is off. With `label-inside`, the gap after the leading icon is 12 px.

## Goals / Non-Goals

**Goals:**
- One `TextField` that covers the 3 styles and 3 sizes of the design, and every state a field can be in.
- A field that works as a native text input on iOS and Android and reads correctly with VoiceOver and TalkBack.

**Non-Goals:**
- Select, Multiselect, add-ons, the label tooltip and the password strength meter.
- A password field with a show/hide toggle. A screen passes a pressable `Icon` as the trailing element, and a ready-made toggle is added when a screen needs it.
- A dark theme. The kit has one light theme.

## Decisions

### A controlled wrapper over the native text input

`TextField` takes `value` and `onChangeText` and passes the other native text input props through, so keyboard type, secure entry, submit handling and a maximum length work as they do on `TextInput`.
It keeps one piece of state, whether the input is focused, set from `onFocus` and `onBlur`. "Filled" is `value !== ""`, "Alert" is a non-empty `error` string, and "Disabled" is a `disabled` prop that sets `editable={false}`.
A label that floats is chosen from these three facts, not from a separate "state" prop, so the look cannot disagree with the field.

**Rejected alternatives:**
- An uncontrolled field that tracks its own text. It cannot show a counter or a Filled look that agrees with the value the screen holds.
- A `state` prop with the design's state names. Screens would set Focus and Filled by hand and could contradict the real input.

### One component with literal class tables

`TextField.tsx` composes the label, the field, the helper line and the counter. `textFieldStyles.ts` holds complete class strings for size (3 entries), style (3 entries) and state (stroke, ring, text and surface).
The tables are written out in full for the reason the Badge's are. The state comes from the component's own focus flag, not from a platform variant.

**Rejected alternatives:**
- A file per style, as the Button does. The three styles differ in where the label sits, not in the field, so one composition with a small label switch is shorter.
- Building class names from the size, such as `` `h-${n}` ``. Tailwind would not find those classes.

### The focus ring is a border drawn outside the field

NativeWind 4.2.7 turns a `shadow-outline-*` class into `shadowColor`, `shadowRadius` and `shadowOpacity`, which iOS draws as a faint blur and Android ignores, so a spread-only ring is not drawn.
The field draws the ring as an absolutely positioned, non-touchable view 3 px outside it, with a 3 px border in the `outline` color and a 16 px radius, and the view exists only while the field is focused.
This needs two tokens from the Figma Outlines (`outline-thickness`): a `3` border width and a `0.75` spacing of 3 px. The Figma ring has a 15 px outer radius and the kit has no 15 px radius, so the ring uses the 16 px one.

**Rejected alternatives:**
- A `shadow-outline-*` class, as the Button uses. It does not draw the ring on either platform.
- A `boxShadow` style object built from the `outline` colors. React Native draws it, but it is an inline style for a value that a token covers.

### The text input has no line height

On iOS a text input draws its text at the bottom of its line box when a line height is set, so the text sat below the middle of the field.
The input takes its font size and family from classes and clears the line height with an empty style entry. The field's height, not the line height, sets the layout.

### The screen dismisses the keyboard

React Native keeps the keyboard open when the user taps outside a focused input, and the kit does not change that.
Dismissing it on an outside tap is the screen's job, with a scroll view's `keyboardDismissMode` or a tap handler that calls `Keyboard.dismiss`, so the field does not take over every tap on the screen.
The Storybook app dismisses it with a decorator, so stories behave as a screen should.

### The floating label is one label that moves

`label-on-edge` and `label-inside` render one label, over the field and above its border and ring, that does not take touches and is hidden from assistive technology.
It sits in the place of the text while the field is empty, unfocused and has no placeholder, and moves and shrinks when the field is focused, filled or has a placeholder: up to the top border and 10 px from the left for `label-on-edge`, and up above the text for `label-inside`, where the text moves down 8 px to make room.
One progress value from 0 to 1, driven by `Animated.timing` over 150 ms with an ease-out curve, sets the label's translation and scale and the text's shift, all on the native driver. The label scales about its left edge from the text size to 12 px, so it needs no layout change while it moves.
The target of the move is a pure function of the style, the size and where the text starts, which a leading icon changes, so it is measured from the text area's layout.
The label takes its color from the state when it moves, and the color is not animated.
A label on the edge has its own fill, the field's fill, behind it, and so hides the border and the ring under it, which a separate strip view did not.
The reduce-motion setting makes the move instant.

**Rejected alternatives:**
- Reanimated. It is not a dependency of the kit, and one value on the native driver needs nothing more.
- Rendering the label in the place of the placeholder and then in its other place, with no motion. It cannot move, and the label cannot be seen to leave the text.
- Animating the font size. It cannot run on the native driver and re-lays out the text on each frame.
- Animating the label's color. It needs the JavaScript driver, and the color is the same at the start and the end of a short move.

### The touch area extends past the field

The field sits in a `Pressable` that focuses the input, and its `hitSlop` is the difference between the field height and 48 dp on Android or 44 pt on iOS, split above and below.
The look of the field does not change.

**Rejected alternatives:**
- A minimum height on the field. It changes the look from the design.
- Listing `s` and `m` as accessibility exceptions. The area can meet the minimum without changing the look.

### Accessibility

The input gets the label as its `accessibilityLabel`, with ", required" appended for a required field, the disabled state through `accessibilityState`, and the error message as its `accessibilityHint` while an error shows.
When an error appears the component calls `AccessibilityInfo.announceForAccessibility` with the message, so both platforms announce it, and the error text is not a live region because that works on Android only.
The leading and trailing `Icon`s keep the Icon's default of being hidden from assistive technology, and the error icon is hidden because the message carries the meaning.

### Icons come from the kit's icon list

`search` and `exclamation-circle` are imported in `glyphs.tsx` and added to `RAW_GLYPHS`.
The field wraps its leading and trailing elements in `IconDefaultsProvider` with the field's icon size (14, 16 or 20) and text color, so a bare `Icon` matches the field as it matches a Badge.

## Risks / Trade-offs

- [`surface/default/main` has no token] → Add `surface.default.main` (white) to `colors.ts`, as the token spec requires, before the tables use it.
- [The focus ring is a box shadow, which older Android renderers ignore] → Verify the ring on an Android device in Storybook. Build, as the Button does, only if it renders there.
- [Appending ", required" to the label is English only] → The app is English, and a `requiredAccessibilityLabel` prop can be added when the app is translated.
- [A `hitSlop` area can overlap a neighboring control] → Stories show two fields stacked at the minimum gap, and the tasks check that each tap lands on its own field.
- [The placeholder or the disabled pair may fail 4.5:1] → Build as designed and list the exception, as the Button does. Disabled controls are exempt.
