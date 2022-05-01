export const BaseUrl = "https://admin.quranteacherlive.com";
// export const BaseUrl = "http://admin.quranteacherlive.com";
// export const BaseUrl = "http://46.101.40.29";

//admin.quranteacherlive.com
//qurantutor.idemos.xyz

export const api = {
  register: BaseUrl + "/api/register",
  login: BaseUrl + "/api/login",
  tutorProfile: BaseUrl + "/api/user/edit",
  updateTutorProfile: BaseUrl + "/api/user/edit-profile",

  getTutorPackages: BaseUrl + "/api/user/tutor-packages",
  addTutorPackage: BaseUrl + "/api/user/add-package",
  getTutorAvailability: BaseUrl + "/api/user/edit-schedule",
  // breaks api
  getTutorBreak: BaseUrl + "/api/user/edit-break",
  setTutorBreakSchedule: BaseUrl + "/api/user/add-break-schedule",

  setTutorAvailability: BaseUrl + "/api/user/add-schedule",
  getTutorsLits: BaseUrl + "/api/instructors",
  getTutorDetail: BaseUrl + "/api/instructors",
  getInstructorTimeSlots: BaseUrl + "/api/instructor-availability",
  stripeTrailPayment: BaseUrl + "/api/trail-appointment/request",
  getTutor_or_Student_Lessons: BaseUrl + "/api/trail-appointment/get",
  studentProfile: BaseUrl + "/api/user/edit",
  updateStudentProfile: BaseUrl + "/api/user/edit-profile",
  getZoomSetting: BaseUrl + "/api/zoom/setting",
  updateZoomSetting: BaseUrl + "/api/zoom/token/update",
  getLessonDetail: BaseUrl + "/api/trail-appointment/get",
  Stripe_purchasePackage: BaseUrl + "/api/purchase/package",
  getStudentpackagesHistory: BaseUrl + "/api/purchase/student",
  getTutorPaymentHistory: BaseUrl + "/api/purchase/instructor",
  getStudentWalletDetail: BaseUrl + "/api/wallet/student",
  getStudentAvailableTutorsForAppointment:
    BaseUrl + "/api/student/get/instructors",
  getTutorCalendarData: BaseUrl + "/api/instructor/calender",
  set_student_or_tutor_review: BaseUrl + "/api/review",
  zoom_metting_leave_or_join_url: BaseUrl + "/api/zoom/update/meeting/status",
  get_student_report: BaseUrl + "/api/reviewed/appointment",
  paypal_trail_appoitment: BaseUrl + "/api/paypal/trail-appointment/request",
  getPaypalSettings:
    BaseUrl +
    "/api/paypalsetting/Z2V0cGF5cGFsc2V0dGluZ2FwaWtleWFwaXNlY3JldGZvcnF1dHJhbnR1dG9y",
  tutor_or_student_dashboard: BaseUrl + "/api/user/dashboard",
  studentWizardApi: BaseUrl + "/api/user/wizards",
  twilioToken: BaseUrl + "/api/twiliotoken",
  saveChannelInDb: BaseUrl + "/api/createchannel",
  getChannelsTwilio: BaseUrl + "/api/channeldetail",
  getHomeReviews: BaseUrl + "/api/home/reviews",
  tutorPayouts: BaseUrl + "/api/reports/payouts",
  getNotifications: BaseUrl + "/api/notifications",
  markNotificationRead: BaseUrl + "/api/notifications",
  contactUs: BaseUrl + "/api/contact/user",
  ForgetPasswordSendEmail: BaseUrl + "/api/forgotpassword",
  ForgetPasswordCodeCheck: BaseUrl + "/api/verifycode",
  ChangePassword: BaseUrl + "/api/resetpassword",
  sendOtp: BaseUrl + "/api/forwardemail",
  tutorPackageUpdate: BaseUrl + "/api/user/update-package",
  packagePurchasedStudentList: BaseUrl + "/api/studentlist/",
  getParentChildData: BaseUrl + "/api/getParentChildlist/",
  net_connection_test: BaseUrl + "/api/saveNetConnectionResult/",
  getParentWizardDataForProfile: BaseUrl + "/api/user/parent-wizard-data/",
  deleteParentChild: BaseUrl + "/api/user/delete-parent-child/",
  updateParentChild: BaseUrl + "/api/user/update-parent-child/",
  addParentChild: BaseUrl + "/api/user/add-parent-child/",
  deletepackage: BaseUrl + "/api/deletepackage/",
  addEvent: BaseUrl + "/api/user/add-event",
  getEvents: BaseUrl + "/api/user/get-events",
  getTutorSubjects: BaseUrl + "/api/subject",
  storeTutorSubjects: BaseUrl + "/api/subject/store",
  updateTutorSubjects: BaseUrl + "/api/subject/update",
  deleteTutorSubjects: BaseUrl + "/api/subject/delete",
  getTutorEducation: BaseUrl + "/api/education",
  updateTutorEducation: BaseUrl + "/api/education/update",
  storeTutorEducation: BaseUrl + "/api/education/store",
  deleteTutorEducation: BaseUrl + "/api/education/delete",
  getTutorExperience: BaseUrl + "/api/experience",
  updateTutorExperience: BaseUrl + "/api/experience/update",
  storeTutorExperience: BaseUrl + "/api/experience/store",
  deleteTutorExperiences: BaseUrl + "/api/experience/delete",
  sendMessageEmail: BaseUrl + "/api/sendmessageemail",

};
