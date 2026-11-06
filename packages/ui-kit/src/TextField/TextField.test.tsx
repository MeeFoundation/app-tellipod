import { fireEvent, render, screen } from "@testing-library/react-native";
import type { FC } from "react";
import { AccessibilityInfo, Animated, Text } from "react-native";

import { Icon } from "../Icon/Icon";
import { useIconDefaults } from "../Icon/IconDefaults";
import {
  hitSlopFor,
  labelTarget,
  TextField,
  type TextFieldSize,
  type TextFieldVariant,
} from "./TextField";

const VARIANTS: readonly TextFieldVariant[] = [
  "label-above",
  "label-on-edge",
  "label-inside",
];
const SIZES: readonly TextFieldSize[] = ["s", "m", "l"];

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

const noop = () => undefined;

// Shows the text color an Icon would take from the field.
const Probe: FC = () => (
  <Text testID="probe">{useIconDefaults()?.className}</Text>
);

const field = () => screen.getByTestId("text-field-field", HIDDEN);
const ring = () => screen.getByTestId("text-field-ring", HIDDEN);
const input = () => screen.getByTestId("text-field-input", HIDDEN);

describe("TextField variants", () => {
  it.each(
    VARIANTS.flatMap((variant) =>
      SIZES.map((size) => [variant, size] as const),
    ),
  )("renders %s at size %s", async (variant, size) => {
    await render(
      <TextField
        label="Email"
        onChangeText={noop}
        size={size}
        value=""
        variant={variant}
      />,
    );
    expect(field()).toBeTruthy();
  });

  it("is a size m Label above field by default", async () => {
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    expect(classesOf(field())).toEqual(
      expect.arrayContaining(["h-9", "px-3", "rounded-xl", "gap-2"]),
    );
    expect(screen.getByText("Email")).toBeTruthy();
  });

  it.each([
    ["s", "h-7.5"],
    ["m", "h-9"],
    ["l", "h-11"],
  ] as const)("is %s at the design height %s", async (size, height) => {
    await render(
      <TextField label="Email" onChangeText={noop} size={size} value="" />,
    );
    expect(classesOf(field())).toContain(height);
  });

  it.each([
    ["s", "h-10"],
    ["m", "h-12"],
    ["l", "h-14"],
  ] as const)("is %s tall inside the label: %s", async (size, height) => {
    await render(
      <TextField
        label="Email"
        onChangeText={noop}
        size={size}
        value=""
        variant="label-inside"
      />,
    );
    expect(classesOf(field())).toEqual(
      expect.arrayContaining([height, "gap-3"]),
    );
  });
});

describe("TextField states", () => {
  it("shows the gray stroke by default", async () => {
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    expect(classesOf(field())).toEqual(
      expect.arrayContaining([
        "border-stroke-gray-accent",
        "bg-surface-default-main",
      ]),
    );
    expect(screen.queryByTestId("text-field-ring", HIDDEN)).toBeNull();
  });

  it("shows the brand stroke and ring while focused", async () => {
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    await fireEvent(input(), "focus");
    expect(classesOf(field())).toContain("border-stroke-brand-solid");
    expect(classesOf(ring())).toEqual(
      expect.arrayContaining([
        "border-outline-brand",
        "border-3",
        "-inset-0.75",
      ]),
    );
    expect(classesOf(screen.getByTestId("text-field-label"))).toContain(
      "text-text-brand-solid",
    );
    await fireEvent(input(), "blur");
    expect(screen.queryByTestId("text-field-ring", HIDDEN)).toBeNull();
  });

  it("shows the error look with the error icon and message", async () => {
    await render(
      <TextField
        error="Enter a valid email"
        label="Email"
        onChangeText={noop}
        value="paula"
      />,
    );
    expect(classesOf(field())).toContain("border-stroke-error-solid");
    expect(screen.queryByTestId("text-field-ring", HIDDEN)).toBeNull();
    expect(classesOf(screen.getByTestId("text-field-label"))).toContain(
      "text-text-error-solid",
    );
    expect(classesOf(screen.getByText("Enter a valid email"))).toContain(
      "text-text-error-solid",
    );
    expect(screen.getByTestId("icon-exclamation-circle", HIDDEN)).toBeTruthy();
  });

  it("shows the error ring while an error field is focused", async () => {
    await render(
      <TextField error="Bad" label="Email" onChangeText={noop} value="" />,
    );
    await fireEvent(input(), "focus");
    expect(classesOf(field())).toContain("border-stroke-error-solid");
    expect(classesOf(ring())).toContain("border-outline-error");
  });

  it("shows the disabled look and does not take input", async () => {
    await render(
      <TextField disabled label="Email" onChangeText={noop} value="" />,
    );
    expect(classesOf(field())).toEqual(
      expect.arrayContaining(["bg-surface-gray-light", "opacity-50"]),
    );
    expect(propOf(input(), "editable")).toBe(false);
  });

  it("shows the value in the body color and the placeholder in its own", async () => {
    await render(
      <TextField
        label="Email"
        onChangeText={noop}
        placeholder="paula@mee.org"
        value=""
      />,
    );
    expect(classesOf(input())).toEqual(
      expect.arrayContaining([
        "text-text-default-body",
        "placeholder:text-text-default-placeholder",
      ]),
    );
    expect(propOf(input(), "placeholder")).toBe("paula@mee.org");
  });

  it("reports typed text", async () => {
    const onChangeText = jest.fn();
    await render(
      <TextField label="Email" onChangeText={onChangeText} value="" />,
    );
    await fireEvent.changeText(input(), "coffee");
    expect(onChangeText).toHaveBeenCalledWith("coffee");
  });
});

describe("TextField text position", () => {
  it("leaves the line height off the input so iOS centers the text", async () => {
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    expect(propOf(input(), "style")).toEqual({ lineHeight: undefined });
  });
});

describe("TextField label", () => {
  const labelCount = () => screen.queryAllByTestId("text-field-label").length;

  it("stays above the field at every state", async () => {
    await render(
      <TextField label="Email" onChangeText={noop} required value="" />,
    );
    expect(screen.getByText("Email*")).toBeTruthy();
    expect(labelCount()).toBe(1);
    await fireEvent(input(), "focus");
    expect(labelCount()).toBe(1);
    expect(screen.queryByTestId("text-field-label-move", HIDDEN)).toBeNull();
  });

  it.each(["label-on-edge", "label-inside"] as const)(
    "%s keeps one label that is hidden from assistive technology",
    async (variant) => {
      await render(
        <TextField
          label="Password"
          onChangeText={noop}
          required
          value=""
          variant={variant}
        />,
      );
      expect(screen.queryAllByTestId("text-field-label", HIDDEN)).toHaveLength(
        1,
      );
      expect(screen.queryByTestId("text-field-label")).toBeNull();
      expect(propOf(input(), "placeholder")).toBeUndefined();
    },
  );

  it.each(["label-on-edge", "label-inside"] as const)(
    "%s shows the label in the placeholder color until it moves",
    async (variant) => {
      const { rerender } = await render(
        <TextField
          label="Password"
          onChangeText={noop}
          value=""
          variant={variant}
        />,
      );
      const label = () => screen.getByTestId("text-field-label", HIDDEN);
      expect(classesOf(label())).toContain("text-text-default-placeholder");

      await fireEvent(input(), "focus");
      expect(classesOf(label())).toContain("text-text-brand-solid");

      await fireEvent(input(), "blur");
      expect(classesOf(label())).toContain("text-text-default-placeholder");

      await rerender(
        <TextField
          label="Password"
          onChangeText={noop}
          value="secret"
          variant={variant}
        />,
      );
      expect(classesOf(label())).toContain("text-text-default-body");
    },
  );

  it("puts a label on the edge on a strip of the field's fill once it moves", async () => {
    await render(
      <TextField
        label="Password"
        onChangeText={noop}
        value=""
        variant="label-on-edge"
      />,
    );
    const label = () => screen.getByTestId("text-field-label", HIDDEN);
    expect(classesOf(label())).toContain("px-0.5");
    expect(classesOf(label())).not.toContain("bg-surface-default-main");
    await fireEvent(input(), "focus");
    expect(classesOf(label())).toEqual(
      expect.arrayContaining(["bg-surface-default-main", "px-0.5"]),
    );
  });

  it.each(["label-on-edge", "label-inside"] as const)(
    "%s keeps the placeholder in the input",
    async (variant) => {
      await render(
        <TextField
          label="Email"
          onChangeText={noop}
          placeholder="paula@mee.org"
          value=""
          variant={variant}
        />,
      );
      expect(propOf(input(), "placeholder")).toBe("paula@mee.org");
      expect(
        classesOf(screen.getByTestId("text-field-label", HIDDEN)),
      ).toContain("text-text-default-body");
    },
  );
});

describe("TextField label animation", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const lastTiming = (timing: jest.SpyInstance) =>
    timing.mock.calls.at(-1)?.[1];

  it.each(["label-on-edge", "label-inside"] as const)(
    "%s animates the label to the top on focus and back on blur",
    async (variant) => {
      const timing = jest.spyOn(Animated, "timing");
      await render(
        <TextField
          label="Password"
          onChangeText={noop}
          value=""
          variant={variant}
        />,
      );
      expect(lastTiming(timing)).toMatchObject({ toValue: 0 });

      await fireEvent(input(), "focus");
      expect(lastTiming(timing)).toMatchObject({
        duration: 150,
        toValue: 1,
        useNativeDriver: true,
      });

      await fireEvent(input(), "blur");
      expect(lastTiming(timing)).toMatchObject({ toValue: 0 });
    },
  );

  it("animates the label when the value arrives", async () => {
    const timing = jest.spyOn(Animated, "timing");
    const { rerender } = await render(
      <TextField
        label="Password"
        onChangeText={noop}
        value=""
        variant="label-inside"
      />,
    );
    await rerender(
      <TextField
        label="Password"
        onChangeText={noop}
        value="secret"
        variant="label-inside"
      />,
    );
    expect(lastTiming(timing)).toMatchObject({ toValue: 1 });
  });

  it("does not animate the label above the field", async () => {
    const timing = jest.spyOn(Animated, "timing");
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    await fireEvent(input(), "focus");
    expect(screen.queryByTestId("text-field-label-move", HIDDEN)).toBeNull();
    expect(lastTiming(timing)).toMatchObject({ toValue: 1 });
  });

  it("moves at once when the system asks for less motion", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockResolvedValue(true);
    const timing = jest.spyOn(Animated, "timing");
    await render(
      <TextField
        label="Password"
        onChangeText={noop}
        value=""
        variant="label-inside"
      />,
    );
    await fireEvent(input(), "focus");
    expect(lastTiming(timing)).toMatchObject({ duration: 0, toValue: 1 });
  });
});

describe("TextField label target", () => {
  it.each([
    ["label-on-edge", "s", 30, { drop: 0, scale: 1, x: -1, y: -15 }],
    ["label-on-edge", "m", 36, { drop: 0, scale: 12 / 14, x: -1, y: -18 }],
    ["label-on-edge", "l", 44, { drop: 0, scale: 12 / 16, x: -1, y: -22 }],
    ["label-inside", "s", 40, { drop: 8, scale: 1, x: 0, y: -8 }],
    ["label-inside", "m", 48, { drop: 8, scale: 12 / 14, x: 0, y: -10 }],
    ["label-inside", "l", 56, { drop: 8, scale: 12 / 16, x: 0, y: -12 }],
    ["label-above", "m", 36, { drop: 0, scale: 1, x: 0, y: 0 }],
  ] as const)("%s at size %s", (variant, size, fieldHeight, expected) => {
    // The text starts 13 px in (12 px of padding and a 1 px border), so an edge label sits at 11.
    const labelLeft = variant === "label-on-edge" ? 11 : 13;
    expect(labelTarget({ fieldHeight, labelLeft, size, variant })).toEqual(
      expected,
    );
  });
});

describe("TextField content", () => {
  it("shows the counter as length and maximum", async () => {
    await render(
      <TextField
        counter
        label="Name"
        maxLength={20}
        onChangeText={noop}
        value="coffee"
      />,
    );
    expect(screen.getByText("6 / 20")).toBeTruthy();
  });

  it("shows no counter unless it is turned on", async () => {
    await render(
      <TextField
        label="Name"
        maxLength={20}
        onChangeText={noop}
        value="coffee"
      />,
    );
    expect(screen.queryByTestId("text-field-counter")).toBeNull();
  });

  it("replaces the helper text with the error message", async () => {
    const { rerender } = await render(
      <TextField
        helperText="Use your work address"
        label="Email"
        onChangeText={noop}
        value=""
      />,
    );
    expect(screen.getByText("Use your work address")).toBeTruthy();
    await rerender(
      <TextField
        error="Enter a valid email"
        helperText="Use your work address"
        label="Email"
        onChangeText={noop}
        value=""
      />,
    );
    expect(screen.queryByText("Use your work address")).toBeNull();
    expect(screen.getByText("Enter a valid email")).toBeTruthy();
  });

  it.each([
    ["s", 14],
    ["m", 16],
    ["l", 20],
  ] as const)("gives a bare Icon the field's size at %s", async (size, px) => {
    await render(
      <TextField
        label="Search"
        leadingIcon={<Icon name="search" />}
        onChangeText={noop}
        size={size}
        value=""
      />,
    );
    const icon = screen.getByTestId("icon-search", HIDDEN);
    expect(propOf(icon, "width")).toBe(px);
  });

  it("gives an Icon the text color of the field", async () => {
    await render(
      <TextField
        label="Search"
        leadingIcon={<Probe />}
        onChangeText={noop}
        value=""
      />,
    );
    expect(propOf(screen.getByTestId("probe"), "children")).toBe(
      "text-text-default-body",
    );
  });

  it("takes a trailing element", async () => {
    await render(
      <TextField
        label="Search"
        onChangeText={noop}
        trailingElement={<Icon name="info-circle" />}
        value=""
      />,
    );
    expect(screen.getByTestId("icon-info-circle", HIDDEN)).toBeTruthy();
  });
});

describe("TextField touch area", () => {
  it.each([
    [30, 44, 7],
    [36, 44, 4],
    [44, 44, 0],
    [30, 48, 9],
    [36, 48, 6],
    [44, 48, 2],
    [56, 48, 0],
  ] as const)(
    "extends a %s px field to %s by %s px each side",
    (height, minimum, slop) => {
      expect(hitSlopFor(height, minimum)).toBe(slop);
    },
  );

  it("extends a size m field to the minimum on iOS", async () => {
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    expect(
      propOf(screen.getByTestId("text-field-press", HIDDEN), "hitSlop"),
    ).toEqual({
      bottom: 4,
      top: 4,
    });
  });

  it("focuses the input when the field is pressed", async () => {
    const focus = jest.spyOn(
      jest.requireActual("react-native").TextInput.prototype ?? {},
      "focus",
    );
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    await fireEvent.press(screen.getByTestId("text-field-press", HIDDEN));
    expect(focus).toHaveBeenCalled();
  });
});

describe("TextField accessibility", () => {
  it("is labelled with its label", async () => {
    await render(<TextField label="Email" onChangeText={noop} value="" />);
    expect(propOf(input(), "accessibilityLabel")).toBe("Email");
  });

  it("is marked required in its label", async () => {
    await render(
      <TextField label="Email" onChangeText={noop} required value="" />,
    );
    expect(propOf(input(), "accessibilityLabel")).toBe("Email, required");
  });

  it("is reported as disabled", async () => {
    await render(
      <TextField disabled label="Email" onChangeText={noop} value="" />,
    );
    expect(propOf(input(), "accessibilityState")).toEqual({ disabled: true });
  });

  it("reads the error with the field and announces it when it appears", async () => {
    const announce = jest
      .spyOn(AccessibilityInfo, "announceForAccessibility")
      .mockImplementation(() => undefined);
    // The announce function is already a mock that counts calls from earlier tests.
    announce.mockClear();
    const { rerender } = await render(
      <TextField label="Email" onChangeText={noop} value="" />,
    );
    expect(announce).not.toHaveBeenCalled();
    await rerender(
      <TextField
        error="Enter a valid email"
        label="Email"
        onChangeText={noop}
        value=""
      />,
    );
    expect(propOf(input(), "accessibilityHint")).toBe("Enter a valid email");
    expect(announce).toHaveBeenCalledWith("Enter a valid email");
    announce.mockRestore();
  });

  it("keeps decorative icons hidden", async () => {
    await render(
      <TextField
        error="Bad"
        label="Search"
        leadingIcon={<Icon name="search" />}
        onChangeText={noop}
        value=""
      />,
    );
    expect(screen.queryByTestId("icon-search")).toBeNull();
    expect(screen.queryByTestId("icon-exclamation-circle")).toBeNull();
  });
});
