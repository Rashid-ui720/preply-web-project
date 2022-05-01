import axios from "axios";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import { api } from "../../utils/api_routes";

//Update tutor profile
export const SetInstructorLessonReview = (
  params,
  closeModal = false,
  onCloseRateLessonModal,
  getTutorLessons
) => {
  toast.dismiss();
  return (dispatch, getState) => {
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.set_student_or_tutor_review, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Reviews has been submitted successfully"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });

        if (closeModal) {
          onCloseRateLessonModal();
          getTutorLessons();
        }
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
