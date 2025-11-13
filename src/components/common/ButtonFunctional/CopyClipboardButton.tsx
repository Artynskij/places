import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import { Button, Tooltip } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
export const CopyClipboardButton = ({ text }: { text: string }) => {
    const { copyToClipboard, copiedText } = useCopyToClipboard();
    return (
        <Tooltip title={text}>
            <Button
                icon={
                    copiedText === text ? <CheckOutlined /> : <CopyOutlined />
                }
                onClick={() => copyToClipboard(text)}
            />
        </Tooltip>
    );
};
