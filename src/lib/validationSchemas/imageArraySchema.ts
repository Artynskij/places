import * as Yup from "yup";

export const validImageFileSchema = Yup.mixed<File>()
    .test("fileType", "Неверный формат изображения", (file) => {
        if (!file) return false;
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/jpg",
            "image/svg+xml",
        ];
        return validTypes.includes(file.type);
    })
    .test("fileSize", "Изображение слишком большое (максимум 5MB)", (file) => {
        if (!file) return false;
        return file.size <= 5 * 1024 * 1024; // 5MB
    });
