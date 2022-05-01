import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getTutorPaymentHistory = (tutor_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_PAYMENT_HISTORY_LOADER",
      payload: true,
    });

    axios
      .get(api.getTutorPaymentHistory + "/" + tutor_id + "?page=" + pageNumber)
      .then((res) => {
        dispatch({
          type: "TUTOR_PAYMENT_HISTORY_FETCH_SUCCESS",
          payload: res.data.response.detail,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: "TUTOR_PAYMENT_HISTORY_ERROR",
          payload: err,
        });
      });
  };
};
