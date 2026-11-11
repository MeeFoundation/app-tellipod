# identities

- Depends on: `../launch-and-unlock/spec.md`
- Realizes: [identities](../../../../behaviour/identities/spec.md), [launch-and-unlock](../../../../behaviour/launch-and-unlock/spec.md)
- Read when: changing how identities are stored on the device, the active identity, the identity switch, or unlinking
- Source: product decision, 2026-11-04
- Scope: the node and the data layer own an identity's keys and pods and its sync across devices. The app keeps the list of identities on this device and which one is active.

## Purpose

How the app models several identities on one device, the active one, and the paths that add or remove an identity.

## Requirements

### Requirement: The device keeps a list of identities and one active identity

The app SHALL persist the list of identities on the device and which one is active.
Every screen that shows pods SHALL read them through the active identity, and SHALL NOT keep its own copy of who the user is.

#### Scenario: Two identities

- WHEN the device holds "Alice" and "Alice Work" and "Alice Work" is active
- THEN the list of pods, member lists and requests all use "Alice Work"

### Requirement: Switching changes the active identity

The identity switch SHALL set the active identity and re-render the screens that depend on it.
It SHALL NOT ask for the unlock again: the unlock belongs to the app, not to an identity.
Identities on a device SHALL be kept apart: no screen, request or key of one identity SHALL be visible to another, and nothing SHALL link them.

#### Scenario: Switch

- WHEN the user picks "Alice" in the switch while "Alice Work" is active
- THEN the active identity is "Alice" and the list of pods shows the pods of "Alice"

### Requirement: Create, link and restore add an identity

Create identity, Link identity and Restore identity SHALL each end with the identity added to the device's list and set active.

#### Scenario: Linking

- WHEN the Link identity path completes
- THEN the identity is in the list and active

### Requirement: Unlinking removes an identity from the device

Unlinking SHALL remove the identity from the device's list.
When the removed identity was active, the app SHALL make another identity of the device active, or show the identity choice when none is left.
The identity SHALL stay active on the user's other devices.

#### Scenario: Unlinking the active identity

- WHEN the user unlinks the active identity "Alice Work" and "Alice" remains on the device
- THEN "Alice" becomes active

#### Scenario: Unlinking the last identity

- WHEN the user unlinks the only identity
- THEN the launch state returns to the identity choice

## Open questions

- Whether unlinking also deletes the identity's pods and keys from the device.
- What Link identity and Restore identity exchange with the node.
- Whether unlinking can be requested from another device.
