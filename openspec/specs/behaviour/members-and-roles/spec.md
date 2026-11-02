# members-and-roles

- Depends on: `../pod-lifecycle/spec.md`
- Read when: showing, hiding or disabling an action in a pod by the user's role
- Source: `pod-ontologies/app-behavior.md`, Permissions

## Purpose

Which pod actions the user is offered, by role.
The node enforces permissions; the app offers the actions that match.

## Requirements

### Requirement: Actions follow the user's role

A person in a pod is an owner or a member.
The app SHALL offer pod actions according to the role.

| Action | Owner | Member |
|--------|-------|--------|
| Invite a member | yes | yes |
| Uninvite someone they invited | yes | yes |
| Remove a member | yes | no |
| Promote or demote a member | yes | no |
| Leave the pod | yes | yes |
| Delete the pod from this device | yes | yes |
| Delete the pod for all members | yes | no |
| Rename the pod for all members | yes | undecided |

#### Scenario: Member opens pod actions

- WHEN a member opens the actions for a pod
- THEN the list offers Invite, Uninvite, Leave and Delete from this device

#### Scenario: Owner opens pod actions

- WHEN an owner opens the actions for a pod
- THEN the list also offers Remove member, Promote, Demote and Delete for all members

### Requirement: The only owner stays an owner

The app SHALL offer demoting an owner only when the pod has another owner.

#### Scenario: Pod with two owners

- WHEN an owner views the other members of a pod that has two owners
- THEN Demote is offered for the other owner

### Requirement: Attachments

The user SHALL be offered Delete and Make private for their own attachments, and an owner Delete for any attachment.
Attachments are shown for viewing.

#### Scenario: Viewing an attachment

- WHEN a user opens an attachment
- THEN it is shown for viewing

#### Scenario: Another member's attachment

- WHEN a member opens an attachment added by another member
- THEN the attachment is shown for viewing

### Requirement: Form entries

A user SHALL be offered Edit and Delete for their own form entries.
An owner SHALL also be offered Delete for another member's entry.

#### Scenario: Owner views a member's entry

- WHEN an owner opens another member's form entry
- THEN Delete is offered

### Requirement: The note is open to every member

Every member SHALL be offered reading, editing, deleting and exporting the note.

#### Scenario: Member edits the note

- WHEN a member who is not an owner opens the note
- THEN the editing actions are offered

## Open questions

- Whether a member may rename the pod for all members.
