# navigation

- Depends on: `../launch-and-unlock/spec.md`, `../identities/spec.md`
- Read when: adding or changing a tab, or what a tab shows
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App" (sections Home, Navigation, Notifications)

## Purpose

How the user moves between the main areas of the main app.

## Requirements

### Requirement: Four tabs

The main app SHALL show four tabs at the bottom of the screen: Home, Ask Telli, Notifications and Navigation.

#### Scenario: Looking at the main screen

- WHEN the user has an active identity
- THEN Home, Ask Telli, Notifications and Navigation are visible at the bottom

### Requirement: Switching tabs

Tapping a tab SHALL show that tab's screen and mark the tab active.

#### Scenario: Opening Notifications

- WHEN the user taps Notifications
- THEN the Notifications screen is shown and its tab is marked active

### Requirement: The active identity is visible

The main app SHALL show which identity is active and offer the switch described in [identities](../identities/spec.md).

#### Scenario: Looking at the main screen

- WHEN Alice is using "Alice Work"
- THEN "Alice Work" is shown as the active identity and the switch to her other identities is offered

## Open questions

- Where the identity switch sits: in a tab or on every screen.
- The content of Ask Telli is out of scope.
