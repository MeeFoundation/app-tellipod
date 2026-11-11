# pod-tag-suggestions

- Depends on: `../pod-naming-and-tags/spec.md`, `../pod-access/spec.md`
- Realizes: [pod-tags](../../../../behaviour/pod-tags/spec.md), [find-a-pod](../../../../behaviour/find-a-pod/spec.md)
- Read when: building or changing the tags on the invitation screen
- Source: `pod-ontologies/app-behavior.md` (Joining a Pod)
- Scope: which tags are suggested, which are preselected and in what order is decided by the node. The app asks, shows what comes back and submits the user's choice.

## Purpose

How the app asks the node for suggested tags for an invited pod and how it presents and applies the answer on the invitation screen.

## Screen states

Tag section: loading → offered | none (the rest of the screen is always active); then accepted | declined

## Requirements

### Requirement: The invitation screen triggers a suggestion request

When the invitation screen opens, the app SHALL request suggested tags from the node, the request carrying the pod's identifier from the invitation.
The tag section SHALL show a loading indicator ("Suggested tags loading…") until the response arrives or the request fails.
Accept and Decline SHALL be enabled from the moment the screen opens and SHALL NOT depend on the request.

#### Scenario: Screen opens

- WHEN the invitation screen opens for the pod with identifier P
- THEN a suggestion request carrying P is sent, the tag section shows the loading indicator, and Accept and Decline are enabled

#### Scenario: Response arrives

- WHEN the response arrives while the screen is loading
- THEN the loading indicator is replaced by the tags

### Requirement: The response is a list of tags with a preselection flag

The app SHALL accept a response as an ordered list of tags, each with its kind (category or user) and a flag telling whether it is preselected.
It SHALL render the list in the order given, with preselected tags marked as selected.

#### Scenario: Preselected and merely suggested

- WHEN the response lists Pets Medical (category, preselected) then Pets (category, not preselected)
- THEN the screen shows Pets Medical selected, followed by Pets unselected

### Requirement: The user's choice becomes the tag set

The app SHALL let the user select and deselect any suggested tag and add any other tag, and SHALL submit the selected tags with the acceptance when the user taps Accept.
Accept with an empty selection SHALL submit an empty tag set.
Decline SHALL submit no acceptance and no tag.
The selection MAY hold several category tags (see [pod-naming-and-tags](../pod-naming-and-tags/spec.md)).

#### Scenario: Accept as suggested

- WHEN the user taps Accept with Pets Medical preselected
- THEN the acceptance carries the tag set holding Pets Medical

#### Scenario: Accept with nothing selected

- WHEN the user deselects every tag and taps Accept
- THEN the acceptance carries an empty tag set

#### Scenario: Decline

- WHEN the user taps Decline
- THEN no acceptance is submitted and the screen closes

### Requirement: Accepting does not wait for the suggestions

If the user taps Accept while the request is pending, the app SHALL submit the acceptance at once with the tags the user added themselves, possibly none, and SHALL ignore and, if possible, cancel the pending request.

#### Scenario: Accept while loading

- WHEN the user taps Accept while the loading indicator is shown
- THEN the acceptance carries an empty tag set and a response arriving later changes nothing

### Requirement: A failed request is silent

A failed request, a timeout or an empty response SHALL end the loading indicator with no suggested tags and no error message, and Accept SHALL still submit the acceptance with the tags the user chose, possibly none.

#### Scenario: Request fails

- WHEN the suggestion request fails
- THEN the loading indicator disappears, the tag section shows nothing and no error is shown, and Accept still joins the pod with an empty tag set

## Open questions

- How the node tells the app that a suggested tag is a category tag or a user tag, and how a tag typed by the user is classified.
