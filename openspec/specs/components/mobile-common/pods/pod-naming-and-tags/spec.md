# pod-naming-and-tags

- Depends on: `../pod-permissions/spec.md`, `../pod-forms/spec.md`
- Realizes: [create-and-name-pod](../../../../behaviour/create-and-name-pod/spec.md), [pod-tags](../../../../behaviour/pod-tags/spec.md)
- Read when: creating, renaming, tagging or receiving a pod in code
- Source: `pod-ontologies/app-behavior.md` (Naming, Renaming, and Sharing; Joining a Pod; Finding Pods by Tag)
- Scope: how the original name travels between members is decided by the node. The app shows the name it receives and keeps aliases to itself.

## Purpose

How the app computes a pod's displayed name and what it submits on create, original-name change and tag change.

## Requirements

### Requirement: Create submits name and tags

Creating a pod SHALL submit the name and the chosen tags: any number of category tags and any number of user tags.
It SHALL NOT submit a form declaration: a new pod has no form, and tags do not add one.

#### Scenario: Vehicle category tag

- WHEN the user confirms creation of "Paula's Car" with the category tag "Vehicle" and the user tag "Paula"
- THEN the submitted request carries the name and both tags, and no form declaration

#### Scenario: No tags

- WHEN the user confirms creation with a name and no tag
- THEN the submitted request carries the name and an empty tag set

### Requirement: A tag set holds several category tags

A tag set SHALL hold any number of category tags; adding a tag the set already holds SHALL leave the set unchanged.

#### Scenario: Tag already in the set

- WHEN the user adds the category tag Pets to a tag set that already holds it
- THEN the tag set is unchanged

#### Scenario: Second category tag

- WHEN the user adds the category tag Pets Medical to a tag set that holds the category tag Pets
- THEN the tag set holds both Pets and Pets Medical, and its user tags are unchanged

### Requirement: Display name is the alias or the original name

The app SHALL display a pod under the alias this user set, and under the pod's original name when no alias is set.
The original name is the one received for the pod and is the same for every member.
An empty or whitespace-only alias SHALL count as no alias.

#### Scenario: Alias set

- WHEN the user has the alias "Japan 2027" for a pod whose original name is "Trip to Tokyo"
- THEN the displayed name is "Japan 2027"

#### Scenario: Alias cleared

- WHEN the user clears the alias
- THEN the displayed name is "Trip to Tokyo"

#### Scenario: Original name changes

- WHEN the original name changes to "Tokyo, April" and the user has no alias
- THEN the displayed name is "Tokyo, April"
- AND with an alias set, the displayed name is unchanged

### Requirement: Original name change is submitted, alias is stored locally

A change of the original name SHALL be submitted to the node as a pod change, and only for a user who is the pod's owner.
An alias SHALL be stored for this identity only, keyed by the pod's identifier, and SHALL NOT be included in any change submitted for the other members.
A pod received through an invitation SHALL be stored with the alias typed on the invitation screen, and with no alias when the field was empty.

#### Scenario: Owner changes the original name

- WHEN the pod's owner changes the original name
- THEN a pod change with the new name is submitted

#### Scenario: Member sets an alias

- WHEN a member sets an alias
- THEN the alias is stored for this identity only and no pod change is submitted

#### Scenario: Member is not offered the original name change

- WHEN a user who is not an owner opens the pod's actions
- THEN no change of the original name is offered

### Requirement: Rename and tag changes are separate requests

An original-name change request SHALL NOT carry tags, and a tag change SHALL NOT carry a name or a tool.
A tag change SHALL NOT remove a tool.

#### Scenario: Tag change

- WHEN a tag change request is built
- THEN it holds the pod identifier and the new tag set only

### Requirement: Tags are the user's own

The app SHALL store a pod's tags for the active identity only, keyed by the pod's identifier, and SHALL NOT include them in any change submitted for the other members of the pod.
A pod received through an invitation SHALL be stored with the tag set the user chose on the invitation screen, and with an empty tag set when none was chosen.

#### Scenario: Adding a user tag to a shared pod

- WHEN the user adds the user tag "Ginger" to a shared pod
- THEN the tag is stored for this user only and no pod change is submitted

#### Scenario: Accepting an invitation

- WHEN the user taps Accept on an invitation with the category tag Pets Medical selected
- THEN the received pod is stored with the tag set holding Pets Medical

#### Scenario: Declining an invitation

- WHEN the user taps Decline
- THEN no pod and no tag set is stored

## Open questions

- Duplicate names are undecided; see the open questions of [create-and-name-pod](../../../../behaviour/create-and-name-pod/spec.md). Until decided, the app adds no distinguishing number.
