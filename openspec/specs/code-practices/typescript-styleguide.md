# typescript-styleguide

## Purpose

TypeScript rules for the app.

- Depends on: none
- Read when: writing or reviewing TypeScript
- Source: a style guide from another repo, itself based on the Tact language team style guide. Adopted incrementally: a rule listed here must be followed, and fixes are applied at once or marked `// TODO:`.

## Requirements

### Requirement: Prefer basic language features

Code SHALL prefer the simplest features: `const` variables, plain functions, object literals, `if`, `for` and `return`, type aliases, simple types, literal types, unions of literal types and tagged unions.

#### Scenario: Choosing a construct

- WHEN a simple construct and a clever one both work
- THEN the simple one is used

### Requirement: The type system is not bypassed

Code SHALL NOT use `as` (except `as const`), `any`, `@ts-ignore`, the non-null operator `x!`, overloads, or guard types `x is T`.
Code SHALL use `unknown` or `never` instead of `any`, and `satisfies` or a typed `const` instead of `as`.
Code SHALL NOT check the type of a generic value at runtime.

#### Scenario: Asserting a type

- WHEN a value must be narrowed
- THEN it is checked at runtime or typed with `satisfies`, not cast with `as`

#### Scenario: Compiler bug workaround

- WHEN a TypeScript compiler bug forces an `as` or `any`
- THEN the workaround is small, generic, in its own file, and links the TypeScript issue

### Requirement: Immutability by default

Code SHALL NOT use `var`, and SHALL NOT use `let` unless required.
Object fields, tag fields, arrays, tuples, `Set` and `Map` SHALL be `readonly`.
Arrays SHALL be typed `readonly T[]` or `ReadonlyArray<T>`, never `T[]`.
Function arguments SHALL NOT be assigned to.
Arrays SHALL be cloned before `.sort()`, `.reverse()` or `.splice()`.
Module-level `let` SHALL NOT be used, and `let` SHALL NOT be used in tests.

#### Scenario: Declaring a type with an array

- WHEN a type has a list field
- THEN the field is `readonly` and its type is `readonly Item[]`

#### Scenario: Sorting

- WHEN code sorts an array
- THEN it sorts a copy: `[...arr].sort()`

### Requirement: Unions are tagged

Code SHALL NOT use untagged unions of object types, and SHALL NOT use `in` to narrow; it uses `Object.hasOwn` where a check is needed.

#### Scenario: Two object shapes

- WHEN a value is one of two object shapes
- THEN both carry a readonly tag field, such as `kind`

### Requirement: No optional fields

Types SHALL NOT use optional fields (`foo?: Bar`); an absent value is stated explicitly, for example `Bar | null`.
React component props MAY be optional.
`??` SHALL be used for defaults, not `||`.

#### Scenario: A field that may be missing

- WHEN a type has a field that may have no value
- THEN the field is required and its type includes `null`

### Requirement: No JavaScript object tricks

Code SHALL NOT use `Proxy` or `get` or `set` accessors.
Code SHALL prefer aggregation to spreading: `{ ...a, b }` becomes `{ a, b }`.
Object spread and rest (`...`) MAY be used for React Native styles and component props.

#### Scenario: Combining data

- WHEN a value is built from another object and a new field
- THEN the other object becomes a field of the new one

#### Scenario: Forwarding props

- WHEN a component forwards its remaining props to a child, or merges styles
- THEN it uses `...` on the props or style object

### Requirement: Object types are type aliases

Object shapes SHALL be declared with `type`, not `interface`.

#### Scenario: Declaring a shape

- WHEN code declares the shape of an object or of component props
- THEN it writes `type Props = { readonly ... }`

### Requirement: No enums

Code SHALL NOT use `enum` or `const enum`.
A fixed set of values SHALL be a union of string literals.

#### Scenario: A fixed set of values

- WHEN a value is one of a few known strings
- THEN its type is `"a" | "b" | "c"`, or is derived from a `readonly` `as const` array

### Requirement: Failures are domain errors

Every failure the app can name SHALL be its own error class declared with `Data.TaggedError` from the `effect` package, whose tag identifies it, for example `PodNotFoundError`.
Code SHALL NOT throw or return a bare `Error`, a string or any other generic value for a failure the app can name.
An error SHALL carry the data needed to understand it (such as the `PodId`) as `readonly` fields, and the original error as `cause` when one exists.
Errors SHALL be told apart by their `_tag`, never by message text or `instanceof Error`.

#### Scenario: Declaring an error

- WHEN a pod cannot be found
- THEN the code fails with `PodNotFoundError`, which holds the `PodId`

#### Scenario: Handling an error

- WHEN a caller reacts to a failure
- THEN it branches on the error's `_tag`

### Requirement: Error handling practices

Code SHALL catch an error only where it can handle it, add context or translate it, and SHALL NOT swallow it with an empty `catch`.
Code SHALL translate an error from outside the app (a native module, `fetch`, storage) into a domain error at the boundary where it enters, keeping the original as `cause`.
Code SHALL NOT use exceptions for expected outcomes, such as an empty result or a user's cancelled prompt; these are values.
A value in a `catch` clause is `unknown` and SHALL be checked before use.
The UI SHALL show the user a message for the kind of failure, not the raw error text.

#### Scenario: Native module failure

- WHEN a native call rejects with a generic error
- THEN the boundary code wraps it in a domain error with the original as `cause`

#### Scenario: Cancelled prompt

- WHEN the user cancels a biometric prompt
- THEN the result is a value the caller checks, not a thrown error

### Requirement: Domain identifiers are branded types

Every domain identifier (for example a pod or record identifier) SHALL have its own branded type.
A plain `string` SHALL NOT be used where a domain identifier is expected.
Branded types SHALL be declared with `Brand` from the `effect` package, and their values created only through the `Brand` constructor (`Brand.nominal` or `Brand.refined`), never with `as`.

#### Scenario: Identifiers of different kinds are not interchangeable

- WHEN a function takes a `PodId` and a caller passes a `RecordId`
- THEN type checking fails

#### Scenario: Raw values enter the domain through one constructor

- WHEN a string arrives from outside the app (storage, network, navigation params)
- THEN it is converted to the branded type by a single `Brand` constructor for that identifier
- AND code past that point uses the branded type only

## Not adopted

These parts of the source guide do not apply to this app:

- Effect rules other than `Brand` and `Data.TaggedError` (`Data.Class`, `Data.TaggedEnum`, `Context.Service`, `Schema`, `Effect.flatMap`): only those two are used from `effect`.
- `Option` in place of `null` or `undefined`: not required.
- Discriminated unions for UI state: not required, though untagged object unions are forbidden above.
- Drizzle ORM rules: backend only.
- A rule against native-only APIs at module scope.
