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

### Requirement: Any member adds a form, its owner and the pod's owner change it

Any member of the pod SHALL be able to add a form with Add Tool and becomes the form's owner.
The form's owner and the pod's owner SHALL edit and delete it.
Every other member SHALL see the form for reading.
A form that Tidy adds at a member's request SHALL belong to that member.
Ownership SHALL NOT pass to another member when that member edits the form.
Members may add forms with the same name for the same subject, such as two Medications forms for Ginger.

#### Scenario: Member adds a form

- WHEN Sam, a member who is not the pod's owner, adds a Contact Info form about Sophia
- THEN the form is listed in the pod for every member and Sam can edit it

#### Scenario: Another member reads a form

- WHEN Dave, a member who is not an owner, opens the form Sam created
- THEN the values are shown for reading

#### Scenario: The pod's owner edits a form

- WHEN Paula, the pod's owner, changes a value in the form Sam created
- THEN the form shows the new value to every member
- AND Sam is still the owner of the form and can still edit it

#### Scenario: Tidy adds a form

- WHEN Sam asks Tidy to add a Contact Info form
- THEN Sam is the owner of the form

#### Scenario: Owner of the form edits it

- WHEN Sam opens his form and changes a value
- THEN the form shows the new value to every member

### Requirement: A form shows when it was changed by someone other than its owner

A form SHALL remember who changed it last.
When the last change was made by a member who is not the form's owner, every member who opens the form SHALL see that it was changed by that member.
The mark SHALL stay until the form's owner changes it again.

#### Scenario: Changed by the pod's owner

- WHEN Paula, the pod's owner, changes a value in the form Sam created
- THEN every member opening the form sees that it was changed by Paula

#### Scenario: Owner changes it back

- WHEN Sam changes the form again after Paula's change
- THEN the form no longer shows a change by someone else

## Open questions

- How a change by someone other than the owner is shown in detail (which value changed, and when), and whether the owner can acknowledge it or undo it.
- What happens when a member adds a value that another author's form for the same subject already has, such as the same medication. Proposed: the app offers to confirm the existing entry instead of adding a duplicate, leaving the other author's entry untouched; the member can still add it as a separate entry.
- Whether a member may make a statement about a form, or only about personal info (see [info-statements](../info-statements/spec.md)).
