// helpers/queryParams.ts
export const buildQueryString = (
    params: Record<string, any>,
    options: {
        skipNull?: boolean;
        skipEmpty?: boolean;
    } = {}
): string => {
    const { skipNull = true, skipEmpty = true } = options;

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (skipNull && value === null) return;
        if (skipEmpty && value === "") return;
        if (value === undefined) return;

        if (Array.isArray(value)) {
            value.forEach(
                (item) =>
                    item !== null &&
                    item !== undefined &&
                    searchParams.append(key, item.toString())
            );
        } else {
            searchParams.append(key, value.toString());
        }
    });

    return searchParams.toString();
};

export const buildUrlWithParams = (
    baseUrl: string,
    params?: Record<string, any>,
    options?: { skipNull?: boolean; skipEmpty?: boolean }
): string => {
    if (!params) return baseUrl;
    const queryString = buildQueryString(params, options);
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
