# pod-chat

- Depends on: `../pod-access/spec.md`, `../../../ui-kit/components/spec.md`
- Realizes: [chat](../../../../behaviour/chat/spec.md)
- Read when: building or changing the chat screen and its data flow
- Source: `pod-ontologies/app-behavior.md`, Chat Area
- Scope: the app renders the messages it receives and sends the user's messages. Who may see a message is decided by the node.

## Purpose

How the chat screen gets, renders and sends messages.

## Requirements

### Requirement: Streams are keyed by pod and conversation

The app SHALL read messages by pod identifier and conversation: the group stream, or a direct conversation with one member.
The screen SHALL render only the messages of the selected key.

#### Scenario: Two pods

- WHEN the chat of pod A is open and pod B receives a message
- THEN the list of pod A is unchanged

### Requirement: Send targets a stream

A send SHALL carry the pod identifier, the conversation key and the text; the message SHALL render in the stream when the app accepts it for sending.

#### Scenario: Group send

- WHEN the user sends in the group stream
- THEN the request targets the group key and the message renders in that list

### Requirement: Mentions are structured

The composer SHALL insert a mention as a reference to the member's identifier and render it with the member's name.
A message with a mention SHALL keep the group key.

#### Scenario: Mention

- WHEN the user picks a member after `@`
- THEN the composer holds a mention reference and the send keeps the group key

### Requirement: Direct conversations are separate lists

Direct conversations SHALL be listed apart from the group stream and open as their own conversation key.

#### Scenario: Open a direct conversation

- WHEN the user chooses a member
- THEN the screen switches to the key of that member's conversation

### Requirement: Telli's info card is a structured message part

A message from Telli MAY carry a card part: rows of field group, field name and value with an edit action, and a button that opens the pod's info.
The chat SHALL render the text and the card part together as one message.

#### Scenario: Reply with a card

- WHEN a received message holds text and a card part with three rows
- THEN the message renders its text above a card of three rows and the button

## Open questions

- The wire format of the card part, which the node or the data layer defines.
