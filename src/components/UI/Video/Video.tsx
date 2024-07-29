import { FC } from "react";
import style from "./video.module.scss";
interface IVideo {
  videoSrc: string;
  posterSrc: string;
}
export const Video: FC<IVideo> = ({ videoSrc, posterSrc }) => {
  return (
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
      <track src={videoSrc} kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
};
