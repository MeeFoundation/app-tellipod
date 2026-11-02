---
status: accepted
date: 2026-10-29
---
# One React Native app with Expo for iOS and Android

- Read when: questioning the cross-platform approach or adding platform-specific code

## Context and Problem Statement

Tellipod must run on iOS and Android. Desktop (Windows, macOS) is out of scope for this repo.
How is the app built so that behavior is specified and implemented once?

## Decision Drivers

* Both iOS and Android must be supported.
* Behavior should be specified once, not per platform.
* The app needs device secure storage (Keychain, Keystore) and Face ID.
* Expo is the chosen toolchain.

## Considered Options

* One React Native app with Expo
* Two native apps (Swift and Kotlin)
* A web app only

## Decision Outcome

Chosen option: "One React Native app with Expo", because it is the only option that serves both platforms from one codebase and still reaches device secure storage and biometrics.
Routing uses Expo Router, with routes in `app/`.
Platform-specific code is limited to what shared code cannot do, and is specified in `components/ios-app` and `components/android-app`.

### Consequences

* Good, because almost all behavior is specified once, in `components/mobile-common`.
* Good, because builds and tooling follow Expo.
* Bad, because native modules are needed wherever the platform must be reached directly.

## Pros and Cons of the Options

### One React Native app with Expo

* Good, because one codebase and one set of specs cover both platforms.
* Good, because native modules reach Keychain, Keystore and biometrics.
* Bad, because platform-specific features need native modules.

### Two native apps (Swift and Kotlin)

* Good, because direct access to every platform API.
* Bad, because the work and the specs double, and behavior can drift between platforms.

### A web app only

* Good, because one codebase with no store distribution.
* Bad, because it cannot use device secure storage or run as an installed app.
