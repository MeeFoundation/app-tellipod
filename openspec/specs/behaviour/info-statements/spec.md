# info-statements

- Depends on: `../member-info/spec.md`, `../members-and-roles/spec.md`
- Read when: changing how a member proposes info about another member, or how the member handles what others proposed
- Source: Figma "Mee - Tellipod App v4.0.3", nodes 38:2883 (Member screen with statements) and 119:9506 (statement dialog)

## Purpose

How a member of a pod proposes a value for another member's info (a statement), who sees it, and how the member it is about uses it.
A statement is always about another member's info, never one's own.
A statement never changes the member's own info by itself.

## Requirements

### Requirement: Any member can make a statement about any other member

A member SHALL be able to make a statement about another member's field with its edit icon, enter a value and save it.
The statement SHALL be about the field, not a replacement of it.

#### Scenario: Stating a different email

- WHEN Alice taps the edit icon next to Bob's Email, enters "bob.home@example.org" and saves
- THEN Bob's own Email still reads "bob.petrov@example.com"

#### Scenario: Statement about an unfilled field

- WHEN Alice states Phone "+4244235355" for Bob, who has no Phone
- THEN the statement is saved like any other

### Requirement: Statements show under the member's own info

A member's screen SHALL list, below the member's own info, the statements every other member made about that member, with one card for each author showing the author's name, and each stated field with its value.
On the member's own screen the section is titled "Info about you — added by others".
Every member of the pod SHALL see the statements on any member's screen.

#### Scenario: Others' statements on your screen

- WHEN Bob opens his own screen after Alice stated Email "bob.home@example.org" and Phone "+4244235355"
- THEN a card "Alice" lists Email bob.home@example.org and Phone +4244235355 under Bob's own fields
- AND the section explains that only the person who added a detail can change it, and that the member can remove info that isn't right or merge it into their own

#### Scenario: Another member sees the statements

- WHEN Dave opens Bob's screen
- THEN Dave sees the card "Alice" under Bob's own fields

#### Scenario: Statements from several members

- WHEN Alice and Dave both made a statement about Bob's Email
- THEN Bob's screen lists a card for Alice and a card for Dave

### Requirement: A statement that matches disappears

A statement SHALL show only for a field whose member's own value differs from it, or that the member has not filled in.
When the member's own value equals the statement, the statement SHALL no longer show.

#### Scenario: Statement equal to own info

- WHEN Bob's own Email is "bob.home@example.org" and Alice's statement for Email is "bob.home@example.org"
- THEN no statement for Email is listed

### Requirement: Only the author changes a statement

Only the member who made a statement SHALL be offered to change or delete it, on any member's screen.

#### Scenario: Author changes a statement

- WHEN Alice edits her statement for Bob's Email and saves "bob.p.home@example.org"
- THEN the card "Alice" shows "bob.p.home@example.org"

#### Scenario: Author removes a statement

- WHEN Alice deletes her statement for Bob's Phone
- THEN the statement is no longer listed on any member's screen

#### Scenario: Someone else's statement

- WHEN Dave opens Alice's statement for Bob's Email
- THEN the value is shown for reading and no change is offered

### Requirement: The member uses a statement about them

Tapping the actions of a statement on one's own screen SHALL open a sheet titled with the field and value, such as "Email: bob.home@example.org", and who shared it and when, with two actions: Copy value and Add to info I share.
Copy value SHALL put the value on the clipboard.
Add to info I share SHALL set the member's own field to the stated value.

#### Scenario: Merging a statement

- WHEN Bob opens Alice's Email statement and taps Add to info I share
- THEN Bob's own Email reads "bob.home@example.org" and Alice's Email statement is no longer listed

#### Scenario: Copying a statement

- WHEN Bob opens Alice's Email statement and taps Copy value
- THEN "bob.home@example.org" is on the clipboard and the statement is still listed

## Open questions

- Whether the member a statement is about can dismiss it ("This isn't right, remove it" in the design). It is left out until decided: a member can delete only their own statements.
- Whether a member may make a statement about a form, or only about another member's personal info. Only personal info is covered here. The product requirements do not separate member info from forms.
- Whether anyone besides the author may delete a statement. The product requirements are not settled; now only the author.
- How the pod handles information about its members in general. To be understood first, then the special cases.
