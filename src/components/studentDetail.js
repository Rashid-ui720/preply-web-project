import React from "react";
class StudentDetail extends React.Component {
  state = {};
  render() {
    return (
      <div className="row justify-content-start">
        {/* <!-- back Button --> */}
        <div className="col-lg-12 mt-4  dark-mode-texts">
          <div className="mb-9">
            <div
              className="d-flex align-items-center ml-4 nav-back-btn"
              onClick={() => window.history.back()}
            >
              {" "}
              <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
              <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                Back
              </span>
            </div>
          </div>
        </div>
        <div className="row col-lg-12 pr-0">
          {/* <!-- Student Profile --> */}
          <div className="col-12 col-xl-12 col-lg-12 pr-0">
            <div className="bg-white rounded-4 pt-11 shadow-9">
              <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                <a className="mr-xs-7 mb-5 mb-xs-0" href="#">
                  <img
                    className="square-72 rounded-6"
                    src="image/l3/png/team-member-2.png"
                    alt=""
                  />
                </a>
                <div className="">
                  <h2 className="mt-xs-n5">
                    <a
                      className="font-size-6 text-black-2 font-weight-semibold"
                      href="#"
                    >
                      Suleman Shoukat
                    </a>
                  </h2>
                  <span className="mb-0 text-gray font-size-4">
                    Salman@xyz.com
                  </span>
                </div>
              </div>

              <div className="tab-content pl-12 pt-10 pb-7 pr-12 pr-xxl-24">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  {/* <!-- Middle Body Start --> */}
                  <div className="row">
                    {/* <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                      <div className="mb-8">
                        <p className="font-size-4">Phone no</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          +123456789
                        </h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End -->
                    <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                      <div className="mb-8">
                        <p className="font-size-4">Time Zone</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          Eastern Time Zone (UTC-05:00)
                        </h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End -->
                    <!-- Single Widgets Start --> */}
                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                      <div className="mb-8">
                        <p className="font-size-4">Total Lessons</p>
                        <h5 className="font-size-4 font-weight-semibold text-black-2">
                          15
                        </h5>
                      </div>
                    </div>
                    {/* <!-- Single Widgets End --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentDetail;
