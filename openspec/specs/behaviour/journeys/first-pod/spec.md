# journey: first-pod

- Depends on: `../../launch-and-unlock/spec.md`, `../../identities/spec.md`, `../../navigation/spec.md`, `../../create-and-name-pod/spec.md`, `../../pod-lifecycle/spec.md`, `../../pod-tools-and-forms/spec.md`, `../../note/spec.md`
- Read when: changing any step between the first launch and the first filled-in pod
- Source: Figma file "Mee - Tellipod App v4.0.3", page "App"; `pod-ontologies/app-behavior.md`

## Purpose

Paula installs the app and ends with a pod holding her passport details and a note.
The journey checks that onboarding, creation, a templated form and the note hand over to one another.

Covers: launch-and-unlock, identities, navigation, create-and-name-pod, pod-lifecycle, pod-tools-and-forms, note.

## Requirements

### Requirement: A new user reaches a filled-in pod

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: Paula has just installed the app, has Face ID enrolled, holds no identity and no pods.

#### Scenario: From the store to a pod with passport details

- WHEN Paula opens the app for the first time
- THEN the splash screen is followed by welcome and onboarding, and then the identity choice
- WHEN Paula picks Create identity and names it "Paula"
- THEN "Paula" is active on the device and the main app opens with the four tabs and an empty tree
- WHEN Paula creates a pod in the Passport category and names it "Paula's Passport"
- THEN the pod opens with an empty Passport form
- WHEN Paula fills in the required Passport fields and saves
- THEN the Passport form shows her values
- WHEN Paula writes "Renew before March" in the note and leaves the pod
- THEN the pod card "Paula's Passport" is on Home, and reopening the pod shows the note and the Passport values

### Requirement: A returning user finds the pod again

The app SHALL support this path from start to finish, each step handing its result to the next.
Starting state: the end of the journey above, with the app closed.

#### Scenario: Next day

- WHEN Paula opens the app
- THEN the splash screen is followed by the unlock, without onboarding
- WHEN Paula unlocks with Face ID and taps the card "Paula's Passport"
- THEN the pod opens with her note and Passport values as she left them
