import { fireEvent, render, screen } from "@testing-library/react-native";

import { pressDown } from "../pressedTestHelpers";
import { CardCategory } from "./CardCategory";

const HIDDEN = { includeHiddenElements: true } as const;

describe("CardCategory content", () => {
  it("shows the icon, the title and the line", async () => {
    await render(<CardCategory icon="people" line="2 pods" title="People" />);
    expect(screen.getByTestId("icon-people", HIDDEN).props["width"]).toBe(24);
    expect(screen.getByText("People")).toBeTruthy();
    expect(screen.getByText("2 pods")).toBeTruthy();
  });

  it("shows a category without pods", async () => {
    await render(
      <CardCategory icon="people" line="No pods yet" title="People" />,
    );
    expect(screen.getByText("No pods yet")).toBeTruthy();
  });

  it("styles the title and the line", async () => {
    await render(<CardCategory icon="people" line="2 pods" title="People" />);
    const title = String(screen.getByText("People").props["className"]);
    expect(title).toContain("font-public-sans-medium");
    expect(title).toContain("text-base");
    expect(title).toContain("text-text-default-title");
    const line = String(screen.getByText("2 pods").props["className"]);
    expect(line).toContain("font-public-sans-regular");
    expect(line).toContain("text-sm");
    expect(line).toContain("text-text-default-subtle");
  });

  it("draws the icon in a 48 px gray circle", async () => {
    await render(<CardCategory icon="people" line="2 pods" title="People" />);
    const circle = screen.getByTestId("icon-people", HIDDEN).parent;
    const classes = String(circle?.props["className"]);
    expect(classes).toContain("size-12");
    expect(classes).toContain("rounded-full");
    expect(classes).toContain("bg-surface-gray-light");
  });
});

describe("CardCategory layout", () => {
  it("fills the parent width with 12 px padding and an 8 px gap", async () => {
    await render(<CardCategory icon="people" line="2 pods" title="People" />);
    expect(
      String(screen.getByTestId("card-category-surface").props["className"]),
    ).toContain("w-full");
    const inner = String(
      screen.getByTestId("card-category-surface-clip").props["className"],
    );
    expect(inner).toContain("p-3");
    expect(inner).toContain("gap-2");
  });
});

describe("CardCategory accessibility", () => {
  it("is one stop labelled with the title and the line", async () => {
    await render(<CardCategory icon="people" line="2 pods" title="People" />);
    const stop = screen.getByLabelText("People, 2 pods");
    expect(stop.props["accessible"]).toBe(true);
    expect(screen.queryByTestId("icon-people")).toBeNull();
  });
});

describe("CardCategory press", () => {
  it("is a plain tile without onPress", async () => {
    await render(<CardCategory icon="people" line="2 pods" title="People" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("is a button that calls onPress once", async () => {
    const onPress = jest.fn();
    await render(
      <CardCategory
        icon="people"
        line="2 pods"
        onPress={onPress}
        title="People"
      />,
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "People, 2 pods" }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("turns gray soft while pressed", async () => {
    await render(
      <CardCategory
        icon="people"
        line="2 pods"
        onPress={() => undefined}
        title="People"
      />,
    );
    const surface = () =>
      String(screen.getByTestId("card-category-surface").props["className"]);
    expect(surface()).toContain("bg-surface-default-main");
    await pressDown("card-category");
    expect(surface()).toContain("bg-surface-gray-soft");
  });
});
