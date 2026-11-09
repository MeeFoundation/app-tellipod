## Why

The kit's color tokens exist only as code in `packages/ui-kit/tailwind/tokens/colors.ts`.
Designers and developers have no place on a device to see which colors exist and what each is called.
A showcase story closes that gap and stays correct because it reads the same token file the theme reads.

## What Changes

- Add a Storybook story that shows every color token as a swatch with its token name.
- Group swatches by the first segment of the token name: the five ramps (`brand`, `gray`, `error`, `success`, `warning`), then `surface`, `text`, `stroke`, `outline` and `alpha`.
- Show translucent colors (`outline`, `alpha`) over a checkerboard so they stay visible.
- Show `transparent` and every `rgba` color with alpha below 1 over a checkerboard, in whichever story it appears.
- Remove the global `TouchableWithoutFeedback` decorator from `apps/storybook/.rnstorybook/preview.tsx`: it swallowed swipes meant for the stories' `ScrollView`, and Storybook's story view already dismisses the keyboard on tap.
- Title the story `Foundations/Colors`, outside the `UI/` group, because it documents a token group and not a component.

**Example:** the swatch for `surface.brand.soft_hover` is a square filled with `#dfecee` and the caption `surface.brand.soft_hover` under it.
No hex value is shown.

Out of scope: spacing, typography, shadows and other token groups; a dark theme (the kit has none).

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `components/ui-kit/tokens-and-theming`: the kit shows its color tokens on a device, each with its name.
- `components/ui-kit/storybook`: stories that document a token group are titled `Foundations/<Group>`, next to the existing `UI/<Component>` rule.

## Impact

- New files in `packages/ui-kit/src/Colors/` (stories, helper, helper test) and an edit to `apps/storybook/.rnstorybook/preview.tsx`; the Storybook app already loads `packages/ui-kit/src/**/*.stories.*`.
- No change to token values, components or the Tellipod app.
- Authoritative source for the colors: Figma file "Mee - Design System v5.2.4", Colors page, already mirrored in `colors.ts`.
