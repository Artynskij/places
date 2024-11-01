import { FC } from "react";

import style from "./modalCustom.module.scss";
import { ButtonClose } from "../Button/ButtonClose";
import { Overlay } from "@/components/common/Overlay/Overlay";

interface IModalProps {
  active: boolean;
  setActive: (prop: boolean) => void;
  children: React.ReactNode | React.ReactNode[] | null;
  title?: string;
  view?: "over" | "small" | "middle" | "big";
}

export const ModalCustom: FC<IModalProps> = ({
  setActive,
  active,
  children,
  title,
  view = "small",
}) => {
  const viewModal: {
    over: React.CSSProperties;
    big: React.CSSProperties;
    middle: React.CSSProperties;
    small: React.CSSProperties;
  } = {
    over: {
      height: "99vh",
      width: "99vw",
    },
    big: {
      height: "90vh",
      width: "90vw",
    },
    middle: {
      height: "80vh",
      width: "80vw",
    },
    small: {
      height: "50vh",
      width: "80vw",
    },
  };

  return (
    <>
      <div
        className={`${style.modal}  ${active ? " " + style.modal_active : ""}`}
      >
        <div style={viewModal[view]} className={style.modal_content}>
          <div className={style.modal_content_title}>
            <h4>{title}</h4>
            <ButtonClose
              className={style.modal_close}
              onClick={() => setActive(false)}
            />
          </div>
          <div className={style.modal_content_children}>{children}</div>
        </div>
      </div>
      <Overlay setActive={setActive} active={active} />
    </>
  );
};
