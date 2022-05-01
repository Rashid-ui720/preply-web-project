import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";

class HomePageHeader extends React.Component {
  state = {
    fname: "",
    country_id: { country_id: "", nicename: "" },
    language_id: { id: "", name: "" },
  };

  // Handle Filter
  handleCountry_or_language_select = (objName, value) => {
    this.setState({ [objName]: value });
  };

  render() {
    return (
      <div className="bg-gradient-1   position-relative z-index-1 overflow-hidden">
        {/* <!-- .Hero pattern --> */}
        <div className="pos-abs-tr w-50 z-index-n2"></div>
        {/* <!-- ./Hero pattern --> */}
        <div className="container">
          <div className="row position-relative align-items-center px-10 py-10">
            <div
              className="col-xxl-6 col-xl-7 col-lg-8 col-md-12 pt-20 pt-md-25 pt-lg-30 pb-lg-25 pb-xl-28 pb-md-25 pb-10"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <h1 className="font-size-8 text-lg text-center text-lg-left mb-8">
                Reach your personal learning goals faster with the best Quran
                teachers from around the World.
              </h1>
              <div className="">
                {/* <!-- .search-form --> */}
                <form className="search-form ">
                  <div className="filter-search-form-1  ">
                    {/* <!-- .Hero Button --> */}
                    <div className="button-block ">
                      <Link
                        to={localRoutes.tutor_list}
                        className="btn btn-primary line-height-reset h-100  w-100 text-uppercase"
                      >
                        Find a tutor
                      </Link>
                    </div>
                    {/* <!-- ./Hero Button --> */}
                  </div>
                </form>
              </div>
              {/* <div className="row  mt-8 align-self-end">
                <div className="col-lg-2 col-md-2 ">
                  <img
                    src="./image/l3/png/trustpilot.png"
                    className="slider_trust_images"
                  />
                </div>
                <div className="col-lg-2 col-md-2 ">
                  <img
                    src="./image/l3/png/google.png"
                    className="slider_trust_images"
                  />
                </div>
              </div> */}
            </div>
            {/* <!-- Hero Right Image --> */}
            <div
              className="col-lg-6 col-md-4 col-sm-12 col-xs-12 col-12  home-slider z-index-n1 position-static position-md-absolute mx-auto ml-md-auto"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className=" ml-xxl-23 ml-xl-12 ml-md-7">
                <img
                  src="image/l3/png/quran_tutor_slider.webp"
                  alt=""
                  className="w-100"
                />
              </div>
            </div>
            <div className="col-12 text-center show_trustpilot_bottom">
              <img src="image/trust-pilot.png" alt="" className="" />
            </div>
            {/* <!-- ./Hero Right Image --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageHeader;
