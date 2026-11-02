# organize

- Depends on: `../pod-lifecycle/spec.md`, `../chat/spec.md`, `../note/spec.md`
- Read when: building or changing the Organize action
- Source: `pod-ontologies/app-behavior.md` (Organize, Auto File, Divide and Conquer, Tidy)

## Purpose

What the Organize action does to a selected pod. How the suggestions are produced is open; this spec states what the user is shown and what changes.

## Requirements

### Requirement: Organize offers its actions

Selecting a pod and tapping Organize SHALL offer Auto File, Divide and Conquer and, when the note holds text to turn into a form, Tidy.

#### Scenario: Opening Organize

- WHEN the user selects a pod and taps Organize
- THEN Auto File, Divide and Conquer and Tidy are listed

### Requirement: Auto File needs consent

Auto File SHALL be offered for a Custom pod, which has no category.
It SHALL suggest a category and place, and SHALL move the pod when the user accepts.

#### Scenario: A note about a cat

- WHEN the user runs Auto File on a Custom pod whose note is about caring for a cat
- THEN the app suggests filing it under Pods > Pets
- AND the pod moves there when the user accepts

#### Scenario: Pod with a category

- WHEN the user opens Organize on a pod that has a category
- THEN Auto File is absent from the list and Divide and Conquer and Tidy remain

### Requirement: Divide and Conquer leaves a link

Divide and Conquer SHALL move a chunk of the note out and leave a link where it was.
A chunk that fits a new categorized pod SHALL become that pod, filed by its category, and the link SHALL be a pod link.
A chunk structured enough to stay SHALL become a form tool in the same pod, and the link SHALL be a block link.

#### Scenario: Credit card details in a note

- WHEN the note holds a card's name, number and expiry and the user runs Divide and Conquer
- THEN the chunk is replaced by a link "Paula's Credit Card" that opens a Banking & Payments pod whose form holds the parsed fields

#### Scenario: Follow-up question

- WHEN the new pod is created
- THEN the app asks for missing facts, such as the issuing bank, and offers a better name
- AND the user can skip both

### Requirement: Tidy turns note text into a form

Tidy SHALL be offered when text in the note carries structured information, and SHALL turn that text into a form tool in the same pod.
Tidy SHALL be absent from the list when the note holds nothing to turn into a form.

#### Scenario: Card details in the note

- WHEN the note holds a card's name, number and expiry and the user runs Tidy
- THEN the pod gains a form with those values in separate fields

#### Scenario: Note without structured information

- WHEN the user opens Organize on a pod whose note holds no structured information
- THEN the list shows Auto File and Divide and Conquer only

## Open questions

- What the user sees while a suggestion is being produced, and how a declined suggestion is shown.
- Whether the note text stays after Tidy turns it into a form.
- What the link shows if the pod or form it points to is later deleted.
