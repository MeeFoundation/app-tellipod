# behaviour

What the user does and sees, derived from pod-ontologies' `app-behavior.md` and the Figma design. Component specs under [components/](../components/README.md) realize these in code. Rules for writing them are in [spec-writing-guide.md](../code-practices/spec-writing-guide.md).

## Use cases

Small, one behavior per scenario, from the user's side.

| Spec | Read when |
| --- | --- |
| [launch-and-sign-in](launch-and-sign-in/spec.md) | Changing what the user sees from opening the app until the main app appears |
| [navigation](navigation/spec.md) | Adding or changing a tab, or what a tab shows |
| [find-a-pod](find-a-pod/spec.md) | Changing search, its results, or any link or card that opens a pod |
| [create-and-name-pod](create-and-name-pod/spec.md) | Creating, renaming, moving or receiving a pod |
| [pod-lifecycle](pod-lifecycle/spec.md) | Changing what a newly created pod contains or how a pod gains a tool |
| [pod-tools-and-forms](pod-tools-and-forms/spec.md) | Changing Add Tool or what the user fills in on a form |
| [note](note/spec.md) | Changing what the user can do in a pod's note |
| [chat](chat/spec.md) | Changing what the user sees or does in a pod's chat |
| [members-and-roles](members-and-roles/spec.md) | Showing, hiding or disabling a pod action by role |
| [organize](organize/spec.md) | Building or changing the Organize action |
| [pod-storage-and-sharing](pod-storage-and-sharing/spec.md) | Deciding whether a piece of pod content stays on the device or reaches other members |

## Journeys

Longer scenarios that chain use cases for one persona and one goal, to check they work together as designed.

| Journey | Read when |
| --- | --- |
| [first-pod](journeys/first-pod/spec.md) | Changing any step between the first launch and the first filled-in pod |
| [invite-and-collaborate](journeys/invite-and-collaborate/spec.md) | Changing invitations, shared content, private files or who sees a message |
| [capture-and-organize](journeys/capture-and-organize/spec.md) | Changing Organize, the links it leaves, or how a Custom pod is filed |
| [search-to-new-pod](journeys/search-to-new-pod/spec.md) | Changing search, "Make a ... Pod", or how links create pods |
