import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";
class HomePagePopularCities extends React.Component {
  state = {};
  render() {
    return (
      <section className="pt-15 pb-15 pt-lg-12 pb-lg-12 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
              <div className="text-center mb-8 mb-lg-10 px-xl-9 px-xxl-7">
                <h2 className="font-size-8 mb-6">Learn Quran online in your city or town</h2>
              </div>
            </div>
            <div className="col-12 p-0 col-lg-8 col-md-12 col-sm-12 row justify-content-center">
              {/* cities row start */}
              <div className="row justify-content-between col-12 mb-10">
                <div className="col-lg-4 col-md-4 p-0 col-6 text-center">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-barking"}
                  >
                    Quran teacher in Barking
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6 text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-birmingham"}
                  >
                    Quran teacher in Birmingham
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6 text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-blackburn"}
                  >
                    Quran teacher in Blackburn
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 p-0  col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-bradford"}
                  >
                    Quran teacher in Bradford
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-bristol"}
                  >
                    Quran teacher in Bristol
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0  col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-derby"}
                  >
                    Quran teacher in Derby
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-islington"}
                  >
                    Quran teacher in Islington
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-leeds"}
                  >
                    Quran teacher in Leeds
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-leicester"}
                  >
                    Quran teacher in Leicester
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 p-0  col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-liverpool"}
                  >
                    Quran teacher in Liverpool
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0  col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-london"}
                  >
                    Quran teacher in London
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6 text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-luton"}
                  >
                    Quran Teacher in Luton
                  </Link>
                </div>

                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-manchester"}
                  >
                    Quran teacher in Manchester
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-newcastle"}
                  >
                    Quran teacher in Newcastle
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-nottingham"}
                  >
                    Quran teacher in Nottingham
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-sheffield"}
                  >
                    Quran teacher in Sheffield
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-southampton"}
                  >
                    Quran teacher in Southampton
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-stockport"}
                  >
                    Quran teacher in Stockport
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-walthamstow"}
                  >
                    Quran teacher in Walthamstow
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/uk/quran-teacher-wembley"}
                  >
                    Quran teacher in Wembley
                  </Link>
                </div>
                <div className="col-lg-4 col-md-4 p-0 col-6  text-center mb-8">
                  <Link
                    className="heading-default-color font-size-4 font-weight-normal"
                    to={"/wales/quran-teacher-cardiff"}
                  >
                    Quran teacher in Cardiff
                  </Link>
                </div>
              </div>
              {/* cities row end */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomePagePopularCities;
