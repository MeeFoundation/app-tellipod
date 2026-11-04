import { createContext, useContext } from "react";

// The size and text color an `Icon` takes when it is given none, such as inside a Badge.
export type IconDefaults = {
  readonly size: number;
  readonly className: string;
};

const IconDefaultsContext = createContext<IconDefaults | null>(null);

export const IconDefaultsProvider = IconDefaultsContext.Provider;

export const useIconDefaults = (): IconDefaults | null =>
  useContext(IconDefaultsContext);

const DEFAULT_ICON_SIZE = 16;
const DEFAULT_ICON_CLASS_NAME = "text-text-default-body";

type IconLook = IconDefaults;

// An explicit size or color wins, then the provider's, then the kit's default.
export const resolveIconLook = (
  defaults: IconDefaults | null,
  explicit: {
    readonly size?: number | undefined;
    readonly className?: string | undefined;
  },
): IconLook => ({
  // An empty class name counts as none, so it does not drop the color.
  className:
    explicit.className || (defaults?.className ?? DEFAULT_ICON_CLASS_NAME),
  size: explicit.size ?? defaults?.size ?? DEFAULT_ICON_SIZE,
});
