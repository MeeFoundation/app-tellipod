# android-app: notifications

- Depends on: `../../mobile-common/shell/navigation/spec.md` (Notifications tab)
- Read when: changing notification permission, channels or the screen that asks for them

## Purpose

How the Android app asks for notification permission and shows notifications.

## Requirements

### Requirement: Notification permission

On Android versions that require a runtime permission for notifications, the app SHALL ask for it in context, not at first launch.
Notifications the app shows SHALL belong to a notification channel.

#### Scenario: User declines

- WHEN the user declines notification permission
- THEN the app keeps working
