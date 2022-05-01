import axios from "axios";

import { api } from "../../utils/api_routes";



//get tutor list
export const getTutorDetail = (tutor_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_DETAIL_LOADER",
      payload: true,
    });
    axios
      .get(api.getTutorDetail + "/" + tutor_id)
      .then((res) => {
        dispatch({
          type: "TUTOR_DETAIL_FETCH_SUCCESS",
          payload: res.data[0],
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_DETAIL_ERROR",
          payload: err,
        });
      });
  };
};


export const getChildDetail = (child_data) => {
  return (dispatch, getState) => {
    dispatch({
      type: "PARENT_CHILD",
      payload: child_data,
    });
  };
};