import { act, fireEvent, render, screen } from "@testing-library/react-native";
import type { FC, ReactNode } from "react";
import { BackHandler, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Modal, type ModalProps } from "./Modal";

type SheetProps = {
  readonly backdropComponent: (props: object) => ReactNode;
  readonly containerComponent: FC<{ readonly children: ReactNode }>;
  readonly handleComponent: () => ReactNode;
  readonly enablePanDownToClose: boolean;
  readonly enableHandlePanningGesture: boolean;
  readonly enableContentPanningGesture: boolean;
  readonly maxDynamicContentSize: number;
  readonly topInset: number;
  readonly onDismiss: () => void;
  readonly children: ReactNode;
};

// The sheet engine is replaced by a stand-in that records what the Modal asks of it, so a test
// checks the Modal's own behavior and not the engine's gestures, which only a device can show.
const mockSheet = {
  backdropStyle: undefined as unknown,
  dismiss: jest.fn(),
  present: jest.fn(),
  props: undefined as SheetProps | undefined,
};

jest.mock("@gorhom/bottom-sheet", () => {
  const { forwardRef, useImperativeHandle } = require("react");
  const { ScrollView, View } = require("react-native");
  return {
    BottomSheetBackdrop: (props: {
      pressBehavior: string;
      children: unknown;
      style: unknown;
    }) => {
      mockSheet.backdropStyle = props.style;
      return (
        <View testID={`backdrop-${props.pressBehavior}`}>{props.children}</View>
      );
    },
    BottomSheetModal: forwardRef((props: SheetProps, ref: unknown) => {
      useImperativeHandle(ref, () => ({
        dismiss: mockSheet.dismiss,
        present: mockSheet.present,
      }));
      mockSheet.props = props;
      const Container = props.containerComponent;
      return (
        <Container>
          {props.backdropComponent({})}
          {props.handleComponent()}
          {props.children}
        </Container>
      );
    }),
    BottomSheetScrollView: ScrollView,
  };
});

// Parts hidden from assistive technology are still in the tree.
const HIDDEN = { includeHiddenElements: true } as const;

const INSETS = { bottom: 34, left: 0, right: 0, top: 47 };

const Wrapper: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { height: 844, width: 390, x: 0, y: 0 },
      insets: INSETS,
    }}
  >
    {children}
  </SafeAreaProvider>
);

const renderModal = async (props: Partial<ModalProps> = {}) => {
  const ui = (next: Partial<ModalProps>) => (
    <Wrapper>
      <Modal
        open
        subtitle="Shared by Geo yesterday"
        title="Email: bogdan@gmail.com"
        {...props}
        {...next}
      >
        <Text>Copy value</Text>
      </Modal>
    </Wrapper>
  );
  const view = await render(ui({}));
  return {
    ...view,
    update: (next: Partial<ModalProps>) => view.rerender(ui(next)),
  };
};

const sheet = (): SheetProps => {
  if (!mockSheet.props) {
    throw new Error("The sheet was not rendered");
  }
  return mockSheet.props;
};

// Presses the Android back button, which runs the Modal's handler.
const pressBack = () => {
  const spy = jest.spyOn(BackHandler, "addEventListener");
  return spy;
};

beforeEach(() => {
  mockSheet.dismiss.mockClear();
  mockSheet.present.mockClear();
  mockSheet.props = undefined;
});

describe("Modal open state", () => {
  it("presents the sheet when open is true", async () => {
    await renderModal({ open: true });
    expect(mockSheet.present).toHaveBeenCalledTimes(1);
  });

  it("dismisses the sheet when the screen sets open to false, without calling onClose", async () => {
    const onClose = jest.fn();
    const { update } = await renderModal({ onClose, open: true });
    await update({ onClose, open: false });
    expect(mockSheet.dismiss).toHaveBeenCalledTimes(1);
    await act(async () => sheet().onDismiss());
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not dismiss a sheet that was never presented", async () => {
    await renderModal({ open: false });
    expect(mockSheet.dismiss).not.toHaveBeenCalled();
    expect(mockSheet.present).not.toHaveBeenCalled();
  });

  it("does not dismiss again when the screen closes a sheet the user already dismissed", async () => {
    const onClose = jest.fn();
    const { update } = await renderModal({ onClose, open: true });
    await act(async () => sheet().onDismiss());
    await update({ onClose, open: false });
    expect(mockSheet.dismiss).not.toHaveBeenCalled();
  });

  it("presents the sheet again when it is reopened", async () => {
    const onClose = jest.fn();
    const { update } = await renderModal({ onClose, open: true });
    await update({ onClose, open: false });
    await act(async () => sheet().onDismiss());
    await update({ onClose, open: true });
    expect(mockSheet.present).toHaveBeenCalledTimes(2);
  });

  it("calls onClose once when the user dismisses an open sheet", async () => {
    const onClose = jest.fn();
    await renderModal({ onClose });
    await act(async () => sheet().onDismiss());
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("Modal header", () => {
  it("shows the title, the subtitle and a badge", async () => {
    await renderModal({ badge: <Text>New</Text> });
    expect(screen.getByTestId("modal-title")).toHaveTextContent(
      "Email: bogdan@gmail.com",
    );
    expect(screen.getByTestId("modal-subtitle")).toHaveTextContent(
      "Shared by Geo yesterday",
    );
    expect(screen.getByText("New")).toBeTruthy();
  });

  it("leaves out the subtitle when none is given", async () => {
    await render(
      <Wrapper>
        <Modal open title="Email: bogdan@gmail.com">
          <Text>Copy value</Text>
        </Modal>
      </Wrapper>,
    );
    expect(screen.queryByTestId("modal-subtitle")).toBeNull();
  });

  it("marks the title as a header for assistive technology", async () => {
    await renderModal();
    expect(screen.getByRole("header")).toBe(screen.getByTestId("modal-title"));
  });

  it("shows formatted title text", async () => {
    await renderModal({
      title: (
        <>
          Email: <Text className="font-public-sans-bold">bogdan@gmail.com</Text>
        </>
      ),
    });
    expect(screen.getByText("bogdan@gmail.com")).toBeTruthy();
  });
});

describe("Modal body", () => {
  it("renders the children inside a scrolling view", async () => {
    await renderModal();
    const body = screen.getByTestId("modal-body");
    expect(body).toContainElement(screen.getByText("Copy value"));
  });

  it("keeps the header outside the scrolling view", async () => {
    await renderModal();
    expect(screen.getByTestId("modal-body")).not.toContainElement(
      screen.getByTestId("modal-header"),
    );
  });

  it("stops the sheet below the top safe area", async () => {
    await renderModal();
    expect(sheet().topInset).toBe(INSETS.top + 16);
    expect(sheet().maxDynamicContentSize).toBeLessThan(
      require("react-native").Dimensions.get("window").height - INSETS.top,
    );
  });
});

describe("Modal backdrop", () => {
  it("blurs the screen behind it", async () => {
    await renderModal();
    expect(screen.getByTestId("backdrop-close")).toContainElement(
      screen.getByTestId("modal-backdrop-blur"),
    );
  });

  it("fills the backdrop with alpha/always/dark/80", async () => {
    await renderModal();
    expect(mockSheet.backdropStyle).toEqual({
      backgroundColor: "rgba(2, 6, 23, 0.8)",
    });
  });
});

describe("Modal accessibility", () => {
  it("marks the sheet as the one modal view", async () => {
    await renderModal();
    expect(
      screen.getByTestId("modal-container", HIDDEN).props[
        "accessibilityViewIsModal"
      ],
    ).toBe(true);
  });

  it("hides the grabber from assistive technology", async () => {
    await renderModal();
    expect(
      screen.getByTestId("modal-grabber", HIDDEN).parent?.props[
        "accessibilityElementsHidden"
      ],
    ).toBe(true);
  });
});

describe("closable Modal", () => {
  it("shows the grabber, closes by pan and by backdrop tap", async () => {
    await renderModal();
    expect(screen.getByTestId("modal-grabber", HIDDEN)).toBeTruthy();
    expect(sheet().enablePanDownToClose).toBe(true);
    expect(sheet().enableHandlePanningGesture).toBe(true);
    expect(sheet().enableContentPanningGesture).toBe(true);
    expect(screen.getByTestId("backdrop-close")).toBeTruthy();
  });

  it("calls onClose once when the user presses Android back", async () => {
    const onClose = jest.fn();
    const spy = pressBack();
    await renderModal({ onClose });
    const handler = spy.mock.calls.at(-1)?.[1] as () => boolean;
    expect(handler()).toBe(true);
    expect(onClose).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("calls onClose when the screen reader's dismiss gesture is performed", async () => {
    const onClose = jest.fn();
    await renderModal({ onClose });
    await fireEvent(screen.getByTestId("modal-header"), "accessibilityEscape");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("locked Modal", () => {
  it("hides the grabber and turns off every way to dismiss", async () => {
    await renderModal({ locked: true });
    expect(screen.queryByTestId("modal-grabber", HIDDEN)).toBeNull();
    expect(sheet().enablePanDownToClose).toBe(false);
    expect(sheet().enableHandlePanningGesture).toBe(false);
    expect(sheet().enableContentPanningGesture).toBe(false);
    expect(screen.getByTestId("backdrop-none")).toBeTruthy();
  });

  it("swallows Android back without calling onClose", async () => {
    const onClose = jest.fn();
    const spy = pressBack();
    await renderModal({ locked: true, onClose });
    const handler = spy.mock.calls.at(-1)?.[1] as () => boolean;
    expect(handler()).toBe(true);
    expect(onClose).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does not react to the screen reader's dismiss gesture", async () => {
    const onClose = jest.fn();
    await renderModal({ locked: true, onClose });
    await fireEvent(screen.getByTestId("modal-header"), "accessibilityEscape");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("still shows the title and a scrolling body", async () => {
    await renderModal({ locked: true });
    expect(screen.getByTestId("modal-title")).toBeTruthy();
    expect(screen.getByTestId("modal-body")).toBeTruthy();
  });
});
