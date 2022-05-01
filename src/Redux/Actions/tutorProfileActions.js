import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";

//get tutro profile
export const getTutorProfile = (user_id , callfromregister = 0) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_PROFILE_LOADER",
      payload: true,
    });
    axios
      .get(api.tutorProfile + "/" + user_id)
      .then((res) => {
        dispatch({
          type: "TUTOR_PROFILE_FETCH_SUCCESS",
          payload: res.data,
        });

        localStorage.setItem("authData", res.data);
        dispatch({
          type: "USER_LOGGED_IN",
          payload: res.data,
        });
        if(callfromregister === 1){
          window.location.href = '/tutor-dashboard-profile-setup';
        }
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_PROFILE_ERROR",
          payload: err,
        });
      });
  };
};

//Update tutor profile
export const UpdateTutorProfile = (params, user_id) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.updateTutorProfile + "/" + user_id, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Successfully Updated"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });

        dispatch(getTutorProfile(user_id));
      })
      .catch((err) => {
        toast.dismiss();

        if (err.response.data.message) {
          toast(() => ToastContent(err.response.data.message), {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          });
        } else {
          toast(() => ToastContent(err.response.data), {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          });
        }
      });
  };
};
