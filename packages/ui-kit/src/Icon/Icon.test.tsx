import { render, screen } from "@testing-library/react-native";

import { Icon } from "./Icon";
import { IconDefaultsProvider, resolveIconLook } from "./IconDefaults";

// A decorative Icon is hidden from assistive technology, so queries include hidden elements.
const HIDDEN = { includeHiddenElements: true } as const;

const propOf = (
  element: { readonly props: Record<string, unknown> },
  name: string,
): unknown => element.props[name];

describe("Icon glyphs", () => {
  it.each([
    "check-circle",
    "chevron-down",
    "chevron-right",
    "diagram-3",
    "exclamation-circle",
    "folder-plus",
    "house",
    "info-circle",
    "paperclip",
    "pencil",
    "people",
    "person",
    "person-vcard",
    "plus",
    "search",
  ] as const)("%s renders at 16 px by default", async (name) => {
    await render(<Icon name={name} />);
    const icon = screen.getByTestId(`icon-${name}`, HIDDEN);
    expect(propOf(icon, "width")).toBe(16);
    expect(propOf(icon, "height")).toBe(16);
  });

  it("renders another size", async () => {
    await render(<Icon name="info-circle" size={12} />);
    expect(
      propOf(screen.getByTestId("icon-info-circle", HIDDEN), "width"),
    ).toBe(12);
  });

  it("uses the default text color class", () => {
    expect(resolveIconLook(null, {})).toEqual({
      className: "text-text-default-body",
      size: 16,
    });
  });
});

describe("Icon defaults from a Badge", () => {
  const defaults = { className: "text-text-warning-solid", size: 14 };

  it("takes the size and color of the provider", async () => {
    await render(
      <IconDefaultsProvider value={defaults}>
        <Icon name="check-circle" />
      </IconDefaultsProvider>,
    );
    expect(
      propOf(screen.getByTestId("icon-check-circle", HIDDEN), "width"),
    ).toBe(14);
    expect(resolveIconLook(defaults, {}).className).toBe(
      "text-text-warning-solid",
    );
  });

  it("keeps an explicit size and color", async () => {
    await render(
      <IconDefaultsProvider value={defaults}>
        <Icon className="text-text-error-solid" name="check-circle" size={10} />
      </IconDefaultsProvider>,
    );
    expect(
      propOf(screen.getByTestId("icon-check-circle", HIDDEN), "width"),
    ).toBe(10);
    expect(
      resolveIconLook(defaults, {
        className: "text-text-error-solid",
        size: 10,
      }),
    ).toEqual({ className: "text-text-error-solid", size: 10 });
  });
});

describe("Icon accessibility", () => {
  it("is hidden from assistive technology without a label", async () => {
    await render(<Icon name="check-circle" />);
    expect(screen.queryByTestId("icon-check-circle")).toBeNull();
    const icon = screen.getByTestId("icon-check-circle", HIDDEN);
    expect(propOf(icon, "accessible")).toBe(false);
    expect(propOf(icon, "importantForAccessibility")).toBe(
      "no-hide-descendants",
    );
  });

  it("is announced with a label", async () => {
    await render(<Icon accessibilityLabel="Information" name="info-circle" />);
    const icon = screen.getByLabelText("Information");
    expect(propOf(icon, "accessible")).toBe(true);
    expect(propOf(icon, "accessibilityRole")).toBe("image");
  });
});
