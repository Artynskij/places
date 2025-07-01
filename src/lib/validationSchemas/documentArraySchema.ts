import * as Yup from "yup";

export const validDocumentFileSchema = Yup.mixed<File>()
    .test("fileType", "Неверный формат файла", (file) => {
        if (!file) return false;
        const validTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
        ];
        return validTypes.includes(file.type);
    })
    .test("fileSize", "Файл слишком большой", (file) => {
        if (!file) return false;
        return file.size <= 10 * 1024 * 1024; // 10MB
    });