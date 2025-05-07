import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
interface ISpinnerAnt {
    size?: "default" | "large" | "small";
}
export const SpinnerAnt = ({ size = "default" }: ISpinnerAnt) => {
    return <Spin indicator={<LoadingOutlined spin />} size={size} />;
};
