import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getStudentAvaialableTutorList = (student_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_AVAILABLE_TUTOR_LOADER",
      payload: true,
    });
    axios
      .get(
        api.getStudentAvailableTutorsForAppointment +
          "/" +
          student_id +
          "?page=" +
          pageNumber
      )
      .then((res) => {
        dispatch({
          type: "STUDENT_AVAILABLE_TUTOR_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "STUDENT_AVAILABLE_TUTOR_ERROR",
          payload: err,
        });
      });
  };
};
