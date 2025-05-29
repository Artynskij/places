import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";
import style from "./searchScreen.module.scss";
import { IPageProps } from "@/lib/models";
import InputFind from "./_components/InputFind/InputFind";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";

import Link from "next/link";

import { Button } from "@/components/UI/Button/Button";
import { IconPlus } from "@/components/common/Icons";

import { getBaseUrlServer } from "@/lib/hooks/baseUrl/getBaseUrl";
import { CardSearch } from "@/components/common/Cards";

import SwitcherSearchPage from "./_components/SwitcherSearchPage/SwitcherSearchPage";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";
import { PaginationAnt } from "@/components/common/Pagination/PaginationAnt";
import { CONSTANT_DEFAULT_PAGE_SIZE } from "@/asset/constants/DefaultConstant";

interface ISearchProp extends IPageProps {
    searchParams: {
        [CONSTANT_SEARCH_PARAMS.SEARCH]: string;
        [CONSTANT_SEARCH_PARAMS.INDEX_SEARCH]: TTypesOfSearchKey;
    };
    searchData: ISearchQueryResponseFront | null;
}
const SearchScreen = async ({
    params,
    searchParams,
    searchData,
}: ISearchProp) => {
    const searchQuery = searchParams[CONSTANT_SEARCH_PARAMS.SEARCH];

    const countAllSearchItems = searchData?.info.proportions.total || 0;
    // const countAllSearchItems = searchData?.info.found
    //     ? searchData?.info.found.article +
    //       searchData?.info.found.establishment +
    //       searchData?.info.found.location
    //     : 0;

    const searchValue = searchParams[CONSTANT_SEARCH_PARAMS.SEARCH] || "";
    const baseUrl = await getBaseUrlServer();
    
    return (
        <div className={"container"}>
            <section className={style.section}>
                <h2>Поиск</h2>
                <InputFind initialValue={searchValue} />
                <div className={style.content}>
                    <div className={style.content_switcher}>
                        <h4 className={style.content_switcher_title}>
                            Фильтровать результаты
                        </h4>
                        <SwitcherSearchPage />
                    </div>
                    <div className={style.content_content}>
                        <h4 className={style.searchInfo}>
                            {` Результаты поиска по запросу "${searchQuery}". Найдено ${countAllSearchItems} совпадений.`}
                        </h4>
                        {/* отображение объектов */}
                        {searchData && (
                            <ul className={style.listSearch}>
                                {searchData.searchItems.map((searchItem) => (
                                    <li key={searchItem.id}>
                                        <div className={style.listSearch_item}>
                                            <CardSearch
                                                baseUrl={baseUrl}
                                                dataCard={searchItem}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {countAllSearchItems > CONSTANT_DEFAULT_PAGE_SIZE && (
                            <PaginationAnt
                                pageSize={CONSTANT_DEFAULT_PAGE_SIZE}
                                defaultPage={CONSTANT_DEFAULT_PAGE_SIZE}
                                totalCount={countAllSearchItems}
                            />
                        )}

                        {/* если нету объектов */}
                        {((searchData &&
                            searchData?.searchItems.length === 0) ||
                            !searchData) && (
                            <>
                                <h4>В нашем каталоге чего-то не хватает?</h4>
                                <Link
                                    className={style.itemEmpty}
                                    href={"#add_est"}
                                >
                                    <Button
                                        className={style.itemEmpty_button}
                                        icon={
                                            <IconPlus
                                                className={style.itemEmpty_icon}
                                            />
                                        }
                                        text="Добавить объект"
                                    />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
export default SearchScreen;
