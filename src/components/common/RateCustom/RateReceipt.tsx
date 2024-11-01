import React from "react";
import styles from "./rate.module.scss";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { Flex, Rate } from "antd";

interface IRateReceiptCustom {
  defaultValue: number;
  disabled?: boolean;
}
export const RateReceiptCustom: React.FC<IRateReceiptCustom> = ({
  defaultValue: defaultValue,
  disabled: disabled,
}) => (
  <Flex gap="middle" vertical>
    {/* <Rate defaultValue={2} character={({ index = 0 }) => index + 1} /> */}
    <Rate
      className={styles.rateAnt}
      disabled={disabled}
      defaultValue={defaultValue}
      character={<FaReceipt />}
      count={3}
    />
  </Flex>
);
