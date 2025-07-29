import { Switch } from "antd";
import style from "./switchToggle.module.scss";

interface ISwitchToggle {
    titleSpan: string;
    value: boolean;
    onChange: (val: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export const SwitchToggle = ({
    titleSpan,
    value,
    onChange,
    disabled = false,
    className,
}: ISwitchToggle) => {
    return (
        <label className={style.switchToggle}>
            <Switch className={'custom-switch-antd'}  checked={value} onChange={onChange} disabled={disabled} />
            <span className={style.labelText}>{titleSpan}</span>
        </label>
    );
};
