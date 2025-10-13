import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { switcherBusiness } from "@/asset/constants/switcherTabsPage";
import { FormIndividual } from "@/components/common/Form/Business/FormIndividual";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { IBasePageProps } from "@/lib/models";
import { TTypeOwnerBusiness } from "@/lib/models/types/auth/TTypeOwnerBusiness";
import style from "./businessFormScreen.module.scss";
import { FormSoleProprietor } from "@/components/common/Form/Business/FormSoleProprietor";
import { FormLegalEntity } from "@/components/common/Form/Business/FormLegalEntity";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";
interface IProps
    extends IBasePageProps<
        {},
        { [CONSTANT_SEARCH_PARAMS.TAB]: TTypeOwnerBusiness }
    > {}
export const BusinessFormScreen = ({ params, searchParams }: IProps) => {
    if (!searchParams) return null;
    const activeTab = searchParams[CONSTANT_SEARCH_PARAMS.TAB];

    return (
        <AuthGuard roles={["owner"]}>
            <div className={style.container}>
                <h3>Создание бизнеса</h3>
               
                <SwitcherTabs data={switcherBusiness} />
                {activeTab === "individual" && <FormIndividual mode="create" />}
                {activeTab === "sole_proprietor" && (
                    <FormSoleProprietor mode="create" />
                )}
                {activeTab === "legal_entity" && (
                    <FormLegalEntity mode="create" />
                )}
            </div>
        </AuthGuard>
    );
};
