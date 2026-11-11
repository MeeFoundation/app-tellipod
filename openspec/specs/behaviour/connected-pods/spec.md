# connected-pods

- Depends on: `../pod-lifecycle/spec.md`, `../members-and-roles/spec.md`, `../find-a-pod/spec.md`, `../note/spec.md`
- Related: `../connection-lifecycle/spec.md` (when a connection ends and who may end it; it depends on this spec)
- Read when: connecting pods, the Connected pods list, the Connect dialog, a link that opens a connected pod

## Purpose

How one pod points at other pods.
A pod can be connected to other pods, and the pods it is connected to are listed on its Info screen.
Pods stay a flat set: a connection is a reference, not nesting.
The connected pod does not belong to the pod that lists it, inherits nothing from it, and keeps its own members and owners.

Words used here:

| Word | Meaning |
| --- | --- |
| host pod | the pod that lists the connection (specs only; the app does not use the word) |
| connected pod | the pod the host points at (specs only) |
| Connected pods | the Info row and list of a host pod, shown to every member |
| Connected to | the Info row and list of a connected pod, shown to its owners (see [connection-lifecycle](../connection-lifecycle/spec.md)) |
| Connect pod | the action that starts a connection, and its Connect dialog |
| connected pod link | a link in a note to a pod that is currently connected to the pod of the note |
| plain pod link | a link in a note to a pod that is not connected to the pod of the note (not connected yet, disconnected, or imported) |
| internal link | a link in a note to something of the same pod: a form, an attachment, a tool, a graph |

The kind of a pod link follows the connection as it is now, not what was stored when the link was typed: disconnecting turns a connected pod link into a plain pod link, and connecting the pod again turns it back.

The team assumes members are honest, so the name of a pod is shown by design to everyone in the host pod, and in the text of a link to anyone who reads the note.
Owners control connections: a pod joins another only with its owner's consent, and either side's owner can end it (see [connection-lifecycle](../connection-lifecycle/spec.md)).

## Requirements

### Requirement: A member connects a pod they own

Any member of a pod SHALL be offered Connect pod, and the pods offered SHALL be only those the user owns.
The list SHALL leave out the host pod itself and pods already connected to it.
A service SHALL NOT be offered Connect pod, because a service cannot own a pod.
A pod SHALL NOT be connected to itself or twice to the same host.

#### Scenario: Alice connects her pod

- WHEN Alice, a member of "About Sofia" and the owner of "Sofia's Passport", chooses Connect pod in "About Sofia"
- THEN the list offers "Sofia's Passport"
- AND "About Sofia" is not offered

#### Scenario: Pod owned by someone else

- WHEN Bob, a member of "About Sofia" who is only a member of "Sofia's Passport", chooses Connect pod
- THEN "Sofia's Passport" is not in the list

#### Scenario: Already connected

- WHEN Alice has connected "Sofia's Passport" to "About Sofia" and chooses Connect pod again
- THEN "Sofia's Passport" is not in the list

#### Scenario: A member who owns no other pod

- WHEN Bob owns no pod besides "About Sofia" and chooses Connect pod there
- THEN the list is empty and says that only pods the user owns can be connected

### Requirement: A link and a connection are separate, and either way of connecting opens one dialog

A connected pod link in the note and an entry of the Connected pods list SHALL show the same connection, but removing one SHALL NOT remove the other.
There are two ways to connect an existing pod, and both open the Connect dialog:

- Connect pod in Info, which offers the pods the user owns in a list;
- typing `[[` in the note, which suggests the same pods as the user types (see [note](../note/spec.md)).

A pod connected from the note SHALL be inserted in the note as a connected pod link once the user confirms the dialog.
A pod connected from Info SHALL be listed and SHALL NOT be inserted in the note.
A connected pod already in the list SHALL be suggested by `[[` to every member as a connected pod link, with no dialog, because the connection already exists.
Removing a connected pod link from the note SHALL NOT disconnect the pod, as a form stays when its link is removed from the note.
Disconnecting a pod SHALL NOT remove its link from the note (see [Opening a pod from a list or a link](#requirement-opening-a-pod-from-a-list-or-a-link)).

#### Scenario: Picking a pod in the note

- WHEN Alice types `[[Sofia's Pa` in the note of "About Sofia" and picks "Sofia's Passport", which is not connected yet
- THEN the Connect dialog opens

#### Scenario: Confirming in the note

- WHEN Alice confirms the Connect dialog that she opened from the note
- THEN a connected pod link to "Sofia's Passport" is in the note
- AND "Sofia's Passport" is in the Connected pods list of "About Sofia"

#### Scenario: Cancelling the dialog

- WHEN Alice cancels the Connect dialog that she opened from the note
- THEN the note stays as it was and "Sofia's Passport" is not in the Connected pods list

#### Scenario: Linking a pod that is already connected

- WHEN Carol, a member of "About Sofia" who owns no pod, types `[[Sofia's` and picks "Sofia's Passport", already connected
- THEN a connected pod link to "Sofia's Passport" is in the note and no dialog opens

#### Scenario: Deleting the link text

- WHEN Alice deletes the connected pod link "Sofia's Passport" from the note
- THEN "Sofia's Passport" is still in the Connected pods list

### Requirement: A new pod from the note

Typing `[[` followed by text SHALL always offer to create a pod with that text as its name, as one entry in the list of suggestions, apart from the entries for pods that already have that name.
The user chooses between an existing pod and a new one.
A link written out by hand and tapped without picking an entry has no target, and creates a pod.
A pod created this way SHALL be owned by the user, connected to the pod of the note without the Connect dialog (the user has just named it, and nobody else has access to it), and opened when the link is tapped (see [pod-lifecycle](../pod-lifecycle/spec.md)).

#### Scenario: A pod created from a link

- WHEN Alice types `[[Visa]]` in the note of "About Sofia", where no pod is named "Visa", and taps the link
- THEN a pod "Visa" owned by Alice is created, connected to "About Sofia", and opens

### Requirement: The Connect dialog

Connecting a pod SHALL open a dialog, the same whether it was started from Info or from the note.
The dialog SHALL say that the name of the connected pod will be visible to everyone in the host pod and in the text of its link to anyone who reads the note, and that connecting gives no one access to it.
The dialog SHALL offer a checkbox, off by default, "Invite everyone from <host pod>" with the number of people it would invite.
When there is nobody to invite, the dialog SHALL show no checkbox.

The checkbox is a one-time, standalone action based on who is in the host pod right now. There is no dynamic membership: connecting does not tie the two pods' membership together.
It:

- invites every person who is a member of the host pod at that moment and is not yet in the connected pod; someone with a pending invitation is skipped, while someone whose earlier invitation was declined or expired is invited again;
- invites them with the role of member;
- does not invite services or the user themselves;
- does not invite people who join the host pod later, and does not remove anyone when people leave the host pod or when the pod is disconnected;
- sends an ordinary invitation, so a person becomes a member only by accepting it (see [find-a-pod](../find-a-pod/spec.md)).

#### Scenario: Connecting without invitations

- WHEN Alice picks "Sofia's Passport" and leaves the checkbox off
- THEN "About Sofia" lists "Sofia's Passport"
- AND nobody receives an invitation

#### Scenario: The count in the checkbox

- WHEN "About Sofia" has the members Alice, Bob, Carol and the service BackupBot, "Sofia's Passport" has Alice and Bob, and Alice picks it
- THEN the checkbox reads "Invite everyone from About Sofia (1)"

#### Scenario: Inviting everyone from the host pod

- WHEN Alice turns the checkbox on and confirms
- THEN Carol receives an invitation to "Sofia's Passport"
- AND Bob and BackupBot receive none

#### Scenario: A person who already has an invitation

- WHEN Carol already has an open invitation to "Sofia's Passport" and Alice connects it
- THEN the checkbox does not count Carol and Carol receives no second invitation

#### Scenario: A person whose invitation was declined or expired

- WHEN Carol's earlier invitation to "Sofia's Passport" was declined or has expired and Alice connects it with the checkbox on
- THEN the checkbox counts Carol and Carol receives a new invitation

#### Scenario: Invited as a member

- WHEN Alice connects "Sofia's Passport" with the checkbox on and Carol accepts
- THEN Carol is a member of "Sofia's Passport" with the role of member

#### Scenario: Nobody to invite

- WHEN every person in "About Sofia" is already a member of "Sofia's Passport" or has an open invitation to it
- THEN the Connect dialog shows no checkbox

#### Scenario: Later joiners are not invited

- WHEN Dave joins "About Sofia" after Alice connected "Sofia's Passport" with the checkbox on
- THEN Dave receives no invitation to "Sofia's Passport"

### Requirement: Info lists the connected pods

The Info screen of a pod SHALL show a Connected pods row with the number of connected pods, and it SHALL open the list of connected pods and Connect pod.
Every member of the host pod SHALL see the list.
Each entry SHALL show the pod's avatar and name.
A member of the connected pod sees the name under which it is in their own list; anyone else sees its original name.
An entry SHALL NOT show tags, the number of members or any content of the connected pod.

The original name reaches people who are not members of the connected pod by design: the Connect dialog tells the connecting user so.

#### Scenario: Looking at the Info screen

- WHEN Bob opens the Info of "About Sofia", which has two connected pods
- THEN the Connected pods row shows 2 and opens the list

#### Scenario: A member of the connected pod

- WHEN Bob has the alias "Passport" for "Sofia's Passport" and opens the list in "About Sofia"
- THEN the entry reads "Passport"

#### Scenario: Someone who is not a member of the connected pod

- WHEN Carol, who is not a member of "Sofia's Passport", opens the list
- THEN the entry reads "Sofia's Passport", the original name, with no tags

### Requirement: Connections are not transitive and not nested

A host pod SHALL list only the pods connected to it directly.
The members of a host pod SHALL NOT see the pods connected to its connected pods, unless they are members of that connected pod, where they see its own list like any member.
A connected pod MAY itself be a host pod, and two pods MAY be connected to each other.
Two pods connected to each other are two separate connections: each is listed in its own host pod, and each has its own owners and its own end.

#### Scenario: Not a member of the next pod in the chain

- WHEN "About Sofia" is connected to "Sofia's Passport", "Sofia's Passport" is connected to "Visa", and Carol is only in "About Sofia"
- THEN Carol sees "Sofia's Passport" in the list of "About Sofia" and not "Visa"

#### Scenario: A member of the next pod in the chain

- WHEN Bob, a member of "Sofia's Passport", opens its Info
- THEN he sees "Visa" in its list

#### Scenario: Two pods connected to each other

- WHEN "About Sofia" lists "Sofia's Passport" and "Sofia's Passport" lists "About Sofia"
- THEN Disconnect on one of them leaves the other in place

### Requirement: Opening a pod from a list or a link

Tapping a pod in the Connected pods list, a connected pod link in a note, or a plain pod link SHALL give the result in this table:

| What the user taps | The user is a member | The user is not a member |
| --- | --- | --- |
| entry of the Connected pods list | the pod opens | the private pod screen: the pod is private, it was connected by a named person, reach out to them to ask for access |
| connected pod link | the pod opens | the same screen |
| plain pod link | the pod opens | the link is marked unresolved and the note stays on screen; the app does not say whether such a pod exists |

The private pod screen SHALL name the person who connected the pod and say that the user can reach out to that person to ask for access.
That person SHALL be named only while they are still a member of the host pod and still an owner of the connected pod.
Otherwise the screen SHALL name the current owners of the connected pod who are members of the host pod, and say that the pod is connected through them; it never names someone who has left or lost ownership.
When there are more than three such owners, the screen SHALL name three of them and say how many others there are ("and 2 others").
The connection lasts only while such an owner exists, so there is always at least one person to name.
The name is visible to every member of the host pod, the same as the connected pod's name (names are shown by design).
It SHALL NOT offer a Request access action and SHALL NOT redirect to a chat: the user contacts the person any way they like, for example in the host pod, where the person is usually a member.
There are no hidden pods: the screen is shown for every connected pod the user is not a member of, and the app never says that a pod may not exist.

A plain pod link is any pod link that is not a connected pod link: one left in the note after Disconnect, one written before connections existed, or one imported from Markdown.
A plain pod link SHALL NOT connect anything.

#### Scenario: A member taps the entry

- WHEN Bob, a member of "Sofia's Passport", taps its entry in "About Sofia"
- THEN "Sofia's Passport" opens

#### Scenario: A non-member taps the entry

- WHEN Carol, who is not a member of "Sofia's Passport", taps its entry in "About Sofia"
- THEN the private pod screen says "Sofia's Passport" is private, that it was connected by Alice, and that she can reach out to Alice to ask for access

#### Scenario: A non-member taps a connected pod link

- WHEN Carol taps the connected pod link "Sofia's Passport" in the note of "About Sofia"
- THEN the same screen opens

#### Scenario: A link left after disconnecting

- WHEN "Sofia's Passport" has been disconnected from "About Sofia" and Carol, who is not in "Sofia's Passport", taps the link in the note
- THEN the link is marked unresolved and the note stays on screen

#### Scenario: A plain pod link to a pod that was never connected

- WHEN Carol taps a link in a note to a pod that is not connected and she is not a member of
- THEN the link is marked unresolved and the note stays on screen

## Open questions

Main questions:

- Request access inside the app, and a shortcut from the private pod screen to a chat with the person who connected the pod. For now the screen only names that person; the user contacts them on their own.
- Which three owners the private pod screen names when there are more than three (for example the longest-standing owners).
- Whether the checkbox becomes a rule (today it stays a one-time action): members of the host pod enter the connected pod automatically, including people who join later. If it does:
  - whether it is transitive, so that A to B and B to C gives the members of A access to C;
  - whether a member's access through the rule is marked with its source ("joined via About Sofia");
  - whether leaving the host pod revokes it. Revoking cannot take back data the member already has on their device, and forms they added stay (see [members-and-roles](../members-and-roles/spec.md)).
- What happens to a connected pod link copied into another pod: whether it stays a connected pod link of the new host, or becomes a plain pod link.
- Who becomes the owner of a pod made from `[[beans]]` when a member other than the author taps the link, and what happens when two members tap it at the same moment.
- Whether a pod made by Divide and Conquer, which the other members of the host pod cannot open, should invite them or warn the user.
- Abuse. For now the team assumes members are honest, so inviting a large host pod through the checkbox, or connecting a pod only to expose its name, is not limited.

Smaller questions:

- The order of the Connected pods list, and whether the number of connections is limited.
- Whether the user is told when `[[` inserts a plain pod link for a pod they only belong to, since people outside that pod will see the link as unresolved.
- Whether the connected pod link needs a different look from an internal link or a plain pod link.
- Whether the Connect dialog interrupts typing in the note when `[[` picks a pod, or can wait until the user leaves the line.
