import dayjs from "dayjs";

export const getSimpleObjectDiff = <T extends object>(
    initial: Partial<T>,
    current: Partial<T>
): Partial<T> => {
    const diff: Partial<T> = {};

    const allKeys = new Set<keyof T>([
        ...(Object.keys(initial) as (keyof T)[]),
        ...(Object.keys(current) as (keyof T)[]),
    ]);

    const formatDate = (date: Date): string => dayjs(date).format("YYYY-MM-DD");

    for (const key of allKeys) {
        const initialValue = initial[key];
        const currentValue = current[key];

        if (initialValue === currentValue) {
            continue;
        }

        const isGone = !(key in current) || currentValue === "";
        if (isGone) {
            (diff as any)[key] = null;
            continue;
        }

        // 🔹 Проверка на Date
        if (initialValue instanceof Date || currentValue instanceof Date) {
            const formattedInitial =
                initialValue instanceof Date
                    ? formatDate(initialValue)
                    : initialValue;
            const formattedCurrent =
                currentValue instanceof Date
                    ? formatDate(currentValue)
                    : currentValue;

            if (formattedInitial !== formattedCurrent) {
                (diff as any)[key] = formattedCurrent;
            }
            continue;
        }

        // Рекурсивное сравнение объектов
        if (
            typeof currentValue === "object" &&
            currentValue !== null &&
            typeof initialValue === "object" &&
            initialValue !== null &&
            !Array.isArray(currentValue) &&
            !Array.isArray(initialValue)
        ) {
            const nestedDiff = getSimpleObjectDiff(
                initialValue as Partial<T[keyof T]>,
                currentValue as Partial<T[keyof T]>
            );

            if (Object.keys(nestedDiff).length > 0) {
                (diff as any)[key] = nestedDiff;
            }
            continue;
        }

        // Сравнение массивов объектов
        if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
            const changedItems: any[] = [];

            for (const oldItem of initialValue) {
                const match = currentValue.find(
                    (newItem) =>
                        newItem?.type === oldItem?.type &&
                        newItem?.url === oldItem?.url
                );

                if (!match && oldItem?.type) {
                    changedItems.push({ type: oldItem.type, url: null });
                }
            }

            for (const newItem of currentValue) {
                const match = initialValue.find(
                    (oldItem) =>
                        oldItem?.type === newItem?.type &&
                        oldItem?.url === newItem?.url
                );

                if (!match) {
                    changedItems.push(newItem);
                }
            }

            if (changedItems.length > 0) {
                (diff as any)[key] = changedItems;
            }

            continue;
        }

        // Примитивы с учётом null/undefined
        const bothNullish =
            (currentValue === null || currentValue === undefined) &&
            (initialValue === null || initialValue === undefined);

        if (!bothNullish && currentValue !== initialValue) {
            diff[key] = currentValue as T[keyof T];
        }
    }

    return diff;
};

interface ArrayDiff<T extends object> {
    added?: T[];
    removed?: T[];
    updated?: T[];
}

type DiffResult<T extends object> = {
    [K in keyof T]?: T[K] extends (infer U)[]
        ? U extends object
            ? ArrayDiff<U> | null
            : null
        : T[K] extends object
        ? DiffResult<T[K]> | null
        : T[K] | null;
};

export const getHardObjectDiff = <T extends object>(
    initial: Partial<T>,
    current: Partial<T>
): DiffResult<T> => {
    const diff: DiffResult<T> = {};

    const safeKeys = (obj: any): string[] =>
        obj && typeof obj === "object" && !Array.isArray(obj)
            ? Object.keys(obj)
            : [];

    const allKeys = new Set<keyof T>([
        ...(safeKeys(initial) as (keyof T)[]),
        ...(safeKeys(current) as (keyof T)[]),
    ]);

    const formatDate = (date: Date | string) =>
        dayjs(date).format("YYYY-MM-DD");

    const isPlainObject = (v: any): v is Record<string, any> =>
        v !== null &&
        typeof v === "object" &&
        !Array.isArray(v) &&
        Object.getPrototypeOf(v) === Object.prototype;

    const idKeyOf = (it: any) => {
        if (!it) return "null";
        if (it instanceof File) {
            return `${it.name}_${it.size}_${it.lastModified}`;
        }
        return it?.id ?? it?.uid ?? it?.url ?? JSON.stringify(it);
    };

    for (const key of allKeys) {
        const initialValue = initial?.[key];
        const currentValue = current?.[key];

        if (
            !current ||
            !(typeof current === "object" && key in current) ||
            currentValue === ""
        ) {
            diff[key] = null as any;
            continue;
        }

        // ✅ массив объектов
        if (Array.isArray(initialValue) && Array.isArray(currentValue)) {
            const mapInit = new Map(
                (initialValue as any[]).map((it) => [idKeyOf(it), it])
            );
            const mapCurr = new Map(
                (currentValue as any[]).map((it) => [idKeyOf(it), it])
            );

            const added: any[] = [];
            const removed: any[] = [];
            const updated: any[] = [];

            for (const [id, currObj] of mapCurr) {
                if (!mapInit.has(id)) {
                    added.push(currObj);
                } else {
                    const oldObj = mapInit.get(id);
                    if (isPlainObject(oldObj) && isPlainObject(currObj)) {
                        const nested = getHardObjectDiff(oldObj, currObj);
                        if (Object.keys(nested).length > 0) {
                            updated.push(currObj); // ✅ кладём весь Entity, а не diff
                        }
                    } else if (
                        JSON.stringify(oldObj) !== JSON.stringify(currObj)
                    ) {
                        updated.push(currObj); // ✅ тоже весь объект
                    }
                }
            }

            for (const [id, oldObj] of mapInit) {
                if (!mapCurr.has(id)) {
                    removed.push(oldObj);
                }
            }

            const arrayDiff: ArrayDiff<any> = {};
            if (added.length) arrayDiff.added = added;
            if (removed.length) arrayDiff.removed = removed;
            if (updated.length) arrayDiff.updated = updated;

            if (Object.keys(arrayDiff).length > 0) {
                diff[key] = arrayDiff as any;
            }

            continue;
        }

        // ✅ дата
        if (
            (initialValue instanceof Date ||
                typeof initialValue === "string") &&
            (currentValue instanceof Date || typeof currentValue === "string")
        ) {
            const formattedInit = formatDate(initialValue);
            const formattedCurr = formatDate(currentValue);
            if (formattedInit !== formattedCurr) {
                diff[key] = formattedCurr as any;
            }
            continue;
        }

        // ✅ plain object
        if (isPlainObject(initialValue) && isPlainObject(currentValue)) {
            const nested = getHardObjectDiff(initialValue, currentValue);
            if (Object.keys(nested).length > 0) {
                diff[key] = nested as any;
            }
            continue;
        }

        // ✅ примитивы
        if (initialValue !== currentValue) {
            diff[key] = currentValue as any;
        }
    }

    return diff;
};
