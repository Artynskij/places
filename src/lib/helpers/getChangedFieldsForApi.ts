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

interface ArrayDiff<T> {
    added?: T[];
    removed?: T[];
    updated?: T[];
}

type DiffResult<T> = {
    [K in keyof T]?: T[K] extends Array<infer U>
        ? ArrayDiff<U> | null
        : T[K] extends object
        ? DiffResult<T[K]> | null
        : T[K] | null;
};

export const getHardObjectDiff = <T extends Record<string, any>>(
    initial: Partial<T>,
    current: Partial<T>
): DiffResult<T> => {
    const diff: DiffResult<T> = {};

    const allKeys = new Set([
        ...Object.keys(initial),
        ...Object.keys(current),
    ]) as Set<keyof T>;

    const formatDate = (date: Date | string) =>
        dayjs(date).format("YYYY-MM-DD");

    const isPlainObject = (v: any): v is Record<string, any> =>
        v !== null && typeof v === "object" && !Array.isArray(v);

    // Универсальная функция для получения ID элемента
    const getItemId = (item: any, index?: number): string => {
        if (!item) return "null";

        if (item.day) return `schedule_${item.id || ""}_${item.day}`;
        if (item instanceof File)
            return `file_${item.name}_${item.size}_${item.lastModified}`;
        if (item.url) return `image_url_${item.url}`;
        if (item.id) return `id_${item.id}`;
        if (item.uid) return `uid_${item.uid}`;

        return `index_${index}_${JSON.stringify(item)}`;
    };

    const deepEqual = (a: any, b: any): boolean => {
        if (a === b) return true;
        if (a instanceof Date && b instanceof Date)
            return a.getTime() === b.getTime();
        if (
            typeof a !== "object" ||
            typeof b !== "object" ||
            a === null ||
            b === null
        )
            return false;

        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            return a.every((item, index) => deepEqual(item, b[index]));
        }

        if (isPlainObject(a) && isPlainObject(b)) {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            return keysA.every((key) => deepEqual(a[key], b[key]));
        }

        return false;
    };

    for (const key of allKeys) {
        const initialValue = initial[key];
        const currentValue = current[key];

        // Если ключа нет в current или значение пустое
        if (
            currentValue === "" ||
            currentValue === null ||
            currentValue === undefined
        ) {
            if (initialValue !== undefined && initialValue !== currentValue) {
                (diff as any)[key] = null;
            }
            continue;
        }

        // Если ключа нет в initial - это новое значение
        if (initialValue === undefined) {
            (diff as any)[key] = currentValue;
            continue;
        }

        // ✅ массивы
        if (Array.isArray(initialValue) && Array.isArray(currentValue)) {
            const mapInit = new Map(
                initialValue.map((it: any, index: number) => [
                    getItemId(it, index),
                    it,
                ])
            );
            const mapCurr = new Map(
                currentValue.map((it: any, index: number) => [
                    getItemId(it, index),
                    it,
                ])
            );

            const added: any[] = [];
            const removed: any[] = [];
            const updated: any[] = [];

            for (const [id, currObj] of mapCurr) {
                if (!mapInit.has(id)) {
                    added.push(currObj);
                } else {
                    const oldObj = mapInit.get(id);
                    if (!deepEqual(oldObj, currObj)) {
                        updated.push(currObj);
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
                (diff as any)[key] = arrayDiff;
            }
            continue;
        }

        // ✅ даты
        const isInitialDate =
            typeof initialValue === "string" && dayjs(initialValue).isValid();
        const isCurrentDate =
            typeof currentValue === "string" && dayjs(currentValue).isValid();

        if (isInitialDate && isCurrentDate) {
            const formattedInit = formatDate(initialValue as string);
            const formattedCurr = formatDate(currentValue as string);
            if (formattedInit !== formattedCurr) {
                (diff as any)[key] = formattedCurr;
            }
            continue;
        }
        // ✅ объекты
        if (isPlainObject(initialValue) && isPlainObject(currentValue)) {
            const nested = getHardObjectDiff(initialValue, currentValue);
            if (Object.keys(nested).length > 0) {
                (diff as any)[key] = nested;
            }
            continue;
        }

        // ✅ примитивы
        if (!deepEqual(initialValue, currentValue)) {
            (diff as any)[key] = currentValue;
        }
    }

    return diff;
};
