import { Button } from "@/components/UI/Button/Button";
import style from "./tabEstablishment.module.scss";
import { IconPlus } from "@/components/common/Icons";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

const TabEstablishment = () => {
    return (
        <div className={style.tabEstablishment_content}>
            <div className={style.tab_title}>
                <h3>Мои объекты</h3>
                <Link href={ROUTES.FORM.ESTABLISHMENT_CREATE}>
                    <Button
                        icon={<IconPlus />}
                        text="Зарегистрировать объект"
                    />
                </Link>
            </div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    );
};
export default TabEstablishment;
