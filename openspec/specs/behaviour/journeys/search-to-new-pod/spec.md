# journey: search-to-new-pod

- Depends on: `../../find-a-pod/spec.md`, `../../create-and-name-pod/spec.md`, `../../pod-lifecycle/spec.md`, `../../note/spec.md`
- Read when: changing search, "Make a ... Pod", or how links create pods
- Source: Figma "Mee - Tellipod App v4.0.3", section "Search or Ask"; `pod-ontologies/app-behavior.md`

## Purpose

Paula looks for something that does not exist yet, creates it from the search, and links to it from another pod.
The journey checks that the name typed in search is the name of the pod, and that a link reaches it later.

Covers: find-a-pod, create-and-name-pod, pod-lifecycle, note.

## Requirements

### Requirement: Search leads to a new pod

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula has pods but none matching "coffee".

#### Scenario: From no matches to a pod

- WHEN Paula taps the search field on Home and types "coffee"
- THEN the screen shows "No matches for coffee" and "Make a coffee Pod"
- WHEN Paula chooses "Make a coffee Pod" and creates the pod
- THEN the pod "coffee" opens
- WHEN Paula returns to Home and searches "coffee"
- THEN "coffee" is listed under Pods with the match highlighted
- WHEN Paula taps the result
- THEN the pod "coffee" opens

### Requirement: A link reaches the pod, and a new link creates one

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula has the pod "coffee" and a pod "Shopping" with an empty note.

#### Scenario: Linking from a note

- WHEN Paula types `[[` in "Shopping" and picks "coffee"
- THEN a link to "coffee" is in the note
- WHEN Paula renames "coffee" to "Espresso" and taps the link in "Shopping"
- THEN the pod "Espresso" opens
- WHEN Paula types `[[beans]]` in "Shopping" and taps it
- THEN a pod "beans" with no tag appears in the list of pods and opens with a blank note
