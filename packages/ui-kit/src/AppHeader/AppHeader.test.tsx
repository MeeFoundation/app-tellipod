import { render, screen } from "@testing-library/react-native";
import { AccessibilityInfo, processColor, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "../../tailwind/tokens/colors";
import { Avatar } from "../Avatar/Avatar";
import { AppHeader, type AppHeaderProps } from "./AppHeader";
import { HeaderIconButton } from "./HeaderIconButton";
import { SearchEntry } from "./SearchEntry";

// Reanimated needs its native module, which the kit's Jest setup does not have. The mock keeps the
// animation builders, so a test can tell which transition and fades the header chose.
jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  const animation = (kind: string) => ({ duration: () => ({ kind }) });

  return {
    __esModule: true,
    default: { View },
    FadeIn: animation("FadeIn"),
    FadeOut: animation("FadeOut"),
    LinearTransition: animation("LinearTransition"),
  };
});

const HIDDEN = { includeHiddenElements: true } as const;

const Screen = ({
  top = 64,
  ...props
}: AppHeaderProps & { readonly top?: number }) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { height: 874, width: 402, x: 0, y: 0 },
      insets: { bottom: 34, left: 0, right: 0, top },
    }}
  >
    <AppHeader {...props} />
  </SafeAreaProvider>
);

const classesOf = (testID: string): string =>
  String(screen.getByTestId(testID, HIDDEN).props["className"]);

let reduceMotion: jest.SpyInstance;
beforeEach(() => {
  reduceMotion = jest
    .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
    .mockResolvedValue(false);
});
afterEach(() => {
  reduceMotion.mockRestore();
});

describe("AppHeader looks", () => {
  it("has the shadow, the 28 px bottom corners, the border and the gradient", async () => {
    await render(<Screen title="Filter by category" />);
    expect(classesOf("app-header")).toContain("shadow-header");
    expect(classesOf("app-header")).toContain("rounded-b-3xl");
    expect(classesOf("app-header")).not.toMatch(/rounded-t|rounded-3xl/);
    expect(classesOf("app-header-surface")).toContain("rounded-b-3xl");
    expect(classesOf("app-header-surface")).toContain("border-b");
    expect(classesOf("app-header-surface")).toContain(
      "border-stroke-default-main",
    );
    const gradient = screen.getByTestId("app-header-gradient", HIDDEN);
    expect(gradient.props["colors"]).toEqual([
      processColor(colors.surface.brand.light),
      processColor(colors.surface.default.main),
    ]);
    expect(gradient.props["startPoint"]).toEqual([0.5, 0]);
    expect(gradient.props["endPoint"]).toEqual([0.5, 1]);
  });

  it("has 20 px side padding, 10 px above the row, 20 px below and 20 px between", async () => {
    await render(<Screen title="Home">{<Text>Bottom</Text>}</Screen>);
    const content = screen.getByTestId("app-header-row", HIDDEN).parent;
    const classes = String(content?.props["className"]);
    expect(classes).toContain("px-5");
    expect(classes).toContain("pt-2.5");
    expect(classes).toContain("pb-5");
    expect(classes).toContain("gap-5");
    expect(classesOf("app-header-row")).toContain("min-h-12");
    expect(classesOf("app-header-row")).toContain("gap-2");
  });
});

describe("AppHeader slots", () => {
  it("shows the Home layout: avatar, title, subtitle line and a search entry", async () => {
    await render(
      <Screen
        media={<Avatar initials="B" size="l" />}
        subtitle={<Text>Device-to-device sharing, pod members only.</Text>}
        title="Welcome, Bogdan"
        titleSize="xl"
      >
        <SearchEntry
          onPress={jest.fn()}
          placeholder="Search, or ask Telli..."
        />
      </Screen>,
    );
    expect(screen.getByText("Welcome, Bogdan")).toBeTruthy();
    expect(
      screen.getByText("Device-to-device sharing, pod members only."),
    ).toBeTruthy();
    expect(screen.getByTestId("search-entry")).toBeTruthy();
    expect(screen.getByTestId("app-header-bottom", HIDDEN)).toBeTruthy();
  });

  it("shows the Pod layout in order: back, avatar, text, kebab", async () => {
    await render(
      <Screen
        leading={
          <HeaderIconButton accessibilityLabel="Back" icon="chevron-left" />
        }
        media={<Avatar initials="S" size="l" />}
        subtitle="People > Immediate Family"
        title="About Sofia"
        trailing={
          <HeaderIconButton
            accessibilityLabel="More actions"
            icon="three-dots-vertical"
            testID="kebab"
          />
        }
      />,
    );
    const row = screen.getByTestId("app-header-row", HIDDEN);
    const children = row.children as readonly {
      readonly props?: Record<string, unknown>;
    }[];
    const ids = children.map((child) => String(child.props?.["testID"]));
    expect(ids.indexOf("header-icon-button")).toBe(0);
    expect(ids.indexOf("app-header-text")).toBeGreaterThan(0);
    expect(ids.indexOf("kebab")).toBe(ids.length - 1);
    expect(screen.getByText("People > Immediate Family")).toBeTruthy();
  });

  it("keeps no space for slots that are not given", async () => {
    await render(
      <Screen
        leading={
          <HeaderIconButton accessibilityLabel="Back" icon="chevron-left" />
        }
        title="Filter by category"
      />,
    );
    expect(screen.queryByTestId("app-header-bottom", HIDDEN)).toBeNull();
    expect(screen.queryByTestId("app-header-subtitle", HIDDEN)).toBeNull();
    expect(screen.queryByTestId("app-header-balance-end", HIDDEN)).toBeNull();
  });
});

describe("AppHeader title", () => {
  it("is Base/Medium by default and XL/Semi Bold with titleSize xl", async () => {
    const { rerender } = await render(<Screen title="About Sofia" />);
    expect(classesOf("app-header-title")).toContain("font-public-sans-medium");
    expect(classesOf("app-header-title")).toContain("text-base");
    expect(classesOf("app-header-title")).toContain("text-text-default-title");
    await rerender(<Screen title="Welcome, Bogdan" titleSize="xl" />);
    expect(classesOf("app-header-title")).toContain(
      "font-public-sans-semibold",
    );
    expect(classesOf("app-header-title")).toContain("text-xl");
  });

  it("is one line that ends with an ellipsis", async () => {
    await render(
      <Screen title="A very long pod name that does not fit on a single line of the header" />,
    );
    const title = screen.getByTestId("app-header-title");
    expect(title.props["numberOfLines"]).toBe(1);
    expect(title.props["ellipsizeMode"]).toBe("tail");
    expect(classesOf("app-header-text")).toContain("min-w-0");
    expect(classesOf("app-header-text")).toContain("flex-1");
  });

  it("gives a string subtitle the XS/Regular subtle look", async () => {
    await render(<Screen subtitle="About Sofia" title="Bogdan (You)" />);
    expect(classesOf("app-header-subtitle")).toContain("text-xs");
    expect(classesOf("app-header-subtitle")).toContain(
      "text-text-default-subtle",
    );
    expect(classesOf("app-header-text")).toContain("gap-0.5");
  });

  it("shows a node subtitle as given", async () => {
    await render(
      <Screen
        subtitle={<Text testID="line">Device-to-device sharing</Text>}
        title="Welcome"
      />,
    );
    expect(screen.getByTestId("line")).toBeTruthy();
    expect(screen.queryByTestId("app-header-subtitle", HIDDEN)).toBeNull();
  });

  it("centers on the header with 44 px kept on the empty side", async () => {
    await render(
      <Screen
        leading={
          <HeaderIconButton accessibilityLabel="Back" icon="chevron-left" />
        }
        title="Filter by category"
        titleAlign="center"
      />,
    );
    expect(classesOf("app-header-text")).toContain("items-center");
    expect(classesOf("app-header-title")).toContain("text-center");
    expect(classesOf("app-header-balance-end")).toContain("w-11");
    expect(screen.queryByTestId("app-header-balance-start", HIDDEN)).toBeNull();
  });
});

describe("AppHeader status bar", () => {
  it.each([59, 64])("pads the top by the %s px inset", async (top) => {
    await render(<Screen title="Home" top={top} />);
    expect(
      screen.getByTestId("app-header-inset", HIDDEN).props["style"],
    ).toEqual({ height: top });
  });

  it("draws no clock, signal, Wi-Fi or battery", async () => {
    await render(<Screen title="Home" />);
    expect(screen.queryByText("9:41")).toBeNull();
  });
});

describe("AppHeader height animation", () => {
  const transitionOf = () =>
    screen.getByTestId("app-header", HIDDEN).props["layout"] as unknown;

  it("eases the height with a 200 ms layout transition", async () => {
    await render(<Screen title="Home" />);
    expect(transitionOf()).toEqual({ kind: "LinearTransition" });
  });

  it("fades the bottom slot in only after the first render, and out when it goes", async () => {
    const { rerender } = await render(<Screen title="Pod" />);
    await rerender(
      <Screen title="Pod">
        <Text>Tabs</Text>
      </Screen>,
    );
    const bottom = screen.getByTestId("app-header-bottom", HIDDEN);
    expect(bottom.props["entering"]).toEqual({ kind: "FadeIn" });
    expect(bottom.props["exiting"]).toEqual({ kind: "FadeOut" });
  });

  it("does not fade a bottom slot that is there on the first render", async () => {
    await render(
      <Screen title="Pod">
        <Text>Tabs</Text>
      </Screen>,
    );
    expect(
      screen.getByTestId("app-header-bottom", HIDDEN).props["entering"],
    ).toBeUndefined();
  });

  it("changes the height at once when Reduce Motion is on", async () => {
    reduceMotion.mockResolvedValue(true);
    const { rerender } = await render(<Screen title="Pod" />);
    await rerender(
      <Screen title="Pod">
        <Text>Tabs</Text>
      </Screen>,
    );
    expect(transitionOf()).toBeUndefined();
    const bottom = screen.getByTestId("app-header-bottom", HIDDEN);
    expect(bottom.props["entering"]).toBeUndefined();
    expect(bottom.props["exiting"]).toBeUndefined();
  });
});
