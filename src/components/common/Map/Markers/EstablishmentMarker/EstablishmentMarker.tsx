// "use client";
// import Image from "next/image";

// import { IEstablishmentFront } from "@/lib/models";
// import { CustomMarker } from "../CustomMarker";

// interface EstablishmentMarkerProps {
//     establishment: IEstablishmentFront;
//     onSelect: (id: string) => void;
// }

// export const EstablishmentMarker = ({
//     establishment,
//     onSelect,
// }: 
// EstablishmentMarkerProps) => {
//     return (
//         <CustomMarker
//             longitude={establishment.location.longitude}
//             latitude={establishment.location.latitude}
//             onSelect={() => onSelect(establishment.id)}
//             // markerContent={
//             //     <div className="custom-marker">
//             //         <Image
//             //             src={"/default-marker.png"}
//             //             alt={establishment.title}
//             //             className="marker-icon"
//             //             width={50}
//             //             height={50}
//             //         />
//             //     </div>
//             // }
//             popupContent={
//                 <div className="popup-content">
//                     <h3 className="popup-title">{establishment.title}</h3>
//                     <p className="popup-description">{establishment.id}</p>
//                     <button
//                         // onClick={() => onSelect(establishment.id)}
//                         className="popup-button"
//                     >
//                         Подробнее
//                     </button>
//                 </div>
//             }
//         />
//     );
// };
