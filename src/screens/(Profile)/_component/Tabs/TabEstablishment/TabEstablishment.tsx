import { Button } from "@/components/UI/Button/Button";
import style from "./tabEstablishment.module.scss";
import { IconPlus } from "@/components/common/Icons";

const TabEstablishment = () => {
    return (
        <div className={style.tabEstablishment_content}>
            <div className={style.tab_title}>
                <h3>Мои объекты</h3>
                <Button icon={<IconPlus />} text="Зарегистрировать объект" />
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
