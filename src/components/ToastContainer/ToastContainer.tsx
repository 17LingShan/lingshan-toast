import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { ToastManagerHandle } from "../type";
import ToastManager from "../ToastManager";

export const toast: { current: ToastManagerHandle | undefined } = {
  current: undefined,
};
export default function ToastContainer() {
  const ref = useRef<ToastManagerHandle>(null);
  useEffect(() => {
    if (!ref.current) return;
    toast.current = ref.current;
  }, []);

  return <>{createPortal(<ToastManager ref={ref} />, document.body)}</>;
}
