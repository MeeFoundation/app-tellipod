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

A pod created from a category whose template declares tools SHALL start with one tool per declaration, as suggested forms.
A pod created from a category that declares none SHALL start with no tool.
No pod holds a form by default.

#### Scenario: Creating a pod in the Vehicle category

- WHEN the user creates a pod in the Vehicle category
- THEN the pod opens with a Vehicle form, the form that category suggests

#### Scenario: Creating a pod in the Immediate Family category

- WHEN the user creates a pod in the Immediate Family category
- THEN the pod opens with no tool and offers Add Tool

### Requirement: A Custom pod has no category

A pod created without a category SHALL be a Custom pod. It has no suggested forms, and the user can still add any form to it.

#### Scenario: Creating a pod without a category

- WHEN the user creates a pod and picks no category
- THEN the pod is Custom and has no suggested form

### Requirement: Any pod can gain tools

Every pod SHALL offer Add Tool, holding any number of tools.
The dialog lists every form type and asks what the tool is about. A pod without a category offers the same choices as any other pod.
Details of the dialog are in [pod-tools-and-forms](../pod-tools-and-forms/spec.md).

#### Scenario: A form type from another category

- WHEN the user picks Vehicle in a pod of another category
- THEN the pod gains a Vehicle form and stays in its own category

### Requirement: A pod screen always has Info; other tools are optional

The screen of a pod SHALL always show Info (the working name of this tab).
Info holds the pod's forms, members and other information about the pod.
Every other tool of a pod, such as Notes and Chat, SHALL be one the pod may or may not have, and the screen shows a tab only for each tool the pod has.
For now every pod is created with Notes and Chat.

#### Scenario: Looking at the tabs of a pod

- WHEN the user looks at the screen of a pod
- THEN the pod screen offers an Info tab and a tab for each tool the pod has

#### Scenario: A pod without Chat

- WHEN a pod has no Chat tool
- THEN the pod screen shows no Chat tab and still shows Info

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

- Which tab a pod opens on (always the same one, the one used last, or depends on the pod).
- Whether the user will choose at creation which tools a pod gets (for example checkboxes for Notes and Chat), and whether such tools can be added or removed later. Today every pod gets Notes and Chat.
- Whether a member who lacks permission to create pods can create one by tapping a link without a target (see [members-and-roles](../members-and-roles/spec.md)).
