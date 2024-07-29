import { FC } from "react";
import { Overlay } from "../Overlay/Overlay";
import style from "./modalCustom.module.scss";
import { ButtonClose } from "../Button/ButtonClose";

interface IModalProps {
  active: boolean;
  setActive: (prop: boolean) => void;
  children: React.ReactNode | React.ReactNode[] | null;
  title?: string;
}

export const ModalCustom: FC<IModalProps> = ({
  setActive,
  active,
  children,
  title,
}) => {
  return (
    <>
      <div className={style.modal + (active ? " " + style.modal_active : "")}>
        <div className={style.modal_content}>
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
