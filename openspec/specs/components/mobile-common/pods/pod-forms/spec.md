# pod-forms

- Depends on: `../pod-access/spec.md`, `../../../ui-kit/components/spec.md`
- Realizes: [pod-tools-and-forms](../../../../behaviour/pod-tools-and-forms/spec.md)
- Read when: rendering forms from shapes or changing the Add Tool request
- Source: `pod-ontologies/app-behavior.md`, UI Implementation and Adding a Tool

## Purpose

How the app builds forms from SHACL shapes and submits a new tool.

## Requirements

### Requirement: Forms are generated from shapes

The app SHALL build each form from the SHACL shape for its content, with one field per property constraint.
The input type SHALL come from the constraint's datatype, class or node kind.

#### Scenario: New shape shipped

- WHEN a shape is added to the data model
- THEN its form renders without new screen code

### Requirement: Cardinality drives required and repeat

A field SHALL be required when its minimum count is above zero and repeatable when its maximum count allows more than one.
Save SHALL be enabled when every required field has a value.

#### Scenario: Required field empty

- WHEN a required field has no value
- THEN the save action is disabled

### Requirement: Value lists

A field with a fixed list SHALL render a closed dropdown from that list.
A field with an open vocabulary SHALL list the ontology's individuals of that range, display their label and store their IRI.
A dependent dropdown SHALL filter its values by the current value of the field it depends on.

#### Scenario: Make and model

- WHEN the make field changes
- THEN the model dropdown is refiltered and a model no longer valid is cleared

### Requirement: Add Tool request

Add Tool SHALL submit the tool kind, for a Form the chosen template, and the user's name for the tool as its topic.
The request SHALL carry a newly generated identifier.

#### Scenario: Adding a form

- WHEN the dialog is confirmed with the Vehicle form type
- THEN the request holds kind Form, template Vehicle and a new identifier
