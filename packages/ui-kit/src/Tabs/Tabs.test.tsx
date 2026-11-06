import { fireEvent, render, screen } from "@testing-library/react-native";
import type { FC } from "react";
import { Text } from "react-native";

import { Icon } from "../Icon/Icon";
import { useIconDefaults } from "../Icon/IconDefaults";
import { hitSlopFor } from "./Tab";
import { Tab, Tabs, type TabsLayout, type TabsSize } from "./Tabs";

const SIZES: readonly TabsSize[] = ["m", "l"];
const LAYOUTS: readonly TabsLayout[] = ["content", "equal"];

// `Icon` turns its color class into a style, so a probe reads the defaults a slot receives.
const Probe: FC = () => {
  const defaults = useIconDefaults();
  return (
    <Text testID="probe">{`${defaults?.size} ${defaults?.className}`}</Text>
  );
};

// Decorative parts are hidden from assistive technology, so queries include hidden elements.
const HIDDEN = { includeHiddenElements: true } as const;

const classesOf = (
  element: { readonly props: Record<string, unknown> } | undefined,
): readonly string[] =>
  String(element?.props["className"] ?? "")
    .split(/\s+/)
    .filter(Boolean);

const tab = (label: string) => screen.getByRole("tab", { name: label });

const Bar: FC<{
  readonly size?: TabsSize;
  readonly layout?: TabsLayout;
  readonly active?: string;
  readonly onPress?: (label: string) => void;
}> = ({ size, layout, active = "Posts", onPress = () => undefined }) => (
  <Tabs layout={layout ?? "content"} size={size ?? "m"}>
    {["Posts", "Media", "About"].map((label) => (
      <Tab
        active={label === active}
        key={label}
        label={label}
        onPress={() => onPress(label)}
      />
    ))}
  </Tabs>
);

describe("Tabs container", () => {
  it.each(
    SIZES.flatMap((size) => LAYOUTS.map((layout) => [size, layout] as const)),
  )("size %s, layout %s renders every tab in order", async (size, layout) => {
    await render(<Bar layout={layout} size={size} />);
    expect(
      screen.getAllByRole("tab").map((node) => node.props["testID"]),
    ).toEqual(["tab", "tab", "tab"]);
    expect(
      screen
        .getAllByRole("tab")
        .map((node) => node.props["accessibilityLabel"]),
    ).toEqual(["Posts", "Media", "About"]);
  });

  it("is a full width, size m, content layout bar by default", async () => {
    await render(
      <Tabs>
        <Tab label="Posts" />
      </Tabs>,
    );
    expect(classesOf(screen.getByTestId("tabs", HIDDEN))).toEqual(
      expect.arrayContaining(["w-full", "rounded-xl", "bg-alpha-dark-5"]),
    );
    expect(
      String(
        screen.getByTestId("tabs-scroll", HIDDEN).props[
          "contentContainerClassName"
        ],
      ).split(" "),
    ).toEqual(expect.arrayContaining(["flex-row", "gap-px", "p-1"]));
    expect(classesOf(tab("Posts"))).toEqual(
      expect.arrayContaining(["h-9", "px-3", "rounded-2lg"]),
    );
    expect(classesOf(screen.getByText("Posts"))).toEqual(
      expect.arrayContaining(["font-public-sans-semibold", "text-base"]),
    );
  });

  it("uses the size l padding, radius and tab height", async () => {
    await render(<Bar size="l" />);
    expect(classesOf(screen.getByTestId("tabs", HIDDEN))).toContain(
      "rounded-xl-2",
    );
    expect(
      String(
        screen.getByTestId("tabs-scroll", HIDDEN).props[
          "contentContainerClassName"
        ],
      ).split(" "),
    ).toContain("p-1.5");
    expect(classesOf(tab("Posts"))).toEqual(
      expect.arrayContaining(["h-11", "px-4"]),
    );
  });

  it("draws the bar stroke on a layer above the tabs", async () => {
    await render(<Bar />);
    expect(classesOf(screen.getByTestId("tabs-edge", HIDDEN))).toEqual(
      expect.arrayContaining(["border", "border-alpha-dark-10", "absolute"]),
    );
  });

  it("does not clip the shadow of the Active tab", async () => {
    await render(<Bar />);
    expect(classesOf(screen.getByTestId("tabs", HIDDEN))).not.toContain(
      "overflow-hidden",
    );
  });
});

describe("Tab icons", () => {
  it("shows the leading icon, label and trailing icon in order", async () => {
    await render(
      <Tabs>
        <Tab
          active
          label="Posts"
          leadingIcon={<Icon name="search" />}
          trailingIcon={<Icon accessibilityLabel="Info" name="info-circle" />}
        />
      </Tabs>,
    );
    const names = tab("Posts").children.map((child) =>
      typeof child === "string" ? child : child.props["testID"],
    );
    expect(names.slice(0, 3)).toEqual([
      "icon-search",
      undefined,
      "icon-info-circle",
    ]);
  });

  it("gives a slotted Icon the size 24 and the text color of the tab", async () => {
    await render(
      <Tabs>
        <Tab active label="Posts" leadingIcon={<Probe />} />
        <Tab label="Media" leadingIcon={<Probe />} />
      </Tabs>,
    );
    const [active, other] = screen.getAllByTestId("probe", HIDDEN);
    expect(active?.props["children"]).toBe(
      "24 text-text-gray-on-soft-background",
    );
    expect(other?.props["children"]).toBe(
      "24 text-text-gray-on-soft-background",
    );
  });

  it("sizes a slotted Icon to 24", async () => {
    await render(
      <Tabs>
        <Tab label="Posts" leadingIcon={<Icon name="search" />} />
      </Tabs>,
    );
    const icon = screen.getByTestId("icon-search", HIDDEN);
    expect(icon.props["width"]).toBe(24);
    expect(icon.props["height"]).toBe(24);
  });

  it("hides an icon without an accessibility label and keeps a labelled one", async () => {
    await render(
      <Tabs>
        <Tab
          label="Posts"
          leadingIcon={<Icon name="search" />}
          trailingIcon={<Icon accessibilityLabel="Info" name="info-circle" />}
        />
      </Tabs>,
    );
    expect(
      screen.getByTestId("icon-search", HIDDEN).props[
        "accessibilityElementsHidden"
      ],
    ).toBe(true);
    const labelled = screen.getByTestId("icon-info-circle", HIDDEN);
    expect(labelled.props["accessibilityLabel"]).toBe("Info");
    expect(labelled.props["accessibilityElementsHidden"]).toBeUndefined();
  });
});

describe("Tab selection", () => {
  it("calls onPress once for a pressed Default tab", async () => {
    const onPress = jest.fn();
    await render(<Bar onPress={onPress} />);
    await fireEvent.press(tab("Media"));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith("Media");
  });

  it("does not call onPress for the Active tab", async () => {
    const onPress = jest.fn();
    await render(<Bar onPress={onPress} />);
    await fireEvent.press(tab("Posts"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("keeps the Active tab until the screen passes a new one", async () => {
    const { rerender } = await render(<Bar />);
    await fireEvent.press(tab("Media"));
    expect(
      screen.getByRole("tab", { name: "Posts", selected: true }),
    ).toBeTruthy();
    await rerender(<Bar active="Media" />);
    expect(
      screen.getByRole("tab", { name: "Media", selected: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole("tab", { name: "Posts", selected: false }),
    ).toBeTruthy();
  });
});

describe("Tab looks", () => {
  it("shows a Default tab with no fill", async () => {
    await render(<Bar />);
    expect(classesOf(tab("Media"))).not.toEqual(
      expect.arrayContaining(["bg-surface-gray-light"]),
    );
    expect(classesOf(screen.getByText("Media"))).toContain(
      "text-text-gray-on-soft-background",
    );
  });

  it("gives a pressed Default tab the Hover look until the finger lifts", async () => {
    await render(<Bar />);
    await fireEvent(tab("Media"), "pressIn");
    expect(classesOf(tab("Media"))).toContain("bg-surface-gray-light");
    expect(classesOf(screen.getByText("Media"))).toContain(
      "text-text-default-body",
    );
    await fireEvent(tab("Media"), "pressOut");
    expect(classesOf(tab("Media"))).not.toContain("bg-surface-gray-light");
  });

  it("gives a focused Default tab the Focus look until focus leaves", async () => {
    await render(<Bar />);
    await fireEvent(tab("Media"), "focus");
    expect(classesOf(tab("Media"))).toContain("bg-surface-gray-soft");
    expect(classesOf(screen.getAllByTestId("tab-edge", HIDDEN)[1])).toEqual(
      expect.arrayContaining(["border-2", "border-stroke-brand-strong"]),
    );
    await fireEvent(tab("Media"), "blur");
    expect(classesOf(tab("Media"))).not.toContain("bg-surface-gray-soft");
  });

  it("gives the Active tab a white raised look that pressing and focus do not change", async () => {
    await render(<Bar />);
    const before = classesOf(tab("Posts"));
    expect(before).toEqual(
      expect.arrayContaining(["bg-surface-default-main", "shadow-2"]),
    );
    expect(classesOf(screen.getAllByTestId("tab-edge", HIDDEN)[0])).toEqual(
      expect.arrayContaining(["border", "border-alpha-dark-10"]),
    );
    await fireEvent(tab("Posts"), "pressIn");
    await fireEvent(tab("Posts"), "focus");
    expect(classesOf(tab("Posts"))).toEqual(before);
  });

  it("sets a shadow in every look, so NativeWind never gains variables on a mounted tab", async () => {
    await render(<Bar />);
    const media = tab("Media");
    expect(classesOf(media)).toContain("shadow-none");
    await fireEvent(media, "pressIn");
    expect(classesOf(media)).toContain("shadow-none");
    await fireEvent(media, "focus");
    expect(classesOf(media)).toContain("shadow-none");
    expect(classesOf(tab("Posts"))).toContain("shadow-2");
  });

  it("keeps responding after the Active tab changes", async () => {
    const onPress = jest.fn();
    const { rerender } = await render(<Bar onPress={onPress} />);
    await fireEvent.press(tab("Media"));
    await rerender(<Bar active="Media" onPress={onPress} />);
    await fireEvent.press(tab("Posts"));
    expect(onPress).toHaveBeenLastCalledWith("Posts");
    expect(onPress).toHaveBeenCalledTimes(2);
  });
});

describe("Tabs layouts", () => {
  it("shares the width of the bar between equal tabs", async () => {
    await render(<Bar layout="equal" />);
    for (const node of screen.getAllByRole("tab")) {
      expect(classesOf(node)).toContain("flex-1");
    }
    expect(classesOf(screen.getByTestId("tabs", HIDDEN))).toContain("w-full");
    expect(classesOf(screen.getByTestId("tabs-row", HIDDEN))).toEqual(
      expect.arrayContaining(["flex-row", "gap-px"]),
    );
    expect(screen.queryByTestId("tabs-scroll", HIDDEN)).toBeNull();
  });

  it("scrolls content tabs sideways without an indicator, in a full width bar", async () => {
    await render(<Bar layout="content" />);
    const scroll = screen.getByTestId("tabs-scroll", HIDDEN);
    expect(scroll.props["horizontal"]).toBe(true);
    expect(scroll.props["showsHorizontalScrollIndicator"]).toBe(false);
    expect(classesOf(screen.getByTestId("tabs", HIDDEN))).toContain("w-full");
    expect(screen.queryByTestId("tabs-row", HIDDEN)).toBeNull();
  });

  it("sizes content tabs to their content", async () => {
    await render(<Bar layout="content" />);
    for (const node of screen.getAllByRole("tab")) {
      expect(classesOf(node)).not.toContain("flex-1");
    }
  });
});

describe("Tabs accessibility", () => {
  it("exposes the tab list, tab roles, labels and selected state", async () => {
    await render(<Bar active="Media" />);
    expect(screen.getByTestId("tabs", HIDDEN).props["accessibilityRole"]).toBe(
      "tablist",
    );
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(
      screen.getByRole("tab", { name: "Media", selected: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole("tab", { name: "Posts", selected: false }),
    ).toBeTruthy();
  });

  it("lets the label be set apart from the visible text", async () => {
    await render(
      <Tabs>
        <Tab accessibilityLabel="Your posts" label="Posts" />
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Your posts" })).toBeTruthy();
  });

  it.each([
    [36, 44, 4],
    [36, 48, 6],
    [44, 44, 0],
    [44, 48, 2],
  ] as const)(
    "pads a %s px tab to %s with %s px on each side",
    (height, minimum, slop) => {
      expect(hitSlopFor(height, minimum)).toBe(slop);
    },
  );

  it("pads a size m tab to the minimum, above and below only", async () => {
    await render(<Bar />);
    expect(tab("Posts").props["hitSlop"]).toEqual({ bottom: 4, top: 4 });
  });

  it("needs no padding for a size l tab on iOS", async () => {
    await render(<Bar size="l" />);
    expect(tab("Posts").props["hitSlop"]).toEqual({ bottom: 0, top: 0 });
  });
});
