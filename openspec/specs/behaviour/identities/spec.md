# identities

- Depends on: `../launch-and-unlock/spec.md`
- Read when: changing how the user has several identities or several devices, switching the active identity, or unlinking a device
- Source: product decision, 2026-11-04

## Purpose

How a user holds one or more identities on one or more devices, and how they switch between identities and unlink a device.
An identity is who the user is in a pod: it has its own name, pods and member info.
Two identities on a device, such as "Alice" and "Alice Work", are entirely separate: the app treats them as two different people, with nothing linking them, and a pod or another member cannot tell they share a device.
Switching identity does not ask for the unlock again: the unlock is per app, not per identity (see [launch-and-unlock](../launch-and-unlock/spec.md)).

## Requirements

### Requirement: A user has several active devices

A user SHALL be able to use the same identity on several devices at the same time.

#### Scenario: Phone and tablet

- WHEN Alice links her identity "Alice" on a second device
- THEN "Alice" is active on both devices and shows the same pods on each

### Requirement: A device holds several identities

A device SHALL hold several active identities, such as "Alice" and "Alice Work".
Each identity shows its own pods.

#### Scenario: Two identities on one device

- WHEN Alice creates the identity "Alice Work" on a device that already holds "Alice"
- THEN both identities are active on the device
- AND "Alice Work" shows its own pods, not those of "Alice"

### Requirement: The active identity can be switched

The main app SHALL show which identity is active and SHALL offer a switch between the identities on the device.
Switching SHALL show the pods of the chosen identity and make it the one the user acts as, including the "(You)" in member lists.

#### Scenario: Switching to Alice Work

- WHEN Alice, using "Alice", opens the identity switch and picks "Alice Work"
- THEN the app shows the pods of "Alice Work"
- AND the app does not ask for the unlock again
- AND in a shared pod her own entry reads "Alice Work (You)"

### Requirement: A device can be unlinked

The user SHALL be able to unlink an identity from a device.
Unlinking SHALL remove the identity from that device and from its switch; the identity stays active on the user's other devices.

#### Scenario: Unlinking Alice Work

- WHEN Alice unlinks "Alice Work" from her tablet
- THEN "Alice Work" is no longer in the switch on the tablet
- AND "Alice Work" is still active on her phone

#### Scenario: Unlinking the last identity

- WHEN Alice unlinks the only identity on the device
- THEN the app shows the identity choice (see [launch-and-unlock](../launch-and-unlock/spec.md))

### Requirement: Restoring is not creating a new account

Restore identity SHALL bring back the existing identity on a device that no longer has it, for example after the device is lost.
It SHALL NOT create a new identity, and the user can still choose Create identity instead.
Link identity is a different action: it adds an identity that is still active on another device of the user.

#### Scenario: Lost device

- WHEN Alice loses her only device and opens the app on a new one
- THEN she can pick Restore identity to bring back "Alice" or Create identity to start a new one

## Open questions

- How an identity is restored: with a backup service the user chooses, or with the 24 words printed earlier.
- Identities are not stored in a server database. How this shows in the app is not decided.
- Deleting an identity: not thought through yet.
- Merging identities: not planned.
- Where the identity switch sits in the interface.
- What happens to the unlinked identity's pods and keys stored on the device.
- Whether unlinking is also possible from another device of the same user, for a lost device.
