"use client";
import { KeyboardEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { SearchService } from "@/lib/Api/search/search.service";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { ROUTES_FINDER } from "@/lib/config/Routes";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";

export const useFinderCore = (initialFilter?: TTypesOfSearchKey | "all") => {
    const apiSearch = new SearchService();
    const router = useRouter();
    const locale = useLocale();

    const refInput = useRef<HTMLInputElement>(null);
    const refUl = useRef<HTMLUListElement>(null);

    const [searchResponse, setSearchResponse] =
        useState<ISearchQueryResponseFront | null>(null);
    const [resultLoaded, setResultLoaded] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [inputValueActive, setInputValueActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<string>(
        initialFilter || ""
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!searchResponse) return;
        switch (e.key) {
            case "ArrowUp":
                setActiveIndex((prevIndex) =>
                    prevIndex === 0
                        ? searchResponse.searchItems.length - 1
                        : prevIndex - 1
                );
                break;
            case "ArrowDown":
                setActiveIndex((prevIndex) =>
                    prevIndex === searchResponse.searchItems.length - 1
                        ? 0
                        : prevIndex + 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (
                    activeIndex >= 0 &&
                    activeIndex < searchResponse.searchItems.length
                ) {
                    const searchItem = searchResponse.searchItems[activeIndex];
                    handlerCloseInput();
                    router.push(
                        ROUTES_FINDER[searchItem.globalTypeEntity](
                            searchItem.id
                        )
                    );
                }
                break;
            default:
                break;
        }
    };

    const handlerChangeInput = () => {
        const current = refInput.current as HTMLInputElement;
        setActiveIndex(-1);
        if (current.value.length > 0 && !inputValueActive) {
            setInputValueActive(true);
        } else if (current.value.length === 0 && inputValueActive) {
            setInputValueActive(false);
        }

        apiSearch
            .querySearch({
                localLang: locale,
                term: current.value || "",
                indexKey: currentFilter as TTypesOfSearchKey,
            })
            .then((res) => {
                console.log(res);

                setSearchResponse(res);
            });
    };

    const handlerClearInput = () => {
        const current = refInput.current as HTMLInputElement;
        current.value = "";
        setSearchResponse(null);
        setInputValueActive(false);
        setActiveIndex(-1);
    };

    const handlerCloseInput = () => {
        setActiveIndex(-1);
        setSearchActive(false);
    };

    const handlerOpenInput = () => {
        if (searchActive) return;
        setSearchActive(true);
        if (!searchResponse) {
            apiSearch
                .querySearch({
                    localLang: locale,
                    term: refInput.current?.value || "мин",
                    indexKey: currentFilter as TTypesOfSearchKey,
                })
                .then((res) => {
                    setSearchResponse(res);
                    setResultLoaded(true);
                });
        }
    };

    return {
        refInput,
        refUl,
        searchResponse,
        resultLoaded,
        activeIndex,
        inputValueActive,
        searchActive,
        currentFilter,
        setSearchActive,
        setCurrentFilter,
        handleKeyDown,
        handlerChangeInput,
        handlerClearInput,
        handlerCloseInput,
        handlerOpenInput,
    };
};
