# ios-app: notifications

- Depends on: `../../mobile-common/shell/navigation/spec.md` (Notifications tab)
- Read when: changing notification permission or the screen that asks for it

## Purpose

How the iOS app asks the user for notification permission and what it does with the answer.

## Requirements

### Requirement: Notification permission

The app SHALL ask for notification permission in context, not at first launch.

#### Scenario: User declines

- WHEN the user declines notification permission
- THEN the app keeps working
