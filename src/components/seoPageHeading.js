import React, { Component } from "react";

class seoPageHeading extends Component {
  render() {
    const { city_data } = this.props;

    return (
      <section className="bg-ebony-clay bg-white">
        <div className="container">
          {/* <!-- Cta section --> */}
          <div className="pt-20 pt-lg-25 pb-13 pb-lg-20 border-bottom border-width-1 border-default-color-2">
            <div className="row justify-content-center ">
              <div
                className="col-xl-12 col-lg-12"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- cta-content start --> */}
                <div className="pb-xl-0 pb-9 text-xl-left text-center">
                  <h2 className="text-default-color font-size-8 mb-4">
                    {city_data.page_title}
                  </h2>
                  <p className="text-gray font-size-5 mb-0">
                    {city_data.page_description}
                  </p>
                </div>
                {/* <!-- cta-content end --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default seoPageHeading;
