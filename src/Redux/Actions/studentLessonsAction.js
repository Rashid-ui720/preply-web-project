import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getStudentLessons = (student_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_LESSONS_LOADER",
      payload: true,
    });

    axios
      .post(api.getTutor_or_Student_Lessons + "?page=" + pageNumber, {
        student_id: student_id,
      })
      .then((res) => {
        dispatch({
          type: "STUDENT_LESSONS_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "STUDENT_LESSONS_ERROR",
          payload: err,
        });
      });
  };
};
