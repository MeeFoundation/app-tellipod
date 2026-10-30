# navigation

- Depends on: `../launch-and-auth/spec.md`
- Read when: adding or changing a tab
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App" (sections Home, Navigation, Notifications)

## Purpose

The main navigation of the signed-in app: its tabs, how the user switches between them and what each shows.

## Requirements

### Requirement: Main navigation

The signed-in app SHALL present four bottom tabs: Home, Ask Telli, Notifications and Navigation.

The tabs are fixed at the bottom of the screen.
The content of the Ask Telli tab is out of scope.

#### Scenario: Switching tabs

- WHEN the user taps a tab
- THEN the screen for that tab is shown
- AND the tab is marked active
