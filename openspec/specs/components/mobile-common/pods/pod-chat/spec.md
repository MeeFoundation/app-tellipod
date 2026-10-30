# pod-chat

- Depends on: `../pod-access/spec.md`, `../../../ui-kit/components/spec.md`
- Read when: building or changing chat
- Source: `pod-ontologies/app-behavior.md`, Chat Area
- Scope: the app renders the messages it receives and sends the user's messages. Who may see a message is decided by the node, not by the app.

## Purpose

What the app shows and lets the user do in a pod's chat.

## Requirements

### Requirement: Group stream

The pod's chat SHALL show the group stream: the messages the app receives for the pod.

#### Scenario: Opening chat

- WHEN the user opens the Chat view of a pod that has received 3 group messages
- THEN those 3 messages are listed, and no message of another pod is

### Requirement: Send to the group stream

The user SHALL be able to write a message and send it to the group stream.

#### Scenario: Sending a message

- WHEN the user writes a message and sends it
- THEN it is sent to the pod's group stream and appears there

### Requirement: Mention a member

While writing, the user SHALL be able to @-mention a member of the pod.
A message with a mention stays in the group stream.

#### Scenario: Mentioning

- WHEN the user types `@` and picks a member
- THEN the mention is inserted in the message
- AND the message is sent to the group stream as usual

### Requirement: Direct messages

The user SHALL be able to start a direct conversation with another member of the pod.
Direct conversations SHALL be shown separately from the group stream.

#### Scenario: Starting a direct message

- WHEN the user chooses another member and starts a direct conversation
- THEN a conversation with only that member opens, apart from the group stream
