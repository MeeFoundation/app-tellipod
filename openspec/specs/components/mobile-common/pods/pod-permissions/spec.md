# pod-permissions

- Depends on: none
- Read when: showing, hiding or disabling an action in a pod
- Source: `pod-ontologies/app-behavior.md`, Permissions
- Scope: the node enforces permissions, including that a pod always keeps at least one owner. The app offers or hides actions to match, and does not rely on that for security.

## Purpose

Which pod actions the app offers to a user, by role.

## Requirements

### Requirement: Actions follow the user's role

A person in a pod is an owner or a member.
The app SHALL offer pod actions according to the user's role.

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
- THEN "Remove member", "Promote", "Demote" and "Delete for all members" are not offered

### Requirement: The only owner cannot be demoted

The app SHALL NOT offer to demote the only owner of a pod.

#### Scenario: Last owner

- WHEN the only owner views the other members
- THEN the action to demote that owner is not offered

### Requirement: Attachments

The app SHALL NOT offer to edit an attachment.
A member SHALL be offered deleting their own attachments, and an owner deleting any.
A user SHALL be offered making their own attachment private, and not another member's.

#### Scenario: Viewing an attachment

- WHEN a user views an attachment
- THEN no edit action is offered

#### Scenario: Another member's attachment

- WHEN a member views an attachment added by another member
- THEN "Delete" and "Make private" are not offered

### Requirement: Forms

A user SHALL be able to edit and delete their own form entries, such as their Contact Info, and see other members' as read-only.
An owner SHALL also be offered deleting another member's entry.

#### Scenario: Another member's entry

- WHEN a member views another member's form entry
- THEN it is read-only

### Requirement: The note is open to every member

The app SHALL NOT limit note actions by role: every member can read, edit, delete and export the note (see `../note-editor`).

#### Scenario: Member edits the note

- WHEN a member who is not an owner opens the note
- THEN the editing actions are offered
