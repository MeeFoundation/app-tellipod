# member-info

- Depends on: `../members-and-roles/spec.md`
- Read when: changing the member screen, or what a member writes about themselves in a pod
- Source: Figma "Mee - Tellipod App v4.0.3", node 38:2883 (Member screen)

## Purpose

What a member's screen shows: the info a member shares about themselves in a pod, and who can change it.
Member info is separate from the pod's forms: it is the member's own information, not data stored in the pod by a tool.
What other members state about a member is in [info-statements](../info-statements/spec.md).

## Requirements

### Requirement: A member's screen lists the info they share

Opening a member of a pod SHALL show that member's own info as labelled fields, such as First name, Email and Address, under a heading that counts them and says who can see them.
Every member's screen SHALL have the same layout.

#### Scenario: Opening your own screen

- WHEN Bob opens his own entry in the pod "About Sofia"
- THEN the screen is titled "Bob (You)" with the pod name under it
- AND the heading reads "3 info shared in this pod" and "Everyone in About Sofia can see these."
- AND First name Bob, Email bob.petrov@example.com and Address 318 Fillmore St, Apt 4B are listed

#### Scenario: Opening another member's screen

- WHEN Alice opens Bob's entry in "About Sofia"
- THEN Bob's three fields are listed with the same values

### Requirement: Members change only their own info

A member SHALL be offered an edit icon on each of their own fields and Add personal info below them, and SHALL change the value directly.
On another member's screen the edit icon SHALL start a statement about that member instead of a change, as described in [info-statements](../info-statements/spec.md).
No member SHALL make a statement about themselves.

#### Scenario: Changing your own email

- WHEN Bob taps the edit icon next to his Email and saves "bob.p@example.com"
- THEN his Email shows "bob.p@example.com" to every member of the pod

#### Scenario: Adding personal info

- WHEN Bob taps Add personal info and enters a Phone
- THEN the Phone is listed with his other fields
