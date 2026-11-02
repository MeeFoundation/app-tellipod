# note

- Depends on: `../find-a-pod/spec.md`
- Read when: changing what the user can do in a pod's note
- Source: `pod-ontologies/app-behavior.md`, Note Area

## Purpose

What the user sees and does in the note of a pod: writing, formatting, linking, undoing and exporting.

## Requirements

### Requirement: One note per pod

Each pod SHALL show one note that every member can read and edit.

#### Scenario: Opening a pod

- WHEN the user opens a pod
- THEN the pod's note is shown

### Requirement: Autosave

The note SHALL save continuously.

#### Scenario: Leaving the note

- WHEN the user leaves the note after typing
- THEN the note shows everything they typed when they return

### Requirement: Formatting

The note SHALL support headings, bold, italic, strikethrough, inline code, code blocks, blockquotes, bulleted, numbered, nested and checklist items, tables and URLs.
Markdown shortcuts (`#`, `**`, `-`, `[[`) SHALL format as the user types.

#### Scenario: Typing a shortcut

- WHEN the user types `**` around a word
- THEN the word becomes bold

### Requirement: Find, replace, undo and redo

The note SHALL offer find and replace, and undo and redo.

#### Scenario: Undo

- WHEN the user taps undo
- THEN the last edit is reverted

### Requirement: Links

Typing `[[` SHALL suggest the user's pods, and the tools, graphs and attachments of the same pod.
A suggested pod becomes a pod link; a suggested tool, graph or attachment becomes a block link.

#### Scenario: Linking to a pod

- WHEN the user types `[[Pa` and picks "Paula's Passport"
- THEN a link to that pod is inserted

#### Scenario: Block link to a removed tool

- WHEN the user taps a block link whose tool was removed
- THEN the link is marked unresolved and the note stays on screen

### Requirement: Export

The user SHALL be able to export the note as Markdown: a resolved pod link as `[[id|text]]`, an unresolved one as `[[text]]`, a block link as plain text.

#### Scenario: Exporting a note

- WHEN the user exports a note with one resolved pod link
- THEN the Markdown holds `[[id|text]]` for that link
