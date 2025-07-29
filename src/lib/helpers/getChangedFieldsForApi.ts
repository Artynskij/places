export const getObjectDiffWithNulls = <T extends object>(
  initial: Partial<T>,
  current: Partial<T>
): Partial<T> => {
  const diff: Partial<T> = {};

  const allKeys = new Set<keyof T>([
    ...Object.keys(initial) as (keyof T)[],
    ...Object.keys(current) as (keyof T)[],
  ]);

  for (const key of allKeys) {
    const initialValue = initial[key];
    const currentValue = current[key];
  if (initialValue === currentValue) {
    continue;
  }
    const isGone = !(key in current) || currentValue === '';

    if (isGone) {
      (diff as any)[key] = null;
      continue;
    }

    // Рекурсивное сравнение объектов
    if (
      typeof currentValue === 'object' &&
      currentValue !== null &&
      typeof initialValue === 'object' &&
      initialValue !== null &&
      !Array.isArray(currentValue) &&
      !Array.isArray(initialValue)
    ) {
      const nestedDiff = getObjectDiffWithNulls(
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
