import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export const useBaseUrl = () => {
    const [baseUrl, setBaseUrl] = useState("");
    const locale = useLocale();
    useEffect(() => {
        setBaseUrl(window.location.origin + "/" + locale);
    }, []);

    return baseUrl;
};
