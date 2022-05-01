import { combineReducers } from "redux";
import TutorListReducer from "./Reducers/tutorListReducer";
import AuthReducer from "./Reducers/authReducer";
import TutorProfileReducer from "./Reducers/tutorProfileReducer";
import TutorPackagesReducer from "./Reducers/tutorPackagesReducer";
import tutorAvailabilityReducer from "./Reducers/tutorAvailabilityReducer";
import TutorDetailReducer from "./Reducers/tutorDetailReducer";
import TutorTimeSlotsReducer from "./Reducers/tutorTimeSlotsReducer";
import CheckOutReducer from "./Reducers/checkOutReducer";
import TutorLessonsReducer from "./Reducers/tutorLessonsReducer";
import StudentLessonsReducer from "./Reducers/studentLessons";
import StudentProfileReducer from "./Reducers/studentProfileReducer";
import TutorZoomSettingReducer from "./Reducers/tutorzoomSettingReducer";
import LessonDetailReducer from "./Reducers/LessonDetailReducer";
import TutorActiveStudentReducer from "./Reducers/tutorActiveStudentsReducer";
import TutorActiveStudentDetailReducer from "./Reducers/tutorActiveStudentDetailReducer";
import StudentPackagesHistoryReducer from "./Reducers/studentPackagesHistoryReducer";
import TutorPaymentHistoryReducer from "./Reducers/tutorPaymentHistoryReducer";
import StudentWalletReducer from "./Reducers/studentWalletReducer";
import StudentAvaiableTutorListReducer from "./Reducers/studentAvailableTutorReducer";
import TutorDashboardDataReducer from "./Reducers/tutorDashboardReducer";
import TutorCalendarReducer from "./Reducers/tutorCalendarReducer";
import StudentReportReducer from "./Reducers/studentReportReducer";
import StudentDashboardReducer from "./Reducers/studetnDashboardReducer";
import CurrencyReducer from "./Reducers/currencyReducer";
import TutorPayoutReducer from "./Reducers/tutorPayoutReducer";
import NotificationsReducer from "./Reducers/notificationsRducer";
const appReducer = combineReducers({
  tutorList: TutorListReducer,
  Auth: AuthReducer,
  tutorProfile: TutorProfileReducer,
  tutorPackages: TutorPackagesReducer,
  tutorAvailability: tutorAvailabilityReducer,
  tutorDetail: TutorDetailReducer,
  tutorTimeSlots: TutorTimeSlotsReducer,
  checkout: CheckOutReducer,
  tutorLessons: TutorLessonsReducer,
  studentLessons: StudentLessonsReducer,
  studentProfile: StudentProfileReducer,
  tutorZoomSettingReducer: TutorZoomSettingReducer,
  lessonDetail: LessonDetailReducer,
  tutorActiveStudents: TutorActiveStudentReducer,
  tutorActiveStudentDetail: TutorActiveStudentDetailReducer,
  studentPackagesHistory: StudentPackagesHistoryReducer,
  tutorPaymentHistory: TutorPaymentHistoryReducer,
  studentWalletDetail: StudentWalletReducer,
  studentAvailableTutorList: StudentAvaiableTutorListReducer,
  tutorDashboardData: TutorDashboardDataReducer,
  tutorCalendarData: TutorCalendarReducer,
  studentReports: StudentReportReducer,
  StudentDashboard: StudentDashboardReducer,
  currency: CurrencyReducer,
  tutorPayout: TutorPayoutReducer,
  notifications: NotificationsReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_OUT") {
    localStorage.removeItem("state");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;
