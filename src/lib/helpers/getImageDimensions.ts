export const getImageDimensions = (
    file: File | Blob
): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;

            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };

            img.onerror = (err) => {
                reject(new Error("Не удалось загрузить изображение"));
            };
        };

        reader.onerror = () => {
            reject(new Error("Ошибка чтения файла"));
        };

        reader.readAsDataURL(file);
    });
};
export const getVideoDimensions = (
    file: File | Blob
): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        const url = URL.createObjectURL(file);

        video.src = url;

        video.addEventListener("loadedmetadata", () => {
            resolve({
                width: video.videoWidth,
                height: video.videoHeight,
            });
            URL.revokeObjectURL(url); // Очищаем URL
        });

        video.addEventListener("error", (err) => {
            URL.revokeObjectURL(url);
            reject(new Error("Не удалось загрузить видео"));
        });

        // Загружаем метаданные
        video.load();
    });
};
