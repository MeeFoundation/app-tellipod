# pod-forms

- Depends on: `../pod-access/spec.md`, `../../../ui-kit/components/spec.md`
- Read when: rendering or adding a tool or form
- Source: `pod-ontologies/app-behavior.md`, UI Implementation and Adding a Tool

## Purpose

How the app shows the tools and forms in a pod, and how the user adds a new one.

## Requirements

### Requirement: Forms are generated from shapes

The app SHALL build each form from the SHACL shape for its content, not from hand-written forms per class.
It SHALL show one field per property constraint, with input type from the constraint's datatype, class or node kind.

#### Scenario: New shape shipped

- WHEN a new shape is added to the data model
- THEN a form for it appears without new screen code

### Requirement: Required and repeating fields

A field SHALL be required when its minimum count is above zero, and repeatable when its maximum count allows more than one.

#### Scenario: Required field empty

- WHEN a required field is empty
- THEN the form cannot be saved

### Requirement: Field types

A field with a fixed list of values SHALL be a closed dropdown filled from that list only.
A field with an open vocabulary SHALL list the ontology's individuals of that range, show their label, and store their IRI.
A dropdown that depends on another field SHALL show only the values valid for the other field's choice.

#### Scenario: Make and model

- WHEN the user picks a make
- THEN the model dropdown shows only that make's models

### Requirement: Add Tool

"Add Tool" SHALL be offered on every pod.
It SHALL ask which tool to add, and for a Form also which template, with Contact Info preselected.
The user's name for the tool SHALL be stored as its topic, and a new tool SHALL get a new identifier.

#### Scenario: Adding a form

- WHEN the user adds a Form tool and keeps the default
- THEN a Contact Info form is created in the pod
