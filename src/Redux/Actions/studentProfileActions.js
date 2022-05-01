import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";
import { localRoutes } from "../../utils/local_routes";

//get tutro profile
export const getStudentProfile = (user_id, userData = null , callfromregister = 0) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_STUDENT_PROFILE_LOADER",
      payload: true,
    });
    axios
      .get(api.studentProfile + "/" + user_id)
      .then(async (res) => {
        await dispatch({
          type: "STUDENT_PROFILE_FETCH_SUCCESS",
          payload: res.data,
        });
        if (userData !== null) {
          await localStorage.setItem("Studentwizard", userData.student_wizard);
          if(userData.student_wizard != null){
            await localStorage.setItem("wizar_check" , true);
          }
          await dispatch({
            type: "USER_WIZARD",
            payload: userData.student_wizard,
          });
          await localStorage.setItem("parentChild", userData.parent_child);
          await dispatch({
            type: "PARENT_CHILD",
            payload: userData.parent_child,
          });
        }

        await localStorage.setItem("authData", res.data);

        await dispatch({
          type: "USER_LOGGED_IN",
          payload: res.data,
        });
        if(callfromregister === 1){
          window.location.href = '/student-dashboard';
        }
      })

      .catch((err) => {
        dispatch({
          type: "STUDENT_PROFILE_ERROR",
          payload: err,
        });
      });
  };
};

//Update tutor profile
export const UpdateStudentProfile = (params, user_id) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.updateStudentProfile + "/" + user_id, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Successfully Updated"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });

        dispatch(getStudentProfile(user_id));
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


// Update student wizard data
export const updateStudentWizardData =  (wizard) => {
  return async (dispatch) => {
    await localStorage.setItem("parentChild", wizard);
    await dispatch({
      type: "PARENT_CHILD",
      payload: wizard,
    });
  };
};
