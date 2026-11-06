# launch-and-unlock

- Depends on: `../../../../../../apps/app-tellipod/README.md` (code layout)
- Realizes: [launch-and-unlock](../../../../behaviour/launch-and-unlock/spec.md)
- Read when: changing the launch state machine, route guarding or the unlock
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App", section Onboarding

## Purpose

How the app decides which screen to show from process start until the main app, and how it asks the platform for a biometric.

## Launch state machine

first launch: splash → onboarding → identity choice → app
later launch: splash → unlock → app

The identity choice is also shown on a later launch when the device holds no identity, in place of the unlock.

## Requirements

### Requirement: The launch state decides the route

The app SHALL derive the start route from two persisted facts: whether onboarding has been completed, and whether the device holds at least one identity.
Routes in `app/` only render the screen for the state; the decision lives in one place.

#### Scenario: Fresh install

- WHEN the user opens the app for the first time
- THEN the splash screen is followed by the welcome and onboarding screens
- AND the identity choice follows onboarding, and the main app follows the choice

#### Scenario: Restart with no identity

- WHEN the user opens the app after completing onboarding and the device holds no identity
- THEN the splash screen is followed by the identity choice, without onboarding

#### Scenario: Restart with an identity

- WHEN the user opens the app after completing onboarding and the device holds an identity
- THEN the splash screen is followed by the unlock, without onboarding or the identity choice
- AND the main app for the active identity follows a successful unlock

### Requirement: The identity choice offers three paths

The identity choice screen SHALL offer Create identity, Link identity and Restore identity, and SHALL hand the chosen path to the identities module (see [identities](../identities/spec.md)).
The launch state SHALL count the device as holding an identity once that module reports one.

#### Scenario: Path completed

- WHEN the identities module reports an identity on the device after the user picked a path
- THEN the launch state moves from the identity choice to the main app

### Requirement: The main app requires an identity and, after the first launch, the unlock

The user SHALL NOT reach any route of the main app while the device holds no identity.
On a later launch the user SHALL NOT reach any route of the main app before the unlock succeeds.
The app has no login, username or password of its own.

#### Scenario: No identity

- WHEN a route of the main app is requested and the device holds no identity
- THEN the identity choice is shown instead

#### Scenario: Successful unlock

- WHEN the user unlocks the app on a later launch
- THEN the main app opens

### Requirement: The biometric option follows the device

The app SHALL offer the platform biometric only when the device has one enrolled.
A device without an enrolled biometric unlocks with the device's own passcode.
Platform specifics are in [ios-app](../../../ios-app/unlock-and-keys/spec.md) and [android-app](../../../android-app/unlock-and-keys/spec.md).

#### Scenario: Device with a biometric

- WHEN the user reaches the unlock on a device with an enrolled biometric
- THEN the biometric prompt is offered and a successful match opens the main app

#### Scenario: Device without a biometric

- WHEN the user reaches the unlock on a device with none enrolled
- THEN the biometric prompt is not offered and the device's passcode prompt is shown

## Open questions

- Where the onboarding-completed flag is persisted.
- What the Link identity and Restore identity paths ask of the user and of the data layer.
- Whether a deep link received on a device without an identity is kept and opened after an identity is on the device.
- Whether the first launch also asks for the unlock after the identity is created. It does not now.
- Whether a deep link received before the unlock is kept and opened after it.
- What the user sees and can do when the biometric prompt is cancelled or the match fails.
