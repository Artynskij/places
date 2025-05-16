"use client";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { SearchService } from "@/lib/Api/search/search.service";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { ROUTES, ROUTES_FINDER } from "@/lib/config/Routes";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";

export const useFinderCore = (initialFilter?: TTypesOfSearchKey | "all") => {
    const apiSearch = new SearchService();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
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
    useEffect(() => {
        setSearchActive(false);
    }, [pathname, params]);
    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (!searchResponse || !refUl.current) return;

        const links = Array.from(refUl.current.querySelectorAll("a"));
        const currentInput = refInput.current?.value.trim();

        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev <= 0 ? links.length - 1 : prev - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev >= links.length - 1 ? 0 : prev + 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (currentInput && activeIndex >= 0 && links[activeIndex]) {
                    // Если есть выбранный элемент → переход по нему
                    handlerCloseInput();
                    router.push(links[activeIndex].getAttribute("href") || "#");
                } else if (currentInput) {
                    // Если просто нажат Enter → переход на страницу поиска
                    handlerCloseInput();
                    router.push(ROUTES.SEARCH(currentInput));
                }
                break;
            case "Escape":
                e.preventDefault();
                handlerCloseInput();
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
    const handlerMouseEnter = () => {
        setActiveIndex(-1); // Сброс активного элемента при наведении
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
        handlerMouseEnter,
    };
};
