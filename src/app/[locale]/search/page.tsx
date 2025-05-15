import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { SearchService } from "@/lib/Api/search/search.service";
import { IPageProps } from "@/lib/models";
import SearchScreen from "@/screens/SearchScreen/SearchScreen";

export async function generateMetadata() {
    return {
        title: `${process.env.BASE_NAME} | search`,
    };
}

interface IProps extends IPageProps {
    searchParams: { [CONSTANT_SEARCH_PARAMS.SEARCH]: string };
}

export default async function SearchPage({ params, searchParams }: IProps) {
    const searchQuery = searchParams[CONSTANT_SEARCH_PARAMS.SEARCH];
    const apiSearch = new SearchService();
    const searchData = searchQuery
        ? await apiSearch.querySearch({
              indexKey: "all",
              localLang: params.locale,
              term: searchQuery,
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
