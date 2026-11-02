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

Typing `[[` SHALL open an autocomplete fed by the user's pods (pod links) and by the tools, graphs and attachments of the open pod (block links).
Resolution of a link is in [pod-access](../pod-access/spec.md).

#### Scenario: Block link target removed

- WHEN a block link's target is absent from the pod
- THEN the link renders unresolved and has no navigation handler

### Requirement: Markdown export

Export SHALL serialize a resolved pod link as `[[id|text]]`, an unresolved one as `[[text]]` and a block link as its text.

#### Scenario: Mixed links

- WHEN a note holds one resolved pod link and one block link
- THEN the output holds `[[id|text]]` and the block link's text
