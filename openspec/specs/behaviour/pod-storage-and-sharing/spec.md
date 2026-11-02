# pod-storage-and-sharing

- Depends on: `../members-and-roles/spec.md`, `../chat/spec.md`
- Read when: deciding whether a piece of pod content stays on the device or reaches other members
- Source: `pod-ontologies/app-behavior.md` (Pod Storage, Pod Contents, Deriving and Checking a Pod Id)

## Purpose

Where pod content lives and which of it travels to other members. Propagation, merging and encryption at rest are decided by the nodes and the data layer; this spec states what the user sees and does.

## Requirements

### Requirement: Pods live only in the app's protected store

The app SHALL keep a pod's content in its own protected store, apart from the user's files and any cloud provider.
Delivery to other members and syncing between the user's own devices are decided by the nodes and the data layer.

#### Scenario: Looking for a pod in Files

- WHEN the user browses the device's file manager
- THEN it lists only the files the user saved themselves

### Requirement: Shared content reaches every member

A change to a pod's shared content SHALL appear in every member's copy: its name (except for a bare two-member pod), note, attachments, member and tool claims, and group stream.

#### Scenario: A member edits the note

- WHEN one member adds a line to the note of a three-member pod
- THEN the other two members see the line in their copy of the note

### Requirement: Private files stay with their member

A file the user adds without attaching it SHALL be a private file: shown under its own divider with a lock badge in the Attachments area, synced across the user's own devices and visible to the user alone.
The user may organize private files in any structure and may hold them in a pod that has no attachments.

#### Scenario: Adding a private file to a shared pod

- WHEN the user adds a file to a shared pod and leaves it private
- THEN the file appears badged under the private divider on each of the user's devices, and only there

#### Scenario: Attaching a private file

- WHEN the user drags a private file into the attachments
- THEN every member receives it

### Requirement: Some content stays with its author

A hidden service tag, and a direct message between the user and their personal agent, SHALL stay in the copy of the member who made them.
A direct message between two members SHALL reach those two.

#### Scenario: Direct message in a three-member pod

- WHEN one member sends a direct message to another
- THEN the third member's chat shows the group stream alone

### Requirement: A link to a private file opens for its owner

A link in the note to one of the user's own private files SHALL open the file in the user's copy and be marked unresolved in every other member's copy.

#### Scenario: Another member opens the link

- WHEN another member taps a note link whose target is the author's private file
- THEN the link is marked unresolved and the note stays on screen

### Requirement: A received pod is checked

The app SHALL add a received pod to the tree when its founding event passes the id and signature check.

#### Scenario: Received pod fails the check

- WHEN a pod arrives and its founding event fails the check
- THEN the tree lists the same pods as before, without the received pod

## Open questions

- Whether the user is told when a received pod is dropped.
