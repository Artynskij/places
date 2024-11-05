import React from "react";
import styles from "./rate.module.scss";

import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { Flex, Rate } from "antd";
import { IconStar } from "../Icons";

// const customIcons: Record<number, React.ReactNode> = {
//   1: <FrownOutlined />,
//   2: <FrownOutlined />,
//   3: <MehOutlined />,
//   4: <SmileOutlined />,
//   5: <SmileOutlined />,
// };
interface IRateHotel {
  defaultValue: number;
  disabled?: boolean;
  classNameIcon?: string;
}
export const RateHotel: React.FC<IRateHotel> = ({
  defaultValue: defaultValue,
  disabled: disabled,
  classNameIcon,
}) => (
  <Flex gap="middle" vertical>
    
    <Rate
      className={styles.rateAnt}
      disabled={disabled}
      defaultValue={defaultValue}
      character={<IconStar className={classNameIcon} />}
    />
  </Flex>
);
