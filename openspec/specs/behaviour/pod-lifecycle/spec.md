# pod-lifecycle

- Depends on: none
- Related: `../create-and-name-pod/spec.md`, `../pod-tools-and-forms/spec.md` (these depend on this spec)
- Read when: changing what a newly created pod contains or how a pod gains a tool
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation, Wikilink-Triggered Pod Creation, Adding a Tool, Number of Members)

## Purpose

What a pod holds when it is created and how it grows afterwards: templated and Custom pods, tools added by hand, pods created from a link, and members.

## Requirements

### Requirement: Pods appear when the user creates or receives them

The tree SHALL hold the pods the user created or received.
The app SHALL NOT pre-create pods for categories.

#### Scenario: First launch

- WHEN the user opens the app for the first time
- THEN the tree is empty and fills as the user creates or receives pods

### Requirement: A templated pod starts with its declared tools

Every pod SHALL hold the Contact Info form. Contact Info does not count as a tool for the naming rule in [create-and-name-pod](../create-and-name-pod/spec.md).
A pod created from a category whose template declares tools SHALL start with Contact Info and one tool per declaration.
A pod created from a category that declares none SHALL start with Contact Info only, so it has no tool.

#### Scenario: Creating a Passport pod

- WHEN the user creates a pod from the Passport category
- THEN the pod opens with its Passport form tool

#### Scenario: Creating an Immediate Family pod

- WHEN the user creates a pod from the Immediate Family category
- THEN the pod opens with Contact Info and offers Add Tool

### Requirement: A Custom pod has no category

A pod created without a category SHALL be a Custom pod with a contact-info view of its members.

#### Scenario: Creating a pod without a category

- WHEN the user creates a pod and picks no category
- THEN the pod is Custom and shows its members' contact info

### Requirement: Any pod can gain tools

Every pod SHALL offer Add Tool, holding any number of tools.
The dialog lists every form type, preselects Contact Info and asks what the tool is about.
Details of the dialog are in [pod-tools-and-forms](../pod-tools-and-forms/spec.md).

#### Scenario: A form type from another category

- WHEN the user picks Passport in a pod of another category
- THEN the pod gains a Passport form and stays in its own category

### Requirement: A link without a target creates a pod

Tapping a wikilink that has no target yet SHALL create a single-member Custom pod named after the link text at the root of the tree, attach it to the link and open it with a blank note.

#### Scenario: Tapping [[foo]]

- WHEN the user taps a link `[[foo]]` that has no target
- THEN a pod named "foo" appears at the root, the link opens it from now on, and its note is blank

#### Scenario: Link to a pod from another tree

- WHEN the user taps a link that carries the id of a pod absent from their tree
- THEN the link is shown as unresolved and the tree lists the same pods as before

### Requirement: Members are people or services

An invited service SHALL count as a member.

#### Scenario: Inviting a backup service

- WHEN the user invites a backup service into a single-member pod
- THEN the pod shows two members

A pod with one person and one service is a two-member pod for the naming rule in [create-and-name-pod](../create-and-name-pod/spec.md).

## Open questions

- Whether a member who lacks permission to create pods can create one by tapping a link without a target (see [members-and-roles](../members-and-roles/spec.md)).
