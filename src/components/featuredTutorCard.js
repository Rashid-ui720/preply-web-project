import React, { Component } from "react";

import { BaseUrl } from "../utils/api_routes";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";
class FeaturedTutorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ReadMore: false, showDetailSide: false };
  }

  getCountryShortName = (tutor) => {
    let { CountiresList } = this.props;
    let shortName = "";
    CountiresList.map((country) => {
      if (country.country_id == tutor.country_id) {
        shortName = country.iso;
      }
    });
    return shortName.toLowerCase();
  };
  render() {
    const { tutor, index, currency, curency_rate , currentTutor } = this.props;
    return (
      <>
      {currentTutor != tutor.id ?
      <a
        className=""
        key={index}
        href={`${localRoutes.tutor_detail}?${new Buffer(
          `&query=${true}&tutor_id= ${tutor.id}`
        ).toString("base64")}`}
      >
        <div className="  rounded-4 mb-9 feature-cardOne-adjustments d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex ">
            <div
              className=" d-block square-72 align-self-start"
              style={{
                maxWidth: "150px",
                minWidth: "150px",
                maxHeight: "150px",
                minHeight: "150px",
              }}
            >
              <img
                className="profile-card-image-fill"
                src={
                  tutor.user_img == null
                    ? `../image/l3/png/userAvtar.webp`
                    : `${BaseUrl}/UserProfile/Images/${tutor.user_img}`
                }
                alt=""
                style={{
                  maxWidth: "150px",
                  minWidth: "150px",
                  maxHeight: "150px",
                  minHeight: "150px",
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="mb-0 overflow-hidden d-flex align-items-center">
              <p className="font-size-5 heading-default-color mb-0 ">
                {tutor.fname}{" "}
              </p>
              <img
                src="../image/l3/png/verified.ico"
                height="17px"
                style={{ width: "14px", marginLeft: "10px" }}
              />
              <img
                alt={
                  this.getCountryShortName(tutor) == ""
                    ? "GB"
                    : this.getCountryShortName(tutor)
                }
                src={`image/flags/${
                  this.getCountryShortName(tutor) == ""
                    ? "GB"
                    : this.getCountryShortName(tutor)
                }.png`}
                width="14px"
                height="14px"
                style={{ width: "14px", marginLeft: "10px" }}
              />
            </h3>
            {/* <div className="d-flex align-items-center"></div> */}
          </div>
          <div className="d-flex jusitfy-content-center  mt-3 ">
            <div className="mr-md-0">
              <p className="font-weight-bold font-size-3 text-hit-gray text-center mb-0 rate-rating-info ">
                <span className="text-black-2 mb-0 font-size-3">
                  {tutor.per_hr_rate !== ""
                    ? currency == "GBP"
                      ? tutor.per_hr_rate + " £ /h"
                      : parseInt(curency_rate * parseInt(tutor.per_hr_rate)) +
                        "$ /h"
                    : ""}
                </span>
                <span className="text-black-2 mb-0 font-size-3 ml-4">
                  <i className="fa fa-star font-size-3 text-yellow"></i>{" "}
                  {tutor.instructor_avg_rating.length == 0
                    ? 0
                    : parseInt(
                        tutor?.instructor_avg_rating[0]?.avg_reviews
                      )}{" "}
                  ({tutor.instructor_profile_reviews_count})
                </span>
                <br />{" "}
              </p>
            </div>
            {/* <div className="image  ">
                  <i className="fa fa-dollar-sign font-size-6"></i>
                </div> */}
          </div>

          {/* <p
            className={`font-size-3 ${
              this.state.ReadMore ? "" : "tutor-card-description-text"
            } mb-0`}
          >
            {tutor.detail == "" || tutor.detail == null
              ? "No description given yet"
              : tutor.detail}
          </p>
          <p
            className="font-size-3 tutor-card-read-more mb-0"
            onClick={() => this.setState({ ReadMore: !this.state.ReadMore })}
          >
            {this.state.ReadMore ? "Read Less" : "Read More"}
          </p> */}
        </div>
      </a>
      : null }
      </>
    );
  }
}

export default FeaturedTutorCard;
