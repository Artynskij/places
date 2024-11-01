"use client";
import Image from "next/image";
import { useEffect } from "react";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";

const urlImg =
  "https://maps.google.ru/maps/api/staticmap?&channel=ta.desktop.restaurant_review&zoom=15&size=313x136&scale=1&client=gme-tripadvisorinc&format=jpg&sensor=false&language=ru_RU&center=48.139507,11.580884&maptype=roadmap&&markers=icon:http%3A%2F%2Fc1.tacdn.com%2F%2Fimg2%2Fmaps%2Ficons%2Fcomponent_map_pins_v1%2FR_Pin_Small.png|48.139507,11.580884&signature=SkUC2I95iCjQlsD7PJBHreLjqFA=";

export const MapStaticGoogle = () => {
  useEffect(() => {
    const initializeStaticImage = () => {
      const img = fetch(urlImg)
        .then((res) => console.log(res))
        .then((res) => {
          console.log(res);
        });
    };
    initializeStaticImage();
  }, []);

  return (
    // <StaticGoogleMap
    //   size="600x600"
    //   apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
    // >
    //   <Marker
    //     location={{ lat: 40.737102, lng: -73.990318 }}
    //     color="blue"
    //     label="P"
    //   />
    //   <Path
    //     points={[
    //       "40.737102,-73.990318",
    //       "40.749825,-73.987963",
    //       "40.752946,-73.987384",
    //       "40.755823,-73.986397",
    //     ]}
    //   />
    // </StaticGoogleMap>
    <Image
      alt="static"
      src={`https://maps.google.ru/maps/api/staticmap?&channel=ta.desktop.restaurant_review&zoom=15&size=313x136&scale=1&client=gme-tripadvisorinc&format=jpg&sensor=false&language=ru_RU&center=48.139507,11.580884&maptype=roadmap&&markers=icon:http%3A%2F%2Fc1.tacdn.com%2F%2Fimg2%2Fmaps%2Ficons%2Fcomponent_map_pins_v1%2FR_Pin_Small.png|48.139507,11.580884&signature=SkUC2I95iCjQlsD7PJBHreLjqFA=`}
    />
    // <img
    //   src={}
    // ></img>
  );
};
