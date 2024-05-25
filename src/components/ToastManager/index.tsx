import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { ToastManagerHandle } from "../type";
import styles from "./index.module.scss";

interface ToastMessageProps {
  children: ReactNode;
}

function ToastMessage(props: ToastMessageProps) {
  const { children } = props;
  return <div className={styles["toast-item"]}>{children}</div>;
}

const ToastManager = forwardRef<ToastManagerHandle>((_props, ref) => {
  const [toastList, setToastList] = useState<ReactNode[]>(["123", "hello"]);

  useImperativeHandle(ref, () => ({
    info: (infoNode: ReactNode) => {
      setToastList((prev) => [...prev, infoNode]);
    },
  }));

  return (
    <div className={styles["toast-container"]}>
      {toastList.map((item, index) => (
        <ToastMessage children={item} key={index} />
      ))}
    </div>
  );
});

export default ToastManager;
