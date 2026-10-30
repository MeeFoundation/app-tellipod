# pod-access

- Depends on: `../../shell/launch-and-auth/spec.md`
- Read when: adding an entry point to a pod, or a link that opens one
- Source: `pod-ontologies/app-behavior.md` (authoritative for pod behavior); Figma "Mee - Tellipod App v4.0.3"

## Purpose

How a user gets into a pod from within the app and from outside it.

## Requirements

### Requirement: Open a pod from a link in the app

Any link to a pod inside the app, usually a pod card, SHALL open that pod's screen.

#### Scenario: Tapping a pod card

- WHEN the user taps a link to a pod, such as a pod card
- THEN the pod screen opens

### Requirement: Open a pod from search

Search by tag or property SHALL return a flat list of links to pods, and tapping one opens the pod.

#### Scenario: Searching

- WHEN the user searches and taps a result
- THEN the pod opens

### Requirement: Pod links resolve by identifier

A link to a pod in a note SHALL resolve by the target pod's stable identifier, not by its display text.
A link that cannot be resolved SHALL be shown as unresolved and be inert.

#### Scenario: Link to a deleted pod

- WHEN the user taps a link whose pod no longer exists
- THEN it is shown as unresolved and nothing opens

#### Scenario: Link without an identifier

- WHEN the user taps a link that has no identifier
- THEN a new single-member pod is created at the root of the tree

### Requirement: Open a pod from an invitation

Following an invitation link SHALL install or open the app and file the received pod in the recipient's tree, creating empty parent pods if needed.
Onboarding is skipped (see `../../shell/launch-and-auth/spec.md`).

#### Scenario: Invitation to a nested pod

- WHEN the recipient has no pod for the parent branch
- THEN empty parent pods are created and the invited pod is filed under them
