# pod-access

- Depends on: `../../shell/launch-and-unlock/spec.md`
- Realizes: [find-a-pod](../../../../behaviour/find-a-pod/spec.md), [connected-pods](../../../../behaviour/connected-pods/spec.md) (opening)
- Read when: adding an entry point to a pod, or changing how a link or invitation is resolved
- Source: `pod-ontologies/app-behavior.md` (authoritative for pod behavior); Figma "Mee - Tellipod App v4.0.3"

## Purpose

How the app turns a link, a card tap or an accepted invitation into an open pod.

## Requirements

### Requirement: One pod route

Every entry point (card, search result, note link, accepted invitation) SHALL navigate to the same pod route, parameterized by the pod's stable identifier.

#### Scenario: Card and result

- WHEN a pod card and a search result refer to the same pod
- THEN both navigate to the same route with the same identifier

### Requirement: Link resolution by identifier

A pod link SHALL resolve by the target's identifier.
The display text SHALL be rendered from the target's current name when it resolves, and from the stored text otherwise.
A link that does not resolve SHALL render in the unresolved state and have no navigation handler.
A pod link SHALL resolve when the user is a member of the pod, or when the pod is connected to the pod that holds the link.
The name of a connected pod the user is not a member of SHALL come from the connection, so the app knows the pod without holding it.
A connected pod link whose pod the user is not a member of SHALL navigate to the screen for non-members; a plain pod link to a pod the user is not a member of SHALL render unresolved (see [connected-pods](../../../../behaviour/connected-pods/spec.md)).
A link without an identifier SHALL be passed to pod creation (see [pod-lifecycle](../../../../behaviour/pod-lifecycle/spec.md)).

#### Scenario: Deleted target

- WHEN the pod for an identifier is absent from the local store and is not connected to the pod that holds the link
- THEN the link renders unresolved and a tap on it triggers no navigation

#### Scenario: Connected pod, user not a member

- WHEN a connected pod link points at a connected pod that the user is not a member of
- THEN a tap navigates to the screen for non-members

#### Scenario: Plain pod link, user not a member

- WHEN a plain pod link points at a pod the user is not a member of
- THEN the link renders unresolved and a tap triggers no navigation

### Requirement: Invitations are processed once an identity is active

The app SHALL hand the invitation payload to the data layer, open the invitation screen for the pod identifier the payload holds, and request suggested tags for it (see [pod-tag-suggestions](../pod-tag-suggestions/spec.md)).
The app SHALL NOT add the pod to the list of pods before the user taps Accept.
Accept SHALL submit the acceptance with the chosen tags and the alias typed in the name field (none when the field is empty), wait for the pod to arrive, and then navigate to the pod route.
Decline SHALL discard the invitation and SHALL NOT add a pod.
The onboarding step is bypassed (see `../../shell/launch-and-unlock/spec.md`).

#### Scenario: Invitation followed

- WHEN an invitation payload is handed to the data layer
- THEN the invitation screen opens and no pod is added to the list

#### Scenario: Accept

- WHEN the user taps Accept on the invitation screen
- THEN the acceptance is submitted with the chosen tags and the alias, and when the pod has arrived the pod route opens

#### Scenario: Decline

- WHEN the user taps Decline
- THEN the invitation is discarded and the list of pods is unchanged
