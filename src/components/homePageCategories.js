import React from "react";

class HomePageCategories extends React.Component {
  state = {};
  render() {
    return (
      <div className="pt-6 pt-lg-10 pb-lg-10 bg-white">
        <div className="container">
          {/* <!-- Section Top --> */}
          <div className="row align-items-center pb-14">
            {/* <!-- Section Title --> */}
            <div className="col-12 ">
              <div className="text-center text-lg-left mb-4 mb-lg-0 w-100">
                <h2 className="font-size-8 font-weight-bold text-center w-100">
                  Why choose Quran Tutor
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-between">
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="#"
                className="bg-white  rounded-4 pl-9  pt-10 pb-3 pr-7  mb-9 d-flex flex-column align-items-center justify-content-center w-100"
              >
                <div className="text-blue bg-blue-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-user"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    used by 500+ students
                  </h5>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="#"
                className="bg-white  rounded-4 pl-9 pt-10 pb-3 pr-7  mb-9 d-flex flex-column align-items-center justify-content-center w-100"
              >
                <div className="text-spray bg-spray-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-headset"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    40+ professional tutors
                  </h5>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="#"
                className="bg-white  rounded-4 pl-9 pt-10 pb-3 pr-7  mb-9 d-flex flex-column align-items-center justify-content-center w-100"
              >
                <div className="text-coral bg-coral-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-star"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    197 reviews
                  </h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageCategories;
