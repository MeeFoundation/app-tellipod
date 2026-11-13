import CheckCircle from "bootstrap-icons/icons/check-circle.svg";
import ChevronDown from "bootstrap-icons/icons/chevron-down.svg";
import ChevronLeft from "bootstrap-icons/icons/chevron-left.svg";
import ChevronRight from "bootstrap-icons/icons/chevron-right.svg";
import Diagram3 from "bootstrap-icons/icons/diagram-3.svg";
import ExclamationCircle from "bootstrap-icons/icons/exclamation-circle.svg";
import ExclamationOctagon from "bootstrap-icons/icons/exclamation-octagon.svg";
import FolderPlus from "bootstrap-icons/icons/folder-plus.svg";
import House from "bootstrap-icons/icons/house.svg";
import InfoCircle from "bootstrap-icons/icons/info-circle.svg";
import Paperclip from "bootstrap-icons/icons/paperclip.svg";
import Pencil from "bootstrap-icons/icons/pencil.svg";
import People from "bootstrap-icons/icons/people.svg";
import Person from "bootstrap-icons/icons/person.svg";
import PersonVcard from "bootstrap-icons/icons/person-vcard.svg";
import Plus from "bootstrap-icons/icons/plus.svg";
import Search from "bootstrap-icons/icons/search.svg";
import ShieldLock from "bootstrap-icons/icons/shield-lock.svg";
import ThreeDotsVertical from "bootstrap-icons/icons/three-dots-vertical.svg";
import X from "bootstrap-icons/icons/x.svg";
import type { FC } from "react";
import Svg, { Circle, type SvgProps } from "react-native-svg";

import { withColorClass } from "./withColorClass";

// Bootstrap Icons are imported as components (react-native-svg-transformer), so only the icons
// imported here reach the bundle. Add an icon: import its SVG and add it to RAW_GLYPHS.
// Each is drawn on a 16 px grid and filled with the current color.

// A filled circle of 9 px on the 16 px grid, the leading dot of a Badge. It is not a Bootstrap icon.
const Dot: FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 16 16" {...props}>
    <Circle cx={8} cy={8} fill="currentColor" r={4.5} />
  </Svg>
);

const RAW_GLYPHS = {
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "diagram-3": Diagram3,
  dot: Dot,
  "exclamation-circle": ExclamationCircle,
  "exclamation-octagon": ExclamationOctagon,
  "folder-plus": FolderPlus,
  house: House,
  "info-circle": InfoCircle,
  paperclip: Paperclip,
  pencil: Pencil,
  people: People,
  person: Person,
  "person-vcard": PersonVcard,
  plus: Plus,
  search: Search,
  "shield-lock": ShieldLock,
  "three-dots-vertical": ThreeDotsVertical,
  x: X,
} as const;

export type IconName = keyof typeof RAW_GLYPHS;

const entries = Object.keys(RAW_GLYPHS) as IconName[];

export const GLYPHS = Object.fromEntries(
  entries.map((name) => [name, withColorClass(RAW_GLYPHS[name])]),
) as Readonly<Record<IconName, FC<SvgProps>>>;
