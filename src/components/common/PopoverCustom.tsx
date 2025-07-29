import { Popover } from "antd";
interface Props {
 children: React.ReactNode | React.ReactNode[] | null;
}

export  const PopoverCustom = ({children}:Props) => {
    return (
    // <div style={style}>
      <Popover content="Thanks for using antd. Have a nice day !" open>
        {children}
      </Popover>
    // </div>
  );
};
