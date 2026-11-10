# create-and-name-pod

- Depends on: `../pod-lifecycle/spec.md`, `../pod-tags/spec.md`
- Read when: creating, renaming, tagging or receiving a pod; changing how a pod is named
- Source: `pod-ontologies/app-behavior.md` (Lazy Instantiation; Naming, Renaming, and Sharing; Joining a Pod); Figma "Mee - Tellipod App v4.0.3" (Home)

## Purpose

How the user creates a pod, names it and tags it, renames it and accepts a pod sent to them.
What the pod holds at creation is in [pod-lifecycle](../pod-lifecycle/spec.md).

## Requirements

### Requirement: Create a pod with a name and tags

The user SHALL be able to create a pod by giving it a name and, optionally, tags.
Category tags and user tags are added the same way, and a second category tag replaces the first (see [pod-tags](../pod-tags/spec.md)).
The new pod opens with no form, whatever its tags.

#### Scenario: Creating a pod for vehicle details

- WHEN the user names a pod "Paula's Car" and adds the category tag Vehicle and the user tag "Paula"
- THEN the pod "Paula's Car" opens with both tags shown, each in its own style, and with no form

### Requirement: Create a pod without tags

The user SHALL be able to create a pod with a name and no tag.
It opens empty. The user can tag it later and can add any form to it with Add Tool.

#### Scenario: Creating a pod with no tag

- WHEN the user names a pod "Notes" and adds no tag
- THEN the pod opens with no tag and no form

#### Scenario: Adding a form to a pod with no tag

- WHEN the user taps Add Tool in a pod that has no tag
- THEN every form type is offered and the chosen form is added

### Requirement: A pod has an original name and an alias

A pod SHALL have an original name and MAY have an alias.
The original name belongs to the pod: every member sees it, it is what an invitee sees on the invitation, and it is the same for everyone.
The alias belongs to one member: it is the name that member gave the pod for their own organization, and no other member sees it.
The app SHALL show a pod in the list under its alias when the user has set one, and under its original name otherwise.

#### Scenario: Organizer with several identical trips

- WHEN Paula, who runs trips to Japan, names two pods "Trip to Tokyo" and gives them the aliases "Trip to Tokyo (Bob and Alice, 12 March)" and "Trip to Tokyo (Carol, 3 April)"
- THEN her list shows the two aliases
- AND each client sees only "Trip to Tokyo"

#### Scenario: No alias

- WHEN the user has set no alias for a pod
- THEN the pod is shown under its original name

### Requirement: Only the pod's owner changes the original name

The pod's owner SHALL be able to change the original name, and a change SHALL show to every member, including those who have an alias (they keep seeing the alias in their list).
A member who is not an owner SHALL NOT be offered a change of the original name.
Any member SHALL be able to set, change or clear their own alias, and doing so SHALL NOT affect other members.
Clearing the alias returns the pod to its original name in that member's list.

#### Scenario: Owner renames the pod

- WHEN Paula, the pod's owner, changes the original name from "Trip to Tokyo" to "Tokyo, April"
- THEN every member sees "Tokyo, April" as the original name
- AND a member with the alias "Tokyo with Carol" keeps seeing that alias in their list

#### Scenario: Member sets an alias

- WHEN Bob, a member who is not an owner, sets the alias "Japan 2027" for the pod
- THEN Bob's list shows "Japan 2027"
- AND no other member's view changes

#### Scenario: Member cannot change the original name

- WHEN Bob, a member who is not an owner, opens the actions for the pod
- THEN the change of the original name is not offered, and setting an alias is

### Requirement: The invitee names the pod on acceptance

The invitation screen SHALL show the pod's original name and a field for the name the user wants to give the pod.
The user MAY type an alias or leave the field empty.
When the field is empty, the pod SHALL be shown under its original name, and a later change of the original name SHALL show to this user.
When the user typed an alias, the pod SHALL be shown under it, and a later change of the original name SHALL NOT replace it.

#### Scenario: Accepting with an alias

- WHEN Bob accepts the invitation to "Trip to Tokyo" and types "Japan 2027" in the name field
- THEN the pod is in his list as "Japan 2027"

#### Scenario: Accepting with an empty name field

- WHEN Bob accepts the invitation to "Trip to Tokyo" and leaves the name field empty
- THEN the pod is in his list as "Trip to Tokyo"
- AND when the owner changes the original name to "Tokyo, April", Bob's list shows "Tokyo, April"

### Requirement: Renaming leaves the tags

A pod SHALL keep its tags when its original name or alias changes.

#### Scenario: Renamed pod

- WHEN the user renames a pod tagged Pets to "Vehicle"
- THEN the pod stays tagged Pets

### Requirement: A pod is received by accepting its invitation

A pod the user is invited into SHALL appear in the list of pods only when the user accepts the invitation, carrying the tags chosen and the name given on the invitation screen (see [pod-tags](../pod-tags/spec.md)).

#### Scenario: Accepted invitation

- WHEN the user accepts the invitation to "Ginger Medical" with the category tag Pets Medical selected
- THEN the pod is in the list with the tag Pets Medical

#### Scenario: Declined invitation

- WHEN the user declines the invitation to "Ginger Medical"
- THEN the pod is not in the list

## Open questions

- What to do with duplicate names. The previous rule adds a number to the end when two pods in an account share a name. A duplicate can arise on the inviter's side, on the invitee's side, or on both, and a name can be unique on one side and not on the other. It is not decided whether the number applies to the original name or the alias, which side checks for a duplicate, whether the number is stored or only shown, and what the user sees when the name changes on the other side and now collides.
