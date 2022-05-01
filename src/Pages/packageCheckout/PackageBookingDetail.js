import React from "react";
import { BaseUrl } from "../../utils/api_routes";
class PackageBookingDetail extends React.Component {
  state = {};

  GetFormatedDateandTime = () => {
    // const { payload } = this.props;
    // let date = new Date(payload.booking_date).toString().split(" ");
    // let bookingDate =
    //   date[0] +
    //   ", " +
    //   date[1] +
    //   " " +
    //   date[2] +
    //   ", " +
    //   payload.timeslot +
    //   " " +
    //   payload.timezone;
    // return bookingDate;
  };
  render() {
    const {
      packagesPayload,
      currency,

      curency_rate,
    } = this.props;
    return (
      <div className="col-12 col-xxl-4 col-lg-4 col-md-12">
        <div className="pl-lg-5">
          {/* <!-- Top Start --> */}
          <div className="bg-white shadow-9 rounded-4  pb-4">
            <div className="media align-items-center border-bottom border-mercury pt-10 pl-10 pr-10 pb-6">
              {/* <img
                  className="profile-card-image-fill"
                  src={`${BaseUrl}/UserProfile/Images/${packagesPayload.tutorDetail.user_img}`}
                  alt=""
                /> */}
              <div className="square-72 d-block mr-8  overflow-hidden">
                <img
                  src={
                    packagesPayload.tutorDetail.user_img == null
                      ? `image/l3/png/userAvtar.webp`
                      : `${BaseUrl}/UserProfile/Images/${packagesPayload.tutorDetail.user_img}`
                  }
                  alt=""
                  className="lesson-detail-user-img"
                />
              </div>

              <div>
                <h3 className="mb-0">
                  <p className="font-size-6 heading-default-color mb-0">
                    {packagesPayload.tutorDetail.fname}
                  </p>
                </h3>
                {/* <p className="font-size-3 text-default-color line-height-2 mb-0">
                  <i className="far fa-envelope mr-2 "></i>
                  {packagesPayload.tutorDetail.email}
                </p>
                <p className="font-size-3 tutor-card-description-text mb-0">
                  <i className="fas fa-phone mr-2 "></i>{" "}
                  {packagesPayload.tutorDetail.mobile}
                </p> */}
              </div>
            </div>

            <div className="border-bottom border-mercury pt-6 pl-10 pr-10 pb-6">
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-3">
                    <p className="font-size-3 heading-default-color mb-0">
                      Detail
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-default-color line-height-2 mb-0">
                    Price per hour
                  </p>
                </div>
              </div>
              {/* row 2 */}
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-2">
                    <p className="font-size-3 heading-default-color mb-0">
                      1 hr Price
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-default-color line-height-2 mb-0">
                    {packagesPayload.TutorPackage.pp_hour !== ""
                      ? currency == "GBP"
                        ? "£ " + packagesPayload.TutorPackage.pp_hour
                        : "$ " +
                          parseInt(
                            curency_rate *
                              parseInt(packagesPayload.TutorPackage.pp_hour)
                          )
                      : ""}
                  </p>
                </div>
              </div>
              {/* row 3 */}
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-2">
                    <p className="font-size-3 heading-default-color mb-0">
                      Total Hours
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-default-color line-height-2 mb-0">
                    {packagesPayload.TutorPackage.total_hours}
                  </p>
                </div>
              </div>
              {/* row 4 */}
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-2">
                    <p className="font-size-3 heading-default-color mb-0">
                      Lesson cancellation
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-green line-height-2 mb-0">
                    Free
                  </p>
                </div>
              </div>
            </div>
            <div className=" pt-6 pb-6 pl-10 pr-10 ">
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-2">
                    <p className="font-size-4 heading-default-color mb-0">
                      Total (£)
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-green font-weight-bold line-height-2 mb-0">
                    {currency == "GBP"
                      ? "£ " + packagesPayload.amount
                      : "$ " +
                        parseInt(packagesPayload.TutorPackage.total_hours) *
                          parseInt(
                            parseInt(packagesPayload.TutorPackage.pp_hour) *
                              curency_rate
                          )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PackageBookingDetail;
