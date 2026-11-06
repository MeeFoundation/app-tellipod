import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  type BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { type FC, type ReactNode, useCallback, useEffect, useRef } from "react";
import {
  AccessibilityInfo,
  BackHandler,
  StyleSheet,
  type Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../../tailwind/tokens/colors";
import { ModalHeader } from "./ModalHeader";
import {
  BACKDROP_BLUR_INTENSITY,
  BODY,
  BODY_END,
  SHEET,
  TOP_GAP,
} from "./modalStyles";

export type ModalProps = {
  // The screen owns visibility: the Modal is shown while `open` is true.
  readonly open: boolean;
  // Called once when the user asks to dismiss a closable Modal, by swiping it down, tapping outside
  // it, pressing Android back or using the screen reader's dismiss gesture. The screen sets `open`
  // to false in response. It is not called when the screen sets `open` to false itself.
  readonly onClose?: () => void;
  // A locked Modal cannot be dismissed by the user and never calls `onClose`. The screen closes it
  // by setting `open` to false, usually from a button in the body. Not in the design system.
  readonly locked?: boolean;
  // Text, or text with nested bold `Text`, such as "Email: " and the bold address.
  readonly title: ReactNode;
  readonly subtitle?: string;
  // Shown beside the title.
  readonly badge?: ReactNode;
  // The body. It scrolls when it is taller than the sheet may be, and the header stays in place.
  readonly children: ReactNode;
};

// The one view that tells VoiceOver everything behind the sheet is out of reach. The sheet's
// header and body are two views, and two modal siblings would hide each other.
const Container: FC<{ readonly children?: ReactNode }> = ({ children }) => (
  <View
    accessibilityViewIsModal
    className="absolute inset-0"
    pointerEvents="box-none"
    testID="modal-container"
  >
    {children}
  </View>
);

// The backdrop's own fill is the `alpha/always/dark/80` token, with the blur drawn over it.
const BACKDROP = { backgroundColor: colors.alpha.always.dark[80] } as const;

const Background: FC<BottomSheetBackgroundProps> = ({ style }) => (
  <View className={SHEET} pointerEvents="none" style={style} />
);

// A bottom sheet for a short list of actions or details about one item. It needs a
// `GestureHandlerRootView`, a `SafeAreaProvider` and a `BottomSheetModalProvider` above it.
export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  locked = false,
  title,
  subtitle,
  badge,
  children,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const titleRef = useRef<Text>(null);
  // Tells a dismissal the user started from one the screen asked for with `open`.
  const openRef = useRef(open);
  // True from `present()` until the sheet reports it is dismissed. gorhom's `dismiss()` on a sheet
  // that is not presented leaves it in a state where its next `present()` draws nothing, so the
  // Modal calls `dismiss()` only while presented.
  const presentedRef = useRef(false);
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  useEffect(() => {
    openRef.current = open;
    if (open) {
      presentedRef.current = true;
      sheetRef.current?.present();
    } else if (presentedRef.current) {
      sheetRef.current?.dismiss();
    }
  }, [open]);

  // Android back dismisses a closable Modal and does nothing on a locked one. Either way the back
  // press stops here, so the screen under the Modal does not go back.
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!locked) {
          onClose?.();
        }
        return true;
      },
    );
    return () => subscription.remove();
  }, [open, locked, onClose]);

  const handleDismiss = useCallback(() => {
    presentedRef.current = false;
    if (openRef.current) {
      onClose?.();
    }
  }, [onClose]);

  // Moves screen reader focus to the title once the sheet is up.
  const handleChange = useCallback((index: number) => {
    if (index >= 0 && titleRef.current) {
      AccessibilityInfo.sendAccessibilityEvent(titleRef.current, "focus");
    }
  }, []);

  const renderHandle = useCallback(
    () => (
      <ModalHeader
        badge={badge}
        locked={locked}
        onEscape={locked ? undefined : onClose}
        subtitle={subtitle}
        title={title}
        titleRef={titleRef}
      />
    ),
    [badge, locked, onClose, subtitle, title],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        // The 80% is in the color, so the backdrop fades from none to the full color.
        opacity={1}
        pressBehavior={locked ? "none" : "close"}
        style={BACKDROP}
      >
        <BlurView
          intensity={BACKDROP_BLUR_INTENSITY}
          style={StyleSheet.absoluteFill}
          testID="modal-backdrop-blur"
        />
      </BottomSheetBackdrop>
    ),
    [locked],
  );

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      backgroundComponent={Background}
      containerComponent={Container}
      enableBlurKeyboardOnGesture
      enableContentPanningGesture={!locked}
      enableDismissOnClose
      enableDynamicSizing
      enableHandlePanningGesture={!locked}
      enablePanDownToClose={!locked}
      handleComponent={renderHandle}
      maxDynamicContentSize={height - insets.top - TOP_GAP}
      onChange={handleChange}
      onDismiss={handleDismiss}
      ref={sheetRef}
      topInset={insets.top + TOP_GAP}
    >
      <BottomSheetScrollView
        onAccessibilityEscape={locked ? undefined : onClose}
        testID="modal-body"
      >
        <View className={BODY}>{children}</View>
        <View className={BODY_END} />
        <View style={{ height: insets.bottom }} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
