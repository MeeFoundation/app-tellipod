## Context

See proposal.md for why. The kit has no overlay component, and `@gorhom/bottom-sheet` 5.2.14, `react-native-gesture-handler`, `react-native-reanimated` and `react-native-safe-area-context` are in the workspace catalog and declared only by `apps/storybook`, which does not use them yet.
Kit components are styled with NativeWind token classes (`tokens-and-theming`), take state from props and keep Tab-like components controlled by the screen (`tabs`).
The design's sheet is in the app file "Mee - Tellipod App v4.0.3", node 119:9506. It has no sheet shadow token yet: `shadow-sheet` is `0 -1px 30px 0 rgba(2, 6, 23, 0.1)`.

## Goals / Non-Goals

**Goals:**

- A declarative `open` / `onClose` API over gorhom's imperative one.
- A locked mode that cannot be bypassed by a gesture, the backdrop or Android back.
- Content of any length, with the header pinned.

**Non-Goals:**

- Snap points, a half-open resting height or a sheet next to the screen content.
- A footer, a close button or a centered dialog.
- Providing the gesture root or the sheet provider for the app.

## Decisions

**D1. Build on `BottomSheetModal`, wrapped to a controlled component.**
`Modal` renders `BottomSheetModal` and an effect calls `present()` when `open` becomes true and `dismiss()` when it becomes false. gorhom's `onDismiss` also fires for the sheet's own `dismiss()`, so it becomes `onClose` only while `open` is still true: the effect records `open` in a ref before it calls `dismiss()`, and a dismissal the screen asked for finds the ref false.
`BottomSheetModal` renders in a portal above the screen, which keeps the sheet over navigation headers and tab bars.

**Rejected alternatives:**

- Hand-rolled sheet on RN `Modal` and reanimated.
  - **Pros:** no provider requirement.
  - **Cons:** gesture and scroll hand-off, keyboard and safe-area handling would be rebuilt and maintained by the kit.
- `BottomSheet` (inline, not modal).
  - **Cons:** it renders inside the screen's tree, so it can be covered by siblings and navigation chrome.

**D2. `locked` turns off every dismissal path.**
`locked` sets `enablePanDownToClose` to false, `enableDismissOnClose` to false and gives the backdrop `pressBehavior="none"`. gorhom has no hardware-back handling, so the Modal subscribes to `BackHandler` while it is open. The handler always returns true, so the screen under the sheet does not go back, and it calls `onClose` only when the Modal is closable. `enableHandlePanningGesture` and `enableContentPanningGesture` are off too. The header, which is the sheet's handle, omits the grabber pill and keeps its strip, so the title sits at the same place.
In a closable Modal the backdrop uses `pressBehavior="close"` and the default back handling.
The flag is a boolean that is absent by default, so the common case needs no prop.

**Rejected alternatives:**

- `dismissible` (true by default, `dismissible={false}` to lock): the negative form reads badly at call sites.
- `nonDismissible`, `persistent`, `mandatory`: a negative name, a name Material uses for a non-blocking sheet, and a name that suggests a required field.

**D3. Dynamic sizing with a header outside the scroll.**
`enableDynamicSizing` makes the sheet as tall as its content. `topInset` is the top safe-area inset plus 16 pt, so the sheet never covers the status bar area. The header (grabber strip, title, subtitle, badge) is the sheet's `handleComponent`, which is measured into the dynamic height, stays in place and is where the user drags. The body is a `BottomSheetScrollView`, whose `contentContainerStyle` adds the bottom safe-area inset and 8 pt.
gorhom hands a downward drag from the scroll view's top edge to the sheet, which gives the "scroll first, then drag" behavior of the spec for the closable case. In the locked case that hand-off has no effect because pan-down-to-close is off.

**Rejected alternatives:**

- Scroll the whole sheet content, header included: the title scrolls away on long content.
- Fixed snap points at percentages: the design's sheet hugs its content.

**D4. The spec's providers are the consumer's job.**
`Modal` needs `GestureHandlerRootView` and `BottomSheetModalProvider` above it. The kit does not mount them, because the app root owns the safe-area and gesture setup. The kit documents the requirement, and the Storybook preview wraps every story in both.
The four libraries become peer dependencies of `packages/ui-kit`, not dependencies, so the app and the kit share one copy of each native module.

**D5. Styling uses token classes through NativeWind.**
Gorhom components take `style` and `backgroundStyle`, not `className`, so the sheet's fill, radius and shadow are applied through a small wrapper view with token classes (`bg-surface-default-main`, `rounded-t-3xl`, `shadow-sheet`) and the library's own background is made transparent. The shadow token is added to `tailwind/tokens/shadows.ts`.

**D5b. The backdrop is a blur over a dark fill.**
Design gives the backdrop as `alpha/always/dark/80` with a 10 px background blur. React Native has no blur of its own, so the kit adds `expo-blur` (`~57.0.3`, the version Expo 57 bundles) as a peer dependency, next to the gorhom libraries. The backdrop is gorhom's `BottomSheetBackdrop` with its own fill set to the `alpha/always/dark/80` token color from the token module, and a `BlurView` child over it. The color is a style, not a class: an earlier version put a `bg-alpha-always-dark-80` tint view above the blur and it did not show on a device, while a style color on the backdrop did. `BlurView` has an `intensity` from 0 to 100 and no pixel radius, so 10 px is matched by eye. An intensity of 10 with `tint="default"` was checked on a device and accepted.

**Rejected alternatives:**

- Leave the blur out, as the Tabs bar does: the design asks for it here, and the backdrop is a full-screen effect that is noticed.
- A translucent color alone: that is the dimming without the blur the design shows.

**D6. Accessibility.**
Reading gorhom 5.2.14 (no device yet) shows it does none of this: its handle and background carry an "adjustable" role and a "Bottom Sheet" label, and nothing marks the sheet modal or handles an escape gesture. So the Modal supplies it. One `containerComponent` view carries `accessibilityViewIsModal`, which hides the screen behind from VoiceOver. It has to be one view, because the header and the body are siblings and two modal siblings would hide each other. The header and the scrolling body take `onAccessibilityEscape`, which calls `onClose` for a closable Modal. Focus moves to the title when the sheet settles (`onChange` and `sendAccessibilityEvent`). Hiding the screen behind from TalkBack, and returning focus to the opener, are left to the device spike and may still be gaps. The grabber is `accessible={false}`.
A locked Modal omits the escape action, which the spec lists as an exception.

## Risks / Trade-offs

- [gorhom with reanimated 4 and Expo 57 may differ from the versions gorhom was tested on] → A first task mounts a bare `BottomSheetModal` in Storybook on iOS and Android before the component is built on it.
- [Scroll and drag hand-off is the known weak spot of sheets] → Stories include a long-content and a locked long-content case, and the check is done on both platforms.
- [Provider requirement is easy to miss and fails at runtime] → The spec's story preview mounts the providers, and `Modal` is documented with the requirement. A missing provider shows gorhom's own error.
- [Android back handling can double with the navigator's own] → The `BackHandler` subscription is added only while a locked Modal is open and removed on close.
- [A blur under a parent whose opacity animates can stop blurring on iOS, and Android blur is experimental and costs performance] → Checked on both platforms with the stories. If the fade breaks the blur, the blur is switched on at the end of the open animation and off at the start of the close.
