# journey: claim-member-info

- Depends on: `../../member-info/spec.md`, `../../info-claims/spec.md`, `../../members-and-roles/spec.md`
- Read when: changing how a member proposes info about another member and how that member answers
- Source: Figma "Mee - Tellipod App v4.0.3", nodes 38:2883 and 119:9506

## Purpose

Alice knows Bob's other email and phone and proposes them. Bob merges the email, and Alice later withdraws the phone.
The journey checks that a claim stays beside the member's own info until it matches it or its author deletes it.

Covers: member-info, info-claims, members-and-roles.

## Requirements

### Requirement: A claim is made, seen and answered

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: "About Sofia" has the members Bob, Alice and Dave; Bob's own Email is "bob.petrov@example.com" and he has no Phone.

#### Scenario: Alice claims, Bob merges, Alice withdraws

- WHEN Alice opens Bob's screen and claims Email "bob.home@example.org" and Phone "+4244235355"
- THEN Bob's own fields are unchanged on Alice's screen
- WHEN Dave opens Bob's screen
- THEN Dave sees a card "Alice, Mum" under Bob's fields with both claims
- WHEN Bob opens his own screen
- THEN the same card is listed under "Info about you — added by others"
- WHEN Bob opens the Email claim and taps Add to info I share
- THEN Bob's Email reads "bob.home@example.org" and the Email claim is gone
- WHEN Alice deletes her Phone claim
- THEN the card "Alice, Mum" is no longer listed on any screen, and Bob's info has no Phone

### Requirement: The author keeps control of a claim

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Alice has claimed Email "bob.home@example.org" for Bob, who has not answered it.

#### Scenario: Alice corrects her claim

- WHEN Alice edits her claim and saves "bob.p.home@example.org"
- THEN Bob's screen shows "bob.p.home@example.org" in the card "Alice, Mum"
- WHEN Dave opens the claim
- THEN the value is shown for reading and no change is offered
