# note-editor

- Depends on: `../pod-access/spec.md`, `../../../ui-kit/components/spec.md`
- Read when: building or changing the note
- Source: `pod-ontologies/app-behavior.md`, Note Area

## Purpose

What the app shows and lets the user do in the note area of a pod.

## Requirements

### Requirement: One note per pod

Each pod SHALL show exactly one note, which every member can read and edit (see `../pod-permissions/spec.md`).

#### Scenario: Opening a pod

- WHEN a user opens a pod
- THEN the pod's single note is shown

### Requirement: Autosave

The note SHALL save continuously; there is no save action.

#### Scenario: Closing the note

- WHEN the user leaves the note
- THEN their edits are already saved

### Requirement: Formatting

The note SHALL support headings, bold, italic, strikethrough, inline code, code blocks, blockquotes, bulleted, numbered, nested and checklist items, tables and URLs.
Markdown shortcuts (`#`, `**`, `-`, `[[`) SHALL work while typing.

#### Scenario: Typing a shortcut

- WHEN the user types `**` around a word
- THEN the word becomes bold

### Requirement: Editing tools

The note SHALL offer find and replace, and undo and redo.

#### Scenario: Undo

- WHEN the user taps undo
- THEN the last edit is reverted

### Requirement: Links in the note

Typing `[[` SHALL autocomplete pod links from the user's pods and block links to a tool, graph or attachment in the same pod.
Resolution rules are in `../pod-access/spec.md`.

#### Scenario: Block link to a removed tool

- WHEN a block link points to a removed tool
- THEN it shows as unresolved and is not redirected

### Requirement: Export

The note SHALL be exportable as Markdown: resolved pod links as `[[id|text]]`, unresolved ones as `[[text]]`, block links as plain text.

#### Scenario: Export

- WHEN the user exports a note with one resolved pod link
- THEN the Markdown contains `[[id|text]]` for it
