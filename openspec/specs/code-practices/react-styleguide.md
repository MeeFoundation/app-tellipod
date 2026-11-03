# react-styleguide

## Purpose

React component rules for the app.

- Depends on: none
- Read when: writing or reviewing a `.tsx` file

## Requirements

### Requirement: Components are typed arrow-function constants

A React component SHALL be declared as a typed arrow-function constant, not a function declaration.

```tsx
const Button: FC<ButtonProps> = (props) => {
  // ...
};
```

Not:

```tsx
function Button(props: ButtonProps) {
  // ...
}
```

### Requirement: `FC` is imported as a type

`FC` SHALL be imported from `react` as a type: `import type { FC } from "react";`.
