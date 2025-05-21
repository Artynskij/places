import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { SearchService } from "@/lib/Api/search/search.service";
import { IPageProps } from "@/lib/models";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";
import SearchScreen from "@/screens/SearchScreen/SearchScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | search`,
    };
}

interface IProps extends IPageProps {
    searchParams: {
        [CONSTANT_SEARCH_PARAMS.SEARCH]: string;
        [CONSTANT_SEARCH_PARAMS.INDEX_SEARCH]: TTypesOfSearchKey;
    };
}

export default async function SearchPage({ params, searchParams }: IProps) {
    const searchQueryInput = searchParams[CONSTANT_SEARCH_PARAMS.SEARCH];
    const searchQueryFilter = searchParams[CONSTANT_SEARCH_PARAMS.INDEX_SEARCH] as TTypesOfSearchKey | undefined;

    const apiSearch = new SearchService();
    const searchData = searchQueryInput
        ? await apiSearch.querySearch({
              indexKey: searchQueryFilter || 'all',
              localLang: params.locale,
              term: searchQueryInput,
          })
        : null;
    return (
        <SearchScreen
            searchData={searchData}
            params={params}
            searchParams={searchParams}
        />
    );
}
