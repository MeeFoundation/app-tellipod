# launch-and-sign-in

- Depends on: none
- Read when: changing what the user sees from opening the app until the main app is shown
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App", section Onboarding

## Purpose

What the user sees from opening the app until the main app appears.

## Requirements

### Requirement: A first launch shows onboarding

On the first launch the app SHALL show the splash screen, then the welcome and onboarding screens, then authentication, then the main app.

#### Scenario: First launch from the store

- WHEN the user opens the app for the first time
- THEN the splash screen is followed by the welcome and onboarding screens
- AND authentication follows onboarding

### Requirement: A later launch goes straight to sign-in

On a later launch the app SHALL show the splash screen and then authentication.

#### Scenario: Returning user who is signed out

- WHEN the user opens the app and is signed out
- THEN the splash screen is followed by authentication

### Requirement: Authentication opens the main app

The main app SHALL appear when authentication succeeds.

#### Scenario: Successful sign-in

- WHEN the user authenticates successfully
- THEN the main app opens

### Requirement: Biometric sign-in

When the device has a biometric enrolled, the app SHALL offer it as a way to authenticate: Face ID on iOS, the system biometric prompt on Android.
When none is enrolled, the app SHALL offer the fallback method.

#### Scenario: Device with a biometric

- WHEN the user reaches authentication on a device with a biometric enrolled
- THEN the biometric prompt appears and a successful match opens the main app

#### Scenario: Device without a biometric

- WHEN the user reaches authentication on a device with none enrolled
- THEN the fallback sign-in method is shown

## Open questions

- What the fallback method is.
