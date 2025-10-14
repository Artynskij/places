"use client";
import React from "react";
import styles from "./rate.module.scss";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { Flex } from "antd";

import dynamic from "next/dynamic";
import SkeletonRate from "../Skeleton/SkeletonRate";

// const customIcons: Record<number, React.ReactNode> = {
//   1: <FrownOutlined />,
//   2: <FrownOutlined />,
//   3: <MehOutlined />,
//   4: <SmileOutlined />,
//   5: <SmileOutlined />,
// };
const Rate = dynamic(() => import("antd").then((mod) => mod.Rate), {
    ssr: false, // Отключаем SSR для этого компонента
    loading: () => <SkeletonRate />,
});
interface IRateMain {
    value?: number; // для интеграции с react-hook-form
    onChange?: (val: number) => void;
    defaultValue?: number;
    disabled?: boolean;
    classNameIcon?: string;
}
export const RateMain = ({
    value,
    onChange,
    defaultValue,
    disabled,
    classNameIcon,
}: IRateMain) => {
    return (
        <Flex gap="middle" vertical>
            <Rate
                allowHalf
                className={styles.rateAnt}
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                character={<IoHeart className={classNameIcon} />}
            />
        </Flex>
    );
};
