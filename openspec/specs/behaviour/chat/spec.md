# chat

- Depends on: `../find-a-pod/spec.md`
- Read when: changing what the user sees or does in a pod's chat
- Source: `pod-ontologies/app-behavior.md`, Chat Area; Figma "Mee - Tellipod App v4.0.3", node 117:4898 (Cell - Chat - 4)

## Purpose

What the user sees and does in the chat of a pod.
Who may see a message is in [pod-storage-and-sharing](../pod-storage-and-sharing/spec.md).

## Requirements

### Requirement: The group stream shows the pod's messages

The chat SHALL show the group stream: the messages the pod has received.
Chat is an optional tool of a pod (see [pod-lifecycle](../pod-lifecycle/spec.md)); for now every pod has it.

#### Scenario: Opening chat

- WHEN the user opens the Chat view of a pod that has 3 group messages
- THEN those 3 messages are listed

### Requirement: Send to the group

The user SHALL be able to write a message and send it to the group stream.

#### Scenario: Sending a message

- WHEN the user writes "See you at 6" and sends it
- THEN the message appears in the group stream

### Requirement: Mention a member

While writing, the user SHALL be able to @-mention a member of the pod.
A message with a mention appears in the group stream.

#### Scenario: Mentioning

- WHEN the user types `@` and picks Sam
- THEN the mention of Sam is inserted in the message
- AND sending it shows the message in the group stream

### Requirement: Direct messages

The user SHALL be able to start a direct conversation with another member of the pod.
Direct conversations SHALL be shown apart from the group stream.

#### Scenario: Starting a direct message

- WHEN the user chooses Sam and starts a direct conversation
- THEN a conversation with Sam alone opens, apart from the group stream

### Requirement: Telli adds info on request

A message that tags @Telli and lists information SHALL get a reply from Telli that names the pod and shows what was added as a card: each row has the field group and name, the value and an edit button, and the card ends with "View all pod info".
Telli's next message SHALL ask whether to add more info or to list info templates to add from.

#### Scenario: Adding info about Sofia

- WHEN Bogdan sends "@Telli add the following info to this pod:" with allergies none, mobile phone +103824434 and blood type 0+ in the pod "About Sofia"
- THEN Telli replies "I have added the following info to About Sofia pod" with the rows Medical / Allergies None, Contact / Mobile phone and Medical / Blood type 0+

#### Scenario: Correcting a row

- WHEN Bogdan taps the edit button on the Mobile phone row
- THEN the row opens for editing

#### Scenario: Opening all info

- WHEN Bogdan taps "View all pod info"
- THEN the pod's info is shown

#### Scenario: Follow-up offer

- WHEN Telli has shown the added rows
- THEN Telli's next message offers to add more info or to show a list of info templates

## Open questions

- What opens when the user taps the edit button or "View all pod info" (screen or sheet).
- What Telli replies when the message lists nothing it can add.
