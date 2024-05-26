import styles from "./index.module.scss";
import { ToastManagerHandle } from "../type";
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

interface ToastMessageContent {
  id: number;
  content: ReactNode;
  remove: ToastManagerHandle["remove"];
}

function ToastMessage(props: ToastMessageContent) {
  const { id, content, remove } = props;
  const nodeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div
      ref={nodeRef}
      className={classNames(
        styles["toast-item"],
        visible ? styles["toast-item-enter"] : styles["toast-item-out"]
      )}
    >
      <div
        className={styles["toast-item-close-button"]}
        onClick={() => {
          setVisible(false);
          nodeRef.current?.addEventListener("animationend", () => {
            console.log("animationend");
            remove(id);
          });
        }}
      >
        x
      </div>
      {content}
    </div>
  );
}

const ToastManager = forwardRef<ToastManagerHandle>((_props, ref) => {
  const [toastList, setToastList] = useState<ToastMessageContent[]>([]);

  useImperativeHandle(ref, () => ({
    info: (content) => {
      const curId = new Date().getTime();

      const remove = (id: number) => {
        setToastList((prev) => prev.filter((item) => item.id !== id));
      };

      setToastList((prev) => [...prev, { id: curId, content, remove }]);
      setTimeout(() => {
        remove(curId);
      }, 5000);
      return curId;
    },
    remove: (id) => {
      setToastList((prev) => prev.filter((item) => item.id !== id));
    },
  }));

  return (
    <div className={styles["toast-container"]}>
      {toastList.map((item) => (
        <ToastMessage
          key={item.id}
          id={item.id}
          content={item.content}
          remove={item.remove}
        />
      ))}
    </div>
  );
});

export default ToastManager;
