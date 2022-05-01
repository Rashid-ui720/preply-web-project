import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getTutorActiveStudentDetail = (student_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_ACTIVE_STUDENT_DETAIL_LOADER",
      payload: true,
    });

    //     axios
    //       .post(api.getTutor_or_Student_TrailLessons + "?page=" + pageNumber, {
    //         instructor_id: tutor_id,
    //       })
    //       .then((res) => {
    //         dispatch({
    //           type: "TUTOR_ACTIVE_STUDENT_DETAIL_FETCH_SUCCESS",
    //           payload: res.data,
    //         });
    //       })
    //       .catch((err) => {
    //         dispatch({
    //           type: "TUTOR_ACTIVE_STUDENT_DETAIL_ERROR",
    //           payload: err,
    //         });
    //       });
  };
};
