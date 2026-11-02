# navigation

- Depends on: `../launch-and-auth/spec.md`
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

## Open questions

- The content of Ask Telli is out of scope.
