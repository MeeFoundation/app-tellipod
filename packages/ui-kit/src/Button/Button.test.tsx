import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { fireEvent, render, screen } from "@testing-library/react-native";

import { spacing } from "../../tailwind/tokens/spacing";
import { Button, type ButtonType, type ButtonVariant } from "./Button";

const classesOf = (element: {
  readonly props: { readonly className?: string };
}): readonly string[] =>
  (element.props.className ?? "").split(/\s+/).filter(Boolean);

const button = () => screen.getByRole("button");
const fill = () => screen.getByTestId("button-fill");
const edge = () => screen.getByTestId("button-edge");

describe("Button variants", () => {
  it("is a size m Primary filled button by default", async () => {
    await render(<Button label="Save" />);
    expect(classesOf(button())).toEqual(
      expect.arrayContaining(["h-9", "px-3.5"]),
    );
    expect(classesOf(fill())).toContain("bg-surface-brand-solid");
    expect(classesOf(edge())).toContain("border-stroke-brand-solid");
  });

  it("selects the Secondary outlined look", async () => {
    await render(<Button label="Save" type="secondary" variant="outlined" />);
    expect(classesOf(fill())).toContain("bg-surface-brand-elevated");
    expect(classesOf(edge())).toContain("border-stroke-brand-soft");
  });

  it("selects the label color of the type", async () => {
    await render(<Button label="Save" type="danger" />);
    expect(classesOf(screen.getByText("Save"))).toContain(
      "text-text-error-on-solid-background",
    );
  });
});

describe("Button sizes", () => {
  it.each([
    ["s", "h-7.5", "30px"],
    ["m", "h-9", "36px"],
    ["l", "h-11", "44px"],
    ["xxl", "h-14", "56px"],
  ] as const)(
    "size %s uses %s, which is %s",
    async (size, heightClass, pixels) => {
      await render(<Button label="Save" size={size} />);
      expect(classesOf(button())).toContain(heightClass);
      const spacingKey = heightClass.replace("h-", "");
      // The class resolves to the Figma height through the kit's spacing token.
      expect(
        Object.entries(spacing).find(([key]) => key === spacingKey)?.[1],
      ).toBe(pixels);
    },
  );
});

const STYLES: readonly ButtonVariant[] = ["filled", "outlined", "link"];
const TYPES: readonly ButtonType[] = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
];
const COMBINATIONS = STYLES.flatMap((variant) =>
  TYPES.map((type) => [variant, type] as const),
);

describe("Button states", () => {
  it.each(COMBINATIONS)(
    "%s %s has pressed and focused looks",
    async (variant, type) => {
      await render(<Button label="Save" type={type} variant={variant} />);
      const container = classesOf(button());
      const label = classesOf(screen.getByText("Save"));
      // Figma Hover is the pressed look: `group-active:` on a layer or the label.
      expect(
        [...classesOf(fill()), ...classesOf(edge()), ...label].some((name) =>
          name.startsWith("group-active:"),
        ),
      ).toBe(true);
      // Figma Focus is the focused look with its ring.
      expect(
        container.some((name) => name.startsWith("focus:shadow-outline-")),
      ).toBe(true);
    },
  );

  it("has a Hover look for filled and outlined containers", async () => {
    for (const variant of ["filled", "outlined"] as const) {
      for (const type of TYPES) {
        await render(<Button label="Save" type={type} variant={variant} />);
        expect(
          classesOf(fill()).some((name) => name.startsWith("group-active:bg-")),
        ).toBe(true);
        await screen.unmount();
      }
    }
  });
});

describe("Button press", () => {
  it("calls the handler once on press", async () => {
    const onPress = jest.fn();
    await render(<Button label="Save" onPress={onPress} />);
    await fireEvent.press(button());
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call the handler when disabled, and keeps the Disabled look", async () => {
    const onPress = jest.fn();
    await render(<Button disabled label="Save" onPress={onPress} />);
    await fireEvent.press(button());
    expect(onPress).not.toHaveBeenCalled();
    expect(classesOf(button())).toContain("disabled:opacity-60");
  });
});

describe("Button accessibility", () => {
  it("exposes role, label and disabled state", async () => {
    await render(<Button disabled label="Save" />);
    expect(button().props["accessibilityLabel"]).toBe("Save");
    expect(button().props["accessibilityState"]).toEqual({ disabled: true });
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("lets the label be set apart from the visible text", async () => {
    await render(<Button accessibilityLabel="Save the pod" label="Save" />);
    expect(screen.getByRole("button", { name: "Save the pod" })).toBeTruthy();
  });
});

describe("Button source", () => {
  const source = readdirSync(__dirname)
    .filter((file) => /^(?!.*\.(test|stories)\.).*\.tsx$/.test(file))
    .map((file) => readFileSync(join(__dirname, file), "utf8"))
    .join("\n");

  it("has no StyleSheet, inline style or string-built class names", () => {
    expect(source).not.toMatch(/StyleSheet/);
    expect(source).not.toMatch(/\sstyle=/);
    // Class strings are complete literals; the only joins are of table entries.
    expect(source).not.toMatch(/className=\{`/);
    expect(source).not.toMatch(/\$\{/);
  });
});
