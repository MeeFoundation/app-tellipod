import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Text } from "react-native";

import { Avatar } from "../Avatar/Avatar";
import { Breadcrumb, Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Icon } from "../Icon/Icon";
import { pressDown, pressUp } from "../pressedTestHelpers";
import { CardCell } from "./CardCell";

const HIDDEN = { includeHiddenElements: true } as const;
const noop = () => undefined;

const newInfo = (props: Partial<Parameters<typeof CardCell>[0]> = {}) => (
  <CardCell
    avatar={<Avatar initials="M" />}
    onPress={noop}
    subtitle="New info shared by Andrew 2 hours ago."
    title="Carpathian MTB Event"
    {...props}
  />
);

describe("CardCell content", () => {
  it("shows the avatar, the title above the second line, and a chevron", async () => {
    await render(newInfo());
    expect(screen.getByText("M", HIDDEN)).toBeTruthy();
    expect(screen.getByText("Carpathian MTB Event")).toBeTruthy();
    expect(
      screen.getByText("New info shared by Andrew 2 hours ago."),
    ).toBeTruthy();
    expect(
      screen.getByTestId("icon-chevron-right", HIDDEN).props["width"],
    ).toBe(16);
  });

  it("styles the title and the second line", async () => {
    await render(newInfo());
    const title = String(
      screen.getByText("Carpathian MTB Event").props["className"],
    );
    expect(title).toContain("font-public-sans-medium");
    expect(title).toContain("text-base");
    expect(title).toContain("text-text-default-title");
    const line = String(
      screen.getByText("New info shared by Andrew 2 hours ago.").props[
        "className"
      ],
    );
    expect(line).toContain("text-xs");
    expect(line).toContain("text-text-default-subtle");
  });

  it("is at least 60 px high and fills the parent", async () => {
    await render(newInfo());
    expect(
      String(screen.getByTestId("card-cell-surface-clip").props["className"]),
    ).toContain("min-h-15");
    expect(
      String(screen.getByTestId("card-cell-surface").props["className"]),
    ).toContain("w-full");
  });

  it("shows a Breadcrumbs second line", async () => {
    await render(
      newInfo({
        avatar: <Avatar content="icon" />,
        subtitle: (
          <Breadcrumbs size="s">
            <Breadcrumb label="People" leadingIcon={<Icon name="people" />} />
            <Breadcrumb label="Immediate Family" />
          </Breadcrumbs>
        ),
        title: "About Sofia",
      }),
    );
    expect(screen.getByText("People")).toBeTruthy();
    expect(screen.getByText("Immediate Family")).toBeTruthy();
  });

  it("shows only the title without a second line", async () => {
    await render(newInfo({ subtitle: undefined }));
    expect(screen.getByText("Carpathian MTB Event")).toBeTruthy();
    expect(
      screen.queryByText("New info shared by Andrew 2 hours ago."),
    ).toBeNull();
  });

  it("accepts any node as the second line", async () => {
    await render(newInfo({ subtitle: <Text>Custom line</Text> }));
    expect(screen.getByText("Custom line")).toBeTruthy();
  });
});

describe("CardCell dot", () => {
  it("shows a 12 px dot with a 2 px border when the badge flag is on", async () => {
    await render(newInfo({ badge: true }));
    expect(screen.getByTestId("card-cell-badge", HIDDEN)).toBeTruthy();
    expect(screen.getByTestId("badge", HIDDEN)).toBeTruthy();
    const wrapper = screen.getByTestId("card-cell-badge", HIDDEN).children[0];
    expect(
      String(
        (wrapper as { props: Record<string, unknown> }).props["className"],
      ),
    ).toContain("border-2");
  });

  it("shows no dot without the badge flag", async () => {
    await render(newInfo());
    expect(screen.queryByTestId("card-cell-badge", HIDDEN)).toBeNull();
    expect(screen.queryByTestId("badge", HIDDEN)).toBeNull();
  });
});

describe("CardCell press and accessibility", () => {
  it("calls onPress once when tapped", async () => {
    const onPress = jest.fn();
    await render(newInfo({ onPress, title: "About Sofia" }));
    await fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("starts the default label with New when there is a badge", async () => {
    await render(newInfo({ badge: true }));
    expect(
      screen.getByRole("button", {
        name: "New, Carpathian MTB Event, New info shared by Andrew 2 hours ago.",
      }),
    ).toBeTruthy();
  });

  it("is a button labelled with the title and the text second line", async () => {
    await render(newInfo());
    expect(
      screen.getByRole("button", {
        name: "Carpathian MTB Event, New info shared by Andrew 2 hours ago.",
      }),
    ).toBeTruthy();
  });

  it("uses a label the screen passes", async () => {
    await render(newInfo({ accessibilityLabel: "New: Carpathian MTB Event" }));
    expect(
      screen.getByRole("button", { name: "New: Carpathian MTB Event" }),
    ).toBeTruthy();
  });

  it("hides the avatar and the chevron from assistive technology", async () => {
    await render(newInfo());
    expect(screen.queryByText("M")).toBeNull();
    expect(screen.queryByTestId("icon-chevron-right")).toBeNull();
  });
});

describe("CardCell pressed look", () => {
  it("is white at rest and gray soft while pressed", async () => {
    await render(newInfo());
    const surface = () =>
      String(screen.getByTestId("card-cell-surface").props["className"]);
    expect(surface()).toContain("bg-surface-default-main");
    await pressDown("card-cell");
    expect(surface()).toContain("bg-surface-gray-soft");
    await pressUp("card-cell");
    // The pressed look stays for a short minimum time after the touch ends.
    await waitFor(() => expect(surface()).toContain("bg-surface-default-main"));
  });
});
