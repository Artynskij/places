import { Overlay } from "../Overlay/Overlay";
import style from "./loader.module.scss";

export const Loader = () => {
  return (
    <>
      <div className={style.loader_block}>
        <div className={style.loader}></div>
      </div>
      {/* <Overlay /> */}
    </>
  );
};


// import dynamic from 'next/dynamic'
 
// const WithCustomLoading = dynamic(
//   () => import('../components/WithCustomLoading'),
//   {
//     loading: () => <p>Loading...</p>,
//   }
// )
 
// export default function Page() {
//   return (
//     <div>
//       {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}
//       <WithCustomLoading />
//     </div>
//   )
// }