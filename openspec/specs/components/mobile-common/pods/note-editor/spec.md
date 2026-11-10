# note-editor

- Depends on: `../pod-access/spec.md`, `../../../ui-kit/components/spec.md`
- Realizes: [note](../../../../behaviour/note/spec.md)
- Read when: building or changing the editor, its persistence or its export
- Source: `pod-ontologies/app-behavior.md`, Note Area

## Purpose

How the editor persists the note, parses shortcuts and links, and exports Markdown.

## Requirements

### Requirement: Debounced continuous save

The editor SHALL write changes to the store on a short debounce and on leaving the screen or backgrounding the app.

#### Scenario: Backgrounding

- WHEN the app moves to the background with unsaved edits
- THEN the edits are flushed to the store

### Requirement: Shortcuts are editor transforms

Markdown shortcuts (`#`, `**`, `-`, `[[`) SHALL be input rules of the editor, applied as the user types.

#### Scenario: Bold

- WHEN the typed text matches `**word**`
- THEN the rule replaces it with bold text

### Requirement: Link autocomplete

Typing `[[` SHALL open an autocomplete fed by:

- the forms, attachments, tools and graphs of the open pod (internal links);
- the pods connected to the open pod (connected pod links, inserted at once);
- the pods the user owns that are not connected (a connected pod link, inserted after the Connect dialog is confirmed);
- the pods the user is a member of but does not own and that are not connected (a plain pod link, inserted at once);
- a Create pod entry holding the typed text, apart from the entries for pods with that name.

A pod link SHALL carry the identifier of its pod. Whether it is a connected pod link or a plain pod link SHALL follow the connection as it is now (see [connected-pods](../../../../behaviour/connected-pods/spec.md)).
Resolution of a link is in [pod-access](../pod-access/spec.md).

#### Scenario: Pod not yet connected

- WHEN the user picks a pod they own that is not connected
- THEN the editor requests the Connect dialog and inserts nothing until it is confirmed

#### Scenario: Pod the user only belongs to

- WHEN the user picks a pod they are a member of but do not own, and which is not connected
- THEN the editor inserts a plain pod link and requests no dialog

#### Scenario: Internal link target removed

- WHEN an internal link's target is absent from the pod
- THEN the link renders unresolved and has no navigation handler

### Requirement: Markdown export

Export SHALL serialize a resolved pod link (connected or not) as `[[id|text]]`, an unresolved one as `[[text]]` and an internal link as its text.

#### Scenario: Mixed links

- WHEN a note holds one resolved pod link and one internal link
- THEN the output holds `[[id|text]]` and the internal link's text
