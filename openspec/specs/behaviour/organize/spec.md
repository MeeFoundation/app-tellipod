# organize

- Depends on: `../pod-lifecycle/spec.md`, `../pod-tags/spec.md`, `../chat/spec.md`, `../note/spec.md`
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

Auto File SHALL be offered for any pod, whether or not it already has tags.
It SHALL suggest one or more tags for the pod, and SHALL change the pod's tags only when the user accepts.
Accepting SHALL work as if the user had edited the tags by hand (see [pod-tags](../pod-tags/spec.md)): a suggested category tag is added to the pod's category tags, and the tags the pod already has stay unless the user removes them.

#### Scenario: A note about a cat

- WHEN the user runs Auto File on a pod with no tag whose note is about caring for a cat
- THEN the app suggests the category tag Pets
- AND the pod carries Pets when the user accepts

#### Scenario: Pod that already has a tag

- WHEN the user opens Organize on a pod that already has the category tag Pets
- THEN Auto File is in the list

#### Scenario: Accepting a second category tag

- WHEN Auto File suggests the category tag Medical for a pod that carries the category tag Pets and the user accepts
- THEN the pod carries both Pets and Medical

#### Scenario: Accepting a narrower tag beside a broader one

- WHEN Auto File suggests the category tag Pets Medical for a pod that carries only the category tag Pets and the user accepts
- THEN the pod carries both Pets and Pets Medical

### Requirement: Divide and Conquer leaves a link

Divide and Conquer SHALL move a chunk of the note out and leave a link where it was.
A chunk that fits a new pod of its own SHALL become that pod, owned by the user and carrying the category tag its content calls for, and the link SHALL be a connected pod link: the new pod is connected to the pod of the note (see [connected-pods](../connected-pods/spec.md)).
Nobody else is invited automatically, even when the pod of the note has other members: users often split a pod to make a smaller space.
The connection SHALL go through the Connect dialog, so the user chooses whether to invite everyone from the pod of the note with its checkbox (off by default).
With the checkbox off, nobody is invited and the new pod stays private to the user until an owner adds people the usual way (see [members-and-roles](../members-and-roles/spec.md)).
When nobody else is in the pod of the note, the dialog shows no checkbox.
The chunk is replaced by the link as soon as the pod is created, before the dialog opens.
Dismissing the dialog without confirming still leaves the new pod created and connected, with nobody invited, because the chunk has already left the note.
Members of the pod of the note who cannot open the new pod see the private pod screen when they tap its link.
A chunk structured enough to stay SHALL become a form tool in the same pod, and the link SHALL be an internal link.

#### Scenario: Credit card details in a note

- WHEN the note holds a card's name, number and expiry and the user runs Divide and Conquer
- THEN the chunk is replaced by a link "Paula's Credit Card" that opens a new pod tagged Banking & Payments whose form holds the parsed fields

#### Scenario: Splitting a pod with other members

- WHEN Alice runs Divide and Conquer on "Summer Vacation" (members Alice, Bob, Carol) and a pod "Trip Budget" is created
- THEN the Connect dialog opens with the checkbox "Invite everyone from Summer Vacation (2)", off
- WHEN Alice confirms with the checkbox off
- THEN "Trip Budget" has Alice as its only member and Bob and Carol receive no invitation

#### Scenario: Inviting everyone from the pod of the note

- WHEN Alice turns the checkbox on and confirms
- THEN Bob and Carol receive ordinary invitations to "Trip Budget" as members

#### Scenario: Dismissing the Connect dialog

- WHEN Alice runs Divide and Conquer on "Summer Vacation" and dismisses the Connect dialog for the new pod "Trip Budget"
- THEN "Trip Budget" exists, is connected to "Summer Vacation" with Alice as its only member, and the link stays in the note

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
- Whether the app suggests user tags too, beside category tags, when it creates a pod or runs Auto File.
- Whether the note text stays after Tidy turns it into a form.
- What the link shows if the pod or form it points to is later deleted.
