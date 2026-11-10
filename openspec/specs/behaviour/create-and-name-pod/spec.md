# create-and-name-pod

- Depends on: `../pod-lifecycle/spec.md`, `../pod-tags/spec.md`
- Read when: creating, renaming, tagging or receiving a pod; changing how a pod is named
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation; Naming, Renaming, and Sharing; Joining a Pod); Figma "Mee - Tellipod App v4.0.3" (Home)

## Purpose

How the user creates a pod, names it and tags it, renames it and accepts a pod sent to them.
What the pod holds at creation is in [pod-lifecycle](../pod-lifecycle/spec.md).

## Requirements

### Requirement: Create a pod with a name and tags

The user SHALL be able to create a pod by giving it a name and, optionally, tags.
Category tags and user tags are added the same way, and a second category tag replaces the first (see [pod-tags](../pod-tags/spec.md)).
The new pod opens with no form, whatever its tags.

#### Scenario: Creating a pod for vehicle details

- WHEN the user names a pod "Paula's Car" and adds the category tag Vehicle and the user tag "Paula"
- THEN the pod "Paula's Car" opens with both tags shown, each in its own style, and with no form

### Requirement: Create a pod without tags

The user SHALL be able to create a pod with a name and no tag.
It opens empty. The user can tag it later and can add any form to it with Add Tool.

#### Scenario: Creating a pod with no tag

- WHEN the user names a pod "Notes" and adds no tag
- THEN the pod opens with no tag and no form

#### Scenario: Adding a form to a pod with no tag

- WHEN the user taps Add Tool in a pod that has no tag
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

A pod with the same name as another pod SHALL be shown with a distinguishing number, when creating, renaming or receiving it.

#### Scenario: Duplicate name

- WHEN the user creates a pod named "Coffee" while another pod is named "Coffee"
- THEN the new pod is shown as "Coffee" with a number added, and the user continues without a prompt

### Requirement: Renaming leaves the tags

A pod SHALL keep its tags when it is renamed.

#### Scenario: Renamed pod

- WHEN the user renames a pod tagged Pets to "Vehicle"
- THEN the pod stays tagged Pets

### Requirement: A pod is received by accepting its invitation

A pod the user is invited into SHALL appear in the list of pods only when the user accepts the invitation, carrying the tags chosen on the invitation screen (see [pod-tags](../pod-tags/spec.md)).

#### Scenario: Accepted invitation

- WHEN the user accepts the invitation to "Ginger Medical" with the category tag Pets Medical selected
- THEN the pod is in the list with the tag Pets Medical

#### Scenario: Declined invitation

- WHEN the user declines the invitation to "Ginger Medical"
- THEN the pod is not in the list
