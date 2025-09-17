import { FC } from "react";
import style from "./video.module.scss";
import Image from "next/image";
import { getMediaType } from "@/lib/helpers/getMediaType";

interface IVideo {
    videoSrc: string | null;
    posterSrc: string;
}

// Функция для определения типа медиа по расширению

export const Video: FC<IVideo> = ({ videoSrc, posterSrc }) => {
    const mediaType = getMediaType(videoSrc);

    return (
        <>
            {mediaType === "video" ? (
                <video
                    preload="none"
                    className={style.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    poster={posterSrc}
                >
                    <source src={videoSrc!} type="video/mp4" />
                    <Image
                        style={{
                            width: "100%",
                            objectFit: "cover",
                            height: "100%",
                        }}
                        src={posterSrc}
                        width={800}
                        height={500}
                        alt="poster photo"
                    />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Image
                    style={{
                        width: "100%",
                        objectFit: "cover",
                        height: "100%",
                    }}
                    src={videoSrc || posterSrc}
                    width={800}
                    height={500}
                    alt="poster photo"
                />
            )}
        </>
    );
};
