import { FC } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IIcon } from "../type";


interface IIconPhone extends IIcon {
   
  }
  export const IconPhone: FC<IIconPhone> = ({ className, style, onClick }) => {
    return <FiPhoneCall style={style} onClick={onClick} className={className}  />;
  };
  