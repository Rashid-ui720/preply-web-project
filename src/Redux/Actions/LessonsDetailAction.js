import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getLessonDetail = (id, is_student = false) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_LESSON_DETAIL_LOADER",
      payload: true,
    });
    let Url =
      is_student == true
        ? api.getLessonDetail + "/" + id + "?is_student=" + is_student
        : api.getLessonDetail + "/" + id;
    axios
      .get(Url)
      .then((res) => {
        dispatch({
          type: "LESSON_DETAIL_FETCH_SUCCESS",
          payload: res.data[0],
        });
      })
      .catch((err) => {
        dispatch({
          type: "LESSON_DETAIL_ERROR",
          payload: err,
        });
      });
  };
};
