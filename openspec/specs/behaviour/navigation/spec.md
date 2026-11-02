# navigation

- Depends on: `../launch-and-sign-in/spec.md`
- Read when: adding or changing a tab, or what a tab shows
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App" (sections Home, Navigation, Notifications)

## Purpose

How the user moves between the main areas of the signed-in app.

## Requirements

### Requirement: Four tabs

The signed-in app SHALL show four tabs at the bottom of the screen: Home, Ask Telli, Notifications and Navigation.

#### Scenario: Looking at the main screen

- WHEN the user is signed in
- THEN Home, Ask Telli, Notifications and Navigation are visible at the bottom

### Requirement: Switching tabs

Tapping a tab SHALL show that tab's screen and mark the tab active.

#### Scenario: Opening Notifications

- WHEN the user taps Notifications
- THEN the Notifications screen is shown and its tab is marked active

## Open questions

- The content of Ask Telli is out of scope.
