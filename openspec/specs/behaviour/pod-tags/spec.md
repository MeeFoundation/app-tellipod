# pod-tags

- Depends on: `../pod-lifecycle/spec.md`
- Related: `../create-and-name-pod/spec.md`, `../find-a-pod/spec.md`, `../pod-storage-and-sharing/spec.md` (these depend on this spec)
- Read when: changing how a pod is tagged, what is suggested on the invitation screen, or what a tag means
- Source: `pod-ontologies/app-behavior.md` (Joining a Pod, Finding Pods by Tag, Persistent Views), `pod-ontologies/README.md` (Tags)

## Purpose

How the user tags a pod and what the two kinds of tag are for.
Pods do not nest and a pod has no position: the user finds and gathers pods by their tags and by their names.

## Requirements

### Requirement: Tags belong to the user, not to the pod

A pod SHALL carry no tag of its own: no tag travels with the pod when it is shared or received.
The tags on a pod are the user's own, so two members of one pod can tag it differently, and one member's tags are never shown to another.

#### Scenario: Two members tag one pod

- WHEN Paula tags the shared pod "Ginger Medical" with the user tag "Ginger" and Sam tags it with the user tag "Cat"
- THEN Paula sees "Ginger" on the pod and Sam sees "Cat" on it

### Requirement: Two kinds of tag

A pod SHALL be able to carry one category tag at most, and any number of user tags.
A category tag names a concept from the shared taxonomy of categories, such as Pets or Immediate Family; its place in the taxonomy gives it a broader and narrower meaning, which search uses.
A user tag is a free-text label the user chooses for their own convenience, such as "Ginger".
A pod SHALL be allowed to carry no tag at all.
A tag SHALL NOT change the pod's content: it only decides where the pod shows up in search and which form types Add Tool lists first.

#### Scenario: A pod with both kinds

- WHEN Paula tags "Ginger" with the category tag Pets and the user tag "Ginger"
- THEN the pod shows Pets as its category tag and "Ginger" as a user tag

#### Scenario: A pod without tags

- WHEN the user creates a pod and adds no tag
- THEN the pod exists with no tag and the user can tag it later

### Requirement: One field adds both kinds of tag

The user SHALL add category tags and user tags in the same way, in the same place, and the app SHALL show the two kinds in different styles.
Adding a second category tag to a pod SHALL replace its first, because a pod has at most one.

#### Scenario: Two category tags at creation

- WHEN the user adds the category tag Vehicle and then the category tag Pets to a pod being created
- THEN the pod is created with the category tag Pets and no Vehicle tag

#### Scenario: Replacing the category tag

- WHEN Paula adds the category tag Pets Medical to a pod that carries the category tag Pets
- THEN the pod shows Pets Medical as its category tag instead of Pets
- AND the pod's forms, note, members and user tags stay as they were
- AND a search for Pets Medical finds the pod, and Add Tool lists first the form types that fit Pets Medical

### Requirement: Tags can be changed at any time

The user SHALL be able to add and remove tags of a pod, and change its category tag, whenever they like.
Changing a tag SHALL NOT remove any tool of the pod.

#### Scenario: Removing a tag

- WHEN the user removes the user tag "Ginger" from a pod that has a Vehicle form
- THEN the pod no longer carries "Ginger" and still holds its Vehicle form

### Requirement: An invitation shows suggested tags before the user joins

A pod the user is invited into SHALL NOT be in their list until they accept.
The app SHALL show an invitation screen with information about the pod, a field for the name the user gives the pod (see [create-and-name-pod](../create-and-name-pod/spec.md)), a list of suggested tags for it, and the buttons Accept and Decline.
Some suggested tags can be already selected, and the rest are listed first among the tags available.
Before accepting, the user SHALL be able to select or deselect suggested tags and add any other tags, or choose none.
Accept SHALL add the pod to the user's list carrying the chosen tags and the given name, and open it.
Decline SHALL add nothing, and the invitee SHALL disappear from the sender's pending invitees.
The sender's own tags SHALL NOT be shown on the screen as the sender's tags.
While the suggested tags are coming over the network, the screen SHALL be in a loading state, and Accept and Decline become available when the tags have arrived.
When the suggestions cannot be fetched, the screen SHALL leave the loading state with no suggested tags, and the user can still accept with tags of their own or none.

#### Scenario: Accepting the suggestion

- WHEN Alice shares "Ginger Medical" with Paula and Paula follows the invitation
- THEN the invitation screen shows information about "Ginger Medical", the suggested category tag Pets Medical preselected, and Accept and Decline
- WHEN Paula taps Accept
- THEN "Ginger Medical" is in her list with the tag Pets Medical, and it opens

#### Scenario: Choosing other tags

- WHEN the suggested tags include Pets Medical and Paula swaps it for the category tag Pets, adds the user tag "Ginger" and taps Accept
- THEN "Ginger Medical" is in her list with Pets and "Ginger", and not Pets Medical

#### Scenario: Joining without a tag

- WHEN Paula deselects every suggested tag and taps Accept
- THEN "Ginger Medical" is in her list with no tag and opens as usual

#### Scenario: Declining

- WHEN Paula taps Decline
- THEN "Ginger Medical" is not in her list
- AND Paula is no longer among the pending invitees in Alice's members list

#### Scenario: Suggestions still loading

- WHEN Paula follows the invitation and the suggested tags have not arrived yet
- THEN the invitation screen is in its loading state, and "Ginger Medical" is not in her list
- WHEN the suggested tags arrive
- THEN the screen shows them with Accept and Decline

#### Scenario: Suggestions cannot be fetched

- WHEN the request for the suggested tags fails
- THEN the screen shows no suggested tags, and Paula can accept with tags of her own or none

## Open questions

- Where in the app the user adds, changes and removes tags of a pod, and whether the field completes tags as the user types.
- How the app tells a category tag from a user tag in the single field (for example by the suggestions of the node), and what the user sees when a typed word matches a category.
- Whether the user can rename or delete a user tag everywhere at once, and how duplicates and letter case are treated.
- Which information about the pod the invitation screen shows, and whether the sender is told that the invitee declined.
- Whether a declined invitation can be opened again from the same link.
- What the loading state looks like, how long the app waits before treating the request as failed, and what the screen shows when the device is offline.
- Whether a pod's colour or icon follows its category tag.
