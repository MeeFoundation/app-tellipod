# note

- Depends on: `../find-a-pod/spec.md`
- Related: `../connected-pods/spec.md` (what `[[` offers and does with a pod)
- Read when: changing what the user can do in a pod's note
- Source: `pod-ontologies/app-behavior.md`, Note Area

## Purpose

What the user sees and does in the note of a pod: writing, formatting, linking, undoing and exporting.

## Requirements

### Requirement: One note per pod

Each pod that has the Notes tool SHALL show one note that every member can read and edit.
Notes is an optional tool of a pod (see [pod-lifecycle](../pod-lifecycle/spec.md)); for now every pod has it.

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

A link in the note is either an internal link or a connected pod link (words in [connected-pods](../connected-pods/spec.md)).
Typing `[[` SHALL suggest, as the user types:

- things of the same pod: forms, attachments, tools and graphs, which become internal links;
- the pods already connected to this pod, which become connected pod links at once, for every member;
- the pods the user owns that are not connected yet, which open the Connect dialog and become connected pod links after the user confirms;
- the pods the user is a member of but does not own and that are not connected, which become plain pod links at once and connect nothing;
- "Create pod" with the typed text as its name, which creates a pod owned by the user and then opens the Connect dialog for it (see [connected-pods](../connected-pods/spec.md)).

A link typed by hand and not picked from the suggestions creates nothing and is shown as unresolved.

Deleting a connected pod link from the note leaves the connection in place.

#### Scenario: Linking to a connected pod

- WHEN Carol, a member of "About Sofia", types `[[Sofia's` and picks "Sofia's Passport", which is connected
- THEN a connected pod link to "Sofia's Passport" is inserted

#### Scenario: Linking to a pod the user owns

- WHEN the user, who owns "Paula's Car" that is not connected, types `[[Pa` and picks it
- THEN the Connect dialog opens

#### Scenario: Linking to a pod the user only belongs to

- WHEN Carol, a member but not an owner of "Visa", types `[[Vi` in the note of "About Sofia" and picks "Visa", which is not connected
- THEN a plain pod link to "Visa" is inserted, no dialog opens and "Visa" is not connected

#### Scenario: Confirming the connection

- WHEN the user confirms the Connect dialog for "Paula's Car"
- THEN a link to "Paula's Car" is inserted

#### Scenario: Linking to a form

- WHEN the user types `[[Vis` and picks the form "Visa"
- THEN an internal link to the form is inserted

#### Scenario: Offering to create a pod

- WHEN the user types `[[beans`
- THEN the suggestions end with Create pod "beans"

#### Scenario: Picking Create pod

- WHEN the user picks Create pod "beans"
- THEN a pod "beans" owned by the user is created and the Connect dialog opens
- AND after the user confirms, a connected pod link to it is inserted; if the user cancels, a plain pod link is inserted and the pod stays unconnected

#### Scenario: Internal link to a removed tool

- WHEN the user taps an internal link whose tool was removed
- THEN the link is marked unresolved and the note stays on screen

### Requirement: Export

The user SHALL be able to export the note as Markdown: a resolved pod link as `[[id|text]]`, an unresolved one as `[[text]]`, an internal link as plain text.

#### Scenario: Exporting a note

- WHEN the user exports a note with one resolved pod link
- THEN the Markdown holds `[[id|text]]` for that link

## Open questions

- Whether a pod can hold several notes. The product requirements say one note per pod and allow several.
