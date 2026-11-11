# pod-tools-and-forms

- Depends on: `../pod-lifecycle/spec.md`, `../pod-tags/spec.md`
- Read when: changing Add Tool, or what the user sees and fills in on a form
- Source: `pod-ontologies/app-behavior.md` (UI Implementation, Adding a Tool)

## Purpose

How the user adds a tool to a pod and fills in a form.

## Requirements

### Requirement: Add Tool

Every pod SHALL offer Add Tool.
The dialog asks which tool to add, and for a Form also which form type, and what the tool is about.

#### Scenario: Adding a form by hand

- WHEN the user taps Add Tool, picks the Vehicle form type and names the subject "Sophia's car"
- THEN the pod gains a Vehicle form about Sophia's car

### Requirement: Forms that fit the pod's tags come first

The Add Tool dialog SHALL list first the form types that fit the pod's tags, and then every other form type.
Every form type stays available, whatever the tags are.

#### Scenario: A pod tagged Vehicle

- WHEN the user taps Add Tool in a pod tagged with the category tag Vehicle
- THEN Vehicle is first in the list of form types, followed by the others

#### Scenario: A pod with several category tags

- WHEN the user taps Add Tool in a pod tagged with the category tags Vehicle and Pets
- THEN the form types that fit Vehicle or Pets come first, followed by the others

#### Scenario: A pod with no tag

- WHEN the user taps Add Tool in a pod with no tag
- THEN every form type is listed in the usual order

### Requirement: Required fields guide the user

A required field SHALL be marked as required, and the form SHALL save once every required field has a value.

#### Scenario: Filling the last required field

- WHEN the user fills in the last empty required field of a form
- THEN the form can be saved

### Requirement: Repeating fields add values

A field that allows several values SHALL let the user add another value.

#### Scenario: Two values

- WHEN the user adds a second value to a field that allows several values
- THEN both values are listed in the form

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
A form SHALL stay in the pod when its owner leaves; from then on only the pod's owner edits and deletes it.
A member who disagrees with another member's form cannot change it, and may add a form of their own beside it.
Members may add forms with the same name for the same subject, such as two Vehicle forms for Sophia's car.

#### Scenario: Member adds a form

- WHEN Sam, a member who is not the pod's owner, adds a Vehicle form about Sophia's car
- THEN the form is listed in the pod for every member and Sam can edit it

#### Scenario: Another member reads a form

- WHEN Dave, a member who is not an owner, opens the form Sam created
- THEN the values are shown for reading

#### Scenario: The pod's owner edits a form

- WHEN Paula, the pod's owner, changes a value in the form Sam created
- THEN the form shows the new value to every member
- AND Sam is still the owner of the form and can still edit it

#### Scenario: Tidy adds a form

- WHEN Sam asks Tidy to add a Vehicle form
- THEN Sam is the owner of the form

#### Scenario: Form's owner leaves

- WHEN Sam leaves the pod
- THEN the form Sam created is still listed for every member
- AND only Paula, the pod's owner, can edit or delete it

#### Scenario: Owner of the form edits it

- WHEN Sam opens his form and changes a value
- THEN the form shows the new value to every member

## Open questions

- What happens when a member adds a value that another author's form for the same subject already has, such as the same value in a field. Proposed: the app offers to confirm the existing entry instead of adding a duplicate, leaving the other author's entry untouched; the member can still add it as a separate entry.
- What a form shows as its author after the author has left the pod.
- How Add Tool orders the form types when a pod has several category tags: by the order the tags were added, or with no guaranteed order between the groups.
