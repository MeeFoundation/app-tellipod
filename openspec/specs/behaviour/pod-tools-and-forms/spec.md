# pod-tools-and-forms

- Depends on: `../pod-lifecycle/spec.md`
- Read when: changing Add Tool, or what the user sees and fills in on a form
- Source: `pod-ontologies/app-behavior.md` (UI Implementation, Adding a Tool)

## Purpose

How the user adds a tool to a pod and fills in a form.

## Requirements

### Requirement: Add Tool

Every pod SHALL offer Add Tool.
The dialog asks which tool to add, and for a Form also which form type, with Contact Info preselected, and what the tool is about.

#### Scenario: Adding a form by hand

- WHEN the user taps Add Tool, keeps Contact Info and names the subject "Sophia"
- THEN the pod gains a Contact Info form about Sophia

### Requirement: Required fields guide the user

A required field SHALL be marked as required, and the form SHALL save once every required field has a value.

#### Scenario: Filling the last required field

- WHEN the user fills in the last empty required field of a form
- THEN the form can be saved

### Requirement: Repeating fields add values

A field that allows several values SHALL let the user add another value.

#### Scenario: Two phone numbers

- WHEN the user adds a second phone number to a Contact Info form
- THEN both numbers are listed in the form

### Requirement: Dropdowns offer the valid choices

A field with a fixed list of values SHALL offer exactly that list.
A field that depends on another field SHALL offer the values valid for the other field's choice.

#### Scenario: Make and model

- WHEN the user picks a make
- THEN the model dropdown lists that make's models

### Requirement: Only owners change form entries

An owner SHALL edit and delete any form entry.
A member who is not an owner SHALL see entries for reading.

#### Scenario: Member reads an entry

- WHEN a member who is not an owner opens a form entry
- THEN the values are shown for reading

#### Scenario: Owner edits an entry

- WHEN an owner opens a form entry and changes a value
- THEN the form shows the new value
