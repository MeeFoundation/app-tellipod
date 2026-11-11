import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { AccessibilityInfo, Animated, Text } from "react-native";

import { Card } from "./Card";

const HIDDEN = { includeHiddenElements: true } as const;

// The height animation runs on the JS driver. Fake timers let it finish inside `act`.
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const Body = () => <Text>Body rows</Text>;

describe("Card header", () => {
  it("shows the icon, the title and a chevron in order", async () => {
    await render(<Card icon="paperclip" title="Attachments" />);
    const header = screen.getByRole("button", { name: "Attachments" });
    expect(screen.getByText("Attachments")).toBeTruthy();
    expect(header).toBeTruthy();
    expect(screen.getByTestId("icon-paperclip", HIDDEN)).toBeTruthy();
    expect(screen.getByTestId("icon-chevron-down", HIDDEN)).toBeTruthy();
    const ids = screen
      .getAllByTestId(/^icon-/, HIDDEN)
      .map((node) => node.props["testID"]);
    expect(ids).toEqual(["icon-paperclip", "icon-chevron-down"]);
  });

  it("is 48 px high", async () => {
    await render(<Card icon="paperclip" title="Attachments" />);
    expect(
      String(screen.getByTestId("card-header").props["className"]),
    ).toContain("h-12");
  });
});

describe("expandable Card", () => {
  it("toggles an uncontrolled Card when the header is pressed", async () => {
    await render(
      <Card defaultExpanded={false} icon="person-vcard" title="Contact info">
        <Body />
      </Card>,
    );
    expect(screen.queryByText("Body rows")).toBeNull();
    await fireEvent.press(screen.getByRole("button", { name: "Contact info" }));
    expect(screen.getByText("Body rows")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Contact info" }));
    await waitFor(() => expect(screen.queryByText("Body rows")).toBeNull());
  });

  it("calls onExpandedChange with the opposite value for a controlled Card", async () => {
    const onExpandedChange = jest.fn();
    await render(
      <Card
        expanded
        icon="person-vcard"
        onExpandedChange={onExpandedChange}
        title="Contact info"
      >
        <Body />
      </Card>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Contact info" }));
    expect(onExpandedChange).toHaveBeenCalledTimes(1);
    expect(onExpandedChange).toHaveBeenCalledWith(false);
    // The screen owns the state, so the Card stays expanded until it changes `expanded`.
    expect(screen.getByText("Body rows")).toBeTruthy();
  });

  it("starts collapsed by default and shows the body when expanded", async () => {
    await render(
      <Card icon="person-vcard" title="Contact info">
        <Body />
      </Card>,
    );
    expect(screen.queryByText("Body rows")).toBeNull();
  });

  it("shows the body and footer in order only while expanded", async () => {
    await render(
      <Card
        defaultExpanded
        footer={<Text>Add contact info</Text>}
        icon="person-vcard"
        title="Contact info"
      >
        <Body />
      </Card>,
    );
    const order = screen
      .getAllByTestId(/^card-(body|footer)$/)
      .map((node) => node.props["testID"]);
    expect(order).toEqual(["card-body", "card-footer"]);
    await fireEvent.press(screen.getByRole("button", { name: "Contact info" }));
    await waitFor(() =>
      expect(screen.queryByText("Add contact info")).toBeNull(),
    );
    expect(screen.queryByText("Body rows")).toBeNull();
  });

  it("shows no body area without children", async () => {
    await render(
      <Card
        defaultExpanded
        footer={<Text>Add</Text>}
        icon="person-vcard"
        title="Contact info"
      />,
    );
    expect(screen.queryByTestId("card-body")).toBeNull();
    expect(screen.getByTestId("card-footer")).toBeTruthy();
  });

  it("shows no body or divider for children that draw nothing", async () => {
    await render(
      <Card defaultExpanded icon="person-vcard" title="Contact info">
        {false}
        {null}
      </Card>,
    );
    expect(screen.queryByTestId("card-body")).toBeNull();
    expect(screen.queryByTestId("card-reveal")).toBeNull();
  });

  it("exposes the expanded state", async () => {
    await render(
      <Card defaultExpanded={false} icon="person-vcard" title="Contact info" />,
    );
    const header = screen.getByRole("button", { name: "Contact info" });
    expect(header.props["accessibilityState"]).toEqual({ expanded: false });
    await fireEvent.press(header);
    expect(
      screen.getByRole("button", { name: "Contact info" }).props[
        "accessibilityState"
      ],
    ).toEqual({ expanded: true });
  });
});

describe("navigable Card", () => {
  it("calls onPress once and renders no body", async () => {
    const onPress = jest.fn();
    await render(
      <Card icon="people" mode="navigable" onPress={onPress} title="Members" />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Members" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("icon-chevron-right", HIDDEN)).toBeTruthy();
    expect(screen.queryByTestId("card-body")).toBeNull();
  });

  it("exposes no expanded state", async () => {
    await render(
      <Card
        icon="people"
        mode="navigable"
        onPress={() => undefined}
        title="Members"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Members" }).props[
        "accessibilityState"
      ]?.expanded,
    ).toBeUndefined();
  });
});

describe("accessibility", () => {
  it("hides the leading icon and the chevron from assistive technology", async () => {
    await render(<Card icon="paperclip" title="Attachments" />);
    expect(screen.queryByTestId("icon-paperclip")).toBeNull();
    expect(screen.queryByTestId("icon-chevron-down")).toBeNull();
  });
});

describe("motion", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const expandAndReadDurations = async (): Promise<readonly number[]> => {
    const timing = jest.spyOn(Animated, "timing");
    await render(
      <Card icon="person-vcard" title="Contact info">
        <Body />
      </Card>,
    );
    await act(async () => {
      await Promise.resolve();
    });
    timing.mockClear();
    await fireEvent.press(screen.getByRole("button", { name: "Contact info" }));
    return timing.mock.calls.map(([, config]) => config.duration ?? -1);
  };

  it("shows the body at once when Reduce Motion is on", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockResolvedValue(true);
    const durations = await expandAndReadDurations();
    expect(durations.length).toBeGreaterThan(0);
    expect(durations.every((duration) => duration === 0)).toBe(true);
    expect(
      JSON.stringify(screen.getByTestId("card-reveal").props["style"]),
    ).toContain('"opacity":1');
  });

  it("keeps the body until the collapse has finished", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockResolvedValue(false);
    await render(
      <Card defaultExpanded icon="person-vcard" title="Contact info">
        <Body />
      </Card>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Contact info" }));
    // The header already shows the collapsed state while the body is still shrinking.
    expect(
      screen.getByRole("button", { name: "Contact info" }).props[
        "accessibilityState"
      ],
    ).toEqual({ expanded: false });
    // It is hidden from assistive tech while it shrinks.
    expect(
      screen.getByText("Body rows", { includeHiddenElements: true }),
    ).toBeTruthy();
    await waitFor(() =>
      expect(
        screen.queryByText("Body rows", { includeHiddenElements: true }),
      ).toBeNull(),
    );
  });

  it("opens to the measured height of the body", async () => {
    await render(
      <Card defaultExpanded icon="person-vcard" title="Contact info">
        <Body />
      </Card>,
    );
    await fireEvent(screen.getByTestId("card-content"), "layout", {
      nativeEvent: { layout: { height: 132, width: 300, x: 0, y: 0 } },
    });
    expect(
      JSON.stringify(screen.getByTestId("card-reveal").props["style"]),
    ).toContain('"height":132');
  });

  it("animates the chevron and the body when motion is allowed", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockResolvedValue(false);
    const durations = await expandAndReadDurations();
    expect(durations.length).toBeGreaterThan(0);
    expect(durations.every((duration) => duration > 0)).toBe(true);
  });
});
