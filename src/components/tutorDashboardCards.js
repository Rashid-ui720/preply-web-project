import React from "react";
import { localRoutes } from "../utils/local_routes";
import { Link } from "react-router-dom";
class TutorDashboardCards extends React.Component {
  state = {};
  render() {
    const { stats } = this.props;
    return (
      <div className="row mb-7">
        <div className="col-xxl-3 col-xl-3 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fa fa-user"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">{stats?.total_students}</span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Total Students
              </p>
            </div>
          </a>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-6 col-sm-6">
        <Link to={{pathname: localRoutes.tutor_dashboard_lessons, query: 'trail'}} className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8" >
            <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-book-reader"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">{stats?.total_trail_appoinment}</span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Trail Lessons
              </p>
            </div>
          </Link>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-6 col-sm-6">
        <Link to={{pathname: localRoutes.tutor_dashboard_lessons, query: 'regular'}} className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
            <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-book-reader"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">
                  {stats?.total_credit_appointments}
                </span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Credit Lessons
              </p>
            </div>
          </Link>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-6 col-sm-6">
          <a
            href={localRoutes.tutor_dashboard_packages}
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-dollar-sign"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">{stats?.total_packages}</span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Total packages
              </p>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default TutorDashboardCards;
