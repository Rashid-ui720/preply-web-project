import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { localRoutes } from "../utils/local_routes";
import { BaseUrl } from "../utils/api_routes";
import ReactPlayer from "react-player";

class TutorCard extends Component {
  state = {
    ReadMore: false,
    showDetailSide: false,
    showCountry: false,
    countryName: "",
    loadVideos: [],
  };

  componentDidMount = () => {
    if (this.props.index === 0) {
      this.showVideo(this.props.tutor.video_url, 0);
    }
  };
  getCountryShortName = () => {
    let { CountiresList, tutor } = this.props;
    if(tutor?.country?.iso === undefined){
      return "";
    }
    return tutor?.country?.iso;
  };

  getCountryFullName = () => {
    let { tutor } = this.props;
    return tutor?.country?.nicename;
  };

  ShowCountry = () => {
    this.setState({ showCountry: true });
  };
  HideCountry = () => {
    this.setState({ showCountry: false });
  };

  showVideo = async (url, key) => {
    if (url != null && url != "") {
      var data = await this.props.setloadVideos(key);
      data.forEach((element, index) => {
        if (index != key) {
          if (document.getElementById(`${"show_video_" + index}`)) {
            document.getElementById(
              `${"show_video_" + index}`
            ).style.visibility = "hidden";
          }
        } else {
          if (document.getElementById(`${"show_video_" + index}`)) {
            document.getElementById(
              `${"show_video_" + index}`
            ).style.visibility = "visible";
          }
        }
      });
      this.setState({ loadVideos: data });
    }
  };

  hideVideo = (key) => {
    // this.state.loadVideos[key] = false;
    // this.setState({ loadVideos: this.state.loadVideos });
  };

  render() {
    const { tutor, currency, currency_date, curency_rate } = this.props;
    return (
      <div className="mb-8 row d-flex" style={{ position: "relative" }}>
        <div className="pt-5 pb-5 px-xl-9 px-lg-7 px-7 light-mode-texts bg-white rounded hover-shadow-3 col-12 col-md-10 col-lg-9 ">
          <div className="row">
            <div
              className="col-md-12"
              onMouseEnter={() =>
                this.showVideo(tutor.video_url, this.props.index)
              }
            >
              <Link
                to={{
                  pathname: localRoutes.tutor_detail,
                  search: new Buffer(`&query=${true}&tutor_id=
                    ${tutor.id}`).toString("base64"),
                }}
              >
                <div className=" d-block mr-8 profile-card-image-container align-self-start position-absolute">
                  <img
                    className="profile-card-image-fill"
                    src={
                      tutor.user_img == null
                        ? `../image/l3/png/userAvtar.webp`
                        : `${BaseUrl}/UserProfile/Images/${tutor.user_img}`
                    }
                    alt=""
                  />
                </div>
              </Link>
              <div className="media align-items-center row  ml-md-26">
                <div className="w-100 overflow-hidden row ml-md-0 ml-18">
                  <div className="col-lg-6 col-md-6 col-12  d-flex flex-column">
                    <h3 className="mb-0 overflow-hidden">
                      <p className="font-size-6 tutor-name heading-default-color mb-0 ">
                        <Link
                          style={{ color: "#2b3940" }}
                          to={{
                            pathname: localRoutes.tutor_detail,
                            search: new Buffer(`&query=${true}&tutor_id=
                              ${tutor.id}`).toString("base64"),
                          }}
                        >
                          {tutor.fname}{" "}
                        </Link>
                        <img
                          alt={
                            this.getCountryShortName() == ""
                              ? "GB"
                              : this.getCountryShortName()
                          }
                          src={`../image/flags/${
                            this.getCountryShortName() == ""
                              ? "gb"
                              : this.getCountryShortName()
                                  .toString()
                                  .toLowerCase()
                          }.png`}
                          width="20px"
                          height="100%"
                          className="mr-2 ml-2"
                          onMouseOver={() => this.ShowCountry()}
                          onMouseLeave={() => this.HideCountry()}
                        />
                        {this.state.showCountry == true ? (
                          <div className="rounded  bg-white country-Name">
                            <p className="font-size-2 m-0">
                              {this.getCountryFullName() == ""
                                ? "United Kingdom"
                                : this.getCountryFullName()}
                            </p>
                          </div>
                        ) : null}
                        <img
                          className="mr-2"
                          src="../image/l3/png/verified.ico"
                        />
                        {/* {
                          tutor.featured == 1 ?
                          <img src="../image/l3/png/featured.webp" />
                          : ''
                        } */}
                      </p>
                    </h3>

                    {/* padding: 5px 10px;
    box-shadow: 1px 1px 10px rgb(0 0 0 / 20%);
    position: absolute;
    right: 30px;
    top: -18px;
    z-index: 277; */}
                  </div>

                  <div className="col-lg-6  col-md-6   text-right  ml-auto mt-md-0 mt-4">
                    <div className="d-flex justify-content-xl-end justify-content-md-center align-items-xl-center flex-wrap">
                      <div className="mr-md-0">
                        <p className="font-weight-bold font-size-5 text-hit-gray text-center mb-0 rate-rating-info mr-5">
                          {
                            parseInt(tutor.instructor_profile_reviews_count) > 5 ?
                            <>
                              <span className="text-black-2 mb-0">
                                <i className="fa fa-star font-size-5 text-yellow"></i>{" "}
                                {tutor.instructor_avg_rating.length == 0
                                  ? 0
                                  : parseInt(
                                      tutor?.instructor_avg_rating[0]?.avg_reviews
                                    )}
                              </span>
                              <br />{" "}
                              <span className="font-size-3">
                                {tutor.instructor_profile_reviews_count} reviews
                              </span>
                            </>
                            : 
                            <span className="text-black-2 mb-0">
                              <span class="badge badge-info">Newly Joined</span>
                            </span>
                          }
                        </p>
                      </div>
                      {/* <div className="image  ">
                  <i className="fa fa-dollar-sign font-size-6"></i>
                </div> */}
                      <div>
                        <p className="font-weight-bold font-size-5 text-hit-gray text-center mb-0 rate-rating-info">
                          <span className="text-black-2 mb-0">
                            {tutor.per_hr_rate !== ""
                              ? currency == "GBP"
                                ? "£ " + tutor.per_hr_rate
                                : "$ " +
                                  parseInt(
                                    curency_rate * parseInt(tutor.per_hr_rate)
                                  )
                              : ""}
                          </span>
                          <br /> <span className="font-size-3">per hour</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row w-100 overflow-hidden mt-md-0 mt-4">
                  <div className="row col-md-7 col-12 ml-md-0 ml-0">
                    <div className="w-100 col-lg-12">
                      <ul className="d-flex list-unstyled flex-row mr-n3 flex-wrap ">
                        {tutor.languages?.map((lang, index) => {
                          return (
                            <li className="mr-3" key={index}>
                              <a
                                className="bg-regent-opacity-15   text-center rounded-3 px-6 py-1 font-size-2 text-black-2 mt-2"
                                href="#"
                              >
                                {lang?.language?.name}
                              </a>
                              <span
                                className={`badge pt-1 pb-1 pl-3 pr-3 font-size-2 font-waight-normal
                                     badge-info
                                    `}
                                style={{
                                  borderTopLeftRadius: "0",
                                  borderBottomLeftRadius: "0",
                                  fontWeight: "normal",
                                }}
                              >
                                {lang?.level}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-5 col-12 d-flex justify-content-center ml-auto mt-md-6 mt-0">
                    <ul className="d-flex w-100 list-unstyled mr-n3 flex-wrap mr-n8 justify-content-lg-end">
                      <li className="mt-0 font-size-small text-black-2 d-flex">
                        <Link
                          className="btn btn-primary font-size-3 px-6 rounded-8"
                          to={{
                            pathname: localRoutes.tutor_detail,
                            search: new Buffer(`&query=${true}&tutor_id=
                       ${tutor.id}`).toString("base64"),
                          }}
                        >
                          Book Trial Lesson
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Readmore start */}

                <div className="row px-1">
                  <div className="col-12">
                    <p className="font-size-3">
                      <ShowMoreText
                        lines={4}
                        more="Read more"
                        less="Read less"
                        // className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={this.executeOnClick}
                        expanded={false}
                        width={600}
                      >
                        {tutor.detail}
                      </ShowMoreText>
                    </p>
                  </div>
                </div>
                {/* Read More End */}
              </div>
            </div>
          </div>
        </div>
        {tutor.video_url != null &&
        tutor.video_url != "" &&
        this.state.loadVideos[this.props.index] ? (
          <div
            className="col-md-2 col-lg-3 col-xl-3 d-sm-none d-md-block d-xs-none hide_video player_bg"
            id={`${"show_video_" + this.props.index}`}
          >
            <div
              className="w-100 video_wrp_height bg-white"
              style={{
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
              }}
            >
              <div className="player-wrapper" style={{ height: "100%" }}>
                <ReactPlayer
                  className="react-player rounded-bottom-left-10 rounded-bottom-right-10 bg-white"
                  url={tutor.video_url}
                  light={true}
                  height={"100%"}
                />
              </div>
            </div>
            <div className="col-12 bg-white rounded-bottom-left-10 rounded-bottom-right-10 p-5 text-center">
              <Link
                to={{
                  pathname: localRoutes.tutor_detail,
                  search: new Buffer(`&query=${true}&tutor_id=
             ${tutor.id}`).toString("base64"),
                }}
                className="btn btn-primary font-size-3 px-6 rounded-8 col-12"
              >
                View Profile
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TutorCard;
