import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BaseUrl } from "../utils/api_routes";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";
import FeaturedTutorCard from "./featuredTutorCard";
class FeaturedTutors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      featured_instructors,
      CountiresList,
      currency,

      curency_rate,
    } = this.props;
    return (
      <div className="w-100">
        <OwlCarousel
          className="owl-theme single-slider w-100"
          dots={false}
          nav={true}
          margin={10}
          responsive={{
            0: {
              items: 1,
            },
            600: {
              items: 4,
            },
            1000: {
              items: 4,
            },
          }}
        >
          {featured_instructors.map((tutor, index) => {
            return (
              <FeaturedTutorCard
                tutor={tutor}
                index={index}
                CountiresList={CountiresList}
                key={index}
                currency={currency}
                curency_rate={curency_rate}
                currentTutor={this.props.currentTutor}
              />
            );
          })}
        </OwlCarousel>
      </div>
    );
  }
}

export default FeaturedTutors;
