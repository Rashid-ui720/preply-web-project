import React from "react";
import { localRoutes } from "../utils/local_routes";
import { connect } from "react-redux";
import {
  getNotifications,
  MarkNotifications,
} from "../Redux/Actions/NotificationAction";
import { Link } from "react-router-dom";
class Notifications extends React.Component {
  state = {};

  componentDidMount() {
    const { AuthData } = this.props;
    if (AuthData !== null) {
      this.props.getNotifications(AuthData.id ? AuthData.id : AuthData.user_id);
    }
  }

  MarkNotification = (noti_id) => {
    const { AuthData } = this.props;
    if (AuthData !== null) {
      this.props.MarkNotifications(
        AuthData.id ? AuthData.id : AuthData.user_id,
        noti_id
      );
    }
  };
  render() {
    const { notifications, notificationsError, notificationsLoader, AuthData } =
      this.props;

    return (
      <div className=" d-flex flex-column pl-6 pr-6 notificationContainer">
        <h6 className="font-size-3">Notifications</h6>
        {notificationsLoader == true ? (
          <div className="text-center w-100">
            <div
              className="spinner-border"
              style={{
                width: "1rem",
                height: "1rem",
                color: "#00b074",
              }}
              role="status"
            ></div>
          </div>
        ) : notificationsError !== null ? (
          <div className="text-center w-100">
            <h3
              className=" font-size-4 text-center"
              style={{
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              Error in notifications
            </h3>
          </div>
        ) : notifications.length == 0 ? (
          <div className="text-center w-100">
            <p
              className=" font-size-3 text-center"
              style={{
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              No notifications
            </p>
          </div>
        ) : (
          notifications.map((noti, index) => {
            let Url;
            let search = "";
            if (AuthData !== null) {
              if (noti.type == "package" && AuthData.role === "instructor") {
                Url = localRoutes.tutor_dashboard_payment_history;
              }
              if (
                noti.type == "appointment" &&
                AuthData.role === "instructor"
              ) {
                Url = localRoutes.tutor_dashboard_lesson_detail;
                search = new Buffer(`&query=${true}&lesson_id=
              ${noti.type_id}`).toString("base64");
              }
              if (
                noti.type == "lesson_review" &&
                AuthData.role === "instructor"
              ) {
                Url = localRoutes.tutor_dashboard_lesson_detail;
                search = new Buffer(`&query=${true}&lesson_id=
              ${noti.type_id}`).toString("base64");
              }
              if (noti.type == "lesson_review" && AuthData.role === "student") {
                Url = localRoutes.student_dashboard_lessons_detail;
                search = new Buffer(`&query=${true}&lesson_id=
              ${noti.type_id}`).toString("base64");
              }
              if (
                noti.type == "profile_review" &&
                AuthData.role === "instructor"
              ) {
                Url = localRoutes.tutor_dashboard_reviews;
                search = new Buffer(`&query=${true}&lesson_id=
              ${noti.type_id}`).toString("base64");
              }
            }
            return (
              <div
                className="d-flex justify-content-between align-items-center pt-5 pb-5 notification"
                key={index}
              >
                <a
                  to={{
                    pathname: Url,
                    search: search,
                  }}
                  href={`${Url}${search !== "" ? "?" + search : ""}`}
                  onClick={() => this.MarkNotification(noti.id)}
                >
                  <p
                    className="font-size-3 pr-4 m-0"
                    style={{ lineHeight: "1" }}
                  >
                    {noti.title}
                  </p>
                  <p className="font-size-1 m-0 mt-2">
                    {noti.created_at.split("T")[0]}
                  </p>
                </a>
                {noti.is_read == 0 ?
                  <i
                    className="fa fa-times-circle m-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.MarkNotification(noti.id)}
                  ></i>
                : null }
              </div>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    notifications: state.notifications.notifications,
    notificationsError: state.notifications.notificationsError,
    notificationsLoader: state.notifications.notificationsLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (user_id) => dispatch(getNotifications(user_id)),
    MarkNotifications: (user_id, noti_id) =>
      dispatch(MarkNotifications(user_id, noti_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
