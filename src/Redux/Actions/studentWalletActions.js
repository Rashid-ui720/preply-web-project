import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor trail lessons
export const getStudentWalletDetail = (student_id, pageNumber) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_WALLET_LOADER",
      payload: true,
    });

    axios
      .get(
        api.getStudentWalletDetail + "/" + student_id + "?page=" + pageNumber
      )
      .then((res) => {
        dispatch({
          type: "STUDENT_WALLET_FETCH_SUCCESS",
          payload: res.data.response.detail,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: "STUDENT_WALLET_ERROR",
          payload: err,
        });
      });
  };
};
