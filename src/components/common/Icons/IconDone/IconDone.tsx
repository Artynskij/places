import { FC } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IIcon } from "../type";


interface IIconDone extends IIcon {
   
  }
  export const IconDone: FC<IIconDone> = ({ className, style, onClick }) => {
    return <FaRegCheckCircle style={style} onClick={onClick} className={className}  />;
  };
  