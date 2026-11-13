import { fireEvent, render, screen } from "@testing-library/react-native";

import { MIN_TARGET } from "../touchTarget";
import { SearchEntry } from "./SearchEntry";

const HIDDEN = { includeHiddenElements: true } as const;

const entry = () => screen.getByTestId("search-entry");
const classesOf = (element: { readonly props: Record<string, unknown> }) =>
  String(element.props["className"]);

describe("SearchEntry", () => {
  it("calls onPress once when it is tapped", async () => {
    const onPress = jest.fn();
    await render(
      <SearchEntry onPress={onPress} placeholder="Search, or ask Telli..." />,
    );
    await fireEvent.press(entry());
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders no text input, so no keyboard can show", async () => {
    await render(
      <SearchEntry onPress={jest.fn()} placeholder="Search, or ask Telli..." />,
    );
    expect(JSON.stringify(screen.toJSON())).not.toContain("TextInput");
  });

  it("is as wide as its parent and 44 px high with the field look", async () => {
    await render(
      <SearchEntry onPress={jest.fn()} placeholder="Search, or ask Telli..." />,
    );
    const classes = classesOf(entry());
    expect(classes).toContain("w-full");
    expect(classes).toContain("h-11");
    expect(classes).toContain("border-stroke-gray-accent");
    expect(classes).toContain("bg-surface-default-main");
    expect(classes).toContain("rounded-xl");
    expect(classes).toContain("p-3");
    expect(screen.getByTestId("icon-search", HIDDEN).props["width"]).toBe(20);
    expect(classesOf(screen.getByTestId("search-entry-placeholder"))).toContain(
      "text-text-default-placeholder",
    );
  });

  it("shows the soft gray fill until the finger lifts", async () => {
    await render(
      <SearchEntry onPress={jest.fn()} placeholder="Search, or ask Telli..." />,
    );
    await fireEvent(entry(), "pressIn");
    expect(classesOf(entry())).toContain("bg-surface-gray-soft");
    await fireEvent(entry(), "pressOut");
    expect(classesOf(entry())).not.toContain("bg-surface-gray-soft");
  });

  it("is a button labelled with the placeholder, and its icon is hidden", async () => {
    await render(
      <SearchEntry onPress={jest.fn()} placeholder="Search, or ask Telli..." />,
    );
    expect(entry().props["accessibilityRole"]).toBe("button");
    expect(entry().props["accessibilityLabel"]).toBe("Search, or ask Telli...");
    expect(screen.queryByTestId("icon-search")).toBeNull();
  });

  it("reaches the minimum touch area without growing", async () => {
    await render(
      <SearchEntry onPress={jest.fn()} placeholder="Search, or ask Telli..." />,
    );
    const slop = entry().props["hitSlop"] as Record<string, number>;
    expect(44 + (slop["top"] ?? 0) * 2).toBeGreaterThanOrEqual(MIN_TARGET);
  });
});
