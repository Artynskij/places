export const getTypeOfFile = (type: string) => {
    return type.includes("video")
        ? "video"
        : type.includes("video")
        ? "image"
        : "document";
};
