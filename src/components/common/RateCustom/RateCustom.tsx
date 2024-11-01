import React from "react";
import styles from "./rate.module.scss";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { Flex, Rate } from "antd";

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
interface IRateCustom {
  defaultValue: number;
  disabled?: boolean;
}
export const RateCustom: React.FC<IRateCustom> = ({
  defaultValue: defaultValue,
  disabled: disabled,
}) => (
  <Flex gap="middle" vertical>
    {/* <Rate defaultValue={2} character={({ index = 0 }) => index + 1} /> */}
    <Rate
      className={styles.rateAnt}
      disabled={disabled}
      defaultValue={defaultValue}
      character={<IoHeart />}
    />
  </Flex>
);
