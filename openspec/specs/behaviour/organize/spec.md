# organize

- Depends on: `../pod-lifecycle/spec.md`, `../../components/mobile-common/pods/pod-chat/spec.md`, `../../components/mobile-common/pods/note-editor/spec.md`
- Read when: building or changing the Organize action
- Source: `pod-ontologies/app-behavior.md` (Organize, Auto File, Divide and Conquer, Tidy)

## Purpose

What the Organize action does to a selected pod. How the suggestions are produced is open; this spec states what the user is shown and what changes.

## Requirements

### Requirement: Organize offers three actions

Selecting a pod and tapping Organize SHALL offer Auto File, Divide and Conquer and Tidy.

#### Scenario: Opening Organize

- WHEN the user selects a pod and taps Organize
- THEN the three actions are listed

### Requirement: Auto File needs consent

Auto File SHALL apply only to a Custom pod, which has no category, and SHALL NOT be offered for a pod that has one.
It SHALL suggest a category and place, and SHALL move the pod only after the user accepts.

#### Scenario: A note about a cat

- WHEN the user runs Auto File on a Custom pod whose note is about caring for a cat
- THEN the app suggests filing it under Pods > Pets and moves it only if the user accepts

### Requirement: Divide and Conquer leaves a link

Divide and Conquer SHALL move a chunk of the note out and leave a link where it was.
A chunk that fits a new categorized pod SHALL become that pod, filed by its category, and the link SHALL be a pod link.
A chunk structured enough to stay SHALL become a form tool in the same pod, and the link SHALL be a block link.

#### Scenario: Credit card details in a note

- WHEN the note holds a card's name, number and expiry and the user runs Divide and Conquer
- THEN the chunk is replaced by a link "Paula's Credit Card" that opens a Banking & Payments pod whose form holds the parsed fields

#### Scenario: Follow-up question

- WHEN the new pod is created
- THEN the app may ask for missing facts, such as the issuing bank, and offer a better name, which the user may decline

### Requirement: Tidy turns a message into a form

Tidy SHALL turn a chat message that carries structured information into a form tool in the same pod.

#### Scenario: A plumber's contact details

- WHEN the user runs Tidy on a reply holding a plumber's name, phone number and email
- THEN the pod gains a form with those values in separate fields

## Open questions

- What the user sees while a suggestion is being produced, and how a declined suggestion is shown.
- Whether the chat message stays after Tidy turns it into a form.
- What the link shows if the pod or form it points to is later deleted.
