import { fireEvent, screen } from "@testing-library/react-native";

// A Pressable shows its pressed state from the touch responder events, not from `onPressIn`, so a
// test starts and ends a touch with them.
const touch = {
  nativeEvent: {
    changedTouches: [],
    identifier: 1,
    locationX: 0,
    locationY: 0,
    target: 1,
    timestamp: 0,
    touches: [],
  },
  persist: () => undefined,
};

export const pressDown = (testID: string) =>
  fireEvent(screen.getByTestId(testID), "responderGrant", touch);

export const pressUp = (testID: string) =>
  fireEvent(screen.getByTestId(testID), "responderTerminate", touch);
