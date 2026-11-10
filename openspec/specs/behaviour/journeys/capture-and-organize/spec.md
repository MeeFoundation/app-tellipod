# journey: capture-and-organize

- Depends on: `../../note/spec.md`, `../../chat/spec.md`, `../../organize/spec.md`, `../../pod-lifecycle/spec.md`, `../../pod-tags/spec.md`, `../../find-a-pod/spec.md`
- Read when: changing Organize, links created by Organize, or how a pod gets its tags
- Source: `pod-ontologies/app-behavior.md` (Organize, Auto File, Divide and Conquer, Tidy)

## Purpose

Paula dumps loose information into a note and Bogdan into a chat; Organize and Telli turn it into structured pods and forms.
The journey checks that links left by Organize open what it created, and that an untagged pod ends up tagged and found by its tag.

Covers: note, chat, organize, pod-lifecycle, pod-tags, find-a-pod.

## Requirements

### Requirement: A loose note becomes a form

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula has a pod "Notes" with no tag whose note holds her credit card's name, number and expiry.

#### Scenario: Tidy the note

- WHEN Paula selects "Notes" and taps Organize
- THEN Tidy is in the list, because the note holds structured information
- WHEN Paula runs Tidy
- THEN "Notes" gains a form with the name, number and expiry in separate fields
- WHEN Paula opens the form
- THEN she can edit each value as her own entry

### Requirement: A note chunk moves to its own pod

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula has a pod "Notes" with no tag whose note holds a paragraph about her credit card.

#### Scenario: Divide and Conquer then follow the link

- WHEN Paula selects "Notes", taps Organize and runs Divide and Conquer
- THEN the paragraph is replaced in the note by the link "Paula's Credit Card"
- WHEN Paula taps the link
- THEN a new pod tagged Banking & Payments opens, and its form holds the name, number and expiry
- WHEN Paula returns to "Notes"
- THEN the note keeps the link in the place the paragraph was

### Requirement: Telli files info from the chat

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Bogdan has the pod "About Sofia" tagged Immediate Family.

#### Scenario: Ask Telli to add info

- WHEN Bogdan opens the Chat view and sends "@Telli add the following info to this pod:" with allergies none and blood type 0+
- THEN Telli replies with a card listing Medical / Allergies None and Medical / Blood type 0+
- WHEN Bogdan taps "View all pod info"
- THEN the pod's info includes both values

### Requirement: An untagged pod gets tagged

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula has a pod "Whiskers" with no tag whose note is about caring for a cat.

#### Scenario: Accepting Auto File

- WHEN Paula opens Organize on "Whiskers" and runs Auto File
- THEN the app suggests the category tag Pets
- WHEN Paula accepts
- THEN "Whiskers" carries Pets and keeps its note
- WHEN Paula searches for "Pets"
- THEN "Whiskers" is listed, beside its tag Pets
