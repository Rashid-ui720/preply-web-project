import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getTutorDashboardData = (tutor_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_DASHBOARD_LOADER",
      payload: true,
    });
    axios
      .post(api.tutor_or_student_dashboard, {
        user_type: "instructor",
        user_id: tutor_id,
      })
      .then((res) => {
        dispatch({
          type: "TUTOR_DASHBOARD_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_DASHBOARD_ERROR",
          payload: err,
        });
      });
  };
};
