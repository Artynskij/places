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
