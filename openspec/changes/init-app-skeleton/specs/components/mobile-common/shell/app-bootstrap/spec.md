# app-bootstrap

- Depends on: `../../../../../../apps/app-tellipod/README.md` (code layout), [ui-kit tokens-and-theming](../../../ui-kit/tokens-and-theming/spec.md)
- Read when: changing how the app starts, the root layout, the providers every screen needs or the placeholder hello screen

## Purpose

How the Tellipod app starts and what it shows before launch, onboarding and navigation features exist: one route, one screen built from the UI kit.

## ADDED Requirements

### Requirement: The app starts on a hello screen

The app SHALL open on a screen with the heading "Hello, Tellipod" and a UI-kit button, on both iOS and Android.
This screen is a placeholder that [launch-and-unlock](../launch-and-unlock/spec.md) replaces.

#### Scenario: Opening the app

- WHEN the user opens the app on iOS or Android
- THEN the hello screen shows the heading "Hello, Tellipod" and a button labelled "Get started"

#### Scenario: Tapping the button

- WHEN the user taps "Get started"
- THEN the button shows its pressed state and the screen stays on the hello screen

### Requirement: The screen uses kit tokens and Public Sans

The hello screen SHALL take its colors, spacing and type from the UI kit's theme, and SHALL render text in Public Sans.
The app SHALL show nothing until Public Sans has loaded, so no text appears in a fallback font.

#### Scenario: Heading typography

- WHEN the hello screen is visible
- THEN the heading is set in Public Sans semibold in the kit's text color

### Requirement: The screen stays inside the safe area

The hello screen SHALL keep its content clear of the status bar, notch, home indicator and rounded corners.

#### Scenario: Device with a notch

- WHEN the user opens the app on a device with a notch and a home indicator
- THEN the heading and the button are fully visible and not covered by either
