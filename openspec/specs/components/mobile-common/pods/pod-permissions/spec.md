# pod-permissions

- Depends on: none
- Realizes: [members-and-roles](../../../../behaviour/members-and-roles/spec.md)
- Read when: computing which actions the UI offers in a pod
- Source: `pod-ontologies/app-behavior.md`, Permissions
- Scope: the node enforces permissions, including that a pod keeps at least one owner. The app offers actions to match and is not a security boundary.

## Purpose

How the UI derives its action list from the user's role.

## Requirements

### Requirement: One action policy

The app SHALL compute the offered actions in one function from the user's role and the target (pod, member, attachment, form entry, owner count).
Screens SHALL read the result and SHALL NOT check roles themselves.
The role-by-action table is in [members-and-roles](../../../../behaviour/members-and-roles/spec.md).

#### Scenario: Member role

- WHEN the policy is evaluated for a member on a pod
- THEN the result lacks Remove member, Promote, Demote and Delete for all members

### Requirement: Target-dependent rules

The policy SHALL include the target's author and the pod's owner count:
- Delete and Make private for an attachment: when the user is its author; Delete also for an owner;
- Edit and Delete for a form entry: when the user is its author; Delete also for an owner;
- Demote for an owner: when the pod has another owner.

#### Scenario: Only owner

- WHEN the policy is evaluated for the only owner viewing themselves
- THEN Demote is absent

### Requirement: The node has the last word

When the node rejects an action the UI offered, the app SHALL show the node's result and refresh the action list.

#### Scenario: Stale role

- WHEN the node rejects Remove member because the user's role changed
- THEN the action list is recomputed with the new role
