import { Button, message, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { IconCopy } from "../Icons";
import style from "./buttonFunctional.module.scss";

interface IProp {
    link: string;
    titleTooltip?: string;
}
export const CopyStringButton = ({ link, titleTooltip }: IProp) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            message.success("Скопирован");
        } catch (err) {
            console.error("Ошибка при копировании: ", err);
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = link;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            message.success("Скопирован");
        }
    };
    return (
        <Tooltip title={titleTooltip || "скопировать"}>
            <Button
                className={style.copyString}
                type="text"
                icon={<IconCopy className={style.copyString_icon} />}
                onClick={handleCopy}
                size="small"
                // style={{
                //     marginLeft: "4px",
                // }}
            />
        </Tooltip>
    );
};
