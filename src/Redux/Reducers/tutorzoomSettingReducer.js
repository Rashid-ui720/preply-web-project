const initState = {
  zoomSetting: {},
  zoomSettingError: null,
  zoomSettingLoader: true,
};

const TutorZoomSettingReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_ZOOM_SETTING_LOADER":
      return {
        ...state,
        zoomSettingLoader: action.payload,
        zoomSettingError: null,
      };
    case "TUTOR_ZOOM_SETTING_ERROR":
      return {
        ...state,
        zoomSettingError: action.payload,
        zoomSetting: {},
        zoomSettingLoader: false,
      };

    case "TUTOR_ZOOM_SETTING_FETCH_SUCCESS":
      return {
        ...state,
        zoomSettingError: null,
        zoomSetting: action.payload,
        zoomSettingLoader: false,
      };

    default:
      return state;
  }
};

export default TutorZoomSettingReducer;
