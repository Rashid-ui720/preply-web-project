import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";

//Get tutor packages for dashboard
export const getTutorPackages = (user_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_PACKAGES_LOADER",
      payload: true,
    });
    axios
      .get(api.getTutorPackages + "/" + user_id)
      .then((res) => {
        dispatch({
          type: "TUTOR_PACKAGES_FETCH_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_PACKAGES_ERROR",
          payload: err,
        });
      });
  };
};

//Add new tutor package from dashboard
export const addTutorPackage = (params, onCloseAddPackageModal, user_id) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.addTutorPackage, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Package was Successfully added"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });
        onCloseAddPackageModal();
        dispatch(getTutorPackages(user_id));
      })
      .catch((err) => {
        toast.dismiss();

        toast(
          () => ToastContent("Unable to add package some error has accoured"),
          {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };
};

//Update  tutor package from dashboard
export const updateTutorPackage = (params, onCloseAddPackageModal, user_id) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.tutorPackageUpdate, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Package is Successfully update"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });
        onCloseAddPackageModal();
        dispatch(getTutorPackages(user_id));
      })
      .catch((err) => {
        toast.dismiss();

        toast(
          () =>
            ToastContent("Unable to update package some error has accoured"),
          {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };
};
