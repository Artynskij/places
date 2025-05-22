"use client";
import style from "./paginationAnt.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib";
import { FC, useEffect, useState } from "react";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
interface IPaginationAntProp {
    totalCount: number;
    defaultPage: number;
    pageSize: number;
    setIsLoading?: (state: boolean) => void;
}
export const PaginationAnt: FC<IPaginationAntProp> = ({
    totalCount,
    defaultPage,
    pageSize,
    setIsLoading,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    useEffect(() => {
        const page = searchParams.get(CONSTANT_SEARCH_PARAMS.PAGE);
        if (page) {
            setCurrentPage(parseInt(page) / pageSize);
        } else {
            setCurrentPage(1);
        }
    }, [searchParams, pageSize]);
    const onChange: PaginationProps["onChange"] = (page) => {
        if (setIsLoading) {
            setIsLoading(true);
        }
        const params = new URLSearchParams(searchParams.toString());
        if (page > 1) {
            params.set(CONSTANT_SEARCH_PARAMS.PAGE, `${page * pageSize}`);
        } else {
            params.delete(CONSTANT_SEARCH_PARAMS.PAGE);
        }
        router.replace(`${pathname}?${params.toString()}`);
        setCurrentPage(page);
    };
    const startCountItems = currentPage * pageSize - pageSize + 1;
    const endCountItems = (currentPage + 1) * pageSize - pageSize;
    return (
        <div className={style.pagination_ctn}>
            <Pagination
                // showSizeChanger
                // onShowSizeChange={onShowSizeChange}
                onChange={onChange}
                // defaultCurrent={1}
                current={currentPage}
                total={totalCount}
                defaultPageSize={defaultPage}
                showSizeChanger={false}
            />
            <div className={style.pagination_info}>
                <span>Показаны результаты </span>
                <span>
                    {startCountItems}-
                    {endCountItems > totalCount ? totalCount : endCountItems}
                </span>
                <span> из {totalCount}</span>
            </div>
        </div>
    );
};
