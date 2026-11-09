# create-and-name-pod

- Depends on: `../pod-lifecycle/spec.md`
- Read when: creating, renaming, moving or receiving a pod; changing how a pod is named
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation; Naming, Renaming, and Sharing; Auto-Filing on Receipt); Figma "Mee - Tellipod App v4.0.3" (Home)

## Purpose

How the user creates a pod, names it, renames it and sees it placed in the tree.
What the pod holds at creation is in [pod-lifecycle](../pod-lifecycle/spec.md).

## Requirements

### Requirement: Create a pod with a category

The user SHALL be able to create a pod by choosing a category and giving it a name.
The new pod opens with an empty tool for each tool its category declares, as suggested forms.

#### Scenario: Creating a pod for vehicle details

- WHEN the user chooses the Vehicle category and names the pod "Paula's Car"
- THEN the pod "Paula's Car" opens with an empty Vehicle form, the form its category suggests

### Requirement: Create a pod without a category

The user SHALL be able to create a pod by choosing no category.
It opens empty, with no suggested form. The user can still add any form to it with Add Tool.

#### Scenario: Creating a Custom pod

- WHEN the user creates a pod and picks no category
- THEN the pod opens with no tool and no suggested form

#### Scenario: Adding a form to a Custom pod

- WHEN the user taps Add Tool in a pod created without a category
- THEN every form type is offered and the chosen form is added

### Requirement: A rename shows to the members who share the name

A pod with one member, three or more members, or two members and a tool has one shared name: a rename SHALL show to every member.
A pod with two members and no tool has a name each member keeps for themselves: a rename SHALL show only to the person who made it.

#### Scenario: Three members

- WHEN a member renames a pod that has three members
- THEN each member sees the new name

#### Scenario: Two members and a tool

- WHEN a member renames a two-member pod that has a tool
- THEN both members see the new name

#### Scenario: Two members and no tool

- WHEN a member renames a two-member pod that has no tool
- THEN the other member keeps seeing the name they had

### Requirement: A received two-member pod carries the sender's given name

A two-member pod without a tool that the user receives SHALL appear under the sender's given name.

#### Scenario: First receipt

- WHEN Alice sends Bob a pod she named "Bob"
- THEN Bob sees the pod as "Alice"

### Requirement: Duplicate names get a number

A pod with the same name as another pod under the same parent SHALL be shown with a distinguishing number, when creating, renaming or receiving it.

#### Scenario: Duplicate name

- WHEN the user creates a pod named "Coffee" beside an existing pod named "Coffee"
- THEN the new pod is shown as "Coffee" with a number added, and the user continues without a prompt

### Requirement: The category stays

A pod SHALL keep the category it was created with when it is renamed or moved.

#### Scenario: Renamed pod

- WHEN the user renames a pod to match another category's name
- THEN the pod stays in its original category

### Requirement: A received pod is filed and movable

A pod the user receives from an invitation SHALL appear under empty parent pods that match its category, and the user SHALL be able to move it.

#### Scenario: Received pod with no parents

- WHEN the user receives a pod whose category needs parent pods they do not have
- THEN the parent pods appear empty and the pod sits under them

#### Scenario: Moving a received pod

- WHEN the user moves a received pod under another parent
- THEN it stays under that parent
