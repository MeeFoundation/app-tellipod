import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Icon } from "../Icon/Icon";
import { ToastHost } from "./ToastHost";
import { toast } from "./toastStore";

// Reanimated needs its native module, which the kit's Jest setup does not have. The mock keeps the
// animation builders, so a test can tell which entering animation the host chose.
jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  const animation = (kind: string) => ({ duration: () => ({ kind }) });

  return {
    __esModule: true,
    default: { View },
    FadeIn: animation("FadeIn"),
    FadeInDown: animation("FadeInDown"),
    FadeOut: animation("FadeOut"),
    FadeOutDown: animation("FadeOutDown"),
  };
});

const BOTTOM_INSET = 34;

const Host = () => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { height: 874, width: 402, x: 0, y: 0 },
      insets: { bottom: BOTTOM_INSET, left: 0, right: 0, top: 0 },
    }}
  >
    <ToastHost />
  </SafeAreaProvider>
);

// The module state outlives a test, so each test removes the toast it left on screen.
const shown: number[] = [];
const show = async (
  options: Parameters<typeof toast.show>[0],
): Promise<number> => {
  let id = 0;
  await act(async () => {
    id = toast.show(options);
  });
  shown.push(id);
  return id;
};
const dismiss = async (id: number) => {
  await act(async () => {
    toast.dismiss(id);
  });
};

let announce: jest.SpyInstance;
let reduceMotion: jest.SpyInstance;

beforeEach(() => {
  announce = jest
    .spyOn(AccessibilityInfo, "announceForAccessibility")
    .mockImplementation(() => undefined);
  reduceMotion = jest
    .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
    .mockResolvedValue(false);
});

afterEach(async () => {
  for (const id of shown.splice(0)) {
    await dismiss(id);
  }
  announce.mockRestore();
  reduceMotion.mockRestore();
});

describe("toast.show", () => {
  it("shows a success toast fired from outside React", async () => {
    await render(<Host />);
    await show({
      icon: <Icon name="check-circle" />,
      title: "All suggested contact info added",
      type: "success",
    });
    expect(screen.getByText("All suggested contact info added")).toBeTruthy();
  });

  it("returns a different id for every toast", async () => {
    const first = await show({ title: "One" });
    const second = await show({ title: "Two" });
    expect(second).not.toBe(first);
  });

  it("does not throw when no host is mounted", async () => {
    await expect(show({ title: "Nobody is listening" })).resolves.toEqual(
      expect.any(Number),
    );
  });

  it("shows a toast fired before the host mounted", async () => {
    await show({ title: "Fired early" });
    await render(<Host />);
    expect(screen.getByText("Fired early")).toBeTruthy();
  });
});

describe("toast.dismiss", () => {
  it("removes the toast with that id", async () => {
    await render(<Host />);
    const id = await show({ title: "Item removed" });
    await dismiss(id);
    expect(screen.queryByText("Item removed")).toBeNull();
  });

  it("does nothing for a toast that was replaced", async () => {
    await render(<Host />);
    const old = await show({ title: "Item removed" });
    await show({ title: "Server error!" });
    await dismiss(old);
    expect(screen.getByText("Server error!")).toBeTruthy();
  });
});

describe("one toast at a time", () => {
  it("replaces the toast on screen", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    await show({ title: "Server error!", type: "danger" });
    expect(screen.getByText("Server error!")).toBeTruthy();
    expect(screen.queryByText("Item removed")).toBeNull();
    expect(screen.getAllByTestId("toast")).toHaveLength(1);
  });

  it("does not call a handler of the replaced toast", async () => {
    await render(<Host />);
    const onView = jest.fn();
    await show({ action: { label: "View", onPress: onView }, title: "Ready" });
    await show({ title: "Server error!" });
    expect(onView).not.toHaveBeenCalled();
  });
});

describe("placement", () => {
  it("sits 12 px above the bottom inset with 12 px on each side", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    const slot = screen.getByTestId("toast-host-slot");
    expect(slot.props["style"]).toEqual(
      expect.objectContaining({
        bottom: BOTTOM_INSET + 12,
        left: 12,
        position: "absolute",
        right: 12,
      }),
    );
  });

  it("leaves the screen behind the toast touchable", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    expect(screen.getByTestId("toast-host").props["pointerEvents"]).toBe(
      "box-none",
    );
  });
});

describe("motion", () => {
  it("slides and fades the toast in", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    expect(screen.getByTestId("toast-host-slot").props["entering"]).toEqual({
      kind: "FadeInDown",
    });
  });

  it("only fades the toast in when Reduce Motion is on", async () => {
    reduceMotion.mockResolvedValue(true);
    await render(<Host />);
    await act(async () => {
      await Promise.resolve();
    });
    await show({ title: "Item removed" });
    expect(screen.getByTestId("toast-host-slot").props["entering"]).toEqual({
      kind: "FadeIn",
    });
  });
});

describe("close button", () => {
  it("dismisses a closable toast", async () => {
    await render(<Host />);
    await show({ closable: true, title: "Item removed" });
    await fireEvent.press(screen.getByTestId("toast-close"));
    expect(screen.queryByText("Item removed")).toBeNull();
  });

  it("shows no close button without closable", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    expect(screen.queryByTestId("toast-close")).toBeNull();
  });

  it("keeps the toast when the user taps an action", async () => {
    await render(<Host />);
    const onRefresh = jest.fn();
    await show({
      action: { label: "Refresh", onPress: onRefresh },
      title: "Server error!",
    });
    await fireEvent.press(screen.getByText("Refresh"));
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Server error!")).toBeTruthy();
  });
});

describe("announcement", () => {
  it("announces the title and the description", async () => {
    await render(<Host />);
    await show({
      description: "Try to refresh your page.",
      title: "Server error!",
      type: "danger",
    });
    expect(announce).toHaveBeenCalledWith(
      "Server error! Try to refresh your page.",
    );
  });

  it("announces a toast with only a title", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    expect(announce).toHaveBeenCalledWith("Item removed");
  });
});

describe("leaving by itself", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const pass = async (ms: number) => {
    await act(async () => {
      jest.advanceTimersByTime(ms);
    });
  };

  it("dismisses a toast without actions after 4 s", async () => {
    await render(<Host />);
    await show({ title: "All suggested contact info added" });
    await pass(3999);
    expect(screen.getByText("All suggested contact info added")).toBeTruthy();
    await pass(1);
    expect(screen.queryByText("All suggested contact info added")).toBeNull();
  });

  it("keeps a toast with a link", async () => {
    await render(<Host />);
    await show({
      action: { label: "Refresh", onPress: jest.fn() },
      title: "Server error!",
    });
    await pass(10_000);
    expect(screen.getByText("Server error!")).toBeTruthy();
  });

  it("keeps a toast with bottom links", async () => {
    await render(<Host />);
    await show({
      actions: [{ label: "Action 1", onPress: jest.fn() }],
      title: "Item removed",
    });
    await pass(10_000);
    expect(screen.getByText("Item removed")).toBeTruthy();
  });

  it("gives a replacing toast its own 4 s", async () => {
    await render(<Host />);
    await show({ title: "Item removed" });
    await pass(3000);
    await show({ title: "Your order is ready!" });
    await pass(3999);
    expect(screen.getByText("Your order is ready!")).toBeTruthy();
    await pass(1);
    expect(screen.queryByText("Your order is ready!")).toBeNull();
  });
});
