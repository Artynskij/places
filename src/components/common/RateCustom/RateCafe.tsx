import React from "react";
import styles from "./rate.module.scss";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { Flex, Rate } from "antd";

interface IRateCafe {
  defaultValue: number;
  disabled?: boolean;
  classNameIcon?: string;
}
export const RateCafe: React.FC<IRateCafe> = ({
  defaultValue: defaultValue,
  disabled: disabled,
  classNameIcon,
}) => (
  <Flex gap="middle" vertical>
    {/* <Rate defaultValue={2} character={({ index = 0 }) => index + 1} /> */}
    <Rate
      className={styles.rateAnt}
      disabled={disabled}
      defaultValue={defaultValue}
      character={<FaReceipt className={classNameIcon} />}
      count={3}
    />
  </Flex>
);
