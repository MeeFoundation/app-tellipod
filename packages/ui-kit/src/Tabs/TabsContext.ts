import { createContext, useContext } from "react";

import type { TabsLayout, TabsSize } from "./tabsStyles";

// What `Tabs` tells each `Tab` inside it. React Native has no nested styles, so the size and
// layout reach the tabs through context.
export type TabsContextValue = {
  readonly size: TabsSize;
  readonly layout: TabsLayout;
};

const TabsContext = createContext<TabsContextValue>({
  layout: "content",
  size: "m",
});

export const TabsProvider = TabsContext.Provider;

export const useTabs = (): TabsContextValue => useContext(TabsContext);
