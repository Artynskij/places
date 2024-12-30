import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateScreenSize } from "@/store/slices/screenSizeSlice";

export const useScreenSizeListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // для начальной установки ширины экрана

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
};
