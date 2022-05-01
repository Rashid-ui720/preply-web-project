import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";
import { connect } from "react-redux";
class HomePageBecomeTutor extends React.Component {
  state = {};
  render() {
    return (
      <div className="bg-black-2 pattern-1 bg-image pt-14 pt-lg-24 pb-14 pb-lg-24 overflow-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <div className=" bg-white rounded-4">
              <div className="">
                <div className="row no-gutters  justify-content-center">
                  <div className="col-10 col-xl-7 col-lg-7 col-xs-10">
                    {/* <!-- Slide content Start --> */}
                    <div className="slide-content row flex-column pl-5 pl-lg-10 pl-xxl-20 pr-5 pr-xl-5 py-lg-5 py-9">
                      {/* <!-- Slide Info --> */}
                      <div className="mt-5 mt-lg-16 mt-md-10 ">
                        <h3 className="ml-0">Tutor With Quran Tutor</h3>
                        <p>
                          With our flexible timings, and tailored courses, our
                          Online Madrassa is a world of opportunity. Join us
                          today for an enhanced tutoring journey.
                        </p>
                      </div>
                      <div className="row align-items-center text-primary mb-6">
                        <i className="fas fa-search mr-4 ml-6"></i>
                        <p className="m-0">Find new students</p>
                      </div>
                      <div className="row align-items-center text-primary mb-6">
                        <i className="fas fa-calendar mr-4 ml-6"></i>
                        <p className="m-0">Grow your business</p>
                      </div>
                      <div className="row align-items-center text-primary mb-8">
                        <i className="fas fa-dollar-sign mr-4 ml-6"></i>
                        <p className="m-0">Get paid securely</p>
                      </div>
                      {
                        this.props?.AuthData?.role !== 'instructor' ? 
                        <div className="justify-self-end row">
                          <Link
                            to={localRoutes.become_tutor}
                            className="btn btn-green  btn-h-60 btn-xl col-1   mx-4 mt-6 text-uppercase"
                          >
                            Become a tutor
                          </Link>
                        </div>
                        : null
                      }
                      {/* <!-- Slide Info End --> */}
                    </div>
                  </div>
                  <div className="col-12 col-xl-5 col-lg-5 become-tutor-image">
                    {/* <!-- Slide Image --> */}

                    <img
                      className="rounded w-60  ml-lg-12"
                      src="image/l3/png/tutor-img.png"
                      alt=""
                    />
                  </div>
                  {/* <!-- Slide content End --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};

export default connect(mapStateToProps)(HomePageBecomeTutor);
