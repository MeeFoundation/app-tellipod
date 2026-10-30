# pod-naming-and-filing

- Depends on: `../pod-permissions/spec.md`, `../pod-forms/spec.md`
- Read when: creating, renaming, moving or receiving a pod
- Source: `pod-ontologies/app-behavior.md`, Lazy Instantiation; Naming, Renaming, and Sharing; Auto-Filing on Receipt; Figma "Mee - Tellipod App v4.0.3" (Home)
- Scope: how names travel between members is decided by the node. The app shows the names it receives.

## Purpose

How the user creates, names, renames and places pods in the app.

## Requirements

### Requirement: Create a pod

The user SHALL be able to create a pod by choosing a category, or none, and giving it a name.
A new pod SHALL open with the Contact Info form, and with an empty tool for each tool its category declares.
A pod with no category SHALL open with Contact Info only and no tools.

#### Scenario: Pod with no category

- WHEN the user creates a pod without a category
- THEN it opens with Contact Info only and no tools

### Requirement: Rename a pod

The user SHALL be able to rename a pod.
In a pod with one member, three or more members, or two members and a tool, the name is shared: the app SHALL show the same name to every member.
In a pod with two members and no tool, the name is the user's own: a rename SHALL change only what this user sees.

#### Scenario: Shared name

- WHEN a member renames a pod that has three members
- THEN each member's app shows the new name

#### Scenario: Two members and a tool

- WHEN a member renames a two-member pod that has a tool
- THEN the name is shared, as above

#### Scenario: Two members and no tool

- WHEN a member renames a two-member pod that has no tool
- THEN the other member's name for the pod does not change

### Requirement: Name of a received two-member pod

A two-member pod without a tool that the user receives SHALL appear under the sender's given name, not under the name the sender chose.

#### Scenario: First receipt

- WHEN Alice sends Bob a pod she named "Bob"
- THEN the pod appears to Bob as "Alice"

### Requirement: Duplicate names are not rejected

The app SHALL NOT ask the user about a duplicate name or reject it.
A pod with the same name as another pod under the same parent SHALL be shown with a distinguishing number.
This applies when creating, renaming and receiving a pod.

#### Scenario: Duplicate name

- WHEN the user creates a pod with the name of a pod already under the same parent
- THEN no error or prompt is shown
- AND the new pod is shown with a number added to its name

### Requirement: The category does not change

A pod's category SHALL stay as it was at creation; renaming or moving the pod SHALL NOT change it.

#### Scenario: Renamed pod

- WHEN the user renames a pod to match another category's name
- THEN the pod keeps its category

### Requirement: File a received pod

When the user receives a pod from an invitation, the app SHALL file it under empty parent pods that match its category, and the user SHALL be able to move it.

#### Scenario: Received pod with no parents

- WHEN the user receives a pod whose category needs parent pods they do not have
- THEN the app creates the empty parent pods and files the pod under them

#### Scenario: Moving a received pod

- WHEN the user moves a received pod under another parent
- THEN it stays there
