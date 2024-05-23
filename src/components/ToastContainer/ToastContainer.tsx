import styles from "./index.module.scss";
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface ToastMessageProps {
  children: ReactNode;
}

interface ToastManagerHandle {
  info: (infoNode: ReactNode) => void;
}

function ToastMessage(props: ToastMessageProps) {
  const { children } = props;
  return <div className={styles["toast-item"]}>{children}</div>;
}

const ToastManager = forwardRef<ToastManagerHandle>((_props, ref) => {
  const [toastList, setToastList] = useState<ReactNode[]>(["123", "hello"]);

  useImperativeHandle(ref, () => ({
    info: (infoNode: ReactNode) => setToastList((prev) => [...prev, infoNode]),
  }));

  return (
    <div className={styles["toast-container"]}>
      {toastList.map((item, index) => (
        <ToastMessage children={item} key={index} />
      ))}
    </div>
  );
});

export const toast: { current: ToastManagerHandle | undefined } = {
  current: undefined,
};
export default function ToastContainer() {
  const ref = useRef<ToastManagerHandle>(null);
  useEffect(() => {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);

    if (!ref.current) return;
    toast.current = ref.current;

    return () => {
      document.body.removeChild(toastContainer);
    };
  }, []);
  return (
    <>
      <ToastManager ref={ref} />
    </>
  );
}
