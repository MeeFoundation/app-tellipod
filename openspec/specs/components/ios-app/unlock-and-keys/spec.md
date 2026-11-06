# ios-app: unlock-and-keys

- Depends on: `../../mobile-common/shell/launch-and-unlock/spec.md`, `../../mobile-common/shell/identities/spec.md`
- Realizes: [launch-and-unlock](../../../behaviour/launch-and-unlock/spec.md), [identities](../../../behaviour/identities/spec.md)
- Read when: changing Face ID unlock, key storage or backup rules
- Source: `pod-ontologies/storage.md` (no pod is stored by a cloud provider or other third party)

## Purpose

How the iOS app unlocks for the user and protects credential keys and local data.

## Requirements

### Requirement: Face ID

The app SHALL declare a usage description for Face ID and request it only when the user reaches the unlock.

When Face ID is offered is defined in `../../mobile-common/shell/launch-and-unlock/spec.md`.

#### Scenario: First Face ID prompt

- WHEN the user reaches the unlock on a device with Face ID for the first time
- THEN the system prompt shows the app's usage description

### Requirement: Credential keys in the Keychain

Credential keys SHALL be kept in the iOS Keychain, not in app storage, separately for each identity on the device.

#### Scenario: Storing a key

- WHEN the app persists a credential key
- THEN it is written to the Keychain

### Requirement: No cloud backup of local data

The app SHALL exclude its pod store and credential keys from iCloud backup.

#### Scenario: Device backup

- WHEN iOS backs up the app's data to iCloud
- THEN the pod store and credential keys are not included
