import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { switcherBusiness } from "@/asset/constants/switcherTabsPage";
import { FormIndividual } from "@/components/common/Form/Business/FormIndividual";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { IPageProps } from "@/lib/models";
import { TTypeOwnerBusiness } from "@/lib/models/common/auth/TTypeOwnerBusiness";
import style from './businessFormScreen.module.scss'
interface IProps extends IPageProps {
    searchParams: {
        [CONSTANT_SEARCH_PARAMS.TAB]: TTypeOwnerBusiness;
    };
}
export const BusinessFormScreen = ({ params, searchParams }: IProps) => {
    const activeTab = searchParams[CONSTANT_SEARCH_PARAMS.TAB];

    return (
        <div className={style.container}>
            <h3>Создание бизнеса</h3>
            <SwitcherTabs data={switcherBusiness} />
            {activeTab === "individual" && <FormIndividual />}
        </div>
    );
};
