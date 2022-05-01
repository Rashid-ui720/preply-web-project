import React from "react";
import { BaseUrl } from "../../utils/api_routes";
class BookingDetail extends React.Component {
  state = {};

  GetFormatedDateandTime = () => {
    const { payload } = this.props;
    let date = new Date(payload.booking_date).toString().split(" ");
    let bookingDate =
      date[0] +
      ", " +
      date[1] +
      " " +
      date[2] +
      ", " +
      payload.timeslot +
      " " +
      payload.timezone;
    return bookingDate;
  };
  render() {
    const { payload, currency, curency_rate } = this.props;
    return (
      <div className="col-12 col-xxl-4 col-lg-4 col-md-12">
        <div className="pl-lg-5">
          {/* <!-- Top Start --> */}
          <div className="bg-white shadow-9 rounded-4  pb-4">
            <div className="media align-items-center border-bottom border-mercury pt-10 pl-10 pr-10 pb-6">
              <div className="square-72 d-block mr-8  overflow-hidden">
                <img
                  src={
                    payload.tutorInfo.user_img == null
                      ? `image/l3/png/userAvtar.webp`
                      : `${BaseUrl}/UserProfile/Images/${payload.tutorInfo.user_img}`
                  }
                  alt=""
                  className="lesson-detail-user-img"
                />
              </div>
              <div>
                <h3 className="mb-0">
                  <p className="font-size-6 heading-default-color mb-0">
                    {payload.tutorInfo.fname}
                  </p>
                </h3>
                <p className="font-size-3 text-default-color line-height-2 mb-0">
                  {/* <i className="far fa-envelope mr-2 "></i>
                  {payload.tutorInfo.email} */}
                </p>
                <p className="font-size-3 tutor-card-description-text mb-0">
                  {/* <i className="fas fa-phone mr-2 "></i>{" "}
                  {payload.tutorInfo.mobile} */}
                </p>
              </div>
            </div>
            <div className="border-bottom border-mercury pt-6 pl-10 pr-10 pb-6">
              <h3 className="mb-0 font-size-2">
                <p className="font-size-4 heading-default-color mb-0">
                  Date and Time
                </p>
              </h3>
              <p className="font-size-3 text-default-color line-height-2 mb-0">
                {this.GetFormatedDateandTime()}
              </p>
            </div>
            <div className="border-bottom border-mercury pt-6 pl-10 pr-10 pb-6">
              <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-3">
                    <p className="font-size-3 heading-default-color mb-0">
                      Service Detail
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
                      1 hr Lesson
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-default-color line-height-2 mb-0">
                    {payload.price_per_hr !== ""
                      ? currency == "GBP"
                        ? "£ " + payload.price_per_hr
                        : "$ " +
                          parseInt(
                            curency_rate * parseInt(payload.price_per_hr)
                          )
                      : ""}
                  </p>
                </div>
              </div>
              {/* row 3 */}
              {/* <div className="row">
                <div className="col-6">
                  <h3 className="mb-0 font-size-2">
                    <p className="font-size-3 heading-default-color mb-0">
                      Transaction fee
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  <p className="font-size-3 text-default-color line-height-2 mb-0">
                    0.5$
                  </p>
                </div>
              </div> */}
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
                      Total {currency == "GBP" ? "(£)" : "($)"}
                    </p>
                  </h3>
                </div>
                <div className="col-6">
                  {parseInt(this.props.free_appointment) === 0 ? (
                    <p className="font-size-3 text-green font-weight-bold line-height-2 mb-0">
                      {payload.price_per_hr !== ""
                        ? currency == "GBP"
                          ? "£ " + payload.price_per_hr
                          : "$ " +
                            parseInt(
                              curency_rate * parseInt(payload.price_per_hr)
                            )
                        : ""}
                    </p>
                  ) : (
                    <p className="font-size-3 text-green font-weight-bold line-height-2 mb-0">
                      {payload.price_per_hr !== ""
                        ? currency == "GBP"
                          ? "£ " + 0
                          : "$ " +
                            parseInt(
                              0
                            )
                        : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingDetail;
