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

A pod keeps at least one owner.
The app SHALL offer Demote for an owner, including the user themselves, only when the pod has another owner.
The app SHALL NOT offer Remove member or Leave for the only owner.

#### Scenario: Pod with two owners

- WHEN an owner views the members of a pod that has two owners
- THEN Demote is offered for the other owner and for themselves

#### Scenario: Only owner views themselves

- WHEN the only owner opens the actions for themselves
- THEN Demote, Remove member and Leave are absent
- AND promoting another member to owner makes them available

### Requirement: Only people can be owners

The app SHALL offer Promote only for a member that is a person, never for a service.

#### Scenario: Service member

- WHEN an owner opens the actions for a service member
- THEN Promote is absent

#### Scenario: Person member

- WHEN an owner opens the actions for a member who is a person and not an owner
- THEN Promote is offered

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

An owner SHALL be offered Edit and Delete for any form entry.
A member who is not an owner SHALL see form entries for reading.

#### Scenario: Owner views an entry

- WHEN an owner opens a form entry
- THEN Edit and Delete are offered

#### Scenario: Member views an entry

- WHEN a member who is not an owner opens a form entry
- THEN the values are shown for reading and Edit and Delete are absent

### Requirement: Claims about a member

Every member SHALL be offered to claim a value for any other member's info field.
A claim's author SHALL be offered Edit and Delete for it.
The member a claim is about SHALL be offered Copy value and Add to info I share for it.
Other members see it for reading.
See [info-claims](../info-claims/spec.md).

#### Scenario: Subject opens a claim

- WHEN the member a claim is about opens it
- THEN Copy value and Add to info I share are offered

#### Scenario: Another member opens a claim

- WHEN a member who is neither the author nor the subject opens a claim
- THEN the value is shown for reading

### Requirement: The note is open to every member

Every member SHALL be offered reading, editing, deleting and exporting the note.

#### Scenario: Member edits the note

- WHEN a member who is not an owner opens the note
- THEN the editing actions are offered

## Open questions

- Whether a member may rename the pod for all members.
