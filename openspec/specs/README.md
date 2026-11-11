# Specs

Index of the main spec tree. Open the index of the area you work in, then only the specs its table points to.

| Area | Read when |
| --- | --- |
| [behaviour/](behaviour/README.md) | Changing what a user sees or does: small use cases, and longer journeys that chain them |
| [components/](components/README.md) | Building or changing one component's technical contract: the mobile app code shared by both platforms, the iOS app, the Android app or the UI kit |
| [code-practices/](code-practices/README.md) | Writing or reviewing TypeScript, building or changing any screen or UI-kit component, adding a color pair, or writing a spec |
| [architecture/adr/](architecture/adr/README.md) | Asking why a technology or structure was chosen |

Capability specs are `<path>/spec.md` and open with a metadata list (Depends on, Realizes where it applies, Read when, Source when derived) followed by a Purpose section. Behaviour specs and ui-kit specs have no Realizes line. Some use cases (organize, member-info, pod-lifecycle, pod-storage-and-sharing, journeys) have no component spec yet: that is a gap, not an omission in the index. ADRs and style guides are not specs: each opens with a Read when line.
