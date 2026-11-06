import { cn } from "./cn";

describe("cn", () => {
  it("joins classes and skips falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });

  it("lets the last conflicting class win", () => {
    expect(cn("bg-red-500 p-2", "p-4")).toBe("bg-red-500 p-4");
  });

  it("keeps the project's text size and text colour classes together", () => {
    expect(cn("text-sm", "text-text-gray-solid")).toBe(
      "text-sm text-text-gray-solid",
    );
  });
});
