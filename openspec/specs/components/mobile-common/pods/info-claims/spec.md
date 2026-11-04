# info-claims

- Depends on: `../pod-permissions/spec.md`, `../../../ui-kit/components/spec.md`
- Realizes: [member-info](../../../../behaviour/member-info/spec.md), [info-claims](../../../../behaviour/info-claims/spec.md)
- Read when: building the member screen, a claim list, or the claim sheet
- Source: Figma "Mee - Tellipod App v4.0.3", nodes 38:2883 and 119:9506
- Scope: the node stores claims, propagates them and enforces who may change one. The app renders what it receives and submits the user's actions.

## Purpose

How the app builds a member's screen from the member's own info and the claims other members made about them, and what it submits for each action.
Member info and claims are not forms: they do not come from SHACL shapes and are separate from the pod's tools (see [pod-forms](../pod-forms/spec.md)).

## Requirements

### Requirement: The screen is two sources

The member screen SHALL render the member's own info and, from the claim entries about that member, the claims of every other member, grouped by author.
The layout SHALL be the same on every member's screen.
The claim section SHALL render only claims whose value differs from the member's own value for the same field or whose field the member has not filled in, and SHALL render nothing when none remain.

#### Scenario: Claim equals own value

- WHEN a claim's value equals the member's own value for its field
- THEN the claim is left out of the grouped list and an emptied group is not rendered

### Requirement: The edit icon is claim or change

The edit icon on a field SHALL submit a change of the member's own info when the editing member is the member whose info it is, and SHALL submit a new claim carrying the subject member, the field and the value otherwise.
A claim whose subject is the editing member SHALL NOT be submitted.
Both requests SHALL carry a newly generated identifier.

#### Scenario: Member edits another member's info

- WHEN Alice saves a value from the edit icon on Bob's Email
- THEN the request is a claim for subject Bob, field Email, with a new identifier, and Bob's own info is not touched

### Requirement: Claim actions follow the policy

The actions on a claim SHALL come from [pod-permissions](../pod-permissions/spec.md): Edit and Delete for its author; Copy value and Add to info I share for its subject.
The claim sheet SHALL list only the actions the policy returns.

#### Scenario: Subject opens a claim

- WHEN the subject opens a claim
- THEN the sheet lists Copy value and Add to info I share

### Requirement: Merge and delete requests

Add to info I share SHALL submit a change of the member's own info for the field with the claim's value, then drop the claim from the list once the info holds that value.
Delete on a claim SHALL submit the removal of the claim by its author.
Copy value SHALL write the value to the clipboard and submit nothing.

#### Scenario: Merge

- WHEN the subject confirms Add to info I share on an Email claim
- THEN a change to the subject's Email is submitted, and the claim leaves the list when the info shows the new value

#### Scenario: Node rejects

- WHEN the node rejects a claim action
- THEN the app shows the node's result and refreshes the screen from the node's current state
