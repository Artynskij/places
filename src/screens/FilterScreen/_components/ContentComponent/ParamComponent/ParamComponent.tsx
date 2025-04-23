"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./paramComponent.module.scss";
import { IconCancel } from "@/components/common/Icons/IconCancel/IconCancel";

import { Button } from "@/components/UI/Button/Button";
import { ITagFront, ITagsBlockFront } from "@/lib/models";

interface IParamComponentProp {
    dataTags?: ITagsBlockFront[];
    setIsLoading: (state: boolean) => void;
}

const ParamComponent = ({ dataTags, setIsLoading }: IParamComponentProp) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [dataParams, setDataParams] = useState<ITagFront[] | null>();

    useEffect(() => {
        const searchParamsArray = searchParams.get("filter")?.split("%");
        if (!searchParamsArray) {
            setDataParams(null);
            return;
        }
        const filteredSearchParamsArray: ITagFront[] = [];
        dataTags?.forEach((block) => {
            block.tags.forEach((blockItem) => {
                if (
                    searchParamsArray.find(
                        (searchItem) => searchItem === blockItem.key
                    )
                )
                    filteredSearchParamsArray.push(blockItem);
            });
        });
        setDataParams(filteredSearchParamsArray);
        // You can now use the current URL
        // ...
    }, [searchParams]);

    function removeParam(clickItem: ITagFront) {
        setIsLoading(true);
        const params = new URLSearchParams(searchParams.toString());
        const filterValue = dataParams?.filter(
            (item) => item.key !== clickItem.key
        );
        if (filterValue?.length !== 0) {
            params.set(
                "filter",
                filterValue?.map((item) => item.key)?.join("%") || "123"
            );
        } else {
            params.delete("filter");
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    function handlerResetAllParam() {
        router.replace(`${pathname}`, { scroll: false });
    }
    if (!dataParams) return null;
    return (
        <div className={style.param}>
            <div className={style.list}>
                {dataParams?.map((item, index) => {
                    return (
                        <div
                            onClick={() => removeParam(item)}
                            className={style.list_item}
                            key={index}
                        >
                            <span className={style.list_item_text}>
                                {item.value}
                            </span>
                            <IconCancel className={style.list_item_icon} />
                        </div>
                    );
                })}
            </div>
            <Button
                onClick={() => handlerResetAllParam()}
                className={style.buttonResetAll}
                type="light"
                text="Сбросить все"
            />
        </div>
    );
};

export default ParamComponent;
