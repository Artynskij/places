"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib";
import { FC, useEffect, useState } from "react";
interface IPaginationAntProp {
    totalCount: number;
    defaultPage: number;
    pageSize: number;
}
export const PaginationAnt: FC<IPaginationAntProp> = ({
    totalCount,
    defaultPage,
    pageSize,
}) => {
    const [current, setCurrent] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    useEffect(() => {
        const page = searchParams.get("page");
        if (page) {
            setCurrent(parseInt(page) / pageSize);
        }
    }, [searchParams, pageSize]);
    const onChange: PaginationProps["onChange"] = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page > 1) {
            params.set("page", `${page * 30}`);
        } else {
            params.delete("page");
        }
        router.replace(`${pathname}?${params.toString()}`);
        setCurrent(page);
    };
    return (
        <Pagination
            // showSizeChanger
            // onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            // defaultCurrent={1}
            current={current}
            total={totalCount}
            defaultPageSize={defaultPage}
            showSizeChanger={false}
        />
    );
};
