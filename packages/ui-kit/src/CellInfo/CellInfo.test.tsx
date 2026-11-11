import { fireEvent, render, screen } from "@testing-library/react-native";

import { hitSlopFor, MIN_TARGET } from "../touchTarget";
import { CellInfo } from "./CellInfo";

describe("CellInfo", () => {
  it("shows the label above the value", async () => {
    await render(<CellInfo label="First name" value="Sofia" />);
    const texts = screen
      .getAllByText(/./)
      .map((node) => node.props["children"]);
    expect(texts).toEqual(["First name", "Sofia"]);
  });

  it("keeps a long value in the row", async () => {
    const value = "A very long value ".repeat(10).trim();
    await render(<CellInfo label="Notes" value={value} />);
    expect(screen.getByText(value)).toBeTruthy();
  });

  it("is read as the label followed by the value", async () => {
    await render(<CellInfo label="Last name" value="Walker" />);
    expect(screen.getByLabelText("Last name, Walker")).toBeTruthy();
  });

  it("calls onEdit once when the pencil is pressed", async () => {
    const onEdit = jest.fn();
    await render(
      <CellInfo label="Date of birth" onEdit={onEdit} value="April 8, 2018" />,
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Edit Date of birth" }),
    );
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("shows no button without onEdit", async () => {
    await render(<CellInfo label="First name" value="Sofia" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("pads the pencil to the minimum touch target", async () => {
    await render(
      <CellInfo label="First name" onEdit={() => undefined} value="Sofia" />,
    );
    const slop = hitSlopFor(16, MIN_TARGET);
    expect(
      screen.getByRole("button", { name: "Edit First name" }).props["hitSlop"],
    ).toEqual({ bottom: slop, left: slop, right: slop, top: slop });
    expect(16 + 2 * slop).toBeGreaterThanOrEqual(MIN_TARGET);
  });

  it("has a border and a shadow of its own", async () => {
    await render(<CellInfo label="First name" value="Sofia" />);
    const outer = String(screen.getByTestId("cell-info").props["className"]);
    expect(outer).toContain("border-stroke-gray-light");
    expect(outer).toContain("shadow-level-1");
  });
});
