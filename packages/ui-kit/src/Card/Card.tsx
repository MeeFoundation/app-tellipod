import {
  Children,
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, Easing, View } from "react-native";

import { Icon, type IconName } from "../Icon/Icon";
import { useReduceMotion } from "../useReduceMotion";
import { CardHeader } from "./CardHeader";

const MOTION_MS = 200;

type CardBaseProps = {
  readonly icon: IconName;
  readonly title: string;
  readonly testID?: string;
};

type ExpandableStateProps =
  | {
      // The screen owns the state, so it must also hear about taps.
      readonly expanded: boolean;
      readonly onExpandedChange: (expanded: boolean) => void;
      readonly defaultExpanded?: never;
    }
  | {
      // The Card keeps the state.
      readonly expanded?: never;
      readonly defaultExpanded?: boolean;
      readonly onExpandedChange?: (expanded: boolean) => void;
    };

export type ExpandableCardProps = CardBaseProps &
  ExpandableStateProps & {
    readonly mode?: "expandable";
    // The body, such as `CellInfo` rows and a `Divider`, shown while the Card is expanded.
    readonly children?: ReactNode;
    // Under the body, inside the Card, such as an outlined `Button`.
    readonly footer?: ReactNode;
  };

export type NavigableCardProps = CardBaseProps & {
  readonly mode: "navigable";
  readonly onPress: () => void;
};

export type CardProps = ExpandableCardProps | NavigableCardProps;

// The Card is drawn in two views: the outer one holds the shadow, which overflow would clip, and
// the inner one clips the content to the rounded corners.
const Frame: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <View className="bg-surface-default-main shadow-3 border-stroke-gray-light w-full rounded-2xl border">
    <View className="overflow-hidden rounded-2xl">{children}</View>
  </View>
);

const ExpandableCard: FC<ExpandableCardProps> = ({
  icon,
  title,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  children,
  footer,
  testID = "card",
}) => {
  const [kept, setKept] = useState(defaultExpanded);
  const open = expanded ?? kept;
  const reduceMotion = useReduceMotion();
  // Read inside the effect, so the late answer of the system setting does not restart a running
  // animation.
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;
  // True while the content may sit in the flow, which is only for a Card that opens on mount.
  const inFlow = useRef(open);
  // `{condition && <Row />}` and `null` are children that draw nothing, so they do not count.
  const hasBody = Children.toArray(children).length > 0;
  const hasFooter = Children.toArray(footer).length > 0;
  const hasContent = hasBody || hasFooter;

  // 0 while collapsed and 1 while expanded. It starts in the state the Card starts in, so a Card
  // that is open on mount does not animate. Height cannot use the native driver, so every part
  // follows this one value on the JS driver.
  const [progress] = useState(() => new Animated.Value(open ? 1 : 0));
  // The body stays mounted until the collapse has finished, so it can shrink instead of vanishing.
  const [mounted, setMounted] = useState(open);
  // The height of the body and footer. Until the first layout it is unknown, and the content then
  // sits in the flow at its own height, so a Card that opens on mount shows no empty frame.
  const [contentHeight, setContentHeight] = useState<number | undefined>();

  useEffect(() => {
    if (open) {
      setMounted(true);
    }
    const animation = Animated.timing(progress, {
      duration: reduceMotionRef.current ? 0 : MOTION_MS,
      easing: Easing.out(Easing.quad),
      toValue: open ? 1 : 0,
      useNativeDriver: false,
    });
    animation.start(({ finished }) => {
      if (finished && !open) {
        inFlow.current = false;
        setMounted(false);
        // The next expand measures again, since the content may have changed meanwhile.
        setContentHeight(undefined);
      }
    });
    return () => animation.stop();
  }, [open, progress]);

  const toggle = () => {
    const next = !open;
    if (expanded === undefined) {
      setKept(next);
    }
    onExpandedChange?.(next);
  };

  const showBody = open || mounted;

  return (
    <Frame>
      <CardHeader
        chevron={
          <Animated.View
            style={{
              transform: [
                {
                  rotate: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            }}
          >
            <Icon name="chevron-down" />
          </Animated.View>
        }
        divided={showBody && hasContent}
        expanded={open}
        icon={icon}
        onPress={toggle}
        testID={`${testID}-header`}
        title={title}
      />
      {showBody && hasContent ? (
        <Animated.View
          accessibilityElementsHidden={!open}
          className="overflow-hidden"
          importantForAccessibility={open ? "auto" : "no-hide-descendants"}
          pointerEvents={open ? "auto" : "none"}
          style={{
            ...(contentHeight === undefined
              ? inFlow.current
                ? {}
                : { height: 0 }
              : {
                  height: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, contentHeight],
                  }),
                }),
            opacity: progress,
          }}
          testID={`${testID}-reveal`}
        >
          <View
            className={
              contentHeight === undefined && inFlow.current
                ? ""
                : "absolute inset-x-0 top-0"
            }
            onLayout={(event) => {
              // A height of 0 means the content is not laid out yet, so it counts as unmeasured.
              const { height } = event.nativeEvent.layout;
              setContentHeight(height > 0 ? height : undefined);
            }}
            testID={`${testID}-content`}
          >
            {hasBody ? (
              <View className="px-3" testID={`${testID}-body`}>
                {children}
              </View>
            ) : null}
            {hasFooter ? (
              <View className="px-2 pt-1 pb-2" testID={`${testID}-footer`}>
                {footer}
              </View>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </Frame>
  );
};

const NavigableCard: FC<NavigableCardProps> = ({
  icon,
  title,
  onPress,
  testID = "card",
}) => (
  <Frame>
    <CardHeader
      chevron={<Icon name="chevron-right" />}
      divided={false}
      icon={icon}
      onPress={onPress}
      testID={`${testID}-header`}
      title={title}
    />
  </Frame>
);

export const Card: FC<CardProps> = (props) =>
  props.mode === "navigable" ? (
    <NavigableCard {...props} />
  ) : (
    <ExpandableCard {...props} />
  );
