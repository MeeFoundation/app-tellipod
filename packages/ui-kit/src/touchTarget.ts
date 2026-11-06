import { Platform } from "react-native";

// The smallest touch target of `code-practices/accessibility`: 44 pt on iOS and 48 dp on Android.
export const MIN_TARGET = Platform.select({ android: 48, default: 44 });

// The extra touch area above and below a control, so the area reaches the minimum. Controls that
// touch sideways cannot grow sideways, so the area grows vertically only.
export const hitSlopFor = (height: number, minimum: number): number =>
  Math.max(0, Math.ceil((minimum - height) / 2));
