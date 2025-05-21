"use client";
import {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
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
    const [stateInputFind, setStateInputFind] = useState<string>("");
    const [searchResponse, setSearchResponse] =
        useState<ISearchQueryResponseFront | null>(null);
    const [resultLoaded, setResultLoaded] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    // const [inputValueActive, setInputValueActive] = useState(false);
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
        const currentInput = stateInputFind.trim();
        const activeElement = refUl.current.querySelector("[data-active=true]");
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
                const prev =
                    activeElement?.previousElementSibling?.querySelector("a") ||
                    links[links.length - 1];
                prev?.focus();
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
    const handleSwitcherChange = (switchValue: TTypesOfSearchKey) => {
        setCurrentFilter(switchValue === "all" ? "" : switchValue);

        if (!!stateInputFind) {
            apiSearch
                .querySearch({
                    localLang: locale,
                    term: stateInputFind,
                    indexKey: currentFilter as TTypesOfSearchKey,
                })
                .then((res) => {
                    setSearchResponse(res);
                });
        }
    };
    const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setActiveIndex(-1);
        setStateInputFind(newValue);

        if (!!newValue) {
            apiSearch
                .querySearch({
                    localLang: locale,
                    term: newValue,
                    indexKey: currentFilter as TTypesOfSearchKey,
                })
                .then((res) => {
                    

                    setSearchResponse(res);
                });
        }
    };

    const handlerClearInput = () => {
        setStateInputFind("");
        setSearchResponse(null);
        // setInputValueActive(false);
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
                    term: stateInputFind || " ",
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
        stateInputFind,
        searchResponse,
        resultLoaded,
        activeIndex,
        // inputValueActive,
        searchActive,
        currentFilter,
        setSearchActive,
        handleSwitcherChange,
        handleKeyDown,
        handlerChangeInput,
        handlerClearInput,
        handlerCloseInput,
        handlerOpenInput,
        handlerMouseEnter,
    };
};
