import { createSlice } from "@reduxjs/toolkit";

const CONSTANTS_SCREENS = {
  SCREEN_MINI_PHONE: 480,
  SCREEN_PHONE: 768,
  SCREEN_TABLET: 1024,
  SCREEN_NETBOOK: 1280,
};

const getDeviceTypes = (width: number | null) => {
  if (!width) {
    return {
      width: 0,
      isSmallMobile: false,
      isMobile: false,
      isTablet: false,
      isNetBook: false,
      isDesktop: false,
    };
  }
  return {
    width,
    isSmallMobile: width <= CONSTANTS_SCREENS.SCREEN_MINI_PHONE,
    isMobile:
      width > CONSTANTS_SCREENS.SCREEN_MINI_PHONE &&
      width <= CONSTANTS_SCREENS.SCREEN_PHONE,
    isTablet:
      width > CONSTANTS_SCREENS.SCREEN_PHONE &&
      width <= CONSTANTS_SCREENS.SCREEN_TABLET,
    isNetBook:
      width > CONSTANTS_SCREENS.SCREEN_TABLET &&
      width <= CONSTANTS_SCREENS.SCREEN_NETBOOK,
    isDesktop: width > CONSTANTS_SCREENS.SCREEN_NETBOOK,
  };
};

const initialState = getDeviceTypes(null);

const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    updateScreenSize: (state, action) => {
      return getDeviceTypes(action.payload);
    },
  },
});

export const { updateScreenSize } = screenSizeSlice.actions;

export default screenSizeSlice.reducer;
