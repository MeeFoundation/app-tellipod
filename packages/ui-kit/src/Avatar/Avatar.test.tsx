import { render, screen } from "@testing-library/react-native";

import { Avatar, type AvatarSize } from "./Avatar";

const HIDDEN = { includeHiddenElements: true } as const;

const classOf = (testID: string): string =>
  String(screen.getByTestId(testID, HIDDEN).props["className"]);

describe("Avatar variants", () => {
  it("defaults to initials, size m and a circle", async () => {
    await render(<Avatar initials="M" />);
    const classes = classOf("avatar");
    expect(classes).toContain("size-10");
    expect(classes).toContain("rounded-full");
    expect(screen.getByText("M", HIDDEN)).toBeTruthy();
  });

  it("is a square with 8 px corners without circle", async () => {
    await render(<Avatar circle={false} initials="JD" size="xl" />);
    const classes = classOf("avatar");
    expect(classes).toContain("size-16");
    expect(classes).toContain("rounded-lg");
    expect(classes).not.toContain("rounded-full");
  });

  it.each([
    [true, "rounded-full"],
    [false, "rounded-lg"],
  ] as const)(
    "every content has the shape of circle=%s",
    async (circle, shape) => {
      await render(
        <>
          <Avatar circle={circle} initials="JD" testID="a" />
          <Avatar circle={circle} content="icon" testID="b" />
          <Avatar
            circle={circle}
            content="image"
            source={{ uri: "https://example.com/a.png" }}
            testID="c"
          />
        </>,
      );
      for (const id of ["a", "b", "c"]) {
        expect(classOf(id)).toContain(shape);
      }
    },
  );
});

describe("Avatar sizes", () => {
  it.each([
    ["xxs", "size-4", "text-xs"],
    ["xs", "size-6", "text-xs"],
    ["s", "size-8", "text-sm"],
    ["m", "size-10", "text-base"],
    ["l", "size-12", "text-lg"],
    ["xl", "size-16", "text-xl"],
  ] as const)("size %s is %s with %s initials", async (size, box, text) => {
    await render(<Avatar initials="JD" size={size} />);
    expect(classOf("avatar")).toContain(box);
    expect(String(screen.getByText(/J/, HIDDEN).props["className"])).toContain(
      text,
    );
  });

  it.each([
    ["xxs", 12],
    ["xs", 16],
    ["s", 18],
    ["m", 20],
    ["l", 24],
    ["xl", 32],
  ] as const satisfies readonly (readonly [AvatarSize, number])[])(
    "size %s draws a %s px icon",
    async (size, px) => {
      await render(<Avatar content="icon" size={size} />);
      expect(screen.getByTestId("icon-person", HIDDEN).props["width"]).toBe(px);
    },
  );
});

describe("Avatar initials", () => {
  it("is bold teal on a pale teal surface", async () => {
    await render(<Avatar initials="JD" size="l" />);
    expect(classOf("avatar")).toContain("bg-surface-brand-light");
    const text = String(screen.getByText("JD", HIDDEN).props["className"]);
    expect(text).toContain("font-public-sans-bold");
    expect(text).toContain("text-surface-brand-main");
  });

  it.each(["xxs", "xs"] as const)("shows one character at %s", async (size) => {
    await render(<Avatar initials="JD" size={size} />);
    expect(screen.getByText("J", HIDDEN)).toBeTruthy();
    expect(screen.queryByText("JD", HIDDEN)).toBeNull();
  });

  it.each(["s", "m", "l", "xl"] as const)(
    "shows two characters at %s",
    async (size) => {
      await render(<Avatar initials="JDX" size={size} />);
      expect(screen.getByText("JD", HIDDEN)).toBeTruthy();
    },
  );
});

describe("Avatar image and icon", () => {
  it("fills the Avatar with the image, covered and clipped", async () => {
    await render(
      <Avatar content="image" source={{ uri: "https://example.com/a.png" }} />,
    );
    const image = screen.getByTestId("avatar-image", HIDDEN);
    expect(image.props["resizeMode"]).toBe("cover");
    expect(String(image.props["className"])).toContain("size-full");
    expect(classOf("avatar")).toContain("overflow-hidden");
  });

  it("draws the person icon by default on a pale teal circle", async () => {
    await render(<Avatar content="icon" />);
    expect(screen.getByTestId("icon-person", HIDDEN).props["width"]).toBe(20);
    expect(classOf("avatar")).toContain("bg-surface-brand-light");
  });

  it("draws the icon it is given", async () => {
    await render(<Avatar content="icon" icon="people" />);
    expect(screen.getByTestId("icon-people", HIDDEN)).toBeTruthy();
  });
});

describe("Avatar accessibility", () => {
  it("is hidden from assistive technology without a label", async () => {
    await render(<Avatar initials="M" />);
    expect(screen.queryByTestId("avatar")).toBeNull();
    const avatar = screen.getByTestId("avatar", HIDDEN);
    expect(avatar.props["accessible"]).toBe(false);
    expect(avatar.props["importantForAccessibility"]).toBe(
      "no-hide-descendants",
    );
  });

  it("is announced as an image with a label", async () => {
    await render(<Avatar accessibilityLabel="Sofia" initials="S" />);
    const avatar = screen.getByLabelText("Sofia");
    expect(avatar.props["accessible"]).toBe(true);
    expect(avatar.props["accessibilityRole"]).toBe("image");
  });
});
