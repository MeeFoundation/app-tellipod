# List recipes
default:
    @just --list

# Install dependencies
install:
    pnpm install

# Lint and format check
lint:
    pnpm lint

# Lint and apply fixes
fix:
    pnpm lint:fix

# Type-check all workspaces
typecheck:
    pnpm typecheck

# Run tests in all workspaces
test:
    pnpm test

# Find unused files, exports and dependencies
knip:
    pnpm knip

# Start the Tellipod app (Metro)
app:
    pnpm --filter @tellipod/app start

# Start the Storybook app (Metro)
storybook:
    pnpm --filter @tellipod/storybook start

# Run every check
check: lint typecheck test knip
