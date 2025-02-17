import React from "react";
import styles from "./rate.module.scss";

import { Flex, Rate } from "antd";
import { IconStar } from "../Icons";

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
      allowHalf
      className={styles.rateAnt}
      disabled={disabled}
      defaultValue={defaultValue}
      character={<IconStar className={classNameIcon} />}
    />
  </Flex>
);
