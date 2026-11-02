# launch-and-auth

- Depends on: `../../../../../../apps/app-tellipod/README.md` (code layout)
- Realizes: [launch-and-sign-in](../../../../behaviour/launch-and-sign-in/spec.md)
- Read when: changing the launch state machine, route guarding or the biometric gate
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App", section Onboarding

## Purpose

How the app decides which screen to show from process start until the main app, and how it asks the platform for a biometric.

## Launch state machine

splash → onboarding → auth → app

## Requirements

### Requirement: The launch state decides the route

The app SHALL derive the start route from two persisted facts: whether onboarding has been completed, and whether a session is authenticated.
Routes in `app/` only render the screen for the state; the decision lives in one place.

#### Scenario: Fresh install

- WHEN the user opens the app for the first time
- THEN the splash screen is followed by the welcome and onboarding screens
- AND authentication follows onboarding, and the main app follows authentication

#### Scenario: Signed-out restart

- WHEN the user opens the app after completing onboarding and is not authenticated
- THEN the splash screen is followed by authentication, without onboarding

### Requirement: The main app requires authentication

The user SHALL NOT reach any route of the main app before authentication succeeds.

#### Scenario: Successful authentication

- WHEN the user authenticates successfully
- THEN the main app opens

### Requirement: The biometric option follows the device

The app SHALL offer the platform biometric only when the device has one enrolled.
A device without an enrolled biometric authenticates by the fallback method.
Platform specifics are in [ios-app](../../../ios-app/authentication-and-keys/spec.md) and [android-app](../../../android-app/authentication-and-keys/spec.md).

#### Scenario: Device with a biometric

- WHEN the user reaches authentication on a device with an enrolled biometric
- THEN the biometric prompt is offered and a successful match opens the main app

#### Scenario: Device without a biometric

- WHEN the user reaches authentication on a device with none enrolled
- THEN the biometric prompt is not offered and the fallback method is shown

## Open questions

- Where the onboarding-completed flag is persisted.
- What the fallback method is.
- Whether a deep link received while signed out is kept and opened after authentication.
- What the user sees and can do when the biometric prompt is cancelled or the match fails.
