# android-app: unlock-and-keys

- Depends on: `../../mobile-common/shell/launch-and-unlock/spec.md`, `../../mobile-common/shell/identities/spec.md`
- Realizes: [launch-and-unlock](../../../behaviour/launch-and-unlock/spec.md), [identities](../../../behaviour/identities/spec.md)
- Read when: changing biometric unlock, key storage or backup rules
- Source: `pod-ontologies/storage.md` (no pod is stored by a cloud provider or other third party)

## Purpose

How the Android app unlocks for the user and protects credential keys and local data.

## Requirements

### Requirement: Biometric unlock

The app SHALL use the system biometric prompt to unlock the app.
When it is offered is defined in `../../mobile-common/shell/launch-and-unlock/spec.md`.

#### Scenario: Biometric prompt

- WHEN the user reaches the unlock on a device with a biometric enrolled
- THEN the app shows the Android system biometric prompt, not its own screen

### Requirement: Credential keys in the Keystore

Credential keys SHALL be kept in the Android Keystore, not in app storage, separately for each identity on the device.

#### Scenario: Storing a key

- WHEN the app persists a credential key
- THEN it is protected by a Keystore key

### Requirement: No cloud backup of local data

The app SHALL exclude its pod store and credential keys from Android cloud backup.

#### Scenario: Device backup

- WHEN Android backs up the app's data to the cloud
- THEN the pod store and credential keys are not included
