# pod-search

- Depends on: `../pod-naming-and-filing/spec.md`
- Read when: building or changing search
- Source: Figma "Mee - Tellipod App v4.0.3", section "Search or Ask"; `pod-ontologies/app-behavior.md`, Finding Pods by Tag and by Property
- Scope: what a query matches (names, tags, properties) and which tags are hidden is decided by the data layer. The app sends the text and shows what comes back.

## Purpose

The search screen of the app, from typing a query to opening a pod from the results.

## Requirements

### Requirement: Open search

Tapping the search field on Home SHALL open the Search screen with the field focused and the keyboard shown.
The screen SHALL have a back button.

#### Scenario: Opening search

- WHEN the user taps the search field on Home
- THEN the Search screen opens with the field focused

### Requirement: Recent searches

While the field is empty, the screen SHALL list the user's recent searches.
Tapping one SHALL search for it.

#### Scenario: Reusing a search

- WHEN the user taps "coffee" in the recent searches
- THEN the results for "coffee" are shown

### Requirement: Results

Results for the entered text SHALL be shown in two sections: Pods and Categories.
In each result, the matching text SHALL be highlighted.

A pod result SHALL show the pod's name and its category path, and tapping it opens the pod.
A category result SHALL show how many pods and subpods it has, and SHALL expand to show its subcategories.

#### Scenario: Searching for "step"

- WHEN the user types "step"
- THEN a pod "Step sister" is listed under Pods with "Step" highlighted and its category path
- AND matching categories are listed under Categories

#### Scenario: Opening a result

- WHEN the user taps a pod result
- THEN that pod opens

### Requirement: Clear the field

The field SHALL have a button to clear the entered text.

#### Scenario: Clearing

- WHEN the user taps the clear button
- THEN the field is empty and the recent searches are shown

### Requirement: No matches

When nothing matches, the screen SHALL say "No matches for" followed by the entered text, and SHALL offer to make a pod named with that text.

#### Scenario: No matches for "coffee"

- WHEN the user searches for "coffee" and nothing matches
- THEN the screen shows "No matches for coffee" and "Make a coffee Pod"
- AND choosing it starts creating a pod named "coffee" (see `../pod-naming-and-filing/spec.md`)
