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

# Find unused files, exports and dependencies
knip:
    pnpm knip

# Start the Storybook app (Metro)
storybook:
    pnpm --filter @tellipod/storybook start

# Run every check
check: lint typecheck knip
