import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IIcon } from "../type";


interface IIconEdit extends IIcon {
   
  }
  export const IconEdit: FC<IIconEdit> = ({ className, style, onClick }) => {
    return <FaRegEdit style={style} onClick={onClick} className={className}  />;
  };
  