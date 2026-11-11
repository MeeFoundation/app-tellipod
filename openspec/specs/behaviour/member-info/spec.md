# member-info

- Depends on: `../pod-tools-and-forms/spec.md`, `../members-and-roles/spec.md`
- Read when: changing the member screen, or where a member's info form is shown
- Source: Figma "Mee - Tellipod App v4.0.3", node 38:2883 (Member screen)

## Purpose

Where a member's info is shown in a pod.
Member info is an ordinary form of the pod, kept in a separate place on the member's screen for convenience.
Its fields come from the form's shape in the ontology; this spec does not list them.
Its rules for who adds, edits and deletes it are those of every form (see [pod-tools-and-forms](../pod-tools-and-forms/spec.md)).

## Requirements

### Requirement: A member's screen shows their info form

Opening a member of a pod SHALL show that member's info form under a heading that counts its filled fields and says who can see them.
Every member's screen SHALL have the same layout.
The info belongs to the pod: the same person can have different member info in different pods.

#### Scenario: Opening your own screen

- WHEN Bob opens his own entry in the pod "About Sofia"
- THEN the screen is titled "Bob (You)" with the pod name under it
- AND his info form for this pod is shown under a heading with the number of filled fields and "Everyone in About Sofia can see these."

#### Scenario: Opening another member's screen

- WHEN Alice opens Bob's entry in "About Sofia"
- THEN Bob's info form is shown with the same values, for reading

#### Scenario: Different pods

- WHEN Bob has an info form in "About Sofia" and a different one in "Coffee Club"
- THEN each pod shows its own

### Requirement: The info form follows the rules of forms

The member the info is about is the form's owner.
The member and the pod's owner SHALL be offered Edit and Delete for it; every other member sees it for reading.

#### Scenario: Member changes their info

- WHEN Bob edits his info form and saves
- THEN every member of the pod sees the new values

#### Scenario: Another member cannot change it

- WHEN Alice, a member who is not an owner of the pod, opens Bob's info form
- THEN no Edit or Delete is offered to her

#### Scenario: The pod's owner changes it

- WHEN Paula, the pod's owner, opens Bob's info form
- THEN Edit and Delete are offered to her

## Open questions

- Whether a new member's info form is prefilled from the data of the identity they joined with. Not now.
- Which shape the member info form uses, and whether it can differ between pods.
