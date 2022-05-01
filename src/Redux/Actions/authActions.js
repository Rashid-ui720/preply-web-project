import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";
import { localRoutes } from "../../utils/local_routes";
import { getTutorProfile } from "./tutorProfileActions";
import { getStudentProfile } from "./studentProfileActions";
import { TwilioService } from "./twilioActions";
//For user registration
export const Register = (params, onCloseSignupModal) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.register, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Successfully Registered"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });
        localStorage.setItem("authData", res.data);
        dispatch({
          type: "USER_LOGGED_IN",
          payload: res.data,
        });
        //fetch complete profile data
        if (res.data.role == "instructor") {
          dispatch(getTutorProfile(res.data.user_id , 1));
        } else {
          dispatch({
            type: "USER_LOGGED_IN",
            payload: res.data,
          });
          dispatch({
            type: "USER_WIZARD",
            payload: res.data.student_wizard,
          });
          
          dispatch(getStudentProfile(res.data.user_id, res.data , 1));
          onCloseSignupModal();
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.error(err);
        if (err.response) {
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
        } else {
          toast(() => ToastContent("Unknown error Accoured"), {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          });
        }
      });
  };
};

//For user Login
export const Login = (params, onCloseLoginModal) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.login, params)
      .then( async (res) => {
        if (res.data.user_id !== undefined) {
          //set authData to local storage
          localStorage.setItem("authData", res.data);

          toast.dismiss();
          toast(() => ToastContent("Successfully Logged in"), {
            toastId: "SuccessToast",
            hideProgressBar: true,
            autoClose: 2000,
            type: toast.TYPE.SUCCESS,
          });
          dispatch({
            type: "USER_LOGGED_IN",
            payload: res.data,
          });
          //fetch complete profile data
          if (res.data.role === "instructor") {
            dispatch(getTutorProfile(res.data.user_id));
          } else {
            dispatch({
              type: "USER_LOGGED_IN",
              payload: res.data,
            });
            dispatch({
              type: "USER_WIZARD",
              payload: res.data.student_wizard,
            });
            dispatch({
              type: "PARENT_CHILD",
              payload: res.data.parent_child,
            });
            dispatch(getStudentProfile(res.data.user_id, res.data));
          }
          onCloseLoginModal();
        } else {
          toast.dismiss();
          toast(() => ToastContent(res.data), {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          });
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.error(err);
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

//For user Logout
export const Logout = () => {
  return async (dispatch, getState) => {
    //clear authData from local storge
    localStorage.removeItem("authData");
    localStorage.removeItem("Studentwizard");
    localStorage.removeItem("state");
    localStorage.clear();
    TwilioService.getInstance().clientShutdown();
    dispatch({
      type: "USER_LOOGED_OUT",
      payload: null,
    });
    dispatch({
      type: "USER_OUT",
      payload: null,
    });
    toast.dismiss();
    toast(() => ToastContent("Logged Out"), {
      toastId: "SuccessToast",
      hideProgressBar: true,
      autoClose: 2000,
      type: toast.TYPE.SUCCESS,
    });
    window.location.href = '/';
  };
};
