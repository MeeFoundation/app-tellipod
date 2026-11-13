import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { Icon } from "../Icon/Icon";
import { useIconDefaults } from "../Icon/IconDefaults";
import { Toast, type ToastType } from "./Toast";

const HIDDEN = { includeHiddenElements: true } as const;

// Shows the size and color that the icon slot gives an Icon with none of its own.
const Probe = () => {
  const defaults = useIconDefaults();
  return <Text>{`${defaults?.size} ${defaults?.className}`}</Text>;
};

const classOf = (testID: string): string =>
  String(screen.getByTestId(testID, HIDDEN).props["className"]);

describe("Toast types", () => {
  it("is a Secondary toast with only a title", async () => {
    await render(<Toast title="Just a notification" />);
    expect(screen.getByText("Just a notification")).toBeTruthy();
    expect(classOf("toast")).toContain("bg-surface-default-main");
    expect(classOf("toast")).toContain("border-gray-200");
  });

  it.each([
    [
      "primary",
      "bg-brand-50",
      "border-brand-300",
      "text-brand-900",
      "text-brand-800",
    ],
    [
      "secondary",
      "bg-surface-default-main",
      "border-gray-200",
      "text-gray-900",
      "text-gray-800",
    ],
    [
      "success",
      "bg-success-50",
      "border-success-300",
      "text-success-900",
      "text-success-800",
    ],
    [
      "danger",
      "bg-error-50",
      "border-error-300",
      "text-error-900",
      "text-error-800",
    ],
  ] as const satisfies readonly (readonly [
    ToastType,
    string,
    string,
    string,
    string,
  ])[])(
    "%s has its fill, border and text colors",
    async (type, fill, edge, title, description) => {
      await render(<Toast description="Line" title="Title" type={type} />);
      expect(classOf("toast")).toContain(fill);
      expect(classOf("toast")).toContain(edge);
      expect(classOf("toast-title")).toContain(title);
      expect(classOf("toast-description")).toContain(description);
    },
  );

  it("shows the danger look with both lines", async () => {
    await render(
      <Toast
        description="Try to refresh your page."
        title="Server error!"
        type="danger"
      />,
    );
    expect(screen.getByText("Server error!")).toBeTruthy();
    expect(screen.getByText("Try to refresh your page.")).toBeTruthy();
    expect(classOf("toast")).toContain("bg-error-50");
  });
});

describe("Toast looks", () => {
  it("has a border, 8 px corners, the shadow and a clip", async () => {
    await render(<Toast title="Title" />);
    expect(classOf("toast")).toEqual(expect.stringContaining("shadow-3"));
    expect(classOf("toast")).toContain("rounded-lg");
    expect(classOf("toast")).toContain("border");
    expect(classOf("toast-clip")).toContain("overflow-hidden");
    expect(classOf("toast-clip")).toContain("px-4");
    expect(classOf("toast-clip")).toContain("py-3");
    expect(classOf("toast")).toContain("w-full");
  });

  it("sets the title in SM Semi Bold and the description in SM Regular", async () => {
    await render(<Toast description="Description" title="Title" />);
    expect(classOf("toast-title")).toContain("font-public-sans-semibold");
    expect(classOf("toast-title")).toContain("text-sm");
    expect(classOf("toast-description")).toContain("font-public-sans-regular");
    expect(classOf("toast-description")).toContain("text-sm");
  });

  it("lets a long title wrap without cutting it", async () => {
    await render(
      <Toast title="A title that is much longer than one line of the toast can hold at once" />,
    );
    expect(
      screen.getByTestId("toast-title").props["numberOfLines"],
    ).toBeUndefined();
    expect(
      screen.getByTestId("toast-title").props["ellipsizeMode"],
    ).toBeUndefined();
  });
});

describe("Toast icon, title and description", () => {
  it("gives the icon 16 px and the dark green of the title", async () => {
    await render(
      <Toast
        icon={<Probe />}
        title="All suggested contact info added"
        type="success"
      />,
    );
    expect(screen.getByText("16 text-success-900", HIDDEN)).toBeTruthy();
  });

  it("draws an Icon from the slot at 16 px", async () => {
    await render(
      <Toast
        icon={<Icon name="check-circle" />}
        title="All suggested contact info added"
        type="success"
      />,
    );
    expect(screen.getByTestId("icon-check-circle", HIDDEN).props["width"]).toBe(
      16,
    );
  });

  it("starts the description under the title text when there is an icon", async () => {
    await render(
      <Toast
        description="Description"
        icon={<Icon name="info-circle" />}
        title="Title"
        type="primary"
      />,
    );
    expect(screen.getByTestId("toast-icon-spacer", HIDDEN)).toBeTruthy();
  });

  it("adds no spacer without an icon", async () => {
    await render(<Toast description="Description" title="Title" />);
    expect(screen.queryByTestId("toast-icon-spacer", HIDDEN)).toBeNull();
  });
});

describe("Toast links", () => {
  it("shows one right link and calls its handler", async () => {
    const onView = jest.fn();
    await render(
      <Toast
        action={{ label: "View", onPress: onView }}
        title="Your order is ready!"
      />,
    );
    await fireEvent.press(screen.getByTestId("toast-right-action"));
    expect(onView).toHaveBeenCalledTimes(1);
    expect(classOf("toast-right-action-label")).toContain(
      "font-public-sans-regular",
    );
    expect(classOf("toast-right-action-label")).toContain(
      "text-text-brand-solid",
    );
    expect(screen.queryByTestId("toast-close")).toBeNull();
  });

  it("shows bottom links side by side below the description", async () => {
    await render(
      <Toast
        actions={[
          { label: "Action 1", onPress: jest.fn() },
          { label: "Action 2", onPress: jest.fn() },
        ]}
        description="Description"
        icon={<Icon name="info-circle" />}
        title="Item removed"
      />,
    );
    expect(classOf("toast-actions")).toContain("flex-row");
    expect(classOf("toast-actions")).toContain("gap-4");
    expect(screen.getByText("Action 1")).toBeTruthy();
    expect(screen.getByText("Action 2")).toBeTruthy();
  });

  it("calls the handler of the tapped link once", async () => {
    const onRefresh = jest.fn();
    await render(
      <Toast
        action={{ label: "Refresh", onPress: onRefresh }}
        title="Server error!"
        type="danger"
      />,
    );
    await fireEvent.press(screen.getByText("Refresh"));
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(classOf("toast-right-action-label")).toContain(
      "text-text-error-solid",
    );
  });

  it.each([
    ["primary", "text-text-brand-solid"],
    ["secondary", "text-text-brand-solid"],
    ["success", "text-text-success-solid"],
    ["danger", "text-text-error-solid"],
  ] as const)("colors a %s link %s", async (type, color) => {
    await render(
      <Toast
        action={{ label: "Go", onPress: jest.fn() }}
        title="T"
        type={type}
      />,
    );
    expect(classOf("toast-right-action-label")).toContain(color);
  });
});

describe("Toast close button", () => {
  it("calls onClose once and stays shown", async () => {
    const onClose = jest.fn();
    await render(<Toast onClose={onClose} title="Item removed" />);
    await fireEvent.press(screen.getByTestId("toast-close"));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Item removed")).toBeTruthy();
  });

  it("shows no close button without onClose", async () => {
    await render(<Toast title="Item removed" />);
    expect(screen.queryByTestId("toast-close")).toBeNull();
  });

  it("draws a 20 px x and reaches the minimum touch target without growing", async () => {
    await render(<Toast onClose={jest.fn()} title="Item removed" />);
    const slop = screen.getByTestId("toast-close").props["hitSlop"] as Record<
      string,
      number
    >;
    expect(screen.getByTestId("icon-x", HIDDEN).props["width"]).toBe(20);
    // 20 px plus the slop on both sides reaches 44 pt on iOS (the test platform).
    expect(
      20 + (slop["left"] ?? 0) + (slop["right"] ?? 0),
    ).toBeGreaterThanOrEqual(44);
    expect(
      20 + (slop["top"] ?? 0) + (slop["bottom"] ?? 0),
    ).toBeGreaterThanOrEqual(44);
    expect(classOf("toast-clip")).not.toContain("min-h");
  });
});

describe("Toast accessibility", () => {
  it("reads the title and then the description as one text, then the link", async () => {
    await render(
      <Toast
        action={{ label: "Refresh", onPress: jest.fn() }}
        description="Try to refresh your page."
        title="Server error!"
        type="danger"
      />,
    );
    expect(
      screen.getByLabelText("Server error! Try to refresh your page."),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeTruthy();
  });

  it("labels the close button Close", async () => {
    await render(<Toast onClose={jest.fn()} title="Item removed" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
  });

  it("hides the leading icon from assistive technology", async () => {
    await render(<Toast icon={<Icon name="check-circle" />} title="Done" />);
    expect(
      screen.getByTestId("toast-icon", HIDDEN).props[
        "accessibilityElementsHidden"
      ],
    ).toBe(true);
  });
});
