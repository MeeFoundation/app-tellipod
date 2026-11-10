# journey: invite-and-collaborate

- Depends on: `../../find-a-pod/spec.md`, `../../create-and-name-pod/spec.md`, `../../pod-tags/spec.md`, `../../members-and-roles/spec.md`, `../../note/spec.md`, `../../chat/spec.md`, `../../pod-storage-and-sharing/spec.md`
- Read when: changing invitations, shared content, private files or who sees a message
- Source: `pod-ontologies/app-behavior.md` (Naming, Renaming, and Sharing; Pod Storage; Pod Contents)

## Purpose

Paula invites Sam and Lee into a pod, and the three work in it together.
The journey checks that what each member does reaches the right people and nobody else.

Covers: find-a-pod (invitation), create-and-name-pod, pod-tags, members-and-roles, note, chat, pod-storage-and-sharing.

## Requirements

### Requirement: Members join and share a pod

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula is the owner of a pod "Lake trip" with a note and no other member.

#### Scenario: Sam joins from an invitation

- WHEN Paula invites Sam and Sam follows the invitation link
- THEN the app opens for Sam without onboarding, showing the invitation to "Lake trip"
- WHEN Sam taps Accept
- THEN "Lake trip" appears in Sam's list of pods and opens
- WHEN Sam adds the line "Bring the tent" to the note
- THEN Paula sees "Bring the tent" in her copy of the note

#### Scenario: Naming changes with the third member

- WHEN Paula renames the two-member pod "Lake trip" before it has a tool
- THEN Sam keeps seeing the name he had
- WHEN Paula invites Lee, so the pod has three members
- THEN a rename by Paula shows to Sam and Lee

### Requirement: Each member tags the pod their own way

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula is the owner of "Lake trip" and has given it the user tag "Holiday".

#### Scenario: Sam joins with a tag of his own

- WHEN Sam follows the invitation to "Lake trip"
- THEN the invitation screen shows suggested tags, and not Paula's tag "Holiday"
- WHEN Sam deselects the suggestions, adds the user tag "Lake" and taps Accept
- THEN "Lake trip" is in Sam's list with "Lake" and without "Holiday"
- WHEN Sam searches for "Lake"
- THEN "Lake trip" is listed

### Requirement: Private and direct content reaches only its audience

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: "Lake trip" has the members Paula, Sam and Lee, and Paula is the only owner.

#### Scenario: A private file and a direct message

- WHEN Paula adds a receipt as a private file and links to it in the note
- THEN the receipt shows under the private divider with a lock badge on Paula's devices
- AND Sam sees the link marked unresolved
- WHEN Sam sends Paula a direct message "Can you pay the deposit?"
- THEN Paula sees it in her conversation with Sam, and Lee's chat shows the group stream alone
- WHEN Paula drags the receipt into the attachments
- THEN Sam and Lee receive the receipt, and Sam's link now opens it

### Requirement: Role limits show in the actions

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: as in the previous requirement.

#### Scenario: Owner and member actions

- WHEN Sam opens the actions for "Lake trip"
- THEN Delete pod for all members is absent from the list
- WHEN Sam opens the members of "Lake trip"
- THEN Invite and Uninvite are absent, and the actions for Paula and Lee offer no Remove member, Promote or Demote
- WHEN Paula promotes Lee to owner
- THEN Lee's actions list for "Lake trip" also offers Delete pod for all members
- AND Lee's members list offers Invite and Uninvite, and the actions for another member offer Remove member, Promote and Demote
