# pod-lifecycle

- Depends on: `../../components/mobile-common/pods/pod-naming-and-filing/spec.md`, `../../components/mobile-common/pods/pod-forms/spec.md`
- Read when: changing what a newly created pod contains or how a pod gains a tool
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation, Wikilink-Triggered Pod Creation, Adding a Tool, Number of Members)

## Purpose

What a pod holds when it is created and how it grows afterwards: templated and Custom pods, tools added by hand, and pods created from a link.

## Requirements

### Requirement: Pods are created on demand

The app SHALL create a pod only when the user wants one, and SHALL NOT pre-create pods for categories.

#### Scenario: First launch

- WHEN the user opens the app for the first time
- THEN the tree holds no pod the user did not create or receive

### Requirement: A templated pod starts with its declared tools

A pod created from a category whose template declares tools SHALL start with one tool per declaration, each with an id of its own.
A pod created from a category that declares none SHALL start with no tool.

#### Scenario: Creating a Passport pod

- WHEN the user creates a pod from the Passport category
- THEN the pod opens with its Passport form tool

#### Scenario: Creating an Immediate Family pod

- WHEN the user creates a pod from the Immediate Family category
- THEN the pod opens with no tool and offers Add Tool

### Requirement: A Custom pod has no category

A pod created without choosing a category SHALL carry no category and SHALL have only a contact-info view of its members and no tool.

#### Scenario: Creating a pod without a category

- WHEN the user creates a pod and picks no category
- THEN the pod is Custom and has no tool

### Requirement: Any pod can gain tools

Every pod SHALL offer Add Tool, whether or not it already has a tool, and SHALL NOT limit how many tools it holds.
The dialog SHALL list every form type regardless of the pod's category, preselect Contact Info, and ask what the tool is about.
Only a Form asks for a type; the other tool kinds have none.

#### Scenario: Adding a form by hand

- WHEN the user taps Add Tool, keeps Contact Info and names the subject "Sophia"
- THEN the pod gains a form tool about Sophia that follows the Contact Info shape

#### Scenario: A form type from another category

- WHEN the user picks Passport in a pod of any other category
- THEN the pod gains a Passport form and its category does not change

### Requirement: A no-id wikilink creates a pod

Tapping a wikilink that has no target yet SHALL create a single-member Custom pod named after the link text at the root of the tree, attach its id to the link and open it with a blank note.
A link that already carries an id SHALL NOT create a pod.

#### Scenario: Tapping [[foo]]

- WHEN the user taps a link `[[foo]]` that has no target
- THEN a pod named "foo" appears at the root, the link now resolves to it, and its note is blank

#### Scenario: Link to a pod the user does not have

- WHEN the user taps a link that carries the id of a pod absent from their tree
- THEN it is shown as unresolved and no pod is created

### Requirement: Members are people or services

An invited service SHALL count as a member, so inviting one raises a single-member pod to a two-member pod.

#### Scenario: Inviting a backup service

- WHEN the user invites a backup service into a single-member pod
- THEN the pod shows two members

Because a service counts as a member, a pod with one person and one service is a two-member pod for the naming rule in [pod-storage-and-sharing](../pod-storage-and-sharing/spec.md).

## Open questions

- Whether a member who lacks permission to create pods can create one by tapping a no-id wikilink (see `pod-permissions`).
