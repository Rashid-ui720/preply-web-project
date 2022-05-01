import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getTutorLessons = (tutor_id, pageNumber , query = '') => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_LESSONS_LOADER",
      payload: true,
    });

    axios
      .post(api.getTutor_or_Student_Lessons + "?page=" + pageNumber + "&query=" + query, {
        instructor_id: tutor_id,
      })
      .then((res) => {
        dispatch({
          type: "TUTOR_LESSONS_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_LESSONS_ERROR",
          payload: err,
        });
      });
  };
};
