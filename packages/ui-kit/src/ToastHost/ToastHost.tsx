import { type FC, useEffect, useSyncExternalStore } from "react";
import { AccessibilityInfo, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Toast } from "../Toast/Toast";
import { useReduceMotion } from "../useReduceMotion";
import {
  type CurrentToast,
  getCurrentToast,
  subscribe,
  toast,
} from "./toastStore";

// The gap between the toast and the bottom safe-area inset, from the Tellipod design.
const BOTTOM_GAP = 12;
// The margin on each side of the toast, from the same design.
const SIDE_GAP = 12;
const MOVE_MS = 200;
// How long a toast without actions stays. Not in the design; chosen with the user.
const STAY_MS = 4000;

const HostedToast: FC<{ readonly current: CurrentToast }> = ({ current }) => {
  const { closable = false, ...props } = current.options;

  return (
    <Toast
      {...props}
      {...(closable ? { onClose: () => toast.dismiss(current.id) } : {})}
    />
  );
};

// Mount it once at the root of the app, inside the `SafeAreaProvider`, after the screens. It draws
// the toast that `toast.show` gives it above the screens, at the bottom edge above the safe area,
// and takes touches only on the toast itself.
export const ToastHost: FC = () => {
  const current = useSyncExternalStore(
    subscribe,
    getCurrentToast,
    getCurrentToast,
  );
  const insets = useSafeAreaInsets();
  const reduceMotion = useReduceMotion();

  const id = current?.id;
  const title = current?.options.title;
  const description = current?.options.description;
  useEffect(() => {
    if (id !== undefined && title !== undefined) {
      // Announced without moving the screen reader's focus.
      AccessibilityInfo.announceForAccessibility(
        description === undefined ? title : `${title} ${description}`,
      );
    }
  }, [id, title, description]);

  const hasActions =
    current !== null &&
    (current.options.action !== undefined ||
      (current.options.actions?.length ?? 0) > 0);
  useEffect(() => {
    if (id === undefined || hasActions) {
      return undefined;
    }
    const timer = setTimeout(() => toast.dismiss(id), STAY_MS);
    return () => clearTimeout(timer);
  }, [id, hasActions]);

  const entering = reduceMotion
    ? FadeIn.duration(MOVE_MS)
    : FadeInDown.duration(MOVE_MS);
  const exiting = reduceMotion
    ? FadeOut.duration(MOVE_MS)
    : FadeOutDown.duration(MOVE_MS);

  return (
    <View
      className="absolute inset-0"
      pointerEvents="box-none"
      testID="toast-host"
    >
      {current === null ? null : (
        <Animated.View
          entering={entering}
          exiting={exiting}
          key={current.id}
          style={{
            bottom: insets.bottom + BOTTOM_GAP,
            left: SIDE_GAP,
            position: "absolute",
            right: SIDE_GAP,
          }}
          testID="toast-host-slot"
        >
          <HostedToast current={current} />
        </Animated.View>
      )}
    </View>
  );
};
