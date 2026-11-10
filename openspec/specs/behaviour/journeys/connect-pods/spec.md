# journey: connect-pods

- Depends on: `../../connected-pods/spec.md`, `../../connection-lifecycle/spec.md`, `../../find-a-pod/spec.md`, `../../note/spec.md`, `../../pod-lifecycle/spec.md`, `../../organize/spec.md`
- Read when: changing how pods are connected, who is invited with them, or what ends a connection
- Source: product decisions of the team (see [connected-pods](../../connected-pods/spec.md))

## Purpose

Alice connects a pod she owns to a pod she shares with others, and then leaves the shared pod.
The journey checks that what a connection shows and ends matches what each person is told and can open.

Covers: connected-pods, connection-lifecycle, find-a-pod (a link in a note), note, pod-lifecycle (a pod created from a link).

## Requirements

### Requirement: A pod is connected, opened and disconnected

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: "About Sofia" has the members Alice, Bob, Carol and the service BackupBot, and Paula, its owner, is also a member; Dave is not yet a member.
Alice owns "Sofia's Passport", where Bob is the only other member.

#### Scenario: Alice connects the pod and invites the others

- WHEN Alice types `[[Sofia's Pa` in the note of "About Sofia" and picks "Sofia's Passport"
- THEN the Connect dialog says the name will be visible to everyone in "About Sofia" and offers "Invite everyone from About Sofia (2)"
- WHEN Alice turns the checkbox on and confirms
- THEN the note holds a connected pod link, and the Info of "About Sofia" shows Connected pods 1
- AND Carol and Paula receive an invitation to "Sofia's Passport", and Bob and BackupBot receive none

#### Scenario: Members open the connected pod

- WHEN Bob taps "Sofia's Passport" in the Connected pods list
- THEN the pod opens
- WHEN Dave joins "About Sofia", without an invitation to "Sofia's Passport", and taps its link in the note
- THEN a screen says he is not a member of "Sofia's Passport" and can ask a member to invite him

#### Scenario: Alice leaves the shared pod

- WHEN Alice chooses Leave in "About Sofia"
- THEN the confirmation lists "Sofia's Passport" as a pod that will be disconnected
- WHEN she confirms
- THEN "Sofia's Passport" is no longer in the Connected pods list of "About Sofia"
- AND Alice and Bob are still members of "Sofia's Passport" and the link in the note stays as text

### Requirement: A second owner keeps the connection

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: "About Sofia" has the members Alice, Bob, Carol, Lee and the service BackupBot, and Paula is its owner. Alice owns "Sofia's Passport", where Bob and Lee are members and Alice has promoted Lee to owner. "Sofia's Passport" is connected to "About Sofia".

#### Scenario: Alice leaves, Lee stays

- WHEN Alice chooses Leave in "About Sofia"
- THEN the confirmation asks only "are you sure"
- WHEN she confirms
- THEN "Sofia's Passport" is still in the Connected pods list of "About Sofia"
- WHEN Lee opens the Info of "Sofia's Passport"
- THEN a Connected to row shows "About Sofia"
- WHEN Lee chooses Disconnect there and confirms
- THEN "Sofia's Passport" is no longer in the Connected pods list of "About Sofia"

### Requirement: A pod made from the note is connected

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Carol is a member of "About Sofia", and no pod is named "Visa".

#### Scenario: Carol creates a pod from a link

- WHEN Carol types `[[Visa]]` in the note of "About Sofia" and taps it
- THEN a pod "Visa" owned by Carol opens
- AND "About Sofia" shows Connected pods 1 with "Visa"
- WHEN Bob, a member of "About Sofia", taps "Visa" in the Connected pods list
- THEN a screen says he is not a member of "Visa" and can ask a member to invite him
- WHEN Carol leaves "About Sofia"
- THEN the confirmation lists "Visa" as a pod that will be disconnected
