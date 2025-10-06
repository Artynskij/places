// import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
// import { ISelectOption } from "@/lib/models";
// import { TSortType } from "@/lib/models/types";
// import { useEffect, useState } from "react";
// interface IProp {
//     searchParams: { sort?: TSortType; filter?: string; page?: string };
// }
// const FilterSortSelect = ({ searchParams }: IProp) => {
//     const [sortActiveItem, setSortActiveItem] = useState<string>();
//     const [isLoading, setIsLoading] = useState(false); // Добавляем состояние загрузки
//     useEffect(() => {
//         setSortActiveItem(
//             searchParams ? searchParams.sort : sortSelectFilter[0].value
//         );
//         setIsLoading(false); // Скрываем лоадер при изменении URL
//     }, [pathname, searchParamsClient]);
//     const handleSelectSort = (item: ISelectOption) => {
//         setIsLoading(true);
//         setSortActiveItem(item.value);
//         const params = new URLSearchParams(searchParamsClient.toString());
//         params.set(CONSTANT_SEARCH_PARAMS.SORT, item.value);
//         router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//     };
//     return (
//         <SelectCustom
//             classNameCtn={style.sort_select}
//             options={sortSelectFilter}
//             activeOption={sortActiveItem}
//             onChange={(item) => {
//                 handleSelectSort(item);
//             }}
//         />
//     );
// };
