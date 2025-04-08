'use client'
import React from "react";
import styles from "./rate.module.scss";

import { Flex } from "antd";
import { IconStar } from "../Icons";
import dynamic from "next/dynamic";
import SkeletonRate from "./SkeletonRate";

interface IRateHotel {
  defaultValue: number;
  disabled?: boolean;
  classNameIcon?: string;
}
const Rate = dynamic(() => import("antd").then((mod) => mod.Rate), {
  ssr: false, // Отключаем SSR для этого компонента
  loading: () => <SkeletonRate/>,
});
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
