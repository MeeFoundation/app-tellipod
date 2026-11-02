# find-a-pod

- Depends on: `../create-and-name-pod/spec.md`
- Read when: changing search, the results, or any link or card that opens a pod
- Source: Figma "Mee - Tellipod App v4.0.3", section "Search or Ask"; `pod-ontologies/app-behavior.md` (Finding Pods by Tag and by Property)

## Purpose

How the user gets into a pod they already have: from Home, from search, from a link in a note, and from an invitation.

## Requirements

### Requirement: A pod card opens its pod

Any link to a pod inside the app, usually a pod card, SHALL open that pod's screen.

#### Scenario: Tapping a pod card

- WHEN the user taps a pod card
- THEN the pod's screen opens

### Requirement: Search opens ready to type

Tapping the search field on Home SHALL open the Search screen with the field focused, the keyboard shown and a back button.

#### Scenario: Opening search

- WHEN the user taps the search field on Home
- THEN the Search screen opens with the keyboard up and the cursor in the field

### Requirement: Recent searches repeat a search

While the field is empty, the screen SHALL list the user's recent searches, and tapping one SHALL show its results.

#### Scenario: Reusing a search

- WHEN the user taps "coffee" in the recent searches
- THEN the results for "coffee" are shown

### Requirement: Results in two sections

Results SHALL be shown in two sections, Pods and Categories, with the matching text highlighted.
A pod result shows the pod's name and its category path.
A category result shows how many pods and subpods it has and expands to its subcategories.

#### Scenario: Searching for "step"

- WHEN the user types "step"
- THEN "Step sister" is listed under Pods with "Step" highlighted, beside its category path
- AND the matching categories are listed under Categories

#### Scenario: Opening a result

- WHEN the user taps a pod result
- THEN that pod opens

### Requirement: Clearing the field

The field SHALL have a clear button.

#### Scenario: Clearing

- WHEN the user taps the clear button
- THEN the field is empty and the recent searches are shown

### Requirement: No matches offers a new pod

When nothing matches, the screen SHALL say "No matches for" and the entered text, and SHALL offer to make a pod named with that text.

#### Scenario: No matches for "coffee"

- WHEN the user searches for "coffee" and nothing matches
- THEN the screen shows "No matches for coffee" and "Make a coffee Pod"

#### Scenario: Making the pod

- WHEN the user chooses "Make a coffee Pod"
- THEN pod creation starts with the name "coffee" (see [create-and-name-pod](../create-and-name-pod/spec.md))

### Requirement: A link in a note opens its pod

A pod link in a note SHALL open the pod it points to, whatever its display text says.
A link whose pod no longer exists SHALL be marked unresolved and leave the screen as it is.

#### Scenario: Renamed target

- WHEN the user taps a link whose pod has been renamed since the link was written
- THEN the pod opens under its current name

#### Scenario: Link to a deleted pod

- WHEN the user taps a link whose pod no longer exists
- THEN the link is marked unresolved and the note stays on screen

### Requirement: An invitation opens its pod

Following an invitation link SHALL open the app, or install it first, and show the received pod in the recipient's tree, filed under the empty parent pods its category needs.
Onboarding is skipped for the invitee (see [launch-and-sign-in](../launch-and-sign-in/spec.md)).

#### Scenario: Invitation to a nested pod

- WHEN the recipient has no pod for the parent branch and follows the invitation
- THEN the parent pods appear empty and the invited pod sits under them

## Open questions

- Whether the user is told how a link is marked as unresolved.
