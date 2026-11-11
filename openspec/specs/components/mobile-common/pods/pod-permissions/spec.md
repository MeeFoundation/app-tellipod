# pod-permissions

- Depends on: none
- Realizes: [members-and-roles](../../../../behaviour/members-and-roles/spec.md), [connection-lifecycle](../../../../behaviour/connection-lifecycle/spec.md) (who is offered Disconnect)
- Read when: computing which actions the UI offers in a pod
- Source: `pod-ontologies/app-behavior.md`, Permissions
- Scope: the node enforces permissions, including that a pod keeps at least one owner. The app offers actions to match and is not a security boundary.

## Purpose

How the UI derives its action list from the user's role.

## Requirements

### Requirement: One action policy

The app SHALL compute the offered actions in one function from the user's role and the target (pod, member, attachment, form, the form's owner, pod owner count, whether the target member is a person or a service).
Screens SHALL read the result and SHALL NOT check roles themselves.
The role-by-action table is in [members-and-roles](../../../../behaviour/members-and-roles/spec.md).
The result SHALL keep the pod's actions (Leave, Delete from this device, Delete pod for all members, Change original name, Set alias) apart from the members-list actions (Invite, Uninvite) and the actions for a member (Remove member, Promote, Demote).

#### Scenario: Member role, pod actions

- WHEN the policy is evaluated for a member on a pod
- THEN the pod's actions offer Leave and Delete from this device and lack Delete pod for all members

#### Scenario: Member role, members list

- WHEN the policy is evaluated for a member on the members of a pod
- THEN the result lacks Invite and Uninvite, and the actions for any member lack Remove member, Promote and Demote

### Requirement: Target-dependent rules

The policy SHALL include the target's author, the target member's kind and the pod's owner count:
- Delete and Make private for an attachment: when the user is its author; Delete also for an owner;
- Invite and Uninvite: when the user is an owner of the pod;
- Edit and Delete for a form: when the user is the form's owner (the member who created it, while still a member of the pod) or an owner of the pod;
- Demote for an owner, the user included: when the pod has another owner;
- Remove member and Leave for an owner: when the pod has another owner;
- Promote for a member: when the member is a person, not a service;
- Connect pod: for every member who is a person, offering only the pods the user owns that are neither the pod itself nor already connected to it;
- Disconnect: when the user owns the host pod or the connected pod;
- Connected to: when the user owns the pod;
- Pod suggestions of `[[`: a connected pod as a connected pod link at once; a pod the user owns and that is not connected as a pod to connect (the Connect dialog); a pod the user is only a member of and that is not connected as a plain pod link;

#### Scenario: Only owner

- WHEN the policy is evaluated for the only owner viewing themselves
- THEN Demote, Remove member and Leave are absent

#### Scenario: Form of another member

- WHEN the policy is evaluated for the owner of a pod on a form created by another member
- THEN Edit and Delete are offered

#### Scenario: Form of another member, user not an owner

- WHEN the policy is evaluated for a member who is not an owner of the pod on a form created by another member
- THEN Edit and Delete are absent

#### Scenario: Connect pod offers owned pods only

- WHEN the policy is evaluated for a member who owns "Sofia's Passport" and not "Visa" on the pod "About Sofia"
- THEN Connect pod offers "Sofia's Passport" and not "Visa"

#### Scenario: Pod suggestions of `[[`

- WHEN the policy is evaluated for a user who owns "Sofia's Passport" and is only a member of "Visa", neither connected to "About Sofia"
- THEN the suggestions offer "Sofia's Passport" with the Connect dialog and "Visa" as a plain pod link

#### Scenario: Disconnect for the owner of the connected pod

- WHEN the policy is evaluated for a user who owns the connected pod but not the host pod
- THEN Disconnect is offered

#### Scenario: Service member

- WHEN the policy is evaluated for an owner viewing a service member
- THEN Promote is absent

### Requirement: The node has the last word

When the node rejects an action the UI offered, the app SHALL show the node's result and refresh the action list.

#### Scenario: Stale role

- WHEN the node rejects Remove member because the user's role changed
- THEN the action list is recomputed with the new role
