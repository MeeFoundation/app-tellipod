import type { FC, ReactNode } from "react";
import { ScrollView, View } from "react-native";

import { cn } from "../cn";
import { TabsProvider } from "./TabsContext";
import {
  BAR_EDGE,
  BAR_FILL,
  SIZES,
  type TabsLayout,
  type TabsSize,
} from "./tabsStyles";

export type { TabProps } from "./Tab";
export { Tab } from "./Tab";
export type { TabsLayout, TabsSize } from "./tabsStyles";

export type TabsProps = {
  // `Tab`s. The screen shows the content of the Active one.
  readonly children: ReactNode;
  readonly size?: TabsSize;
  // `content`: each tab is as wide as its content, and the tabs scroll when they do not fit.
  // `equal`: the tabs share the width of the bar evenly and do not scroll.
  // Both are not in the design system, which shows the content width only.
  readonly layout?: TabsLayout;
};

// The bar that holds the tabs. It is always as wide as its parent.
export const Tabs: FC<TabsProps> = ({
  children,
  size = "m",
  layout = "content",
}) => {
  const sizeLook = SIZES[size];
  const row = cn("flex-row gap-px", sizeLook.bar);
  return (
    <TabsProvider value={{ layout, size }}>
      <View
        accessibilityRole="tablist"
        className={cn("w-full", BAR_FILL, sizeLook.barRadius)}
        testID="tabs"
      >
        {layout === "equal" ? (
          <View className={row} testID="tabs-row">
            {children}
          </View>
        ) : (
          <ScrollView
            contentContainerClassName={row}
            horizontal
            showsHorizontalScrollIndicator={false}
            testID="tabs-scroll"
          >
            {children}
          </ScrollView>
        )}
        <View
          className={cn("absolute inset-0", sizeLook.barRadius, BAR_EDGE)}
          pointerEvents="none"
          testID="tabs-edge"
        />
      </View>
    </TabsProvider>
  );
};
