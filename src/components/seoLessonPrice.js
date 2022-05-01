import React, { Component } from "react";
import { connect } from "react-redux";
class seoLessonPrice extends Component {
  render() {
    const {
      currency,

      curency_rate,
    } = this.props;
    return (
      <div className="bg-gradient-1 pt-12 pt-lg-15 pb-12 pb-lg-15">
        <div className="container">
          {/* <!-- Section title --> */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-12 col-xxl-12">
              <div className="text-center mb-8 mb-lg-18 px-xl-9 px-xxl-7">
                <h2 className="font-size-8">
                  Quran Lesson prices by tutor city
                </h2>
              </div>
            </div>
          </div>
          {/* <!-- End Section title --> */}
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-11 mb-9">
              {/* <!-- Single Featured Job --> */}
              <div className="pt-6 px-xl-7 px-lg-7 px-7 pb-6 light-mode-texts bg-white rounded">
                <div className="d-flex pt-0">
                  <h3 className="font-size-3 mb-0">
                    <span className="heading-default-color font-weight-semibold">
                      Quran teacher in{" "}
                      <a href="/uk/quran-teacher-london" className="underline">
                        London
                      </a>
                    </span>
                  </h3>
                  <span
                    href="javascript:"
                    className="font-size-3 ml-auto line-height-reset px-0 mt-2 text-default-color  clicked  "
                  >
                    {currency == "GBP"
                      ? "£6"
                      : "$" + parseInt(curency_rate * parseInt(6))}{" "}
                    / hr
                  </span>
                </div>
              </div>
              {/* <!-- End Single Featured Job --> */}
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-11 mb-9">
              {/* <!-- Single Featured Job --> */}
              <div className="pt-6 px-xl-7 px-lg-7 px-7 pb-6 light-mode-texts bg-white rounded">
                <div className="d-flex pt-0">
                  <h3 className="font-size-3 mb-0">
                    <span className="heading-default-color font-weight-semibold">
                      Quran teacher in{" "}
                      <a
                        href="/uk/quran-teacher-birmingham"
                        className="underline"
                      >
                        Birmingham
                      </a>
                    </span>
                  </h3>
                  <span
                    href="javascript:"
                    className="font-size-3 ml-auto line-height-reset px-0 mt-2 text-default-color  clicked  "
                  >
                    {currency == "GBP"
                      ? "£5"
                      : "$" + parseInt(curency_rate * parseInt(5))}{" "}
                    / hr
                  </span>
                </div>
              </div>
              {/* <!-- End Single Featured Job --> */}
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-11 mb-9">
              {/* <!-- Single Featured Job --> */}
              <div className="pt-6 px-xl-7 px-lg-7 px-7 pb-6 light-mode-texts bg-white rounded">
                <div className="d-flex pt-0">
                  <h3 className="font-size-3 mb-0">
                    <span className="heading-default-color font-weight-semibold">
                      Quran teacher in{" "}
                      <a
                        href="/uk/quran-teacher-manchester"
                        className="underline"
                      >
                        Manchester
                      </a>
                    </span>
                  </h3>
                  <span
                    href="javascript:"
                    className="font-size-3 ml-auto line-height-reset px-0 mt-2 text-default-color  clicked  "
                  >
                    {currency == "GBP"
                      ? "£5"
                      : "$" + parseInt(curency_rate * parseInt(5))}{" "}
                    / hr
                  </span>
                </div>
              </div>
              {/* <!-- End Single Featured Job --> */}
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-11 mb-9">
              {/* <!-- Single Featured Job --> */}
              <div className="pt-6 px-xl-7 px-lg-7 px-7 pb-6 light-mode-texts bg-white rounded">
                <div className="d-flex pt-0">
                  <h3 className="font-size-3 mb-0">
                    <span className="heading-default-color font-weight-semibold">
                      Quran teacher in{" "}
                      <a href="/uk/quran-teacher-leeds" className="underline">
                        Leeds
                      </a>
                    </span>
                  </h3>
                  <span
                    href="javascript:"
                    className="font-size-3 ml-auto line-height-reset px-0 mt-2 text-default-color  clicked  "
                  >
                    {currency == "GBP"
                      ? "£5"
                      : "$" + parseInt(curency_rate * parseInt(5))}{" "}
                    / hr
                  </span>
                </div>
              </div>
              {/* <!-- End Single Featured Job --> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};

export default connect(mapStateToProps, null)(seoLessonPrice);
