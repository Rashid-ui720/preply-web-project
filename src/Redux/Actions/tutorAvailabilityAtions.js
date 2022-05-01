import axios from "axios";

import { toast } from "react-toastify";

import { ToastContent } from "../../components/Toast";
import { api } from "../../utils/api_routes";

import { getTutorProfile } from "./tutorProfileActions";

//get Avalability
export const getAvailability = (user_id) => {
  let InitialDaysAndTimes = [
    {
      user_id: user_id,
      day_name: "Monday",
      start_time: "10:00",
      end_time: "19:00",

      is_on: true,
    },
    {
      user_id: user_id,
      day_name: "Tuesday",
      start_time: "10:00",
      end_time: "19:00",

      is_on: true,
    },
    {
      user_id: user_id,
      day_name: "Wednesday",
      start_time: "10:00",
      end_time: "19:00",
      is_on: true,
    },
    {
      user_id: user_id,
      day_name: "Thursday",
      start_time: "10:00",
      end_time: "19:00",
      is_on: true,
    },
    {
      user_id: user_id,
      day_name: "Friday",
      start_time: "10:00",
      end_time: "19:00",
      is_on: true,
    },
    {
      user_id: user_id,
      day_name: "Saturday",
      start_time: "10:00",
      end_time: "19:00",
      is_on: false,
    },
    {
      user_id: user_id,
      day_name: "Sunday",
      start_time: "10:00",
      end_time: "19:00",
      is_on: false,
    },
  ];

  return (dispatch, getState) => {
    dispatch({
      type: "START_AVAILABILITY_LOADER",
      payload: true,
    });
    axios
      .get(api.getTutorAvailability + "/" + user_id)
      .then((res) => {
        if (res.data.length == 0) {
          dispatch({
            type: "AVAILABILITY_FETCH_SUCCESS",
            payload: InitialDaysAndTimes,
          });
        } else {
          for (let i = 0; i < InitialDaysAndTimes.length; i++) {
            res.data.map((day) => {
              if (InitialDaysAndTimes[i].day_name == day.day_name) {
                InitialDaysAndTimes[i].is_on = day.is_on == 1 ? true : false;
                InitialDaysAndTimes[i].end_time =
                  day.end_time == "" || day.end_time == null
                    ? "19:00"
                    : day.end_time.includes("M")
                    ? "19:00"
                    : day.end_time;
                InitialDaysAndTimes[i].start_time =
                  day.start_time == "" || day.start_time == null
                    ? "10:00"
                    : day.start_time.includes("M")
                    ? "10:00"
                    : day.start_time;
                InitialDaysAndTimes[i].user_id = day.user_id;
                InitialDaysAndTimes[i].id = day.id;
              }
            });
          }

          dispatch({
            type: "AVAILABILITY_FETCH_SUCCESS",
            payload: InitialDaysAndTimes,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: "AVAILABILITY_ERROR",
          payload: e,
        });
      });
  };
};

//update user enterted availability
export const UpdateAvailability = (availability) => {
  return (dispatch, getState) => {
    dispatch({
      type: "AVAILABILITY_FETCH_SUCCESS",
      payload: availability,
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
      .post(api.setTutorAvailability, {
        someJSON: availability,
      })
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Schedual is updated successfully"), {
          toastId: "SuccesssTost",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.SUCCESS,
        });
        dispatch(getAvailability(user_id));
        if (getProfile) {
          dispatch(getTutorProfile(user_id));
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () => ToastContent("Unable to update availability please try again"),
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
