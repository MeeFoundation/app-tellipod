# accessibility

- Depends on: none
- Read when: building or changing any screen or UI-kit component, or adding a color pair
- Source: WCAG 2.2 Level AA (https://www.w3.org/TR/WCAG22/), read for native apps through WCAG2ICT (https://www.w3.org/TR/wcag2ict-22/); Apple Accessibility (https://developer.apple.com/accessibility/); Android Accessibility (https://developer.android.com/guide/topics/ui/accessibility)

## Purpose

The accessibility standard every screen and component of the app on iOS and Android is held to.

## Requirements

### Requirement: The standard is WCAG 2.2 Level AA

The app SHALL satisfy the applicable WCAG 2.2 Level A and Level AA criteria, applied to native applications according to WCAG2ICT.
Any exception to an applicable criterion SHALL be documented.

#### Scenario: A criterion cannot be met

- WHEN a screen cannot satisfy an applicable criterion
- THEN the exception and its reason are documented

### Requirement: Interactive elements are described

Every interactive element SHALL have an accessibility role, a label and its states.
Components SHALL use native accessibility semantics and the React Native accessibility APIs, not web-specific ARIA or DOM patterns.
A component SHALL NOT remove an accessibility feature for visual consistency.

#### Scenario: A button without a label

- WHEN a button shows only an icon
- THEN it has a role of button and a label that VoiceOver and TalkBack read aloud

### Requirement: Screen readers reach all functionality

All functionality SHALL be usable with VoiceOver on iOS and TalkBack on Android.
Screen reader focus order SHALL follow the logical reading and interaction sequence.

#### Scenario: Reading a screen

- WHEN a screen reader user moves through a screen
- THEN focus visits the elements in the order a sighted user reads and uses them

### Requirement: Text scales

Text SHALL follow the system font size setting without clipping or loss of functionality.

#### Scenario: Largest system font

- WHEN the user sets the largest system font size
- THEN text is fully visible and every action remains usable

### Requirement: Contrast

Normal text SHALL have a contrast ratio of at least 4.5:1.
Large text and essential non-text interface elements SHALL have a contrast ratio of at least 3:1.

#### Scenario: New color pair

- WHEN a text and background token pair is added to the kit
- THEN its contrast ratio is measured against these minimums before the pair is used

### Requirement: Touch targets

Interactive touch targets SHALL be at least 44 × 44 pt on iOS and 48 × 48 dp on Android, unless a documented exception applies.

#### Scenario: Small icon button

- WHEN an icon is smaller than the minimum target size
- THEN its touchable area is padded to the minimum

### Requirement: Form inputs are labelled

Every form input SHALL have an accessible label, instructions where needed, and an accessible validation error.

#### Scenario: Required field left empty

- WHEN the user leaves a required field empty and the form shows an error
- THEN the screen reader announces the error and the field it belongs to

### Requirement: Accessibility survives changes of state

Accessibility SHALL be preserved across navigation, dialogs, loading states and dynamic content updates.

#### Scenario: Opening a dialog

- WHEN a dialog opens
- THEN screen reader focus moves into it, and returns to the element that opened it when it closes

### Requirement: Verification on both platforms

A change SHALL be verified on both platforms with the native screen readers, VoiceOver and TalkBack.
A change SHALL NOT introduce an accessibility regression, and critical user flows SHALL remain operable with a screen reader.

#### Scenario: Shipping a screen

- WHEN a change adds or alters a screen
- THEN it is walked through with VoiceOver on iOS and TalkBack on Android before it is accepted
