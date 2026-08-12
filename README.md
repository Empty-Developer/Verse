# Verse

<a href="https://wakatime.com/badge/user/fdcea843-56ea-404c-838b-f7f306de46b6/project/12940ac4-a523-4a1a-94b6-83be708b0a38"><img src="https://wakatime.com/badge/user/fdcea843-56ea-404c-838b-f7f306de46b6/project/12940ac4-a523-4a1a-94b6-83be708b0a38.svg" alt="wakatime"></a>
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)

Verse is a cross-platform mobile application for writers. It combines the discovery and social dynamics of a content feed with the reading experience of a curated library, giving writers a single place to publish their work, share it with an audience, and read what others in the community have written.

## Concept

The core idea behind Verse is to give writing the same kind of home that short-form content has on social platforms, without losing the reading experience that longer written work deserves. Within the app, users can:

- Publish their own writing directly from the app and make it available to other users.
- Browse and read from an in-app library of published work, similar to how a reader would explore a bookshelf or a curated catalog.
- Follow, view, and interact with other writers' work in a social feed format, allowing discovery of new authors and pieces.

The result is a space where writing is treated both as personal creative output and as shareable, discoverable content, bridging the gap between a private writing tool and a public social platform.

## Technology Stack

Verse is built as a single codebase targeting iOS, Android, and web.

### Core Framework

- **React Native** (0.81) as the underlying framework for building native mobile UI from a single JavaScript/TypeScript codebase.
- **Expo** (SDK 54) as the toolchain and runtime layer on top of React Native, used for builds, native module access, and development workflow.
- **Expo Router** for file-based navigation, handling routing and screen structure across the app.
- **React** (19) and **React DOM** (19), with **react-native-web** included so the same codebase can also run in a browser.
- **TypeScript** throughout the project for static typing and compile-time safety.

### State Management and Data

- **Zustand** for lightweight, centralized client-side state management (see the `stores` directory).
- **Supabase** (`@supabase/supabase-js` and `@supabase/ssr`) as the backend platform, providing authentication, a database, and storage for user accounts and published content.
- **AsyncStorage** and **Expo Secure Store** for local persistence and secure storage of sensitive data such as session tokens.
- A dedicated `service` layer to encapsulate API and backend communication, separate from UI and state logic.

### Navigation

- **React Navigation** (`bottom-tabs`, `native`, `elements`), used underneath and alongside Expo Router to implement tab-based and stack-based navigation patterns.

### UI, Media, and Interaction

- **Expo Image** and **Expo Image Picker** for efficient image rendering and allowing users to attach or select images, for example as part of publishing content or managing a profile.
- **Expo Linear Gradient** and **react-native-linear-gradient** for gradient-based visual styling.
- **Lottie for React Native** for vector-based animations.
- **Lucide React Native** for a consistent icon set across the interface.
- **React Native Reanimated** and **React Native Gesture Handler** for smooth, native-driven animations and gesture interactions.
- **Expo Haptics** for tactile feedback on supported devices.
- **Expo Symbols**, **Expo Status Bar**, and **Expo System UI** for platform-native visual details such as SF Symbols, status bar behavior, and system UI theming.
- **Expo Splash Screen** for a controlled app launch experience.

### Platform and Tooling

- **Expo Dev Client** for a custom development build that supports native modules beyond the default Expo Go environment.
- **Expo File System** and **Expo Linking** for file access and deep linking support.
- **Expo Constants** and **Expo Web Browser** for app configuration access and in-app browser sessions.
- **ESLint** with `eslint-config-expo` for consistent code quality and style enforcement.
- **Bun** as the package manager and script runner, evidenced by the project's lockfile.
- **Trunk** for coordinated linting and formatting checks across the codebase.

## Project Structure

```
Verse/
  app/            Application screens and file-based routes (Expo Router)
  components/     Reusable UI components
  hooks/          Custom React hooks
  lib/            Shared utilities and helper functions
  service/        Backend and API communication layer (Supabase integration)
  stores/         Zustand state stores
  types/          Shared TypeScript type definitions
  assets/         Fonts, images, and other static assets
  app.json        Expo application configuration
  package.json    Project dependencies and scripts
  tsconfig.json   TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js and Bun installed locally
- Expo CLI tooling (installed automatically via `npx expo`)
- A Supabase project configured with the required tables and authentication settings
- Xcode (for iOS) and/or Android Studio (for Android), if targeting native builds

### Installation

```
git clone https://github.com/Empty-Developer/Verse.git
cd Verse
bun install
```

### Running the App

```
bun run start
```

This starts the Expo development server. From there, the project can be opened on:

- iOS: `bun run ios`
- Android: `bun run android`
- Web: `bun run web`

### Linting

```
bun run lint
```

## License

See `LICENSE.md` in the repository root for license details.
