import React, { Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import { localRoutes } from "./utils/local_routes";
import { connect } from "react-redux";
import Four_o_Four from "./Pages/404/404";
import Home from "./Pages/home/Home";
import Header from "./Pages/layout/header";
import TutorList from "./Pages/tutorList/tutorlist";
import TutorDetail from "./Pages/tutorDetail/tutorDetail";
import StudentDashboard from "./Pages/studentDashboard/studentDashboard/studentDashboard";
import StudentLessons from "./Pages/studentDashboard/studentLessons/studentLessons";
import StudentProfile from "./Pages/studentDashboard/studentProfile/studentProfile";
import StudentMessages from "./Pages/studentDashboard/studentMessages/studentMessages";
import TutorDashboard from "./Pages/tutorDashboard/tutorDashboard/tutorDashboard";
import TutorLessons from "./Pages/tutorDashboard/tutorLesons/tutroLessons";
import TutorMessages from "./Pages/tutorDashboard/tutorMessages/tutorMessages";
import TutorProfile from "./Pages/tutorDashboard/tutorProfile/tutorProfile";
import TutorDashboardSideBar from "./Pages/layout/tutorDashboardSideBar";
import TutorCalendar from "./Pages/tutorDashboard/tutorCalendar/tutorCalendar";
import PackageCheckout from "./Pages/packageCheckout/packagescheckout";
import TutorActiveStudents from "./Pages/tutorDashboard/tutorActiveStudents.js/tutorActiveStudents";
import TutorDashboardReviews from "./Pages/tutorDashboard/tutorReviews/tutorReviews";
import TutorDashboardLessonDetail from "./Pages/tutorDashboard/tutorLessonDetail/tutorLessonDetail";
import ActiveStudentDetail from "./Pages/tutorDashboard/tutorActiveStudents.js/ActiveStudentDetail";
import StudentPackagesHistory from "./Pages/studentDashboard/studentPackagesHisotry/studentPackagesHistory";
import StudentDashboardLessonDetail from "./Pages/studentDashboard/studentLessonDetail/studentLessonDetail";
import StudentPaymentMethod from "./Pages/studentDashboard/studentPaymentMethod/studentPaymentMethod";
import TutorDashboardPackages from "./Pages/tutorDashboard/tutorPackages/TutorDashboardPackages";
import TutorChnagePassword from "./Pages/tutorDashboard/tutorChnagePassword/tutorChnagePassword";
import BecomeTutor from "./Pages/becomeTutor/becomeTutor";
import TutorProfileSetup from "./Pages/tutorDashboard/tutorProfileSetup/tutorProfileSetup";
import TutorDashbaordAvailability from "./Pages/tutorDashboard/TutorDashbaordAvailability/TutorDashbaordAvailability";
import TutorDashboardBreaks from "./Pages/tutorDashboard/TutorDashbaordBreaks/TutorDashbaordBreaks";
import Checkout from "./Pages/checkout/checkout";
import PaymentSuccess from "./Pages/checkout/paymentSuccess";
import TutorPaymnetHistory from "./Pages/tutorDashboard/tutorPaymentHistory/tutorPaymentHistory";
import TutorZoomSetting from "./Pages/tutorDashboard/tutorZoomSetting/tutorZoomSetting";
import StudentWallet from "./Pages/studentDashboard/studentWallet/studentWallet";
import StudentAvailableTutorList from "./Pages/studentDashboard/AvailableTutorListForBooking/AvailableTutorList";
import StudentSchedualLesson from "./Pages/studentDashboard/studentSchedualLesson/studentSchedualLesson";
import StudentReport from "./Pages/studentDashboard/studentReport/studentReport";
import Contact_us from "./Pages/contact-us/contact_us";
import Seo_Pages_Cities from "./Pages/seo-pages/seo_pages_cities";
import Seo_Pages_Cities_Data from "./Pages/seo-pages/seo_pages_cities_data";
import About_us from "./Pages/about-us/about_us";
import Features from "./Pages/features/features";
import Courses from "./Pages/courses/courses";
import Privacy from "./Pages/privacy_policy/privacy_policy";
import Reviews from "./Pages/reviews/reviews";
import Term_condition from "./Pages/termscondiotion/terms_&_conditions";
import MobilePaypalCheckout from "./Pages/MobilePaypalCheckout/mobilePaypalCheckout";
import MobilePaypalCheckoutResult from "./Pages/MobilePaypalCheckout/mobilePaypalResult";
import { api } from "./utils/api_routes";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import StudentWizardModal from "./components/StudentWizardModal";
import { Helmet } from "react-helmet";
import StudentSettings from "./Pages/studentDashboard/studentSettings/studentSettings";
import TutorPayouts from "./Pages/tutorDashboard/tutorPayouts/tutorPayouts";
import { getCurrencyRate } from "./Redux/Actions/currencyActions";
import FreeAppoinmentSuccess from "./Pages/checkout/freeAppointmentSuccessMessag";
import GetEvents from "./Pages/tutorDashboard/tutorEvents/getEvents";
import GetSubjects from "./Pages/tutorDashboard/tutorSubject/getSubjects";
import GetEducation from "./Pages/tutorDashboard/tutorEducation/getEducation";
import GetExperience from "./Pages/tutorDashboard/tutorExperience/getExperience";


const Footer = React.lazy(() => import("./Pages/layout/footer"));
class AppRouter extends React.Component {
  state = {
    DashboardNavCheck: false,
    activeLink: "",
    studentWizardModal: false,
    PageMetapageTitle: null,
    PageMetadescription: null,
  };
  onCloseWizardModal = () => {
    this.setState({ studentWizardModal: false });
  };

  onOpenWizardModal = () => {
    this.setState({ studentWizardModal: true });
  };
  componentDidMount() {
    //mobile paypal checkout path check to remove header and footer7
    if (
      window.location.pathname == localRoutes.mobile_paypal_checkout ||
      window.location.pathname == localRoutes.mobil_paypal_checkout_result
    ) {
      document.getElementById("navigation-header").style.display = "none";
      // document.getElementById("app-foooter").style.display = "none";
    }
    // Check if tutro list inculed a city name
    if (window.location.pathname.includes("uk")) {
      let url = window.location.pathname.split("/");
    } else {
      this.setState({ PageMetapageTitle: null, PageMetadescription: null });
    }
    //check if intial path is dashboard
    if (window.location.pathname.includes("dashboard")) {
      if (
        this.props.AuthData !== null &&
        this.props.AuthData.role == "student" &&
        window.location.pathname.includes("student-dashboard")
      ) {
        //check if studetn already done with wizard or not
        if (
          this.props.studetnWizard == null &&
          localStorage.getItem("wizar_check") == null
        ) {
          this.onOpenWizardModal();
        }
      }

      this.setState({ DashboardNavCheck: true });
    } else {
      this.setState({ DashboardNavCheck: false });
    }
    this.toogleActiveLink(window.location.pathname);
    //event listner on path name change
    this.props.history.listen((location, action) => {
      // Check if tutro list inculed a city name

      if (window.location.pathname.includes("uk")) {
        let url = window.location.pathname.split("/");
      } else {
        this.setState({ PageMetapageTitle: null, PageMetadescription: null });
      }
      if (location.pathname.includes("dashboard")) {
        //check for student dashboard
        if (
          this.props.AuthData !== null &&
          this.props.AuthData.role == "student" &&
          location.pathname.includes("student-dashboard")
        ) {
          //check if studetn already done with wizard or not
          if (
            this.props.studetnWizard == null &&
            localStorage.getItem("wizar_check") == null
          ) {
            this.onOpenWizardModal();
          }
        }

        this.setState({ DashboardNavCheck: true });
      } else {
        this.setState({ DashboardNavCheck: false });
      }

      this.toogleActiveLink(location.pathname);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    //Check if user comes from the Metting or not
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("meeting_query");
    if (query !== null) {
      let role = parseInt(urlParams.get("role").trim());
      let meetingNumber = urlParams.get("meetingNumber").trim();
      let leaveTime = urlParams.get("leaveTime").trim();
      if (role == 1) {
        //tutor left the metting
        let ParamData = {
          instructor_leave: 1,
          meeting_id: meetingNumber,
          instructor_leave_time: leaveTime,
        };
        this.MettingStatusApi(ParamData);
      }
      if (role == 0) {
        //student left the metting
        let ParamData = {
          student_leave: 1,
          meeting_id: meetingNumber,
          student_leave_time: leaveTime,
        };
        this.MettingStatusApi(ParamData);
      }
    }

    //GET CURRENCY RATE FOR FUTURE USED
    this.props.getCurrencyRate(this.props.currency);
  }

  MettingStatusApi = (params) => {
    axios
      .post(api.zoom_metting_leave_or_join_url, params)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  toogleActiveLink(path) {
    this.setState({ activeLink: path });
  }

  //return Dashboard SideBar
  DashboardSideBar = () => {
    const { AuthData } = this.props;
    if (
      AuthData !== null &&
      AuthData.role == "instructor" &&
      this.state.activeLink.includes("tutor-dashboard")
    ) {
      return <TutorDashboardSideBar />;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  // Return Student Dashboar
  StudentDashboard = () => {
    const { AuthData } = this.props;
    if (AuthData !== null && AuthData.role == "student") {
      return (
        <React.Fragment>
          <Route exact path={localRoutes.student_dashboard}>
            <StudentDashboard />
          </Route>

          <Route exact path={localRoutes.student_dashboard_lessons}>
            <StudentLessons />
          </Route>
          <Route exact path={localRoutes.student_dashboard_profile}>
            <StudentProfile />
          </Route>
          <Route exact path={localRoutes.student_dashboard_messages}>
            <StudentMessages />
          </Route>
          <Route exact path={localRoutes.student_dashboard_packages_history}>
            <StudentPackagesHistory />
          </Route>
          <Route exact path={localRoutes.student_dashboard_lessons_detail}>
            <StudentDashboardLessonDetail />
          </Route>
          <Route exact path={localRoutes.student_dashboard_payment_method}>
            <StudentPaymentMethod />
          </Route>
          <Route exact path={localRoutes.student_dashboard_wallet}>
            <StudentWallet />
          </Route>
          <Route exact path={localRoutes.student_dashboard_available_tutors}>
            <StudentAvailableTutorList />
          </Route>
          <Route exact path={localRoutes.student_dashboard_schedual_lesson}>
            <StudentSchedualLesson />
          </Route>
          <Route exact path={localRoutes.student_dashboard_report}>
            <StudentReport />
          </Route>
          <Route exact path={localRoutes.student_dashboard_settings}>
            <StudentSettings />
          </Route>
        </React.Fragment>
      );
    } else {
      return <></>;
    }
  };

  //Return Tutor Dashbaord
  TutorDashboard = () => {
    const { AuthData } = this.props;
    if (AuthData !== null && AuthData.role == "instructor") {
      //if tutor is not verfifed then show only this screen in dashoard
      if (AuthData.verified == "0") {
        return (
          <React.Fragment>
            <Route exact path={localRoutes.tutor_dashboard_profile_setup}>
              <TutorProfileSetup />
            </Route>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Route exact path={localRoutes.tutor_dashboard}>
              <TutorDashboard />
            </Route>

            <Route exact path={localRoutes.tutor_dashboard_messages}>
              <TutorMessages />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_profile}>
              <TutorProfile />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_calendar}>
              <TutorCalendar />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_lessons}>
              <TutorLessons navprops={this.props.location} />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_active_students}>
              <TutorActiveStudents />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_reviews}>
              <TutorDashboardReviews />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_lesson_detail}>
              <TutorDashboardLessonDetail />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_payment_history}>
              <TutorPaymnetHistory />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_student_detail}>
              <ActiveStudentDetail />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_packages}>
              <TutorDashboardPackages />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_availability}>
              <TutorDashbaordAvailability />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_breaks}>
              <TutorDashboardBreaks />
            </Route>
            <Route exact path={localRoutes.get_events}>
              <GetEvents />
            </Route>
            <Route exact path={localRoutes.get_tutor_subjects}>
              <GetSubjects />
            </Route>
            <Route exact path={localRoutes.get_tutor_education}>
              <GetEducation />
            </Route>
            <Route exact path={localRoutes.get_tutor_experience}>
              <GetExperience />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_zoom_setting}>
              <TutorZoomSetting />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_payouts}>
              <TutorPayouts />
            </Route>
            <Route exact path={localRoutes.tutor_dashboard_password_change}>
              <TutorChnagePassword />
            </Route>
          </React.Fragment>
        );
      }
    } else {
      return <></>;
    }
  };

  setDefaultTitle = () => {
    this.setState({
      PageMetapageTitle:
        "The Best Way To Find A Private Teacher - Quran Teacher Live",
      PageMetadescription:
        "They are all graduated in Islamic research and have previous experience of educating Quran online to students. Our female Quran teachers include Hifz-e-Quran ...",
    });
  };
  seoCityRoutes = () => {
    let seoCityRouteName = [
      {
        name: "barking",
        url: "/uk/quran-teacher-barking",
      },
      {
        name: "birmingham",
        url: "/uk/quran-teacher-birmingham",
      },
      {
        name: "blackburn",
        url: "/uk/quran-teacher-blackburn",
      },
      {
        name: "bradford",
        url: "/uk/quran-teacher-bradford",
      },
      {
        name: "bristol",
        url: "/uk/quran-teacher-bristol",
      },
      {
        name: "derby",
        url: "/uk/quran-teacher-derby",
      },
      {
        name: "islington",
        url: "/uk/quran-teacher-islington",
      },
      {
        name: "leeds",
        url: "/uk/quran-teacher-leeds",
      },
      {
        name: "leicester",
        url: "/uk/quran-teacher-leicester",
      },
      {
        name: "liverpool",
        url: "/uk/quran-teacher-liverpool",
      },
      {
        name: "london",
        url: "/uk/quran-teacher-london",
      },
      {
        name: "luton",
        url: "/uk/quran-teacher-luton",
      },
      {
        name: "manchester",
        url: "/uk/quran-teacher-manchester",
      },
      {
        name: "newcastle",
        url: "/uk/quran-teacher-newcastle",
      },
      {
        name: "nottingham",
        url: "/uk/quran-teacher-nottingham",
      },
      {
        name: "sheffield",
        url: "/uk/quran-teacher-sheffield",
      },
      {
        name: "stockport",
        url: "/uk/quran-teacher-stockport",
      },
      {
        name: "walthamstow",
        url: "/uk/quran-teacher-walthamstow",
      },
      {
        name: "wembley",
        url: "/uk/quran-teacher-wembley",
      },
      {
        name: "skype_quran_classes",
        url: "/skype-quran-classes",
      },
      {
        name: "online_quran_classes",
        url: "/online-quran-classes",
      },
      {
        name: "tajweed_classes",
        url: "/tajweed-classes",
      },
      {
        name: "islamic_lessons_kids",
        url: "/islamic-lessons-kids",
      },
      {
        name: "online_madrasa_uk",
        url: "/online-madrasa-uk",
      },
      {
        name: "quran_for_kids",
        url: "/quran-for-kids",
      },
      {
        name: "hifz_program",
        url: "/hifz-program",
      },
      {
        name: "reading_quran_classes",
        url: "/reading-quran-classes",
      },
      {
        name: "learn_quran_online",
        url: "/learn-quran-online",
      },
      {
        name: "cardiff_quran_teacher",
        url: "/wales/quran-teacher-cardiff",
      },
      {
        name: "croydon_quran_teacher",
        url: "/uk/quran-teacher-croydon",
      },
      {
        name: "milton_keynes_quran_teacher",
        url: "/uk/quran-teacher-miltonkeynes",
      },
      {
        name: "oxford_quran_teacher",
        url: "/uk/quran-teacher-oxford",
      },
      {
        name: "reading_quran_teacher",
        url: "/quran-teacher-reading",
      },
      {
        name: "slough_quran_teacher",
        url: "/uk/quran-teacher-slough",
      },
      {
        name: "watford_quran_teacher",
        url: "/uk/quran-teacher-watford",
      },
      {
        name: "online_arabic_tutors",
        url: "/online-arabic-tutors",
      },
      {
        name: "bedford_quran_teacher",
        url: "/uk/quran-teacher-bedford",
      },
      {
        name: "bolton_quran_teacher",
        url: "/uk/quran-teacher-bolton",
      },
      {
        name: "cambridge_quran_teacher",
        url: "/uk/quran-teacher-cambridge",
      },
      {
        name: "dudley_quran_teacher",
        url: "/uk/quran-teacher-dudley",
      },
      {
        name: "glasgow_quran_teacher",
        url: "/uk/quran-teacher-glasgow",
      },
      {
        name: "halifax_quran_teacher",
        url: "/canada/quran-teacher-halifax",
      },
      {
        name: "huddersfield_quran_teacher",
        url: "/uk/quran-teacher-huddersfield",
      },
      {
        name: "oldham_quran_teacher",
        url: "/uk/quran-teacher-oldham",
      },
      {
        name: "online_quran_lessons",
        url: "/online-quran-lessons",
      },
      {
        name: "peterborough_quran_teacher",
        url: "/uk/quran-teacher-peterborough",
      },
      {
        name: "preston_quran_teacher",
        url: "/uk/quran-teacher-preston",
      },
      {
        name: "rochdale_quran_teacher",
        url: "/uk/quran-teacher-rochdale",
      },
      {
        name: "southampton_quran_teacher",
        url: "/uk/quran-teacher-southampton",
      },
      {
        name: "stoke_trent_quran_teacher",
        url: "/uk/quran-teacher-stokeontrent",
      },
      {
        name: "wakefield_quran_teacher",
        url: "/uk/quran-teacher-wakefield",
      },
      //new 73 seo pages autraila, canada etc route path
      {
        name: "adelaide_quran_teacher",
        url: "/australia/quran-teacher-adelaide",
      },
      {
        name: "sydney_quran_teacher",
        url: "/australia/quran-teacher-sydney",
      },
      {
        name: "perth_quran_teacher",
        url: "/australia/quran-teacher-perth",
      },
      {
        name: "toronto_quran_teacher",
        url: "/canada/quran-teacher-toronto",
      },
      {
        name: "montreal_quran_teacher",
        url: "/canada/quran-teacher-montreal",
      },
      {
        name: "vancouver_quran_teacher",
        url: "/canada/quran-teacher-vancouver",
      },
      {
        name: "calgary_quran_teacher",
        url: "/canada/quran-teacher-calgary",
      },
      {
        name: "edmonton_quran_teacher",
        url: "/canada/quran-teacher-edmonton",
      },
      {
        name: "ottawa_gatineau_quran_teacher",
        url: "/canada/quran-teacher-ottawa-gatineau",
      },
      {
        name: "winnipeg_quran_teacher",
        url: "/canada/quran-teacher-winnipeg",
      },
      {
        name: "quebec_city_quran_teacher",
        url: "/canada/quran-teacher-quebec-city",
      },
      {
        name: "hamilton_quran_teacher",
        url: "/canada/quran-teacher-hamilton",
      },
      {
        name: "chicago_quran_teacher",
        url: "/illinois/quran-teacher-chicago",
      },
      {
        name: "aurora_quran_teacher",
        url: "/illinois/quran-teacher-aurora",
      },
      {
        name: "joliet_quran_teacher",
        url: "/illinois/quran-teacher-joliet",
      },
      {
        name: "naperville_quran_teacher",
        url: "/illinois/quran-teacher-naperville",
      },
      {
        name: "rockford_quran_teacher",
        url: "/illinois/quran-teacher-rockford",
      },
      {
        name: "elgin_quran_teacher",
        url: "/illinois/quran-teacher-elgin",
      },
      {
        name: "virginia_beach_quran_teacher",
        url: "/virginia/quran-teacher-virginia-beach",
      },
      {
        name: "chesapeake_quran_teacher",
        url: "/virginia/quran-teacher-chesapeake",
      },
      {
        name: "arlington_quran_teacher",
        url: "/virginia/quran-teacher-arlington",
      },
      {
        name: "norfolk_quran_teacher",
        url: "/virginia/quran-teacher-norfolk",
      },
      {
        name: "richmond_quran_teacher",
        url: "/virginia/quran-teacher-richmond",
      },
      {
        name: "newport_news_quran_teacher",
        url: "/virginia/quran-teacher-newport_news",
      },
      {
        name: "hampton_quran_teacher",
        url: "/virginia/quran-teacher-hampton",
      },
      {
        name: "roanoke_quran_teacher",
        url: "/virginia/quran-teacher-roanoke",
      },
      {
        name: "hempstead_quran_teacher",
        url: "/new-york/quran-teacher-hempstead",
      },
      {
        name: "brookhaven_quran_teacher",
        url: "/new-york/quran-teacher-brookhaven",
      },
      {
        name: "islip_quran_teacher",
        url: "/new-york/quran-teacher-islip",
      },
      {
        name: "oyster_bay_quran_teacher",
        url: "/new-york/quran-teacher-oyster-bay",
      },
      {
        name: "buffalo_quran_teacher",
        url: "/new-york/quran-teacher-buffalo",
      },
      {
        name: "north_hempstead_quran_teacher",
        url: "/new-york/quran-teacher-north-hempstead",
      },
      {
        name: "babylon_quran_teacher",
        url: "/new-york/quran-teacher-babylon",
      },
      {
        name: "yonkers_quran_teacher",
        url: "/new-york/quran-teacher-yonkers",
      },
      {
        name: "rochester_quran_teacher",
        url: "/new-york/quran-teacher-rochester",
      },
      {
        name: "newark_quran_teacher",
        url: "/new-jersey/quran-teacher-newark",
      },
      {
        name: "jersey_city_quran_teacher",
        url: "/new-jersey/quran-teacher-jersey-city",
      },
      {
        name: "paterson_quran_teacher",
        url: "/new-jersey/quran-teacher-paterson",
      },
      {
        name: "elizabeth_quran_teacher",
        url: "/new-jersey/quran-teacher-elizabeth",
      },
      {
        name: "lakewood_quran_teacher",
        url: "/new-jersey/quran-teacher-lakewood",
      },
      {
        name: "houston_quran_teacher",
        url: "/texas/quran-teacher-houston",
      },
      {
        name: "san_antonio_quran_teacher",
        url: "/texas/quran-teacher-san-antonio",
      },
      {
        name: "dallas_quran_teacher",
        url: "/texas/quran-teacher-dallas",
      },
      {
        name: "austin_quran_teacher",
        url: "/texas/quran-teacher-austin",
      },
      {
        name: "fort_worth_quran_teacher",
        url: "/texas/quran-teacher-fort-worth",
      },
      {
        name: "detroit_quran_teacher",
        url: "/michigan/quran-teacher-detroit",
      },
      {
        name: "grand_rapids_quran_teacher",
        url: "/michigan/quran-teacher-grand-rapids",
      },
      {
        name: "warren_city_quran_teacher",
        url: "/michigan/quran-teacher-warren-city",
      },
      {
        name: "sterling_heights_quran_teacher",
        url: "/michigan/quran-teacher-sterling-heights",
      },
      {
        name: "ann_arbor_quran_teacher",
        url: "/michigan/quran-teacher-ann-arbor",
      },
      {
        name: "lansing_city_quran_teacher",
        url: "/michigan/quran-teacher-lansing-city",
      },
      {
        name: "dearborn_quran_teacher",
        url: "/michigan/quran-teacher-dearborn",
      },
      {
        name: "jacksonville_quran_teacher",
        url: "/florida/quran-teacher-jacksonville",
      },
      {
        name: "miami_quran_teacher",
        url: "/florida/quran-teacher-miami",
      },
      {
        name: "tampa_quran_teacher",
        url: "/florida/quran-teacher-tampa",
      },
      {
        name: "orlando_quran_teacher",
        url: "/florida/quran-teacher-orlando",
      },
      {
        name: "st_petersburg_quran_teacher",
        url: "/florida/quran-teacher-St-Petersburg",
      },
      {
        name: "wilmington_quran_teacher",
        url: "/delaware/quran-teacher-wilmington",
      },
      {
        name: "los_angeles_quran_teacher",
        url: "/california/quran-teacher-los-angeles",
      },
      {
        name: "san_diego_quran_teacher",
        url: "/california/quran-teacher-san-diego",
      },
      {
        name: "san_jose_quran_teacher",
        url: "/california/quran-teacher-san-Jose",
      },
      {
        name: "san_francisco_quran_teacher",
        url: "/california/quran-teacher-san-francisco",
      },
      {
        name: "philadelphia_quran_teacher",
        url: "/pennsylvania/quran-teacher-philadelphia",
      },
      {
        name: "pittsburgh_quran_teacher",
        url: "/pennsylvania/quran-teacher-pittsburgh",
      },
      {
        name: "allentown_quran_teacher",
        url: "/pennsylvania/quran-teacher-allentown",
      },
    ];

    return seoCityRouteName.map((route, index) => {
      return (
        <Route key={index} exact path={`${route.url}`}>
          <Seo_Pages_Cities
            name={route.name}
            setDefaultTitle={this.setDefaultTitle}
          />
        </Route>
      );
    });
  };

  render() {
    const { AuthData } = this.props;

    return (
      <React.Fragment>
        {/* React halment to change page title */}
        {this.state.PageMetapageTitle !== null ? (
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              {this.state.PageMetapageTitle !== null
                ? this.state.PageMetapageTitle
                : "The Best Way To Find A Private Teacher | Quran Teacher Live"}
            </title>
            <meta
              name="description"
              content={
                this.state.PageMetadescription !== null
                  ? this.state.PageMetadescription
                  : "Take Quran classes with a tutor. Choose from  online tutors teaching Quran right now."
              }
            />
          </Helmet>
        ) : null}

        {/* App header */}
        <Header activeLink={this.state.activeLink} />
        {this.DashboardSideBar()}
        {/* App routes */}
        <Switch>
          <Route exact path={localRoutes.home}>
            <Home />
          </Route>
          <Route exact path={localRoutes.become_tutor}>
            <BecomeTutor />
          </Route>
          <Route exact path={localRoutes.contact_us}>
            <Contact_us />
          </Route>
          <Route exact path={localRoutes.cities_list}>
            <Seo_Pages_Cities_Data />
          </Route>
          <Route exact path={localRoutes.about_us}>
            <About_us />
          </Route>
          <Route exact path={localRoutes.features}>
            <Features />
          </Route>
          <Route exact path={localRoutes.courses}>
            <Courses />
          </Route>
          <Route exact path={localRoutes.privacy_policy}>
            <Privacy />
          </Route>
          <Route exact path={localRoutes.terms_conditions}>
            <Term_condition />
          </Route>
          <Route exact path={localRoutes.reviews}>
            <Reviews />
          </Route>
          <Route exact path={localRoutes.tutor_list}>
            <TutorList />
          </Route>
          {/* Cities routes */}
          {/* {this.citiesRoutes()} */}

          {/* seo cities routes */}
          {this.seoCityRoutes()}
          <Route exact path={localRoutes.mobile_paypal_checkout}>
            <MobilePaypalCheckout />
          </Route>
          <Route exact path={localRoutes.mobil_paypal_checkout_result}>
            <MobilePaypalCheckoutResult />
          </Route>

          <Route exact path={localRoutes.tutor_detail}>
            <TutorDetail />
          </Route>
          {AuthData !== null ? (
            <Route exact path={localRoutes.checkout}>
              <Checkout />
            </Route>
          ) : null}
          {AuthData !== null ? (
            <Route exact path={localRoutes.packageCheckout}>
              <PackageCheckout />
            </Route>
          ) : null}
          {AuthData !== null ? (
            <Route exact path={localRoutes.paymentSuccessful}>
              <PaymentSuccess />
            </Route>
          ) : null}

          {AuthData !== null ? (
            <Route exact path={localRoutes.appointment_booked}>
              <FreeAppoinmentSuccess />
            </Route>
          ) : null}

          {AuthData !== null
            ? AuthData.role == "student"
              ? this.StudentDashboard()
              : AuthData.role == "instructor"
              ? this.TutorDashboard()
              : null
            : null}
          <Route>
            <Four_o_Four />
          </Route>
        </Switch>
        {/* App footer */}
        {this.state.DashboardNavCheck ? (
          <></>
        ) : (
          <Suspense fallback={<></>}>
            <Footer />
          </Suspense>
        )}

        {/* StudetnWizardModal */}
        {/* Add package form Modal */}
        <Modal
          center
          open={this.state.studentWizardModal}
          showCloseIcon={false}
        >
          <StudentWizardModal onCloseWizardModal={this.onCloseWizardModal} />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    studetnWizard: state.Auth.studetnWizard,
    currency: state.currency.currency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCurrencyRate: (currency) => dispatch(getCurrencyRate(currency)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppRouter));
