# pod-naming-and-filing

- Depends on: `../pod-permissions/spec.md`, `../pod-forms/spec.md`
- Realizes: [create-and-name-pod](../../../../behaviour/create-and-name-pod/spec.md)
- Read when: creating, renaming, moving or receiving a pod in code
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation; Naming, Renaming, and Sharing; Auto-Filing on Receipt)
- Scope: how names travel between members is decided by the node. The app shows the names it receives.

## Purpose

How the app computes a pod's displayed name and parent, and what it submits on create, rename and move.

## Requirements

### Requirement: Create submits category, name and template

Creating a pod SHALL submit the chosen category (or none), the name, and one tool declaration per tool in the category's template. A pod without a category submits no tool declaration.

#### Scenario: Vehicle category

- WHEN the user confirms creation in the Vehicle category
- THEN the submitted request carries the category, the name and the Vehicle tool declaration

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

The app SHALL derive a distinguishing number from the siblings under the same parent when two names are equal, and SHALL render it without changing the stored name.

#### Scenario: Equal siblings

- WHEN two siblings under one parent are named "Coffee"
- THEN the second renders as "Coffee" with a number and stores "Coffee"

### Requirement: The category is immutable

Rename and move requests SHALL NOT carry a category field.

#### Scenario: Move

- WHEN a move request is built
- THEN it holds the pod identifier and the new parent only

### Requirement: Receipt files under category parents

On receipt the app SHALL file the pod under parents matching its category, creating empty parents that are missing, and SHALL keep a user's later move.

#### Scenario: Move after receipt

- WHEN the user moves a received pod
- THEN later syncs do not refile it
