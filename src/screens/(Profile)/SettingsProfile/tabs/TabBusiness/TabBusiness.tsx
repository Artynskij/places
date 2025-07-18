import { Button } from "@/components/UI/Button/Button";
import style from "../../settings.module.scss";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

const TabBusiness = () => {
    return (
        <div className={style.tab}>
            <Link href={ROUTES.FORM.BUSINESS}>
                <Button text="Создать Бизнес" />
            </Link>

            <ul className={style.list}>
                <li className={style.list_item}>1</li>
                <li className={style.list_item}>2</li>
                <li className={style.list_item}>3</li>
                <li className={style.list_item}>4</li>
                <li className={style.list_item}>5</li>
            </ul>
        </div>
    );
};
export default TabBusiness;
