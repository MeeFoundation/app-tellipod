# launch-and-unlock

- Depends on: none
- Read when: changing what the user sees from opening the app until the main app is shown
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App", section Onboarding

## Purpose

What the user sees from opening the app until the main app appears.

## Requirements

### Requirement: A first launch shows onboarding

On the first launch the app SHALL show the splash screen, then the welcome and onboarding screens, then the identity choice, then the main app.

#### Scenario: First launch from the store

- WHEN the user opens the app for the first time
- THEN the splash screen is followed by the welcome and onboarding screens
- AND the identity choice follows onboarding, and the main app follows the choice

### Requirement: The identity choice follows onboarding

After onboarding the app SHALL show a screen with three ways to get an identity on the device: Create identity, Link identity and Restore identity.
The identity is the only account: there is no login, username or password.
Whichever the user picks, the app SHALL open the main app once the device holds the identity.
The same screen SHALL be shown whenever the device holds no identity.

| Choice | Meaning |
|--------|---------|
| Create identity | The user starts a new identity |
| Link identity | The user adds an identity they already use on another device of theirs |
| Restore identity | The user brings back an identity they no longer have on any device |

#### Scenario: Choice after onboarding

- WHEN the user finishes onboarding
- THEN the screen offers Create identity, Link identity and Restore identity

#### Scenario: Creating the first identity

- WHEN Paula picks Create identity and names it "Paula"
- THEN "Paula" is active on the device and the main app opens

#### Scenario: Device without an identity

- WHEN the user opens the app on a device where the last identity was unlinked
- THEN the identity choice is shown again

### Requirement: A later launch asks for the device unlock

On a later launch the app SHALL show the splash screen and then ask the user to unlock the app with the device's own unlock, then open the main app with the active identity.
The app has no login, username or password of its own.
The unlock is per app: it protects opening the app, whichever identity is active, and is asked once per launch.
This applies when the device holds an identity.

#### Scenario: Returning user

- WHEN the user opens the app on a device that holds an identity
- THEN the splash screen is followed by the unlock
- AND after a successful unlock the main app opens as the identity that was active last

### Requirement: Biometric unlock

When the device has a biometric enrolled, the app SHALL offer it as the unlock: Face ID on iOS, the system biometric prompt on Android.
When none is enrolled, the app SHALL offer the device's own passcode.

#### Scenario: Device with a biometric

- WHEN the user reaches the unlock on a device with a biometric enrolled
- THEN the biometric prompt appears and a successful match opens the main app

#### Scenario: Device without a biometric

- WHEN the user reaches the unlock on a device with none enrolled
- THEN the device's passcode prompt is shown and a successful entry opens the main app

## Open questions

- What exactly Link identity and Restore identity ask the user to do. Restore is expected to offer a backup service of the user's choice or the 24 words printed earlier (see [identities](../identities/spec.md)).
- Whether a user who follows an invitation on a device without an identity sees the identity choice first.
- Whether the first launch also asks for the unlock after the identity is created. It does not now.
- Whether the app asks for the unlock again after being in the background for a while.
