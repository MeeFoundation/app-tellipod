# pod-search

- Depends on: `../pod-naming-and-filing/spec.md`
- Realizes: [find-a-pod](../../../../behaviour/find-a-pod/spec.md)
- Read when: building or changing the search screen and its query flow
- Source: Figma "Mee - Tellipod App v4.0.3", section "Search or Ask"; `pod-ontologies/app-behavior.md`, Finding Pods by Tag and by Property
- Scope: what a query matches and which tags are hidden is decided by the data layer. The app sends the text and renders what comes back.

## Purpose

How the search screen moves between its states and talks to the data layer.

## Screen states

empty (recent searches) → results | no matches

## Requirements

### Requirement: State follows the input text

The screen SHALL be in the empty state when the text is empty, and otherwise in the results or no-matches state according to the response for the current text.

#### Scenario: Typing then clearing

- WHEN the text changes from "step" to empty
- THEN the state returns to empty and recent searches render

### Requirement: Latest query wins

The screen SHALL render only the response for the current text; a response for earlier text is discarded.

#### Scenario: Out-of-order responses

- WHEN the response for "ste" arrives after the response for "step"
- THEN the screen keeps showing the results for "step"

### Requirement: Result rendering

The screen SHALL render the Pods and Categories sections from the response, highlight the matched range given in it, and render a category's counts and expandable subcategories.

#### Scenario: Highlight

- WHEN a response gives the match range 0–4 for "Step sister"
- THEN "Step" renders highlighted

### Requirement: Recent searches are recorded on use

The app SHALL record a query as recent when the user opens one of its results or taps a recent search.

#### Scenario: Tapping a result

- WHEN the user opens a result for "coffee"
- THEN "coffee" is in the recent searches on the next visit

### Requirement: No-matches action creates a pod

The no-matches state SHALL render "No matches for" plus the text and an action that starts pod creation with that text as the name.

#### Scenario: Make a pod

- WHEN the user chooses "Make a coffee Pod"
- THEN pod creation starts with the name "coffee"

## Open questions

- Where recent searches are stored and how many are kept.
