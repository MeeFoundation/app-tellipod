import { createContext, useContext } from "react";

import type { BreadcrumbsSize } from "./breadcrumbsStyles";

// What `Breadcrumbs` tells each `Breadcrumb` inside it. React Native has no nested styles, so the
// size and the position reach the items through context.
export type BreadcrumbsContextValue = {
  readonly size: BreadcrumbsSize;
  // The last item is the current place, and has no chevron after it.
  readonly last: boolean;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextValue>({
  last: true,
  size: "m",
});

export const BreadcrumbsProvider = BreadcrumbsContext.Provider;

export const useBreadcrumbs = (): BreadcrumbsContextValue =>
  useContext(BreadcrumbsContext);
