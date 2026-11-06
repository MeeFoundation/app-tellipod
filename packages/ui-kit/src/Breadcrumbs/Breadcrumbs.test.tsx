import { fireEvent, render, screen } from "@testing-library/react-native";
import type { FC } from "react";
import { ScrollView, Text } from "react-native";

import { Icon } from "../Icon/Icon";
import { useIconDefaults } from "../Icon/IconDefaults";
import { hitSlopFor } from "../touchTarget";
import {
  Breadcrumb,
  Breadcrumbs,
  type BreadcrumbsSize,
  type BreadcrumbsVariant,
} from "./Breadcrumbs";

const SIZES: readonly BreadcrumbsSize[] = ["s", "m", "l"];
const HIDDEN = { includeHiddenElements: true } as const;

const classesOf = (
  element: { readonly props: Record<string, unknown> } | undefined,
): readonly string[] =>
  String(element?.props["className"] ?? "")
    .split(/\s+/)
    .filter(Boolean);

const link = (label: string) => screen.getByRole("link", { name: label });

const Probe: FC = () => {
  const defaults = useIconDefaults();
  return (
    <Text testID="probe">{`${defaults?.size} ${defaults?.className}`}</Text>
  );
};

const Trail: FC<{
  readonly size?: BreadcrumbsSize;
  readonly variant?: BreadcrumbsVariant;
  readonly onSelect?: (label: string) => void;
  readonly disabled?: string;
}> = ({ size, variant, onSelect = () => undefined, disabled }) => (
  <Breadcrumbs size={size ?? "m"} variant={variant ?? "simple"}>
    {["Home", "Health", "Medical records"].map((label) => (
      <Breadcrumb
        disabled={label === disabled}
        key={label}
        label={label}
        onPress={() => onSelect(label)}
      />
    ))}
    <Breadcrumb label="Lab results" />
  </Breadcrumbs>
);

describe("Breadcrumbs container", () => {
  it("renders the items in order, links first and the current place as text", async () => {
    await render(<Trail />);
    expect(
      screen.getAllByRole("link").map((n) => n.props["accessibilityLabel"]),
    ).toEqual(["Home", "Health", "Medical records"]);
    expect(screen.getByText("Lab results")).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Lab results" })).toBeNull();
  });

  it("draws a chevron after every item but the last", async () => {
    await render(<Trail />);
    expect(screen.getAllByTestId("icon-chevron-right", HIDDEN)).toHaveLength(3);
  });

  it("has no chevron for a single item", async () => {
    await render(
      <Breadcrumbs>
        <Breadcrumb label="Home" />
      </Breadcrumbs>,
    );
    expect(screen.queryByTestId("icon-chevron-right", HIDDEN)).toBeNull();
  });

  it("is a simple, size m line by default", async () => {
    await render(
      <Breadcrumbs>
        <Breadcrumb label="Home" onPress={() => undefined} />
        <Breadcrumb label="Health" />
      </Breadcrumbs>,
    );
    const line = classesOf(screen.getByTestId("breadcrumbs", HIDDEN));
    expect(line).toEqual(expect.arrayContaining(["self-start", "max-w-full"]));
    expect(line).not.toContain("border");
    expect(classesOf(link("Home"))).toEqual(
      expect.arrayContaining(["h-5", "gap-1.5", "pl-0.5", "pr-1"]),
    );
    expect(classesOf(screen.getByText("Home"))).toEqual(
      expect.arrayContaining(["text-sm", "font-public-sans-regular"]),
    );
  });

  it.each([
    ["s", "h-4", "text-xs", "px-1.5"],
    ["m", "h-5", "text-sm", "px-2"],
    ["l", "h-6", "text-base", "px-2.5"],
  ] as const)(
    "size %s uses its item height, label and box padding",
    async (size, height, text, box) => {
      await render(<Trail size={size} variant="outlined" />);
      expect(classesOf(link("Home"))).toContain(height);
      expect(classesOf(screen.getByText("Home"))).toContain(text);
      expect(classesOf(screen.getByTestId("breadcrumbs", HIDDEN))).toEqual(
        expect.arrayContaining([
          box,
          "py-1",
          "border",
          "border-stroke-gray-light",
          "bg-surface-gray-soft",
          "rounded-md",
        ]),
      );
    },
  );

  it("gives a slotted Icon the item's size and text color", async () => {
    await render(
      <Breadcrumbs size="l">
        <Breadcrumb
          label="Home"
          leadingIcon={<Probe />}
          onPress={() => undefined}
        />
        <Breadcrumb label="Health" />
      </Breadcrumbs>,
    );
    expect(screen.getByTestId("probe", HIDDEN).props["children"]).toBe(
      "20 text-text-brand-solid",
    );
  });

  it.each([
    ["s", 14, 10],
    ["m", 16, 12],
    ["l", 20, 14],
  ] as const)(
    "size %s draws a %s px house and a %s px chevron",
    async (size, house, chevron) => {
      await render(
        <Breadcrumbs size={size}>
          <Breadcrumb
            label="Home"
            leadingIcon={<Icon name="house" />}
            onPress={() => undefined}
          />
          <Breadcrumb label="Health" />
        </Breadcrumbs>,
      );
      expect(screen.getByTestId("icon-house", HIDDEN).props["width"]).toBe(
        house,
      );
      expect(
        screen.getByTestId("icon-chevron-right", HIDDEN).props["width"],
      ).toBe(chevron);
    },
  );
});

describe("Breadcrumb links", () => {
  it("calls onPress once for a link", async () => {
    const onPress = jest.fn();
    await render(<Trail onSelect={onPress} />);
    await fireEvent.press(link("Medical records"));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith("Medical records");
  });

  it("does not respond to the current place", async () => {
    const onPress = jest.fn();
    await render(<Trail onSelect={onPress} />);
    await fireEvent.press(screen.getByText("Lab results"));
    expect(onPress).not.toHaveBeenCalled();
    expect(classesOf(screen.getByText("Lab results"))).toContain(
      "text-text-gray-solid",
    );
  });

  it("does not call onPress for a disabled link, and fades it", async () => {
    const onPress = jest.fn();
    await render(<Trail disabled="Health" onSelect={onPress} />);
    await fireEvent.press(link("Health"));
    expect(onPress).not.toHaveBeenCalled();
    expect(classesOf(link("Health"))).toContain("opacity-60");
    expect(classesOf(screen.getByText("Health"))).toContain(
      "text-text-gray-solid",
    );
  });
});

describe("Breadcrumb looks", () => {
  it("shows a Default link teal with no underline or fill", async () => {
    await render(<Trail />);
    expect(classesOf(screen.getByText("Health"))).toContain(
      "text-text-brand-solid",
    );
    expect(classesOf(link("Health"))).not.toContain("bg-surface-brand-light");
    expect(screen.queryByTestId("breadcrumb-underline", HIDDEN)).toBeNull();
  });

  it("gives a pressed link the Hover look until the finger lifts", async () => {
    await render(<Trail />);
    await fireEvent(link("Health"), "pressIn");
    expect(classesOf(screen.getByText("Health"))).toContain(
      "text-text-brand-solid_hover",
    );
    expect(screen.getByTestId("breadcrumb-underline", HIDDEN)).toBeTruthy();
    await fireEvent(link("Health"), "pressOut");
    expect(classesOf(screen.getByText("Health"))).toContain(
      "text-text-brand-solid",
    );
    expect(screen.queryByTestId("breadcrumb-underline", HIDDEN)).toBeNull();
  });

  it("gives a focused link the Focus look until focus leaves", async () => {
    await render(<Trail />);
    await fireEvent(link("Health"), "focus");
    expect(classesOf(link("Health"))).toContain("bg-surface-brand-light");
    expect(classesOf(screen.getByText("Health"))).toContain(
      "text-text-brand-solid_hover",
    );
    expect(screen.queryByTestId("breadcrumb-underline", HIDDEN)).toBeNull();
    await fireEvent(link("Health"), "blur");
    expect(classesOf(link("Health"))).not.toContain("bg-surface-brand-light");
  });

  it("puts the underline at the bottom of the label per size", async () => {
    const bottoms = { l: "bottom-0.75", m: "bottom-0.5", s: "bottom-px" };
    for (const size of SIZES) {
      const { unmount } = await render(<Trail size={size} />);
      await fireEvent(link("Health"), "pressIn");
      expect(
        classesOf(screen.getByTestId("breadcrumb-underline", HIDDEN)),
      ).toContain(bottoms[size]);
      await unmount();
    }
  });
});

describe("Breadcrumbs scrolling", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("is one horizontal line without a scroll indicator", async () => {
    await render(<Trail />);
    const scroll = screen.getByTestId("breadcrumbs-scroll", HIDDEN);
    expect(scroll.props["horizontal"]).toBe(true);
    expect(scroll.props["showsHorizontalScrollIndicator"]).toBe(false);
  });

  it("scrolls to the end when its content or the room for it changes", async () => {
    const scrollToEnd = jest
      .spyOn(ScrollView.prototype, "scrollToEnd")
      .mockImplementation(() => undefined);
    await render(<Trail />);
    const layout = async (parent: number) =>
      fireEvent(screen.getByTestId("breadcrumbs-parent", HIDDEN), "layout", {
        nativeEvent: { layout: { height: 20, width: parent } },
      });
    const content = async (width: number) =>
      fireEvent(
        screen.getByTestId("breadcrumbs-scroll", HIDDEN),
        "contentSizeChange",
        width,
        20,
      );
    await layout(400);
    await content(800);
    expect(scrollToEnd).toHaveBeenCalledTimes(1);
    expect(scrollToEnd).toHaveBeenCalledWith({ animated: false });
    await content(800);
    expect(scrollToEnd).toHaveBeenCalledTimes(1);
    await layout(300);
    expect(scrollToEnd).toHaveBeenCalledTimes(2);
  });
});

describe("Breadcrumbs width", () => {
  const widthOf = () =>
    (
      screen.getByTestId("breadcrumbs-scroll", HIDDEN).props["style"] as
        | { readonly width: number }
        | undefined
    )?.width;
  const measure = async (parent: number, content: number) => {
    await fireEvent(
      screen.getByTestId("breadcrumbs-parent", HIDDEN),
      "layout",
      {
        nativeEvent: { layout: { height: 20, width: parent } },
      },
    );
    await fireEvent(
      screen.getByTestId("breadcrumbs-scroll", HIDDEN),
      "contentSizeChange",
      content,
      20,
    );
  };

  it("does not grow to fill the height of its parent", async () => {
    // A horizontal ScrollView grows by default, and filled the screen under a column parent.
    await render(<Trail />);
    expect(
      classesOf(screen.getByTestId("breadcrumbs-scroll", HIDDEN)),
    ).toContain("grow-0");
  });

  it("has no width until it is measured", async () => {
    await render(<Trail />);
    expect(widthOf()).toBeUndefined();
  });

  it("is as wide as a short trail", async () => {
    await render(<Trail />);
    await measure(390, 250);
    expect(widthOf()).toBe(250);
  });

  it("is no wider than its parent for a long trail", async () => {
    await render(<Trail />);
    await measure(390, 800);
    expect(widthOf()).toBe(390);
  });

  it("leaves room for the padding and border of the outlined box", async () => {
    await render(<Trail size="m" variant="outlined" />);
    await measure(390, 800);
    expect(widthOf()).toBe(390 - 2 * 8 - 2);
  });
});

describe("Breadcrumbs accessibility", () => {
  it("labels the line and lets the screen replace the label", async () => {
    const { rerender } = await render(<Trail />);
    expect(
      screen.getByTestId("breadcrumbs", HIDDEN).props["accessibilityLabel"],
    ).toBe("Breadcrumbs");
    await rerender(
      <Breadcrumbs accessibilityLabel="Where this pod is">
        <Breadcrumb label="Home" />
      </Breadcrumbs>,
    );
    expect(
      screen.getByTestId("breadcrumbs", HIDDEN).props["accessibilityLabel"],
    ).toBe("Where this pod is");
  });

  it("gives a link the role, label and disabled state", async () => {
    await render(<Trail disabled="Health" />);
    expect(link("Home").props["accessibilityState"]).toEqual({
      disabled: false,
    });
    expect(link("Health").props["accessibilityState"]).toEqual({
      disabled: true,
    });
  });

  it("hides the chevron and an unlabelled icon from assistive technology", async () => {
    await render(
      <Breadcrumbs>
        <Breadcrumb
          label="Home"
          leadingIcon={<Icon name="house" />}
          onPress={() => undefined}
        />
        <Breadcrumb label="Health" />
      </Breadcrumbs>,
    );
    expect(
      screen.getByTestId("icon-chevron-right", HIDDEN).props[
        "accessibilityElementsHidden"
      ],
    ).toBe(true);
    expect(
      screen.getByTestId("icon-house", HIDDEN).props[
        "accessibilityElementsHidden"
      ],
    ).toBe(true);
  });

  it("reads the current place as text with its label", async () => {
    await render(<Trail />);
    expect(
      screen.getByLabelText("Lab results").props["accessibilityRole"],
    ).toBe("text");
  });

  it("pads the touch area of each size to the platform minimum", async () => {
    for (const [size, height] of [
      ["s", 16],
      ["m", 20],
      ["l", 24],
    ] as const) {
      const { unmount } = await render(<Trail size={size} />);
      const slop = hitSlopFor(height, 44);
      expect(link("Home").props["hitSlop"]).toEqual({
        bottom: slop,
        top: slop,
      });
      await unmount();
    }
    expect(hitSlopFor(16, 44)).toBe(14);
    expect(hitSlopFor(20, 48)).toBe(14);
    expect(hitSlopFor(24, 44)).toBe(10);
    expect(hitSlopFor(48, 48)).toBe(0);
  });
});
