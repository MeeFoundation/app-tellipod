import { fireEvent, render, screen } from "@testing-library/react-native";

import { MIN_TARGET } from "../touchTarget";
import { HeaderIconButton } from "./HeaderIconButton";

const HIDDEN = { includeHiddenElements: true } as const;

const button = () => screen.getByTestId("header-icon-button");
const classesOf = (element: { readonly props: Record<string, unknown> }) =>
  String(element.props["className"]);

describe("HeaderIconButton", () => {
  it("calls onPress once when it is tapped", async () => {
    const onPress = jest.fn();
    await render(
      <HeaderIconButton
        accessibilityLabel="Back"
        icon="chevron-left"
        onPress={onPress}
      />,
    );
    await fireEvent.press(button());
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("is a 44 px square with a 24 px icon", async () => {
    await render(
      <HeaderIconButton accessibilityLabel="More" icon="three-dots-vertical" />,
    );
    expect(classesOf(button())).toContain("size-11");
    expect(classesOf(button())).toContain("rounded-xl");
    const icon = screen.getByTestId("icon-three-dots-vertical", HIDDEN);
    expect(icon.props["width"]).toBe(24);
    expect(icon.props["height"]).toBe(24);
  });

  it("shows the light gray fill until the finger lifts", async () => {
    await render(
      <HeaderIconButton accessibilityLabel="Back" icon="chevron-left" />,
    );
    expect(classesOf(button())).not.toContain("bg-surface-gray-light");
    await fireEvent(button(), "pressIn");
    expect(classesOf(button())).toContain("bg-surface-gray-light");
    await fireEvent(button(), "pressOut");
    expect(classesOf(button())).not.toContain("bg-surface-gray-light");
  });

  it("is a button with its label, and its icon is hidden", async () => {
    await render(
      <HeaderIconButton
        accessibilityLabel="More actions"
        icon="three-dots-vertical"
      />,
    );
    expect(button().props["accessibilityRole"]).toBe("button");
    expect(button().props["accessibilityLabel"]).toBe("More actions");
    expect(screen.queryByTestId("icon-three-dots-vertical")).toBeNull();
    expect(screen.getByTestId("icon-three-dots-vertical", HIDDEN)).toBeTruthy();
  });

  it("reaches the minimum touch area without growing", async () => {
    await render(
      <HeaderIconButton accessibilityLabel="Back" icon="chevron-left" />,
    );
    const slop = button().props["hitSlop"] as Record<string, number>;
    // 44 px plus the slop on both sides reaches 44 pt on iOS (the test platform), and 48 dp on Android.
    expect(44 + (slop["left"] ?? 0) * 2).toBeGreaterThanOrEqual(MIN_TARGET);
    expect(44 + (slop["top"] ?? 0) * 2).toBeGreaterThanOrEqual(MIN_TARGET);
    expect(classesOf(button())).toContain("size-11");
  });

  it("fails type checking without an accessibilityLabel", () => {
    // @ts-expect-error -- accessibilityLabel is required
    const element = <HeaderIconButton icon="chevron-left" />;
    expect(element).toBeTruthy();
  });
});
