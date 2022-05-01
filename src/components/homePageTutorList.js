import React, { PureComponent } from "react";
import { BaseUrl } from "../utils/api_routes";
import { localRoutes } from "../utils/local_routes";
import { Link } from "react-router-dom";

class HomePageTutorList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.featuredTutor != null ? (
          <div class="bg-default-2 pt-12 pt-lg-15 pb-12 pb-lg-15">
            <div class="container">
              {/* <!-- Section title --> */}
              <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 col-xxl-5">
                  <div class="text-center mb-8 mb-lg-18 px-xl-9 px-xxl-7">
                    <h2 class="font-size-9 mb-6">Featured Tutors</h2>
                    <p class="font-size-4 text-default-color px-xs-9 px-md-0">
                      Reach your personal learning goals faster with expert
                      Quran teachers from around the World.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- End Section title --> */}
              <div
                class="row justify-content-center aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {this.props.featuredTutor.featuredinstructors.map((tutor) => {
                  return (
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-11 mb-9">
                      {/* <!-- Single Featured Job --> */}
                      <div class="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
                        <div class="media align-items-center">
                          <div class="square-52 bg-pink mr-8 rounded">
                            <Link
                              to={{
                                pathname: localRoutes.tutor_detail,
                                search: new Buffer(`&query=${true}&tutor_id=
                               ${tutor.id}`).toString("base64"),
                              }}
                            >
                              <img
                                src={
                                  tutor.user_img == null
                                    ? `../image/l3/png/userAvtar.webp`
                                    : `${BaseUrl}/UserProfile/Images/${tutor.user_img}`
                                }
                                alt=""
                                className="img-rounded rounded"
                                style={{ height: "52px", width: "52px" }}
                              />
                            </Link>
                          </div>
                          <div>
                            <a
                              href="#"
                              class="font-size-3 text-default-color line-height-2"
                            >
                              {"£" + tutor.per_hr_rate} per hour
                            </a>
                            <h3 class="font-size-5 mb-0">
                              <Link
                                to={{
                                  pathname: localRoutes.tutor_detail,
                                  search: new Buffer(`&query=${true}&tutor_id=
                               ${tutor.id}`).toString("base64"),
                                }}
                                class="heading-default-color font-weight-semibold"
                              >
                                {tutor.fname}
                              </Link>
                            </h3>
                          </div>
                        </div>
                        <div class="d-flex pt-5">
                          <ul class="list-unstyled mb-1 d-flex flex-wrap">
                            <li
                              style={{overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                webkitLineClamp: "2",
                                webkitBoxOrient: "vertical"
                              }}
                            >
                              {tutor.detail}
                            </li>
                          </ul>
                        </div>
                        <div class="d-flex pt-5">
                          <ul class="list-unstyled mb-1 d-flex flex-wrap">
                            <li>
                              <a
                                href="javascript:void(0)"
                                class="bg-regent-opacity-15 text-denim font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i class="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                {tutor.country.name}
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0)"
                                class="bg-regent-opacity-15 text-orange font-size-3 rounded-3 min-width-px-100 px-3 flex-all-center mr-6 h-px-33 mt-4"
                              >
                                <i class="fa fa-star mr-2 font-weight-bold"></i>{" "}
                                {tutor.instructor_profile_reviews_count} reviews
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <!-- End Single Featured Job --> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HomePageTutorList;
