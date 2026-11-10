# pod-connections

- Depends on: `../pod-permissions/spec.md`, `../pod-access/spec.md`
- Realizes: [connected-pods](../../../../behaviour/connected-pods/spec.md), [connection-lifecycle](../../../../behaviour/connection-lifecycle/spec.md)
- Read when: building the Connect dialog, the Connected pods and Connected to rows and lists, Disconnect, or the connection list in a confirmation
- Source: product decisions of the team
- Scope: the node stores connections and decides when one ends (see [connection-lifecycle](../../../../behaviour/connection-lifecycle/spec.md)). The app shows what the node returns and sends the user's actions. It does not compute which connections end.

## Purpose

How the app shows connections and sends the actions that create or end them.

## Requirements

### Requirement: Connections come from the node

The app SHALL read the Connected pods list, the Connected to list and the number shown in each Info row from the node, and SHALL NOT keep a list of its own.
Each entry SHALL carry the pod identifier, the original name and the avatar, so that a pod the user is not a member of can be shown without being held on the device.
The name for a member SHALL be the user's alias when there is one (see [pod-naming-and-tags](../pod-naming-and-tags/spec.md)).

#### Scenario: Pod the device does not hold

- WHEN a Connected pods entry points at a pod the user is not a member of
- THEN the entry shows the original name and the avatar from the node, with no tags

### Requirement: The Connect dialog

The Connect dialog SHALL be one component for both entry points, Info and the note, and SHALL return confirmed or cancelled to its caller.
The caller SHALL be the Connect pod action in Info or the note editor (see [note-editor](../note-editor/spec.md)).
The dialog SHALL show the visibility notice, and the checkbox with the count only when the count is above zero.
The count and the people to invite SHALL come from the node, computed at the moment the dialog opens and again on confirm.
On confirm the dialog SHALL send the connection, with the invitation request when the checkbox is on, as one request.

#### Scenario: Count of zero

- WHEN the node returns no people to invite
- THEN the dialog shows no checkbox

#### Scenario: Members change while the dialog is open

- WHEN a person joins the host pod after the dialog opened and the checkbox is on
- THEN the invitation is computed on confirm and may include that person

### Requirement: Actions follow the policy

The Connect pod, Disconnect and Connected to actions SHALL come from the one action policy (see [pod-permissions](../pod-permissions/spec.md)).
A screen SHALL NOT check ownership of either pod itself.

#### Scenario: Member without ownership

- WHEN the policy omits Disconnect for an entry
- THEN the entry's actions have no Disconnect

### Requirement: Confirmation with the connections that end

For Leave, Remove member, Demote and Delete pod for all members, the app SHALL ask the node which connections the action would end, show the answer in the confirmation and send the action only after the user confirms.
Provisional, until the open question in [connection-lifecycle](../../../../behaviour/connection-lifecycle/spec.md) is decided. The list SHALL be marked as preliminary, because another owner may act in the meantime; the node's result when the action runs decides.
When the node cannot be reached, the app SHALL NOT offer these four actions and SHALL say that the user is offline.
When the node returns no connection, the confirmation SHALL carry no list.

#### Scenario: Offline

- WHEN the device is offline and the user opens the actions of a pod
- THEN Leave, Remove member, Demote and Delete pod for all members are disabled, with a note that they need a connection

#### Scenario: The list is preliminary

- WHEN the confirmation shows "Sofia's Passport" and another owner of it joins "About Sofia" before the user confirms
- THEN the action runs and the node's result decides whether the connection ends

### Requirement: Opening from an entry

A tap on an entry or on a connected pod link SHALL use the pod route (see [pod-access](../pod-access/spec.md)); the app SHALL NOT decide membership itself.

#### Scenario: Entry of a pod the user is not in

- WHEN the user taps an entry of a pod they are not a member of
- THEN the route opens the screen for non-members
