# navigation

- Depends on: `../launch-and-unlock/spec.md`
- Realizes: [navigation](../../../../behaviour/navigation/spec.md)
- Read when: adding or changing a tab route or the tab bar
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App" (sections Home, Navigation, Notifications)

## Purpose

How the tab bar is built and how tab routes are organized.

## Requirements

### Requirement: Tabs are Expo Router routes

The four tabs (Home, Ask Telli, Notifications, Navigation) SHALL be sibling routes of one tab layout in `app/`, each rendering one screen from `screens/`.
The tab bar SHALL be built from UI-kit components and design tokens.

#### Scenario: Adding a tab

- WHEN a fifth tab route is added to the tab layout
- THEN the tab bar renders five items without changes to the other tab routes

### Requirement: The active tab follows the route

The active marker SHALL be derived from the current route, not from separate state.

#### Scenario: Deep link into Notifications

- WHEN the app opens a deep link to the Notifications route
- THEN the Notifications tab is marked active

### Requirement: The active identity comes from the identities module

The tab bar and the identity switch SHALL read the active identity from [identities](../identities/spec.md) and SHALL NOT store it.

#### Scenario: Switch while on a tab

- WHEN the user switches identity while Notifications is shown
- THEN Notifications renders for the new identity and the tab stays active

## Open questions

- Where the identity switch sits: in a tab or on every screen.
- The content of Ask Telli is out of scope.
