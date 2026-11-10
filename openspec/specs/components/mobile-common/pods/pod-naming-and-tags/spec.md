# pod-naming-and-tags

- Depends on: `../pod-permissions/spec.md`, `../pod-forms/spec.md`
- Realizes: [create-and-name-pod](../../../../behaviour/create-and-name-pod/spec.md), [pod-tags](../../../../behaviour/pod-tags/spec.md)
- Read when: creating, renaming, tagging or receiving a pod in code
- Source: `pod-ontologies/app-behavior.md` (Naming, Renaming, and Sharing; Joining a Pod; Finding Pods by Tag)
- Scope: how names travel between members is decided by the node. The app shows the names it receives.

## Purpose

How the app computes a pod's displayed name and what it submits on create, rename and tag change.

## Requirements

### Requirement: Create submits name and tags

Creating a pod SHALL submit the name and the chosen tags: at most one category tag and any number of user tags.
It SHALL NOT submit a form declaration: a new pod has no form, and tags do not add one.

#### Scenario: Vehicle category tag

- WHEN the user confirms creation of "Paula's Car" with the category tag "Vehicle" and the user tag "Paula"
- THEN the submitted request carries the name and both tags, and no form declaration

#### Scenario: No tags

- WHEN the user confirms creation with a name and no tag
- THEN the submitted request carries the name and an empty tag set

### Requirement: A tag set holds at most one category tag

When a tag set would hold two category tags, the app SHALL keep the one added last and drop the other.

#### Scenario: Second category tag

- WHEN the user adds the category tag Pets Medical to a tag set that holds the category tag Pets
- THEN the tag set holds Pets Medical and no other category tag, and its user tags are unchanged

### Requirement: Display name comes from the naming mode

The app SHALL compute the displayed name from the pod's naming mode:
- shared, when the pod has one member, three or more members, or two members and a tool: the name received for the pod;
- personal, when it has two members and no tool: the name this user set, or the other member's given name when none is set.

#### Scenario: Mode switch

- WHEN a tool is added to a two-member pod
- THEN the displayed name is computed in shared mode from then on

### Requirement: A rename is stored by naming mode

A rename in shared mode SHALL be submitted to the node as a pod change; in personal mode it SHALL be stored for this user only.

#### Scenario: Rename in personal mode

- WHEN the user renames a two-member pod that has no tool
- THEN the new name is stored for this user only and no pod change is submitted

### Requirement: Duplicate suffix is a display concern

The app SHALL derive a distinguishing number from the other pods when two names are equal, and SHALL render it without changing the stored name.

#### Scenario: Equal names

- WHEN two pods are named "Coffee"
- THEN the second renders as "Coffee" with a number and stores "Coffee"

### Requirement: Rename and tag changes are separate requests

A rename request SHALL NOT carry tags, and a tag change SHALL NOT carry a name or a tool.
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
