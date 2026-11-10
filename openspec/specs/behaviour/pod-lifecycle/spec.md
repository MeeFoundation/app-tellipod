# pod-lifecycle

- Depends on: none
- Related: `../create-and-name-pod/spec.md`, `../pod-tools-and-forms/spec.md`, `../pod-tags/spec.md`, `../connected-pods/spec.md` (these depend on this spec)
- Read when: changing what a newly created pod contains or how a pod gains a tool
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation, Wikilink-Triggered Pod Creation, Adding a Tool, Number of Members)

## Purpose

What a pod holds when it is created and how it grows afterwards: tools added by hand, pods created from a link, and members.
Pods are a flat set: no pod sits inside another.
A pod can point at pods it is connected to (see [connected-pods](../connected-pods/spec.md)), which is a reference and not nesting.

## Requirements

### Requirement: Pods appear when the user creates them or accepts an invitation

The list of pods SHALL hold the pods the user created and the pods whose invitation the user accepted.
The app SHALL NOT pre-create pods.

#### Scenario: First launch

- WHEN the user opens the app for the first time
- THEN the list of pods is empty and fills as the user creates pods or accepts invitations

### Requirement: A new pod starts with no form

A pod SHALL start with no form, whatever its tags, and offers Add Tool.
Whatever tags the user gives a pod when creating it, the tags decide only which form types Add Tool lists first (see [pod-tools-and-forms](../pod-tools-and-forms/spec.md)).
A pod needs no tag: the user can create a pod with none, and tag it later (see [pod-tags](../pod-tags/spec.md)).

#### Scenario: Creating a pod tagged Vehicle

- WHEN the user creates a pod with the category tag Vehicle
- THEN the pod opens with no form and offers Add Tool

#### Scenario: Creating a pod without a tag

- WHEN the user creates a pod and adds no tag
- THEN the pod opens with no form and offers Add Tool

### Requirement: Any pod can gain tools

Every pod SHALL offer Add Tool, holding any number of tools.
The dialog lists every form type and asks what the tool is about. A pod without a tag offers the same choices as any other pod.
Details of the dialog are in [pod-tools-and-forms](../pod-tools-and-forms/spec.md).

#### Scenario: A form type unrelated to the tags

- WHEN the user picks Vehicle in a pod tagged Pets
- THEN the pod gains a Vehicle form and keeps its tags

### Requirement: A pod screen always has Info; other tools are optional

The screen of a pod SHALL always show Info (the working name of this tab).
Info holds the pod's forms, members, tags and other information about the pod.
Every other tool of a pod, such as Notes and Chat, SHALL be one the pod may or may not have, and the screen shows a tab only for each tool the pod has.
Notes and Chat are tools, not forms.
For now every pod is created with Notes and Chat; a later creation screen is expected to let the user choose which of them the pod gets.

#### Scenario: Looking at the tabs of a pod

- WHEN the user looks at the screen of a pod
- THEN the pod screen offers an Info tab and a tab for each tool the pod has

#### Scenario: A pod without Chat

- WHEN a pod has no Chat tool
- THEN the pod screen shows no Chat tab and still shows Info

### Requirement: A link without a target creates a pod

Tapping a wikilink that has no target yet SHALL create a single-member pod with no tag, named after the link text, attach it to the link, connect it to the host pod, the pod where the link was typed (see [connected-pods](../connected-pods/spec.md)), and open it with a blank note.

#### Scenario: Tapping [[foo]]

- WHEN the user taps a link `[[foo]]` that has no target
- THEN a pod named "foo" with no tag appears in the list of pods and in the Connected pods list of the host pod, the link opens it from now on, and its note is blank

#### Scenario: Link to a pod the user does not have

- WHEN the user taps a link that carries the id of a pod absent from their pods
- THEN the link is shown as unresolved and the list of pods is the same as before

### Requirement: Members are people or services

An invited service SHALL count as a member.

#### Scenario: Inviting a backup service

- WHEN the user invites a backup service into a single-member pod
- THEN the pod shows two members

## Open questions

- Which tab a pod opens on (always the same one, the one used last, or depends on the pod).
- Whether the user will choose at creation which tools a pod gets (for example checkboxes for Notes and Chat), and whether such tools can be added or removed later. Today every pod gets Notes and Chat.
- Whether a member who lacks permission to create pods can create one by tapping a link without a target (see [members-and-roles](../members-and-roles/spec.md)).
