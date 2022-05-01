import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";

//contact us
export const contact_us = (params) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.contactUs, params)
      .then((res) => {
        toast.dismiss();
        toast(
          () =>
            ToastContent(
              "Message Sent! we will contact you back as soon as possible"
            ),
          {
            toastId: "SuccessToast",
            hideProgressBar: true,
            autoClose: 2000,
            type: toast.TYPE.SUCCESS,
          }
        );

        return;
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
        return;
      });
  };
};
