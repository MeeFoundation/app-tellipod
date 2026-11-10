# find-a-pod

- Depends on: `../create-and-name-pod/spec.md`, `../pod-tags/spec.md`
- Related: `../connected-pods/spec.md` (what a non-member sees on a pod link)
- Read when: changing search, the results, or any link or card that opens a pod
- Source: Figma "Mee - Tellipod App v4.0.3", section "Search or Ask"; `pod-ontologies/app-behavior.md` (Finding Pods by Tag and by Property)

## Purpose

How the user gets into a pod they already have: from Home, from search, from a link in a note, and from an invitation they accept.

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

### Requirement: Search finds pods by name and by tag

Search SHALL match the text against the names of the user's pods and against the user's own tags on them, category tags and user tags alike.
Results SHALL be a flat list of pods, with the matching text highlighted.
A pod result shows the pod's name and its tags, a category tag and a user tag in their own styles.
Another member's tags on a shared pod SHALL NOT match.

#### Scenario: Searching for "step"

- WHEN the user types "step"
- THEN "Step sister" is listed with "Step" highlighted, beside its tags

#### Scenario: Searching by a user tag

- WHEN the user searches for "Ginger" and three pods carry the user tag "Ginger"
- THEN all three pods are listed

#### Scenario: Another member's tag

- WHEN the user searches for "Cat", a tag only another member put on a shared pod
- THEN that pod is not listed for the tag

### Requirement: A category tag also finds narrower ones

A search that matches a category tag SHALL also list the pods carrying a narrower category tag, at any depth.
It SHALL NOT list pods carrying only a broader category tag.

#### Scenario: Searching by a broader category

- WHEN the user searches for the category tag State and has pods tagged Birth Certificate and Drivers License
- THEN both pods are listed, though neither carries the tag State

#### Scenario: Searching by a narrower category

- WHEN the user searches for the category tag Birth Certificate and has a pod tagged State
- THEN that pod is not listed

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
What a non-member sees, for a connected pod link and for a plain pod link, is in [connected-pods](../connected-pods/spec.md).
A link whose pod no longer exists SHALL be marked unresolved and leave the screen as it is.

#### Scenario: Renamed target

- WHEN the user taps a link whose pod has been renamed since the link was written
- THEN the pod opens under its current name

#### Scenario: Link to a deleted pod

- WHEN the user taps a link whose pod no longer exists
- THEN the link is marked unresolved and the note stays on screen

### Requirement: An invitation opens the invitation screen

Following an invitation link SHALL open the app, or install it first, and show the invitation screen for the pod, with information about the pod, suggested tags, and Accept and Decline (see [pod-tags](../pod-tags/spec.md)).
Accept SHALL add the pod to the list of pods and open it.
Onboarding is skipped for the invitee (see [launch-and-unlock](../launch-and-unlock/spec.md)).

#### Scenario: Following an invitation

- WHEN the recipient follows the invitation to "Ginger Medical"
- THEN the invitation screen opens, and "Ginger Medical" is not yet in the list of pods

#### Scenario: Accepting the invitation

- WHEN the recipient taps Accept
- THEN "Ginger Medical" appears in the list of pods and its screen opens

## Open questions

- How the user says a search is by tag and not by name, and how several tags combine in one search.
- Whether Home or search groups results under headers for broader categories, and whether the mobile app has saved tag searches (persistent views).
- Whether the user is told how a link is marked as unresolved.
