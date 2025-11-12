import { useState } from "react";
import { useAlertMessage } from "../context";
export const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const message = useAlertMessage();
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            message.success("Скопировано в буфер обмена");
            setTimeout(() => setCopiedText(null), 5000);
            return true;
        } catch (err) {
            message.error("Не удалось скопировать");
            return false;
        }
    };

    return { copyToClipboard, copiedText };
};
