import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";

//get tutro profile
export const getZoomSetting = (user_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_ZOOM_SETTING_LOADER",
      payload: true,
    });
    axios
      .get(api.getZoomSetting + "/" + user_id)
      .then((res) => {
        dispatch({
          type: "TUTOR_ZOOM_SETTING_FETCH_SUCCESS",
          payload: res.data[0],
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_ZOOM_SETTING_ERROR",
          payload: err,
        });
      });
  };
};

//Update tutor profile
export const UpdateZoomSetting = (params, user_id) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.updateZoomSetting, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Successfully Updated"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });

        dispatch(getZoomSetting(user_id));
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
