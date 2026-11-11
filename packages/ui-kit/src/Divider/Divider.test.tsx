import { render, screen } from "@testing-library/react-native";

import { Divider } from "./Divider";

const HIDDEN = { includeHiddenElements: true } as const;

describe("Divider", () => {
  it("is a full-width hairline in the gray light stroke token", async () => {
    await render(<Divider />);
    const classes = String(
      screen.getByTestId("divider", HIDDEN).props["className"],
    ).split(/\s+/);
    expect(classes).toEqual(
      expect.arrayContaining(["h-px", "w-full", "bg-stroke-gray-light"]),
    );
  });

  it("is hidden from assistive technology", async () => {
    await render(<Divider />);
    expect(screen.queryByTestId("divider")).toBeNull();
    expect(
      screen.getByTestId("divider", HIDDEN).props["importantForAccessibility"],
    ).toBe("no-hide-descendants");
  });
});
