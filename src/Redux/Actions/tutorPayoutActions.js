import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getTutorPayouts = (tutor_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_PAYOUT_LOADER",
      payload: true,
    });

    axios
      .get(api.tutorPayouts + "/" + tutor_id + "?page=" + pageNumber)
      .then((res) => {
        dispatch({
          type: "TUTOR_PAYOUT_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: "TUTOR_PAYOUT_ERROR",
          payload: err,
        });
      });
  };
};
