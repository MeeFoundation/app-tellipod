import {
  Children,
  type FC,
  isValidElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollView, View } from "react-native";

import { cn } from "../cn";
import { BreadcrumbsProvider } from "./BreadcrumbsContext";
import {
  type BreadcrumbsSize,
  type BreadcrumbsVariant,
  LINE,
  SIZES,
  VARIANTS,
} from "./breadcrumbsStyles";

export type { BreadcrumbProps } from "./Breadcrumb";
export { Breadcrumb } from "./Breadcrumb";
export type { BreadcrumbsSize, BreadcrumbsVariant } from "./breadcrumbsStyles";

export type BreadcrumbsProps = {
  // `Breadcrumb`s, in order. The last one is the current place and has no `onPress`.
  readonly children: ReactNode;
  readonly size?: BreadcrumbsSize;
  // Figma's Style: `simple` is the bare line and `outlined` puts it in a pale bordered box.
  readonly variant?: BreadcrumbsVariant;
  // Read aloud for the whole line.
  readonly accessibilityLabel?: string;
};

// A single line that shows where something sits in a hierarchy, with a chevron between items.
// A line wider than its parent scrolls sideways, and starts at its end so the last item is in
// view. That is not in the design system.
export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  size = "m",
  variant = "simple",
  accessibilityLabel = "Breadcrumbs",
}) => {
  const items = Children.toArray(children).filter(isValidElement);
  const scroll = useRef<ScrollView>(null);
  // A horizontal ScrollView takes no width from its content when no parent fixes the width, and
  // collapses to nothing. So the width of the content and the width the parent leaves are
  // measured, and the ScrollView gets the smaller one: it hugs a short trail and scrolls a long one.
  const [contentWidth, setContentWidth] = useState<number | null>(null);
  const [parentWidth, setParentWidth] = useState<number | null>(null);
  const sizeLook = SIZES[size];

  // The outlined box adds its padding and 1 px borders around the ScrollView.
  const boxExtra = variant === "outlined" ? 2 * sizeLook.boxPx + 2 : 0;
  const scrollWidth =
    contentWidth === null || parentWidth === null
      ? undefined
      : Math.max(0, Math.min(contentWidth, parentWidth - boxExtra));

  // Scroll to the end when the content or the room for it changes, not on a plain re-render, so
  // the user is not pulled back from what they are reading.
  useEffect(() => {
    if (scrollWidth !== undefined) {
      scroll.current?.scrollToEnd({ animated: false });
    }
  }, [scrollWidth]);

  return (
    <View
      className="w-full"
      onLayout={(event) => setParentWidth(event.nativeEvent.layout.width)}
      testID="breadcrumbs-parent"
    >
      <View
        accessibilityLabel={accessibilityLabel}
        className={cn(
          LINE,
          VARIANTS[variant],
          variant === "outlined" ? sizeLook.box : "",
        )}
        testID="breadcrumbs"
      >
        <ScrollView
          className="grow-0"
          contentContainerClassName="flex-row items-center"
          horizontal
          onContentSizeChange={(width) => setContentWidth(width)}
          ref={scroll}
          showsHorizontalScrollIndicator={false}
          style={scrollWidth === undefined ? undefined : { width: scrollWidth }}
          testID="breadcrumbs-scroll"
        >
          {items.map((item, index) => (
            <BreadcrumbsProvider
              key={item.key ?? index}
              value={{ last: index === items.length - 1, size }}
            >
              {item}
            </BreadcrumbsProvider>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
