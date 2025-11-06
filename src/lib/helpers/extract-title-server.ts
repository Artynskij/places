import { IContentDetail } from "../models";

export const extractActuallyTitleServer = (
    details: IContentDetail[]
): string => {
    const actuallyTitle =
        details.find((item) => item.lang === "ru")?.value || details[0].value;
    return actuallyTitle || "not found value";
};
