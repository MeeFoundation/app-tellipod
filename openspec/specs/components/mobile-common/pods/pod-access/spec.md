# pod-access

- Depends on: `../../shell/launch-and-auth/spec.md`
- Realizes: [find-a-pod](../../../../behaviour/find-a-pod/spec.md)
- Read when: adding an entry point to a pod, or changing how a link or invitation is resolved
- Source: `pod-ontologies/app-behavior.md` (authoritative for pod behavior); Figma "Mee - Tellipod App v4.0.3"

## Purpose

How the app turns a link, a card tap or an invitation into an open pod.

## Requirements

### Requirement: One pod route

Every entry point (card, search result, note link, invitation) SHALL navigate to the same pod route, parameterized by the pod's stable identifier.

#### Scenario: Card and result

- WHEN a pod card and a search result refer to the same pod
- THEN both navigate to the same route with the same identifier

### Requirement: Link resolution by identifier

A pod link SHALL resolve by the target's identifier.
The display text SHALL be rendered from the target's current name when it resolves, and from the stored text otherwise.
A link that does not resolve SHALL render in the unresolved state and have no navigation handler.
A link without an identifier SHALL be passed to pod creation (see [pod-lifecycle](../../../../behaviour/pod-lifecycle/spec.md)).

#### Scenario: Deleted target

- WHEN the pod for an identifier is absent from the local store
- THEN the link renders unresolved and a tap on it triggers no navigation

### Requirement: Invitations are processed after sign-in

The app SHALL hand the invitation payload to the data layer, wait for the received pod to arrive, create empty parent pods its category needs, and then navigate to the pod route.
The onboarding step is bypassed (see `../../shell/launch-and-auth/spec.md`).

#### Scenario: Missing parents

- WHEN the received pod's category path has two levels the user does not have
- THEN two empty parent pods are created, the pod is filed under them and the pod route opens
