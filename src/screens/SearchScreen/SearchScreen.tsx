import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { InputCustom } from "@/components/UI/Input/InputCustom/InputCustom";
import style from "./searchScreen.module.scss";
import { IPageProps } from "@/lib/models";
import InputFind from "./_components/InputFind/InputFind";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { CardSearch } from "@/components/common/Cards";
import Link from "next/link";
import { ROUTES_FINDER } from "@/lib/config/Routes";
interface ISearchProp extends IPageProps {
    searchParams: { [CONSTANT_SEARCH_PARAMS.SEARCH]: string };
    searchData: ISearchQueryResponseFront | null;
}
const SearchScreen = ({ params, searchParams, searchData }: ISearchProp) => {
    const searchQuery = searchParams[CONSTANT_SEARCH_PARAMS.SEARCH];
    const countAllSearchItems = searchData
        ? searchData?.info.found.article +
          searchData?.info.found.establishment +
          searchData?.info.found.location
        : 0;
    return (
        <div className={"container"}>
            <section className={style.section}>
                <h2>Поиск</h2>
                <InputFind />

                <h4 className={style.searchInfo}>
                    {` Результаты поиска по запросу "${searchQuery}". Найдено ${countAllSearchItems} совпадений.`}
                </h4>

                {searchData && (
                    <ul className={style.listSearch}>
                        {searchData.searchItems.map((searchItem) => (
                            <Link
                                key={searchItem.id}
                                href={ROUTES_FINDER[
                                    searchItem.globalTypeEntity
                                ](searchItem.id)}
                            >
                                <li className={style.listSearch_item}>
                                    <CardSearch dataCard={searchItem} />
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};
export default SearchScreen;
