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
The owner manages the pod's membership and the pod itself: inviting, removing, promoting and demoting members, and deleting the pod for all members.
Everything else in the pod is open to every member, except what is said below about forms and attachments.
The app SHALL offer pod actions according to the role.
The actions of the pod itself and the actions on the pod's members are offered in separate places: the pod's actions list holds the former, and the members list, with the actions for each member, holds the latter.

| Action | Where | Owner | Member |
|--------|-------|-------|--------|
| Leave the pod | pod's actions | yes | yes |
| Delete the pod from this device | pod's actions | yes | yes |
| Delete the pod for all members | pod's actions, set apart from the rest | yes | no |
| Rename the pod for all members | pod's actions | yes | undecided |
| Invite a member | members list | yes | no |
| Uninvite someone | members list | yes | no |
| Remove a member | a member's actions | yes | no |
| Promote or demote a member | a member's actions | yes | no |

Delete the pod for all members removes the pod itself from every member's device. Remove a member takes one person out of the pod and leaves the pod with the others.

#### Scenario: Member opens pod actions

- WHEN a member opens the actions for a pod
- THEN the list offers Leave and Delete from this device
- AND Delete pod for all members is absent

#### Scenario: Owner opens pod actions

- WHEN an owner opens the actions for a pod
- THEN the list also offers Delete pod for all members, set apart from the other actions

#### Scenario: Member opens the members list

- WHEN a member opens the members of a pod
- THEN Invite and Uninvite are absent
- AND Remove member, Promote and Demote are absent from the actions for any member

#### Scenario: Owner opens the members list

- WHEN an owner opens the members of a pod
- THEN Invite and Uninvite are offered
- AND the actions for another member offer Remove member, Promote and Demote

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

The user SHALL be offered Delete and Make private for their own attachments, and an owner Delete for any attachment (see the open questions).
Attachments are shown for viewing.

#### Scenario: Viewing an attachment

- WHEN a user opens an attachment
- THEN it is shown for viewing

#### Scenario: Another member's attachment

- WHEN a member opens an attachment added by another member
- THEN the attachment is shown for viewing

### Requirement: Forms have their own owner

Any member SHALL be offered to create a form in the pod.
The member who creates a form is the form's owner.
The form's owner and the pod's owner SHALL be offered Edit and Delete for it.
Every other member sees the form for reading.
The form's owner and the pod's owner can be different people.
Ownership of a form stays with its creator when someone else edits it.

#### Scenario: Member creates a form

- WHEN Sam, who is not an owner of the pod, adds a Passport form
- THEN Sam is the owner of that form and is offered Edit and Delete for it

#### Scenario: Someone else's form

- WHEN Dave, a member who is not an owner, opens the form Sam created
- THEN the values are shown for reading and Edit and Delete are absent

#### Scenario: The pod's owner opens a member's form

- WHEN Paula, the owner of the pod, opens the form Sam created
- THEN Edit and Delete are offered

### Requirement: Statements about a member

Every member SHALL be offered to make a statement with a value for any other member's info field.
A statement's author SHALL be offered Edit and Delete for it.
The member a statement is about SHALL be offered Copy value and Add to info I share for it.
Other members see it for reading.
See [info-statements](../info-statements/spec.md).

#### Scenario: Subject opens a statement

- WHEN the member a statement is about opens it
- THEN Copy value and Add to info I share are offered

#### Scenario: Another member opens a statement

- WHEN a member who is neither the author nor the subject opens a statement
- THEN the value is shown for reading

### Requirement: The note is open to every member

Every member SHALL be offered reading, editing, deleting and exporting the note.

#### Scenario: Member edits the note

- WHEN a member who is not an owner opens the note
- THEN the editing actions are offered

## Open questions

- Whether a member may rename the pod for all members.
- Whether any member may invite people, as the product requirements say ("any person who is a member of a pod can invite"). The app offers Invite only to owners for now; permissions are to be refined.
- Whether the form's owner changes when another member edits the form.
- Whether an owner's actions for another owner offer Remove member, Promote and Demote, for example Lee acting on Paula after being promoted.
- Whether Promote, Demote, Delete pod for all members and Delete for any attachment stay with the pod's owner now that the role is defined by inviting and removing members.
