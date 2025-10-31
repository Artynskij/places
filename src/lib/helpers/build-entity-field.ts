interface Params {
    englishName: string;
    entity: ("code" | "name")[];
}

export const buildEntityField = ({
    englishName,
    entity,
}: Params): Record<string, string> => {
    const result: Record<string, string> = {};

    const processedString = englishName.trim().replace(/\s+/g, "_");

    if (entity.includes("code")) {
        // CODE: верхний регистр
        result.code = processedString.toUpperCase();
    }

    if (entity.includes("name")) {
        // NAME: первая буква каждого слова заглавная, остальные строчные, с нижним прочерком
        result.name = processedString
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Каждое слово с заглавной
    }

    return result;
};
