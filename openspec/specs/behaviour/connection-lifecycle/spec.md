# connection-lifecycle

- Depends on: `../connected-pods/spec.md`, `../members-and-roles/spec.md`, `../pod-lifecycle/spec.md`
- Read when: changing when a connection ends, who may disconnect, the Connected to list, or the dialog shown before someone leaves, is removed or is demoted
- Source: product decisions of the team

## Purpose

How a connection ends, and who may end it (words are defined in [connected-pods](../connected-pods/spec.md)).

The idea: owners control connections.
Connecting needs the owner of the connected pod, because it makes the name of that pod visible to the host.
Either side can end it: the owner of the host pod (it is their pod's list) and the owner of the connected pod (it is their pod being shown).
A connection stays only while an owner of the connected pod is still in the host pod, so nobody remains connected through a person who has gone or lost the right to.
Whoever's action would end a connection by itself is told before they confirm.

## Requirements

### Requirement: A connection lasts while the host has an owner of the connected pod

A connection SHALL last as long as at least one member of the host pod is an owner of the connected pod.
The connection ends by itself when no such member is left, which happens when the last such person:

- leaves or is removed from the host pod;
- leaves or is removed from the connected pod;
- is demoted from owner in the connected pod.

The connection also ends when either pod is deleted for all members.
It SHALL NOT end while another member of the host pod is still an owner of the connected pod.
Deleting a pod from this device ends no connection.
A connection that has ended SHALL NOT come back when the person rejoins the host pod or is made an owner again: Connect pod is used again.
Ending a connection SHALL NOT remove anyone from either pod, and SHALL NOT delete either pod or any form or file in them.

#### Scenario: The one who connected leaves, another owner stays

- WHEN Alice and Lee are owners of "Sofia's Passport" and members of "About Sofia", and Alice leaves "About Sofia"
- THEN "Sofia's Passport" is still in the Connected pods list of "About Sofia"

#### Scenario: The last owner of the connected pod leaves the host

- WHEN Alice is the only member of "About Sofia" who owns "Sofia's Passport" and she leaves "About Sofia"
- THEN "Sofia's Passport" is no longer in its Connected pods list
- AND Alice and Bob are still members of "Sofia's Passport"

#### Scenario: The owner who is in the host is demoted

- WHEN Alice is the only member of "About Sofia" who owns "Sofia's Passport", and Paula, another owner of "Sofia's Passport" who is not in "About Sofia", demotes Alice in "Sofia's Passport"
- THEN "Sofia's Passport" is no longer in the Connected pods list of "About Sofia"

#### Scenario: A pod is deleted for all members

- WHEN the owner of "Sofia's Passport" deletes it for all members
- THEN "Sofia's Passport" is no longer in the Connected pods list of "About Sofia", and the links to it are unresolved

#### Scenario: Delete from this device

- WHEN Alice deletes "About Sofia" from her device
- THEN "Sofia's Passport" stays in the Connected pods list of "About Sofia" for the other members

### Requirement: Disconnecting a pod

The owner of the host pod and the owner of the connected pod SHALL be offered Disconnect.
Every other member SHALL NOT be offered it.
The owner of the host pod uses it on the entry in the Connected pods list.
The owner of the connected pod uses it in the Connected to list of that pod, and also on the entry if they are a member of the host pod.
Disconnect SHALL ask for confirmation.
A link to the pod stays in the note as a plain pod link (see [connected-pods](../connected-pods/spec.md)).

#### Scenario: The host pod's owner disconnects

- WHEN Paula, an owner of "About Sofia", chooses Disconnect on "Sofia's Passport" and confirms
- THEN "Sofia's Passport" is no longer in the list

#### Scenario: The connected pod's owner disconnects

- WHEN Lee, an owner of "Sofia's Passport", chooses Disconnect on "About Sofia" in the Connected to list and confirms
- THEN "Sofia's Passport" is no longer in the Connected pods list of "About Sofia"

#### Scenario: A member who owns neither

- WHEN Carol, a member of "About Sofia" who does not own "Sofia's Passport", opens the entry's actions
- THEN Disconnect is absent

### Requirement: The owner of a connected pod sees where it is connected

The Info screen of a pod SHALL show to its owners a Connected to row with the number of host pods and a list of them, each with Disconnect.
Members who are not owners SHALL NOT see the row.
A host pod is shown by its original name, or by the user's own name for it when they are a member.
An owner of the pod who is not a member of the host sees the original name too: names are shown by design.

#### Scenario: Owner opens Connected to

- WHEN Lee, an owner of "Sofia's Passport", opens its Info
- THEN a Connected to row shows 1 and opens a list with "About Sofia"

#### Scenario: Member opens Info

- WHEN Bob, a member who is not an owner of "Sofia's Passport", opens its Info
- THEN the Info has no Connected to row

### Requirement: Confirmations list the connections that will end

Before the user confirms an action after which connections end by themselves, the confirmation SHALL list the pods that will be disconnected, as well as asking "are you sure".
The actions are: leaving a pod, an owner removing a member from a pod, an owner demoting an owner (another owner, or themselves), and deleting a pod for all members.
The list SHALL hold only the connections that actually end, none of the ones that stay because another owner is still there.
When no connection ends, the confirmation SHALL carry no list, only the question.
The owner who removes or demotes someone SHALL see the list about the person affected.
Deleting a pod for all members SHALL list every pod connected to it and every pod it is connected to.
The names in the list follow the same rule as the Connected to list.

#### Scenario: Leaving a host pod

- WHEN Alice, the only member of "About Sofia" who owns "Sofia's Passport", chooses Leave
- THEN the confirmation lists "Sofia's Passport" as a pod that will be disconnected from "About Sofia"

#### Scenario: Another owner is still there

- WHEN Lee, another owner of "Sofia's Passport", is also a member of "About Sofia" and Alice chooses Leave there
- THEN the confirmation asks only "are you sure"

#### Scenario: Leaving a connected pod

- WHEN Alice is the only member of "About Sofia" who owns "Sofia's Passport" and she chooses Leave in "Sofia's Passport"
- THEN the confirmation lists "About Sofia" as a pod from which it will be disconnected

#### Scenario: An owner removes a member

- WHEN Paula, an owner of "About Sofia", removes Alice, who is the only one there to own "Sofia's Passport"
- THEN the confirmation lists "Sofia's Passport" as disconnected

#### Scenario: An owner demotes an owner

- WHEN Paula, an owner of "Sofia's Passport", demotes Alice, the only owner of it in "About Sofia"
- THEN the confirmation lists "About Sofia" as a pod from which "Sofia's Passport" will be disconnected

#### Scenario: Deleting for all members

- WHEN the owner of "Sofia's Passport" chooses Delete pod for all members, and "Sofia's Passport" is connected to "About Sofia"
- THEN the confirmation lists "About Sofia" as a pod from which it will be disconnected

#### Scenario: Nothing to disconnect

- WHEN Bob, who owns no connected pod, chooses Leave in "About Sofia"
- THEN the confirmation asks only "are you sure"

## Open questions

- Whether a member who disconnects or whose connection ends is told, and whether the host pod's owner is notified when a connection disappears.
- How the confirmation's list stays true when the data is out of sync, for example when another owner acts at the same moment or the device is offline; whether the list may say "possibly". The app provisionally marks the list as preliminary and disables Leave, Remove member, Demote and Delete pod for all members while offline (see [pod-connections](../../components/mobile-common/pods/pod-connections/spec.md)); this needs a decision here.
- Whether Delete from this device should stop the user being a member of the pod (it ends no connection now; see also [members-and-roles](../members-and-roles/spec.md)), and what a link to such a pod shows on that device.
