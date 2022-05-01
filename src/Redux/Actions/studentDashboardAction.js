import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getStudentDashboardDetail = (student_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_DASHBOARD_LOADER",
      payload: true,
    });

    axios
      .post(api.tutor_or_student_dashboard, {
        user_type: "student",
        user_id: student_id,
      })
      .then((res) => {
        dispatch({
          type: "STUDENT_DASHBOARD_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: "STUDENT_DASHBOARD_ERROR",
          payload: err,
        });
      });
  };
};
