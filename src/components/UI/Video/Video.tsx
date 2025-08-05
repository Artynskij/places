import { FC } from "react";
import style from "./video.module.scss";
import Image from "next/image";
interface IVideo {
    videoSrc: string | null;
    posterSrc: string;
}
export const Video: FC<IVideo> = ({ videoSrc, posterSrc }) => {
    return (
        <>
            {videoSrc ? (
                <video
                    preload="none"
                    className={style.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/mp4" />
                    <track
                        src={videoSrc}
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
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
                    src={posterSrc}
                    width={800}
                    height={500}
                    alt="poster photo"
                />
            )}
        </>
    );
};
