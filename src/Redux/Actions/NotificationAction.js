import axios from "axios";

import { api } from "../../utils/api_routes";

//get notification List
export const getNotifications = (id, isLoader = true) => {
  return (dispatch, getState) => {
    if (isLoader == true) {
      dispatch({
        type: "START_NOTIFICATION_LOADER",
        payload: true,
      });
    }

    axios
      .get(api.getNotifications + "/" + id)
      .then((res) => {
        dispatch({
          type: "NOTIFICATION_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "NOTIFICATION_ERROR",
          payload: err,
        });
      });
  };
};

//Mark notification Read
export const MarkNotifications = (user_id, noti_id) => {
  return (dispatch, getState) => {
    axios
      .post(api.markNotificationRead + "/" + noti_id)
      .then((res) => {
        dispatch(getNotifications(user_id, false));
      })
      .catch((err) => {
        console.error("mark as read error", err);
      });
  };
};
