export const getMediaType = (src: string | null): "video" | "image" | "unknown" => {
    if (!src) return "unknown";

    const extension = src.split(".").pop()?.toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi"];
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

    if (videoExtensions.includes(extension || "")) return "video";
    if (imageExtensions.includes(extension || "")) return "image";
    return "unknown";
};