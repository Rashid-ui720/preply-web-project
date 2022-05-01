import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getStudentPackagesHistory = (student_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_PACKAGES_HISTORY_LOADER",
      payload: true,
    });

    axios
      .get(
        api.getStudentpackagesHistory + "/" + student_id + "?page=" + pageNumber
      )
      .then((res) => {
        dispatch({
          type: "STUDENT_PACKAGES_HISTORY_FETCH_SUCCESS",
          payload: res.data.response.detail,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: "STUDENT_PACKAGES_HISTORY_ERROR",
          payload: err,
        });
      });
  };
};
