import axios from "axios";

import { toast } from "react-toastify";

import { ToastContent } from "../../components/Toast";
import { api } from "../../utils/api_routes";

import { getTutorProfile } from "./tutorProfileActions";

//get Avalability
export const getBreaks = (user_id) => {
  let InitialDaysAndTimes = [
    {
      user_id: user_id,
      current_day: "Monday",
      start_time: "14:00",
      end_time: "15:00",

      is_off: true,
    },
    {
      user_id: user_id,
      current_day: "Tuesday",
      start_time: "14:00",
      end_time: "15:00",

      is_off: true,
    },
    {
      user_id: user_id,
      current_day: "Wednesday",
      start_time: "14:00",
      end_time: "15:00",
      is_off: true,
    },
    {
      user_id: user_id,
      current_day: "Thursday",
      start_time: "14:00",
      end_time: "15:00",
      is_off: true,
    },
    {
      user_id: user_id,
      current_day: "Friday",
      start_time: "14:00",
      end_time: "15:00",
      is_off: true,
    },
    {
      user_id: user_id,
      current_day: "Saturday",
      start_time: "14:00",
      end_time: "15:00",
      is_off: false,
    },
    {
      user_id: user_id,
      current_day: "Sunday",
      start_time: "14:00",
      end_time: "15:00",
      is_off: false,
    },
  ];

  return (dispatch, getState) => {
    dispatch({
      type: "START_BREAK_LOADER",
      payload: true,
    });
    axios
      .get(api.getTutorBreak + "/" + user_id)
      .then((res) => {
        if (res.data.length == 0) {
          dispatch({
            type: "BREAK_FETCH_SUCCESS",
            payload: InitialDaysAndTimes,
          });
        } else {
          for (let i = 0; i < InitialDaysAndTimes.length; i++) {
            res.data.map((day) => {
              if (InitialDaysAndTimes[i].current_day == day.current_day) {
                InitialDaysAndTimes[i].is_off = day.is_off == 1 ? true : false;
                InitialDaysAndTimes[i].end_time =
                  day.end_time == "" || day.end_time == null
                    ? "15:00"
                    : day.end_time.includes("M")
                    ? "15:00"
                    : day.end_time;
                InitialDaysAndTimes[i].start_time =
                  day.start_time == "" || day.start_time == null
                    ? "14:00"
                    : day.start_time.includes("M")
                    ? "14:00"
                    : day.start_time;
                InitialDaysAndTimes[i].user_id = day.user_id;
                InitialDaysAndTimes[i].id = day.id;
              }
            });
          }

          dispatch({
            type: "BREAK_FETCH_SUCCESS",
            payload: InitialDaysAndTimes,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: "BREAK_ERROR",
          payload: e,
        });
      });
  };
};

//update user enterted availability
export const UpdateBreak = (breaks) => {
  return (dispatch, getState) => {
    dispatch({
      type: "BREAK_FETCH_SUCCESS",
      payload: breaks,
    });
  };
};

//set availability
export const setAvailibility = (availability, user_id, getProfile) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.setTutorBreakSchedule, {
        someJSON: availability,
      })
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Break schedule is updated successfully"), {
          toastId: "SuccesssTost",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.SUCCESS,
        });
        dispatch(getBreaks(user_id));
        if (getProfile) {
          dispatch(getTutorProfile(user_id));
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () => ToastContent("Unable to update break schedule. Please try again"),
          {
            toastId: "Error",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };
};
