import React from "react";
import styles from "./rate.module.scss";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { Flex, Rate } from "antd";

// const customIcons: Record<number, React.ReactNode> = {
//   1: <FrownOutlined />,
//   2: <FrownOutlined />,
//   3: <MehOutlined />,
//   4: <SmileOutlined />,
//   5: <SmileOutlined />,
// };
interface IRateMain {
  defaultValue: number;
  disabled?: boolean;
  classNameIcon?: string;
}
export const RateMain: React.FC<IRateMain> = ({
  defaultValue: defaultValue,
  disabled: disabled,
  classNameIcon,
}) => (
  <Flex gap="middle" vertical>
    <Rate
      allowHalf
      className={styles.rateAnt}
      disabled={disabled}
      defaultValue={defaultValue}
      character={<IoHeart className={classNameIcon} />}
    />
  </Flex>
);
