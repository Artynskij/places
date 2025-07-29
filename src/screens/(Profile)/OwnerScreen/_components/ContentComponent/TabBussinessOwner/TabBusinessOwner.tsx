import style from "./tabBusinessOwner.module.scss";

import { Button } from "@/components/UI/Button/Button";
import { ROUTES } from "@/lib/config/Routes";
import Link from "next/link";

const TabBusinessOwner = () => {
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
export default TabBusinessOwner;
