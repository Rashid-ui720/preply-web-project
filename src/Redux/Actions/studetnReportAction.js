import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getStudentReport = (student_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_REPORT_LOADER",
      payload: true,
    });

    axios
      .get(api.get_student_report + "/" + student_id + "?page=" + pageNumber, {
        student_id: student_id,
      })
      .then((res) => {
        dispatch({
          type: "STUDENT_REPORT_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "STUDENT_REPORT_ERROR",
          payload: err,
        });
      });
  };
};
