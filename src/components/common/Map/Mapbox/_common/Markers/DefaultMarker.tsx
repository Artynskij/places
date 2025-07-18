import style from './customMarker.module.scss'
import { Marker } from "react-map-gl/mapbox";

interface DefaultMarkerProps {
    latitude: number;
    longitude: number;
    addressLine?: string;
}

export const DefaultMarker = ({
    latitude,
    longitude,
    addressLine,
}: DefaultMarkerProps) => {
    return (
        <Marker className={style.defaultMarker} latitude={latitude} longitude={longitude} anchor="bottom">
            {addressLine && <span>{addressLine}</span>}
            <div style={{ width: 30, height: 30 }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#3B82F6"
                    width="100%"
                    height="100%"
                >
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
            </div>
        </Marker>
    );
};
