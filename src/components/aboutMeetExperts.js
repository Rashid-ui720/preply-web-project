import React, { Component } from "react";

class aboutMeetExperts extends Component {
  render() {
    return (
      <>
        <div className="pt-11 pt-lg-15 pb-11 pb-lg-15 bg-gradient-1">
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-xl-7 col-lg-8 col-md-10"
                data-aos="fade-in"
                data-aos-duration="1000"
                data-aos-once="true"
              >
                {/* <!-- section-title start --> */}
                <div className="section-title text-center pb-lg-10 pb-8 px-xxl-10">
                  <h2 className="mb-9 font-size-10">
                    Meet Our <span className="text-green">Best Experts</span>
                  </h2>
                </div>
                {/* <!-- section-title end --> */}
              </div>
            </div>
            <div className="row justify-content-center">
              {/* <!-- team person 1 start --> */}
              <div
                className="col-xl-3 col-md-6 mb-xl-0 mb-13 col-sm-8 col-xs-8 col-8"
                data-aos="fade-right"
                data-aos-duration="500"
                data-aos-once="true"
              >
                {/* <!-- card start --> */}
                <div className="card bg-transparent border-0">
                  {/* <!-- card img start --> */}
                  <img
                    src="image/l3/team/imran_hussain_team_01.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  {/* <!-- card img end --> */}
                  {/* <!-- card-body start --> */}
                  <div className="card-body pt-4 px-0 pb-0">
                    <h4>
                      <a
                        className="card-title font-size-7 mt-4 mb-4 heading-default-color"
                        href="javascript:void(0)"
                      >
                        Imran Hussain
                      </a>
                    </h4>
                    <p className="badge badge-green text-uppercase font-size-3 font-weight-bold px-5 py-2">
                      Lead Software Developer
                    </p>
                  </div>
                  {/* <!-- card-body end --> */}
                </div>
                {/* <!-- card end --> */}
              </div>
              {/* <!-- team person 1 end --> */}
              {/* <!-- team person 2 start --> */}
              <div
                className="col-xl-3 col-md-6 mb-xl-0 mb-13 col-sm-8 col-xs-8 col-8"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-once="true"
              >
                {/* <!-- card start --> */}
                <div className="card bg-transparent border-0">
                  {/* <!-- card img start --> */}
                  <img
                    src="image/l3/team/wajid_mehmood_team_02.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  {/* <!-- card img end --> */}
                  {/* <!-- card-body start --> */}
                  <div className="card-body pt-4 px-0 pb-0">
                    <h4>
                      <a
                        className="card-title font-size-7 mt-4 mb-4 heading-default-color"
                        href="javascript:void(0)"
                      >
                        Wajid Mehmood
                      </a>
                    </h4>
                    <p className="badge badge-green text-uppercase font-size-3 font-weight-bold px-5 py-2">
                      Junior Software Developer
                    </p>
                  </div>
                  {/* <!-- card-body end --> */}
                </div>
                {/* <!-- card end --> */}
              </div>
              {/* <!-- team person 2 end --> */}
              {/* <!-- team person 3 start --> */}
              <div
                className="col-xl-3 col-md-6 mb-xl-0 mb-13 col-sm-8 col-xs-8 col-8"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-once="true"
              >
                {/* <!-- card start --> */}
                <div className="card bg-transparent border-0">
                  {/* <!-- card img start --> */}
                    <img
                      src="image/l3/team/saadia_majeed_team_03.webp"
                      className="card-img-top"
                      alt="..."
                    />
                  {/* <!-- card img end --> */}
                  {/* <!-- card-body start --> */}
                  <div className="card-body pt-4 px-0 pb-0">
                    <h4>
                      <a
                        className="card-title font-size-7 mt-4 mb-4 heading-default-color"
                        href="javascript:void(0)"
                      >
                        Saadia Majeed
                      </a>
                    </h4>
                    <p className="badge badge-green text-uppercase font-size-3 font-weight-bold px-5 py-2">
                      Tutor Expert
                    </p>
                  </div>
                  {/* <!-- card-body end --> */}
                </div>
                {/* <!-- card end --> */}
              </div>
              {/* <!-- team person 3 end --> */}
              {/* <!-- team person 4 start --> */}
              <div
                className="col-xl-3 col-md-6 col-sm-8 col-xs-8 col-8"
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-once="true"
              >
                {/* <!-- card start --> */}
                <div className="card bg-transparent border-0">
                  {/* <!-- card img start --> */}
                    <img
                      src="image/l3/team/abdul_kareem_team_04.webp"
                      className="card-img-top"
                      alt="..."
                    />
                  {/* <!-- card img end --> */}
                  {/* <!-- card-body start --> */}
                  <div className="card-body pt-4 px-0 pb-0">
                    <h4>
                      <a
                        className="card-title font-size-7 mt-4 mb-4 heading-default-color"
                        href="javascript:void(0)"
                      >
                        Abdul Kareem
                      </a>
                    </h4>
                    <p className="badge badge-green text-uppercase font-size-3 font-weight-bold px-5 py-2">
                      Chief Technology Officer
                    </p>
                  </div>
                  {/* <!-- card-body end --> */}
                </div>
                {/* <!-- card end --> */}
              </div>
              {/* <!-- team person 4 end --> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default aboutMeetExperts;
