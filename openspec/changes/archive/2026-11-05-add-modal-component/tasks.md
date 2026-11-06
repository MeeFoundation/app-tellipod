## 1. Dependencies and spike

- [x] 1.1 Add `@gorhom/bottom-sheet`, `react-native-gesture-handler`, `react-native-reanimated` and `react-native-safe-area-context` as `catalog:` peer dependencies of `packages/ui-kit`, and verify `pnpm install` succeeds and `pnpm` lists them for the kit
- [x] 1.2 Wrap the Storybook preview in `GestureHandlerRootView`, `SafeAreaProvider` and `BottomSheetModalProvider`, and verify existing stories still open on iOS and Android
- [x] 1.3 Spike: present a bare `BottomSheetModal` from a temporary story on iOS and Android, and record in design.md what gorhom already does for modal accessibility, Android back and the scroll hand-off, then remove the story

## 2. Tokens

- [x] 2.1 Add the `sheet` shadow (`0 -1px 30px 0 rgba(2, 6, 23, 0.1)`, from Figma `alpha/always/dark/10`) to `tailwind/tokens/shadows.ts`, and verify `preset.test.ts` and `noArbitraryValues.test.ts` pass

## 3. Modal component

- [x] 3.1 Create `src/Modal/Modal.tsx` with `open`, `onClose`, `locked`, `title`, `subtitle`, `badge` and `children`, presenting and dismissing from `open`, and verify a test shows `onClose` is called for a user dismissal and not when `open` is set to false
- [x] 3.2 Build the header and looks from the spec (grabber, title, subtitle, badge, padding, fill, top radius, shadow) with token classes, and verify a render test finds each part and the story matches the Figma screenshot of node 119:9506
- [x] 3.3 Make the body a scrolling view under a pinned header, sized to its content and limited to 16 px below the top safe area, and verify with a test that a long body scrolls while the header stays, and a short body does not scroll
- [x] 3.4 Implement `locked`: no grabber, no pan-down, inert backdrop and swallowed Android back, and verify tests fail if each path is re-enabled and that `onClose` is never called
- [x] 3.5 Add modal accessibility (modal view, focus in and back, escape gesture for closable, hidden grabber), and verify with a test on the accessibility props and a VoiceOver and TalkBack walk-through
- [x] 3.6 Export `Modal` and `ModalProps` from `src/index.ts` and verify `pnpm typecheck` passes for the kit and the Storybook app

- [x] 3.7 Add `expo-blur` `57.0.3` to the workspace catalog and as a peer and dev dependency of `packages/ui-kit`, add the `alpha/always/dark/80` color token, and draw the backdrop as a `BlurView` under a tint view, then verify `pnpm install`, typecheck and tests pass and the backdrop blurs and dims the screen on iOS and Android
- [x] 3.8 Tune the `BlurView` intensity to match a 10 px blur on iOS and Android, check that the blur survives the backdrop's fade in and out, and record the result in design.md

## 4. Stories and docs

- [x] 4.1 Add `src/Modal/Modal.stories.tsx` titled `UI/Modal/...` covering closable and locked, short and long content, and header with and without subtitle and badge, and verify the stories open on iOS and Android
- [x] 4.2 Add a row for `modal` to `openspec/specs/components/ui-kit/README.md` after `tabs`, reading "Using or changing the Modal", in the main tree after archive
- [x] 4.3 Run the long-content and locked stories on both platforms: swipe, backdrop tap, back, scroll hand-off and the largest system font, and record any difference in the spec's open questions

## 5. Close out

- [x] 5.1 Ask design for the height limit, replace the provisional value or keep it, and verify the "Additions to the design" table and the open questions match
- [x] 5.2 Run lint, tests and `openspec validate add-modal-component --strict` and verify all pass
