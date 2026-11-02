# Spec writing guide

- Read when: writing or reviewing any spec under `behaviour/` or `components/`

## Three kinds of spec

| Kind | Lives in | Answers | Voice |
| --- | --- | --- | --- |
| Use case | `behaviour/<name>/spec.md` | What does the user do, and what do they get? | The user's side. Screens, words and outcomes. No code, modules or storage |
| Journey | `behaviour/journeys/<name>/spec.md` | Do the use cases work together as the designer intended? | One persona, one goal, several use cases in a row |
| Component | `components/**/spec.md` | How does the code realize it? | Technical: responsibilities, state, data flow, platform APIs |

A use case is small: one When and its Thens.
A journey chains use cases and checks the hand-offs between them: what one step leaves behind is what the next step needs.
A component spec names the use cases it realizes under `Realizes:` and never restates their user-facing scenarios.

## Rules for use-case scenarios

1. State the positive outcome: "WHEN the user taps Save THEN the note shows the saved time", not "THEN no error appears".
   Write a prohibition as the thing the user sees instead.
2. Describe what the user does and sees, not the mechanics: "the user opens Search", not "the user taps the magnifier at (24, 80)".
   Test each step: would its wording change if the implementation changed?
3. One behavior per scenario: one WHEN and its THENs. A second WHEN is a second scenario.
4. Title a scenario with the behavior, in one short line.
5. Use real values from the design ("Paula's Credit Card", "coffee"), not "X" and "Y".
6. Write steps in third person: "the user", never "I".
7. Move combinations of inputs into a table rather than repeating near-identical scenarios.

## Rules for journeys

1. Name a persona and a goal; the journey ends when the goal is reached.
2. List the use cases covered under `Covers:`; every step maps to one of them.
3. Each journey scenario has at most ten steps. A longer path is two journeys joined by a precondition.
4. A journey starts from a stated state ("Paula has an account and no pods"), so it does not replay the whole app.
5. Check hand-offs: the THEN of one step names what the next step uses.
6. Keep journeys few: one for each main goal, plus one for each important variation of the same goal. Edge cases stay in use cases.

## Rules for component specs

1. Specify the contract: inputs, outputs, state and its transitions, the platform API used, and who owns the data.
2. Say where responsibility ends, for example the node enforces permissions and the app only offers actions.
3. A scenario WHEN names a technical trigger (an event, a response, a state) and THEN a technical result.
4. Link the use cases realized under `Realizes:` in the header.

## Sources

- [Better Gherkin](https://cucumber.io/docs/bdd/better-gherkin/): describe what the application does, not the keystrokes; ask whether a step would change if the implementation did.
- [Writing Good Gherkin](https://automationpanda.com/2017/01/30/bdd-101-writing-good-gherkin/): fewer than ten steps; one When-Then pair per scenario; third person; Givens declare a starting state.
- [Specification by Example summary](https://sharedcontext.ai/skills/external/msewell/specifying-by-example): declarative wording, the business's vocabulary, outlines for combinations, few end-to-end scenarios.
- [Example vs journey scenarios](https://www.slideshare.net/slideshow/testable-requirements-60896723/60896723): zoomed-in example scenarios paired with zoomed-out journeys.
