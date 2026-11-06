import type { Meta, StoryObj } from "@storybook/react-native";
import { type FC, type ReactNode, useState } from "react";
import { Text, View } from "react-native";

import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Modal, type ModalProps } from "./Modal";

const meta = {
  args: { children: null, locked: false, open: false, title: "Modal" },
  argTypes: { locked: { control: "boolean" } },
  component: Modal,
  title: "UI/Modal",
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

type LauncherProps = Omit<ModalProps, "open" | "onClose" | "children"> & {
  // The label of the button that opens this Modal.
  readonly label: string;
  // The body. It receives `close`, which the screen calls to set `open` to false.
  readonly body: (close: () => void) => ReactNode;
};

// A button and the Modal it opens. It holds `open` itself, so a story can be tapped. The screen
// owns it in the app.
const Launcher: FC<LauncherProps> = ({ label, body, ...modal }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button label={label} onPress={() => setOpen(true)} variant="outlined" />
      <Modal {...modal} onClose={close} open={open}>
        {body(close)}
      </Modal>
    </>
  );
};

const Column: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <View className="gap-4 p-4">{children}</View>
);

const Email: FC = () => (
  <Text>
    Email: <Text className="font-public-sans-bold">bogdan@gmail.com</Text>
  </Text>
);

// The design's actions.
const Actions: FC<{ readonly close: () => void }> = ({ close }) => (
  <View className="gap-6">
    <Button label="Copy value" onPress={close} variant="link" />
    <Button label="Add to info I share" onPress={close} variant="link" />
    <Button
      label="This isn't right, remove it"
      onPress={close}
      type="danger"
      variant="link"
    />
  </View>
);

const ROWS = Array.from({ length: 40 }, (_, index) => `Item ${index + 1}`);

const LongBody: FC<{ readonly close: () => void; readonly done?: string }> = ({
  close,
  done,
}) => (
  <View className="gap-6">
    {ROWS.map((row) => (
      <Text className="font-public-sans-semibold text-base" key={row}>
        {row}
      </Text>
    ))}
    {done === undefined ? null : <Button label={done} onPress={close} />}
  </View>
);

// The design's sheet, and the header without a subtitle and with a badge. Swipe down, tap
// outside or press Android back to close.
export const Closable: Story = {
  render: () => (
    <Column>
      <Launcher
        body={(close) => <Actions close={close} />}
        label="Closable, as designed"
        subtitle="Shared by Geo yesterday"
        title={<Email />}
      />
      <Launcher
        body={(close) => <Actions close={close} />}
        label="Without a subtitle"
        title={<Email />}
      />
      <Launcher
        badge={<Badge label="Shared" size="xs" />}
        body={(close) => <Actions close={close} />}
        label="With a badge"
        subtitle="Shared by Geo yesterday"
        title={<Email />}
      />
    </Column>
  ),
};

// A locked Modal has no grabber. Swipe, tap outside and Android back do nothing, so the body has
// to hold the way out.
export const Locked: Story = {
  render: () => (
    <Column>
      <Launcher
        body={(close) => (
          <View className="gap-4">
            <Text className="font-public-sans-regular text-text-default-body text-base">
              Save this recovery phrase before you continue.
            </Text>
            <Button label="Got it" onPress={close} />
          </View>
        )}
        label="Locked"
        locked
        subtitle="You cannot dismiss this"
        title="Recovery phrase"
      />
    </Column>
  ),
};

// 40 items, taller than the screen. The header stays in place and the body scrolls.
export const LongContent: Story = {
  render: () => (
    <Column>
      <Launcher
        body={(close) => <LongBody close={close} />}
        label="Closable, long content"
        subtitle="Shared by Geo yesterday"
        title={<Email />}
      />
      <Launcher
        body={(close) => <LongBody close={close} done="Done" />}
        label="Locked, long content"
        locked
        subtitle="Scroll to the end to continue"
        title="Terms"
      />
      <Launcher
        body={(close) => <Actions close={close} />}
        label="Long title"
        subtitle="A subtitle that is long enough to wrap onto a second line on a phone"
        title="A title that is long enough to wrap onto two or three lines on a phone screen"
      />
    </Column>
  ),
};
