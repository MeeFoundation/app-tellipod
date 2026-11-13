# toast-host

- Depends on: `../toast/spec.md`, `../../../code-practices/accessibility/spec.md`
- Read when: showing a toast from a screen or changing where and how toasts appear
- Source: Figma file "Mee - Tellipod App v4.0.3", Toast (nodes 908:19458, 914:20086 and 820:17710)

## Purpose

The ToastHost is the one place on screen where toasts appear, and `toast` is the call any code makes to show one.
It places a Toast above the bottom edge of the screen, above the safe area, and owns showing, replacing and dismissing it.
It does not decide when a screen fires a toast, and it does not draw a Toast: the `toast` spec does.

## Requirements

### Requirement: Code shows a toast with one call

The kit SHALL export `toast` with `show` and `dismiss`, and `ToastHost` mounted once at the root of the app.
`toast.show` SHALL accept the props of a `Toast` except `onClose`, and SHALL show a Toast with them.
`toast.show` SHALL return an id, and `toast.dismiss` SHALL accept that id and remove that toast if it is still shown.
`toast.show` SHALL NOT throw when no `ToastHost` is mounted.

#### Scenario: A screen fires a success toast

- WHEN a handler calls `toast.show` with type `success`, a `check-circle` icon and the title "All suggested contact info added"
- THEN the green toast appears above the bottom edge of the screen

#### Scenario: Dismissing a toast

- WHEN code calls `toast.dismiss` with the id that `toast.show` returned
- THEN that toast leaves the screen

### Requirement: The host places the toast like the design

The host SHALL place the toast above the content of every screen, centered, with 12 px of margin on each side, and 12 px above the bottom safe-area inset.
The toast SHALL be as wide as the screen less the side margins, as in the 378 px toast of a 402 px screen.
The host SHALL NOT take touches outside the toast, so the screen behind stays usable.

#### Scenario: Placement on a 402 px screen

- WHEN a toast is shown on a 402 px wide screen
- THEN it is 378 px wide with 12 px on each side

#### Scenario: Tapping behind the toast

- WHEN a toast is shown and the user taps a button of the screen outside the toast
- THEN the button receives the tap

### Requirement: One toast is shown at a time

The host SHALL show at most one toast.
`toast.show` while a toast is shown SHALL replace it with the new toast, and the replaced toast SHALL NOT call any handler.

#### Scenario: A second toast

- WHEN "Item removed" is shown and code then shows "Server error!"
- THEN "Server error!" is shown and "Item removed" is gone

### Requirement: The toast shows and leaves with a short movement

The toast SHALL slide in from the bottom edge and fade when it appears and leaves.
When the user has turned on Reduce Motion, the toast SHALL appear and leave with a fade only.

#### Scenario: Reduce Motion

- WHEN Reduce Motion is on and a toast is shown
- THEN it fades in without sliding

### Requirement: A toast without actions leaves by itself

The host SHALL dismiss a toast that has no `action` and no `actions` 4 s after it appears.
The host SHALL NOT dismiss a toast that has an `action` or `actions` by itself; it stays until the user closes it, a handler dismisses it, or another toast replaces it.
A toast that replaces another SHALL get its own 4 s.

#### Scenario: A toast with only a title

- WHEN "All suggested contact info added" appears and 4 s pass
- THEN it leaves the screen

#### Scenario: A toast with a link

- WHEN "Server error!" with the link "Refresh" appears and 10 s pass
- THEN it is still on screen

#### Scenario: A replaced toast

- WHEN "Item removed" has been shown for 3 s and "Your order is ready!" replaces it
- THEN "Your order is ready!" stays for 4 s from its own start

### Requirement: The close button dismisses the toast

A toast shown with `toast.show` SHALL show the close button when the caller passes `closable`, and tapping it SHALL dismiss the toast.
A toast SHALL NOT dismiss itself when the user taps an action; the caller's handler decides, and may call `toast.dismiss`.

#### Scenario: Closing a toast

- WHEN a closable toast is shown and the user taps its close button
- THEN the toast leaves the screen

### Requirement: A screen reader announces the toast

When a toast appears, the host SHALL announce its title and description to VoiceOver and TalkBack without moving screen reader focus.

#### Scenario: Announcing a danger toast

- WHEN "Server error!" with "Try to refresh your page." appears while VoiceOver is on
- THEN VoiceOver reads "Server error! Try to refresh your page." after its current speech and focus stays where it was

### Requirement: The ToastHost has stories

The stories of `UI/ToastHost` SHALL show a button that fires each type of toast, so the placement and the movement can be tried.

#### Scenario: Host stories

- WHEN the stories of `UI/ToastHost` are listed
- THEN one story fires each of the four types from buttons

## Open questions

- Where the toast sits when the keyboard is open or when a bottom menu is shown. The design shows the toast at the bottom of a screen with no keyboard and no bottom menu.
- The 4 s of the timer is not in the design; it was chosen with the user and is confirmed with the design owner.
