# Tellipod

Tellipod is a React Native app (iOS and Android, built with Expo) for working with your pods. It is a client of the [Mee PDN](https://github.com/MeeFoundation/mee-pdn): the app renders what it receives and sends what the user does, while visibility, merging, propagation, permission enforcement and the data model belong to the nodes and the data layer.

## Repository layout

This is a pnpm monorepo.

| Path | Contents |
| --- | --- |
| `apps/app-tellipod` | The mobile app. Its [README](apps/app-tellipod/README.md) describes the code layout. |
| `packages/` | Shared workspace packages. |
| `openspec/` | Specs written before implementation: behavior, components, architecture decisions and code practices. |

## Getting started

Requirements: Node.js 22 or later, [pnpm](https://pnpm.io), and optionally [just](https://github.com/casey/just).

```sh
pnpm install
```

## Commands

| Command | What it does |
| --- | --- |
| `just app` | Start the Tellipod app (Metro); press `i` or `a` for a simulator |
| `just storybook` | Start the Storybook app (Metro) |
| `just lint` / `pnpm lint` | Lint and format check with Biome |
| `just fix` / `pnpm lint:fix` | Lint and apply fixes |
| `just typecheck` / `pnpm typecheck` | Type-check all workspaces |
| `just knip` / `pnpm knip` | Find unused files, exports and dependencies |
| `just check` | Run every check |

Commits follow [Conventional Commits](https://www.conventionalcommits.org), enforced by commitlint through a Husky hook.

## Specs

Behavior is specified in [`openspec/specs`](openspec/specs) before it is implemented. Pod behavior, data model and storage are defined in [MeeFoundation/pod-ontologies](https://github.com/MeeFoundation/pod-ontologies) and linked from the specs rather than copied.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
