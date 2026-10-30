# launch-and-auth

- Depends on: `../../../../../../apps/app-tellipod/README.md` (code layout)
- Read when: changing launch, onboarding or sign-in flow
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App", section Onboarding

## Purpose

What the user sees from opening the app until the main app is shown.

## Launch sequence

splash screen → onboarding (welcome) → auth → app

## Requirements

### Requirement: Launch order

The app SHALL show the splash screen first, then onboarding, then authentication, then the main app.
The user SHALL NOT reach the main app before authentication succeeds.

#### Scenario: First launch from the store

- WHEN the user opens the app for the first time
- THEN the splash screen is followed by the welcome and onboarding screens
- AND authentication follows onboarding

#### Scenario: Unauthenticated user on a later launch

- WHEN the user opens the app and is not authenticated
- THEN the splash screen is followed by authentication, without onboarding

### Requirement: Biometric sign-in is supported

The app SHALL offer the platform biometric (Face ID on iOS, the system biometric prompt on Android) as a way to authenticate, when the device has one enrolled.
Platform details are in `../../../ios-app/authentication-and-keys/spec.md` and `../../../android-app/authentication-and-keys/spec.md`.

#### Scenario: Device with biometrics

- WHEN the device has a biometric enrolled and the user reaches authentication
- THEN the biometric prompt is offered and a successful match opens the main app

#### Scenario: No biometric enrolled

- WHEN the device has none enrolled
- THEN the biometric prompt is not offered and the user authenticates by the fallback method
