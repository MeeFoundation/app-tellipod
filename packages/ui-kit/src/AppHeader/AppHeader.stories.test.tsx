import { fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";

import { HeightChange, Layouts, LongTitle } from "./AppHeader.stories";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  const animation = () => ({ duration: () => ({}) });

  return {
    __esModule: true,
    default: { View },
    FadeIn: animation(),
    FadeOut: animation(),
    LinearTransition: animation(),
  };
});

const HIDDEN = { includeHiddenElements: true } as const;

// A story's `render` is the only part these tests call, so the Storybook runtime is not needed.
const renderStory = (story: { readonly render?: unknown }) => {
  const storyRender = story.render as () => React.ReactElement;
  return render(storyRender());
};

beforeEach(() => {
  jest
    .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
    .mockResolvedValue(false);
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe("AppHeader stories", () => {
  it("shows the Home, Pod, Pod with tabs and Filter layouts", async () => {
    await renderStory(Layouts);
    expect(screen.getByText("Welcome, Bogdan")).toBeTruthy();
    expect(screen.getByText("Bogdan (You)")).toBeTruthy();
    expect(screen.getAllByText("About Sofia")).toHaveLength(2);
    expect(screen.getByText("Filter by category")).toBeTruthy();
    expect(screen.getByText("Notes")).toBeTruthy();
    expect(screen.getAllByTestId("search-entry")).toHaveLength(2);
    // A top inset of 64 px, as in the Figma frames.
    expect(
      screen.getAllByTestId("app-header-inset", HIDDEN)[0]?.props["style"],
    ).toEqual({ height: 64 });
  });

  it("shows a long title", async () => {
    await renderStory(LongTitle);
    expect(screen.getByTestId("app-header-title").props["numberOfLines"]).toBe(
      1,
    );
  });

  it("adds and removes the bottom slot", async () => {
    await renderStory(HeightChange);
    expect(screen.queryByTestId("search-entry")).toBeNull();
    await fireEvent.press(screen.getByText("Add the bottom slot"));
    expect(screen.getByTestId("search-entry")).toBeTruthy();
    await fireEvent.press(screen.getByText("Remove the bottom slot"));
    expect(screen.queryByTestId("search-entry")).toBeNull();
  });
});
