import type { FC, ReactNode, Ref } from "react";
import { Text, View } from "react-native";

import {
  GRABBER,
  GRABBER_STRIP,
  HEADER,
  SUBTITLE,
  TITLE,
  TITLE_ROW,
} from "./modalStyles";

export type ModalHeaderProps = {
  readonly title: ReactNode;
  readonly subtitle: string | undefined;
  readonly badge?: ReactNode;
  // A locked Modal has no grabber, because it cannot be dragged.
  readonly locked: boolean;
  readonly titleRef: Ref<Text>;
  // Called by the screen reader's dismiss gesture. Absent on a locked Modal.
  readonly onEscape: (() => void) | undefined;
};

// The grabber, the title with its badge and the subtitle. It is the sheet's handle, so it stays in
// place while the body scrolls and the user can drag the sheet by it.
export const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  subtitle,
  badge,
  locked,
  titleRef,
  onEscape,
}) => (
  <View onAccessibilityEscape={onEscape} testID="modal-header">
    <View
      accessibilityElementsHidden
      className={GRABBER_STRIP}
      importantForAccessibility="no-hide-descendants"
    >
      {locked ? null : <View className={GRABBER} testID="modal-grabber" />}
    </View>
    <View className={HEADER}>
      <View className={TITLE_ROW}>
        <Text
          accessibilityRole="header"
          className={TITLE}
          ref={titleRef}
          testID="modal-title"
        >
          {title}
        </Text>
        {badge}
      </View>
      {subtitle === undefined ? null : (
        <Text className={SUBTITLE} testID="modal-subtitle">
          {subtitle}
        </Text>
      )}
    </View>
  </View>
);
