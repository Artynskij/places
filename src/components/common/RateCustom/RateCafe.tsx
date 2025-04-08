'use client'
import React from "react";
import styles from "./rate.module.scss";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { Flex,  } from "antd";
import dynamic from "next/dynamic";
import SkeletonRate from "./SkeletonRate";

interface IRateCafe {
  defaultValue: number;
  disabled?: boolean;
  classNameIcon?: string;
}
const Rate = dynamic(() => import("antd").then((mod) => mod.Rate), {
  ssr: false, // Отключаем SSR для этого компонента
  loading: () => <SkeletonRate/>,
});
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
