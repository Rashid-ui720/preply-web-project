import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getTutorTimeSlots = (ParamsString) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_TIME_SLOTS_LOADER",
      payload: true,
    });

    axios
      .get(api.getInstructorTimeSlots + ParamsString)
      .then((res) => {
        dispatch({
          type: "TUTOR_TIME_SLOTS_FETCH_SUCCESS",
          payload: res.data,
        });
        dispatch({
          type: "FREE_APPOINTMENT",
          payload: res.data.is_enable_free_appointment,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_TIME_SLOTS_ERROR",
          payload: err,
        });
      });
  };
};
