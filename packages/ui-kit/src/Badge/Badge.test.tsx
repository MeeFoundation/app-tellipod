import { render, screen } from "@testing-library/react-native";

import { spacing } from "../../tailwind/tokens/spacing";
import { Icon } from "../Icon/Icon";
import {
  Badge,
  type BadgeShape,
  type BadgeSize,
  type BadgeType,
  type BadgeVariant,
} from "./Badge";

const TYPES: readonly BadgeType[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
];
const VARIANTS: readonly BadgeVariant[] = [
  "filled-solid",
  "filled-light",
  "outlined-light",
];
const SIZES: readonly BadgeSize[] = ["xxs", "xs", "s", "m"];
const SHAPES: readonly BadgeShape[] = ["rounded", "pill", "circle", "dot"];

// Decorative parts are hidden from assistive technology, so queries include hidden elements.
const HIDDEN = { includeHiddenElements: true } as const;

const propOf = (
  element: { readonly props: Record<string, unknown> },
  name: string,
): unknown => element.props[name];

const classesOf = (
  element: { readonly props: Record<string, unknown> } | undefined,
): readonly string[] =>
  String((element && propOf(element, "className")) ?? "")
    .split(/\s+/)
    .filter(Boolean);

const badge = () => screen.getByTestId("badge", HIDDEN);

describe("Badge variants", () => {
  it("is a size m Primary Filled - solid Rounded badge by default", async () => {
    await render(<Badge label="Active" />);
    expect(classesOf(badge())).toEqual(
      expect.arrayContaining([
        "h-7",
        "px-2",
        "rounded-md",
        "bg-surface-brand-solid",
        "border-stroke-brand-solid",
      ]),
    );
    expect(classesOf(screen.getByText("Active"))).toEqual(
      expect.arrayContaining([
        "text-text-brand-on-solid-background",
        "text-base",
      ]),
    );
  });

  it("selects the Success Filled - light look", async () => {
    await render(<Badge label="Done" type="success" variant="filled-light" />);
    expect(classesOf(badge())).toEqual(
      expect.arrayContaining([
        "bg-surface-success-soft",
        "border-stroke-success-light",
      ]),
    );
    expect(classesOf(screen.getByText("Done"))).toContain(
      "text-text-success-solid",
    );
  });

  it("draws an Outlined - light badge without a fill", async () => {
    await render(
      <Badge label="Hold" type="warning" variant="outlined-light" />,
    );
    expect(classesOf(badge())).toContain("border-stroke-warning-light");
    expect(classesOf(badge()).some((name) => name.startsWith("bg-"))).toBe(
      false,
    );
  });

  it("maps Secondary to gray and Danger to error", async () => {
    await render(
      <>
        <Badge label="Gray" type="secondary" />
        <Badge label="Error" type="danger" />
      </>,
    );
    const [gray, error] = screen.getAllByTestId("badge", HIDDEN);
    expect(classesOf(gray)).toContain("bg-surface-gray-solid");
    expect(classesOf(error)).toContain("bg-surface-error-solid");
  });

  it("renders every combination of type, style, size and shape", async () => {
    for (const type of TYPES) {
      for (const variant of VARIANTS) {
        for (const size of SIZES) {
          for (const shape of SHAPES) {
            await render(
              shape === "dot" ? (
                <Badge
                  shape={shape}
                  size={size}
                  type={type}
                  variant={variant}
                />
              ) : (
                <Badge
                  label="9+"
                  shape={shape}
                  size={size}
                  type={type}
                  variant={variant}
                />
              ),
            );
            expect(screen.getAllByTestId("badge", HIDDEN)).toHaveLength(1);
            await screen.unmount();
          }
        }
      }
    }
  });
});

describe("Badge sizes and shapes", () => {
  it.each([
    ["xxs", "h-4", "16px"],
    ["xs", "h-5", "20px"],
    ["s", "h-6", "24px"],
    ["m", "h-7", "28px"],
  ] as const)(
    "size %s uses %s, which is %s",
    async (size, heightClass, pixels) => {
      await render(<Badge label="Tag" size={size} />);
      expect(classesOf(badge())).toContain(heightClass);
      expect(
        Object.entries(spacing).find(
          ([key]) => key === heightClass.replace("h-", ""),
        )?.[1],
      ).toBe(pixels);
    },
  );

  it.each([
    ["xxs", "rounded"],
    ["xs", "rounded"],
    ["s", "rounded"],
    ["m", "rounded-md"],
  ] as const)("a rounded badge of size %s uses %s", async (size, radius) => {
    await render(<Badge label="Tag" shape="rounded" size={size} />);
    expect(classesOf(badge())).toContain(radius);
    expect(classesOf(badge())).not.toContain("rounded-full");
  });

  it("makes a pill fully rounded with the label of a rounded badge", async () => {
    await render(<Badge label="Tag" shape="pill" />);
    expect(classesOf(badge())).toContain("rounded-full");
    expect(screen.getByText("Tag")).toBeOnTheScreen();
  });

  it.each([
    ["xxs", "h-4", "min-w-4"],
    ["xs", "h-5", "min-w-5"],
    ["s", "h-6", "min-w-6"],
    ["m", "h-7", "min-w-7"],
  ] as const)(
    "a circle badge of size %s is as wide as high at least",
    async (size, height, minWidth) => {
      await render(<Badge label="9+" shape="circle" size={size} />);
      expect(screen.getByText("9+")).toBeOnTheScreen();
      expect(classesOf(badge())).toEqual(
        expect.arrayContaining([height, minWidth, "rounded-full"]),
      );
    },
  );

  it.each([
    ["xxs", "size-1", "4px"],
    ["xs", "size-2", "8px"],
    ["s", "size-3", "12px"],
    ["m", "size-4", "16px"],
  ] as const)(
    "a dot badge of size %s is %s, which is %s",
    async (size, sizeClass, pixels) => {
      await render(<Badge shape="dot" size={size} />);
      expect(classesOf(badge())).toEqual(
        expect.arrayContaining([sizeClass, "rounded-full"]),
      );
      expect(
        Object.entries(spacing).find(
          ([key]) => key === sizeClass.replace("size-", ""),
        )?.[1],
      ).toBe(pixels);
      expect(screen.queryByTestId("badge-label", HIDDEN)).toBeNull();
    },
  );
});

describe("Badge content", () => {
  it("reads leading dot, leading icon, label, trailing icon in order", async () => {
    await render(
      <Badge
        dot
        label="Active"
        leadingIcon={<Icon name="check-circle" />}
        size="s"
        trailingIcon={<Icon name="info-circle" />}
      />,
    );
    const order = [
      "icon-dot",
      "icon-check-circle",
      "badge-label",
      "icon-info-circle",
    ];
    const children = badge().children as readonly {
      readonly props: { readonly testID?: string };
    }[];
    expect(children.map((child) => child.props.testID)).toEqual(order);
  });

  it("gives the icons the size and text color of the badge", async () => {
    await render(
      <Badge
        label="Active"
        leadingIcon={<Icon name="check-circle" />}
        size="s"
        type="warning"
        variant="filled-light"
      />,
    );
    expect(
      propOf(screen.getByTestId("icon-check-circle", HIDDEN), "width"),
    ).toBe(14);
  });

  it("sizes the leading dot like the icons", async () => {
    await render(<Badge dot label="Live" size="xxs" />);
    expect(propOf(screen.getByTestId("icon-dot", HIDDEN), "width")).toBe(10);
  });

  it("has no leading dot unless asked", async () => {
    await render(<Badge label="Live" />);
    expect(screen.queryByTestId("icon-dot", HIDDEN)).toBeNull();
  });
});

describe("Badge accessibility", () => {
  it("is read as its label", async () => {
    await render(<Badge label="Active" />);
    const element = screen.getByLabelText("Active");
    expect(propOf(element, "accessibilityRole")).toBe("text");
    expect(propOf(element, "accessible")).toBe(true);
  });

  it("hides an unlabelled dot", async () => {
    await render(<Badge shape="dot" />);
    expect(screen.queryByTestId("badge")).toBeNull();
    expect(propOf(badge(), "accessible")).toBe(false);
  });

  it("announces a labelled dot", async () => {
    await render(<Badge accessibilityLabel="Unread" shape="dot" />);
    expect(screen.getByLabelText("Unread")).toBeOnTheScreen();
  });
});
