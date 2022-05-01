import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getTutorCalendarData = (params) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_CALENDER_LOADER",
      payload: true,
    });
    axios
      .post(api.getTutorCalendarData, params)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i]["title"] = "Appointment";
          res.data[i]["date"] = new Date(res.data[i].booked_date);
          res.data[i]["start"] = new Date(
            res.data[i].booked_date + "T" + res.data[i].time_slot
          );
          res.data[i]["end"] = new Date(
            res.data[i].booked_date + "T" + res.data[i].time_slot
          );
        }

        dispatch({
          type: "TUTOR_CALENDER_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_CALENDER_ERROR",
          payload: err,
        });
      });
  };
};
