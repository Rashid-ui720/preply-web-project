import React from "react";
import { BaseUrl } from "../../../utils/api_routes";
class TutorProfileCard extends React.Component {
  state = {};
  render() {
    const { tutorDetail } = this.props;
    return (
      <div className="col-12 col-xxl-3 col-lg-4 col-md-12 mb-11 mb-lg-0 ">
        <div className="pl-lg-5">
          {/* <!-- Top Start --> */}
          <div className="bg-white shadow-9 rounded-4">
            <div className="px-5 pt-11 pb-8 text-center  border-mercury">
              <a className="mb-4" href="#">
                <img
                  className="circle-100 image-cover-fit"
                  src={
                    tutorDetail.user_img == null
                      ? `image/l3/png/userAvtar.webp`
                      : `${BaseUrl}/UserProfile/Images/${tutorDetail.user_img}`
                  }
                  alt=""
                />
              </a>
              <h4 className="mb-0">
                <a
                  className="text-black-2 font-size-6 font-weight-semibold"
                  href="#"
                >
                  {tutorDetail.fname}
                </a>
              </h4>
            </div>
            {/* <!-- Top End --> */}
            <div className="text-center pb-6 border-bottom border-mercury">
              <div className="row">
                <div className="col-6">
                  <div className="text-center">
                    <p className="mb-0 font-size-4 ">
                      <i className="fa fa-star text-yellow"></i>5
                    </p>
                    <p className="mb-0 font-size-3">2 reviews</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="text-center">
                    <p className="mb-0 font-size-4 text-green">
                      ${tutorDetail.per_hr_rate}
                    </p>
                    <p className="mb-0 font-size-3">per hour</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Bottom Start --> */}
            <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
              <div className="mb-7">
                <p className="font-size-4 mb-0">Time Zone</p>
                <h5 className="font-size-4 font-weight-semibold mb-0">
                  <a className="text-black-2 text-break">
                    {tutorDetail.timezone}
                  </a>
                </h5>
              </div>
            </div>
            {/* <!-- Single List --> */}
          </div>
          {/* <!-- Bottom End --> */}
        </div>
      </div>
    );
  }
}

export default TutorProfileCard;
