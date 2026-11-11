import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { CardSurface } from "./CardSurface";

describe("CardSurface", () => {
  it("holds the shadow and the surface on the outer view", async () => {
    await render(
      <CardSurface>
        <Text>Content</Text>
      </CardSurface>,
    );
    const outer = String(screen.getByTestId("card-surface").props["className"]);
    expect(outer).toContain("shadow-level-1");
    expect(outer).toContain("bg-surface-default-main");
    expect(outer).toContain("rounded-2xl");
    expect(outer).toContain("border-stroke-gray-light");
    expect(outer).not.toContain("overflow-hidden");
  });

  it("clips the content on the inner view", async () => {
    await render(
      <CardSurface className="p-2">
        <Text>Content</Text>
      </CardSurface>,
    );
    const inner = String(
      screen.getByTestId("card-surface-clip").props["className"],
    );
    expect(inner).toContain("overflow-hidden");
    expect(inner).toContain("rounded-2xl");
    expect(inner).toContain("p-2");
    expect(screen.getByText("Content")).toBeTruthy();
  });
});
