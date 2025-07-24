export function removeEmptyFields<T extends Record<string, any>>(
    data: T
): Partial<T> {
    return Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) =>
                value !== undefined && value !== null && value !== ""
        )
    ) as Partial<T>;
}
