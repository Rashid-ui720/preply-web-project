import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";

class homePageQulifiedTutors extends React.Component {
  render() {
    return (
      <div className="pt-10 pt-lg-10 pb-7 pb-lg-10 accordion-bg">
        <div className="container ">
          <div
            className="row justify-content-center mb-15"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          ></div>
          {/* <!-- End Services Content --> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
            <div className="text-center mb-5 mb-lg-12 px-xl-9 px-xxl-7">
              <h2 className="font-size-7 mb-6">
                Trusted Curriculum,{" "}
                <span className="text-green">Qualified Tutors</span>,
                Interactive Lessons
              </h2>
              <p className="font-size-3 text-default-color text-center px-xs-9 px-md-0 width-40P ml-auto mr-auto ">
                Catering to the learning needs of 500 + pupils from all around
                the world, our online Madrassa is trusted and recommended.
                Together, our pupils and certified tutors, build impacting
                Islamic journeys. Join our community today and make your goals
                seem closer!
              </p>
              <Link
                to={localRoutes.tutor_list}
                className="btn btn-green btn-h-60 btn-xl col-1 ml-auto mr-auto mx-4 mt-6 text-uppercase"
              >
                Find Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default homePageQulifiedTutors;
