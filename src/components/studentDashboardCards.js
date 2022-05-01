import React from "react";
class StudentDashboardCards extends React.Component {
  state = {};
  render() {
    const { stats } = this.props;
    return (
      <div className="row mb-7">
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-clock"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">
                  {stats.total_credit_appointments}
                </span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Credits
              </p>
            </div>
          </a>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-book-reader"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">{stats.total_trail_appoinment}</span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Total Lessons
              </p>
            </div>
          </a>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-dollar-sign"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">{stats.total_purchase_packages}</span>
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

export default StudentDashboardCards;
