import React, { PureComponent } from "react";
import { Link } from "react-scroll";
class Tutorworkexperience extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { tutorDetail } = this.props;
    return (
      <>
        <div>
          <div id="tab-sections">
            {/* <div className="stickyNavBar" id="myTab">
              <div className="container">
                <div className="col-12">
                  <div className="MainSubHeader">
                    <ul
                      class="nav bg-white border-mercury pl-lg-12 rounded mb-5"
                      role="tablist"
                    >
                      <li class="tab-menu-items nav-item pr-12">
                        <Link  className="text-uppercase font-size-3 font-weight-bold text-default-color py-3" to="education" spy={true} smooth={true} offset={0} duration={500} onSetActive={this.handleSetActive} onSetInactive={this.handleSetInactive}>
                          Education
                        </Link>
                      </li>
                      <li class="tab-menu-items nav-item pr-12">
                        <Link  className="text-uppercase font-size-3 font-weight-bold text-default-color py-3" to="subjects" spy={true} smooth={true} offset={-5} duration={500} onSetActive={this.handleSetActive} onSetInactive={this.handleSetInactive}>
                          Subjects
                        </Link>
                      </li>
                      <li class="tab-menu-items nav-item pr-12">
                        <Link  className="text-uppercase font-size-3 font-weight-bold text-default-color py-3" to="experience" spy={true} smooth={true} offset={-5} duration={500} onSetActive={this.handleSetActive} onSetInactive={this.handleSetInactive}>
                          Experience
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row mt-10">
              {/* <!-- Tab Section Start --> */}
              <div className="col-12">
                {/* <!-- Tab Content --> */}
                <div className="tab-content" id="myTabContent">
                  <div
                    class="tab-pane show active bg-white rounded mb-10"
                    id="experience"
                  >
                    <div className="pt-6 pl-6 pl-xs-12">
                      <h4 className="font-size-6 mb-2 mt-5 text-black-2 font-weight-semibold">
                        Experience
                      </h4>
                    </div>
                    <div className="col-12">
                      <div>
                        <div className="tab-pane">
                          {/* <!-- certificate Start --> */}
                          <div className="w-100">
                            {tutorDetail.experience.length > 0 ? (
                              tutorDetail.experience.map((experience) => {
                                return (
                                  <div className="d-flex align-items-center pr-11 mb-0 p-6 flex-wrap flex-sm-nowrap">
                                    <div className="w-100 mt-n2 mx-10">
                                      <h3 className="mb-0">
                                        <div className="font-size-4 text-black-2 font-weight-semibold">
                                          {experience.title}
                                        </div>
                                      </h3>
                                      <div className="font-size-3 text-gray mr-5">
                                        {experience.description}
                                      </div>
                                      <div
                                        href=""
                                        className="font-size-3 text-gray mr-5"
                                      >
                                        {new Date(experience.start_date)
                                          .toString()
                                          .split(" ")[1] +
                                          "/" +
                                          new Date(experience.start_date)
                                            .toString()
                                            .split(" ")[3]}{" "}
                                        {experience.end_date != null
                                          ? " - " +
                                            new Date(experience.end_date)
                                              .toString()
                                              .split(" ")[1] +
                                            "/" +
                                            new Date(experience.end_date)
                                              .toString()
                                              .split(" ")[3]
                                          : " - Present"}{" "}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="d-flex align-items-center pr-11 mb-0 p-6 flex-wrap flex-sm-nowrap">
                                <div className="w-100 mt-n2 mx-5">
                                  No record found
                                </div>
                              </div>
                            )}
                          </div>
                          {/* <!-- certificate End --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane show active bg-white rounded mb-10"
                    id="education"
                  >
                    <div className="pt-6 pl-6 pl-xs-12">
                      {/* <div className="pt-5 pl-12">Education</div> */}
                      <h4 className="font-size-6 mb-2 mt-5 text-black-2 font-weight-semibold">
                        Education
                      </h4>
                    </div>
                    <div className="col-12">
                      <div className="tab-pane ">
                        {/* <!-- Education Start --> */}
                        <div className="w-100">
                          <div className="d-flex align-items-center pr-11 mb-2 p-6 flex-wrap flex-sm-nowrap">
                            <div className="row">
                              <div className="col-12">
                                {tutorDetail.education.length > 0
                                  ? tutorDetail.education.map((education) => {
                                      return (
                                        <div className="col-xxl-12 col-lg-12 col-12 mt-2 mx-6">
                                          <h3 className="mb-0">
                                            <div className="font-size-4 text-black-2 font-weight-semibold">
                                              {education.title}
                                            </div>
                                          </h3>
                                          <div className="font-size-3 text-gray mr-5">
                                            {education.school}
                                          </div>
                                        </div>
                                      );
                                    })
                                  : "No Record Found"}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- Education End --> */}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane show active bg-white rounded mb-10"
                    id="subjects"
                  >
                    <div className="pt-6 pl-6 pl-xs-12">
                      <h4 className="font-size-6 mb-2 mt-5 text-black-2 font-weight-semibold">
                        Subjects
                      </h4>
                    </div>
                    <div className="col-12">
                      <div className="tab-pane">
                        {/* <!-- subject Start --> */}
                        <div className="w-100">
                          {tutorDetail.subjects.length > 0 ? (
                            tutorDetail.subjects.map((subject) => {
                              return (
                                <div className="row">
                                  <div className="col-12 d-flex align-items-center pr-11 mb-0 p-6 flex-wrap flex-sm-nowrap">
                                    <div className="w-100 mt-n2 mx-10">
                                      <h3 className="mb-0">
                                        <div className="font-size-4 text-black-2 font-weight-semibold">
                                          {subject.title}
                                        </div>
                                      </h3>
                                      <div className="font-size-3 text-gray mr-5">
                                        {subject.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="d-flex align-items-center pr-11 mb-0 p-6 flex-wrap flex-sm-nowrap">
                              <div className="w-100 mt-n2 mx-5">
                                No record found
                              </div>
                            </div>
                          )}
                        </div>
                        {/* <!-- subject End --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tutorworkexperience;
