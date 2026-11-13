import type { ToastProps } from "../Toast/Toast";

// What a caller gives `toast.show`: the props of a `Toast`, less the close handler, which the host
// owns, plus `closable` to show the close button.
export type ToastOptions = Omit<ToastProps, "onClose" | "testID"> & {
  readonly closable?: boolean;
};

export type CurrentToast = {
  readonly id: number;
  readonly options: ToastOptions;
};

// The one toast on screen. It is module state, not React state, so code outside the React tree,
// such as a request callback, can show a toast without a hook or a context.
let current: CurrentToast | null = null;
let lastId = 0;
const listeners = new Set<() => void>();

const publish = (next: CurrentToast | null) => {
  current = next;
  for (const listener of listeners) {
    listener();
  }
};

export const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getCurrentToast = (): CurrentToast | null => current;

export const toast = {
  // Removes the toast with this id, if it is still the one on screen. A late call for a toast that
  // was replaced does nothing.
  dismiss: (id: number): void => {
    if (current?.id === id) {
      publish(null);
    }
  },
  // Shows a toast in place of the one on screen, and returns its id.
  show: (options: ToastOptions): number => {
    lastId += 1;
    publish({ id: lastId, options });
    return lastId;
  },
};
