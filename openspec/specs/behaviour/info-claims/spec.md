# info-claims

- Depends on: `../member-info/spec.md`, `../members-and-roles/spec.md`
- Read when: changing how a member proposes info about another member, or how the member handles what others proposed
- Source: Figma "Mee - Tellipod App v4.0.3", nodes 38:2883 (Member screen with claims) and 119:9506 (claim dialog)

## Purpose

How a member of a pod proposes a value for another member's info (a claim), who sees it, and how the member it is about uses it.
A claim is always about another member's info, never one's own.
A claim never changes the member's own info by itself.

## Requirements

### Requirement: Any member can claim info about any other member

A member SHALL be able to start a claim on another member's field with its edit icon, enter a value and save it.
The claim SHALL be about the field, not a replacement of it.

#### Scenario: Claiming a different email

- WHEN Alice taps the edit icon next to Bob's Email, enters "bob.home@example.org" and saves
- THEN Bob's own Email still reads "bob.petrov@example.com"

#### Scenario: Claiming a field the member has not filled

- WHEN Alice claims the Phone "+4244235355" for Bob, who has no Phone
- THEN the claim is saved like any other

### Requirement: Claims show under the member's own info

A member's screen SHALL list, below the member's own info, the claims every other member made about that member, with one card for each author showing the author's name and relation, and each claimed field with its value.
On the member's own screen the section is titled "Info about you — added by others".
Every member of the pod SHALL see the claims on any member's screen.

#### Scenario: Others' claims on your screen

- WHEN Bob opens his own screen after Alice claimed Email "bob.home@example.org" and Phone "+4244235355"
- THEN a card "Alice, Mum" lists Email bob.home@example.org and Phone +4244235355 under Bob's own fields
- AND the section explains that only the person who added a detail can change it, and that the member can remove info that isn't right or merge it into their own

#### Scenario: Another member sees the claims

- WHEN Dave opens Bob's screen
- THEN Dave sees the card "Alice, Mum" under Bob's own fields

#### Scenario: Claims from several members

- WHEN Alice and Dave both claimed an Email for Bob
- THEN Bob's screen lists a card for Alice and a card for Dave

### Requirement: A claim that matches disappears

A claim SHALL show only for a field whose member's own value differs from it, or that the member has not filled in.
When the member's own value equals the claim, the claim SHALL no longer show.

#### Scenario: Claim equal to own info

- WHEN Bob's own Email is "bob.home@example.org" and Alice's claim for Email is "bob.home@example.org"
- THEN no claim for Email is listed

### Requirement: Only the author changes a claim

Only the member who made a claim SHALL be offered to change or delete it, on any member's screen.

#### Scenario: Author changes a claim

- WHEN Alice edits her claim for Bob's Email and saves "bob.p.home@example.org"
- THEN the card "Alice, Mum" shows "bob.p.home@example.org"

#### Scenario: Author removes a claim

- WHEN Alice deletes her claim for Bob's Phone
- THEN the claim is no longer listed on any member's screen

#### Scenario: Someone else's claim

- WHEN Dave opens Alice's claim for Bob's Email
- THEN the value is shown for reading and no change is offered

### Requirement: The member uses a claim about them

Tapping the actions of a claim on one's own screen SHALL open a sheet titled with the field and value, such as "Email: bob.home@example.org", and who shared it and when, with two actions: Copy value and Add to info I share.
Copy value SHALL put the value on the clipboard.
Add to info I share SHALL set the member's own field to the claimed value.

#### Scenario: Merging a claim

- WHEN Bob opens Alice's Email claim and taps Add to info I share
- THEN Bob's own Email reads "bob.home@example.org" and Alice's Email claim is no longer listed

#### Scenario: Copying a claim

- WHEN Bob opens Alice's Email claim and taps Copy value
- THEN "bob.home@example.org" is on the clipboard and the claim is still listed

## Open questions

- Whether the member a claim is about can dismiss it ("This isn't right, remove it" in the design). It is left out until decided: a member can delete only their own claims.
