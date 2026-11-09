import { render, screen } from "@testing-library/react-native";

import { HelloScreen } from "./HelloScreen";

// The kit index loads the Modal, whose sheet engine needs native modules a unit test lacks.
jest.mock("@gorhom/bottom-sheet", () => ({}));

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
}));

describe("HelloScreen", () => {
  it("shows the heading and the button", async () => {
    await render(<HelloScreen />);

    expect(screen.getByText("Hello, Tellipod")).toBeTruthy();
    expect(screen.getByText("Get started")).toBeTruthy();
  });
});
