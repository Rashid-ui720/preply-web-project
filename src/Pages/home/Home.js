import React , {Suspense} from "react";
const ReviewsTestimonial = React.lazy(() => import("../../components/HomePageReviewsTestimonial"));
const HomePageHeader = React.lazy(() => import("../../components/homePageHeader"));
const HomePageAccordionZone = React.lazy(() => import("../../components/homePageAccordionZone"));
const HomePageGetStarted = React.lazy(() => import("../../components/homePageGetStarted"));
const HomePageComfortZone = React.lazy(() => import("../../components/homepageComfortzone"));
const HomepagePreplyWork = React.lazy(() => import("../../components/homepagePreplyWork"));
const HomePreplyBecomeTutor = React.lazy(() => import("../../components/homepreplyBecomeTutor"));
const HomePageStartLearning = React.lazy(() => import("../../components/homepageStartLearning"));
const HomePageAllTutorsCountry = React.lazy(() => import("../../components/homepageAllTutorsCountry"));
const HomeHeaderInputField = React.lazy(() => import("../../components/homeheaderinputfield"));
const HomePageSuccessStory = React.lazy(() => import("../../components/homePageSuccessStory"));
const HomePageTutorList = React.lazy(() => import("../../components/homePageTutorList"));
const HomePageOnlineCourse = React.lazy(() => import("../../components/homePageOnlineCourse"));
const AboutFaqSection = React.lazy(() => import("../../components/aboutFaqSection"));
const HomePagePopularCities = React.lazy(() => import("../../components/homePagePopularCities"));
const HomePagePopularSearch = React.lazy(() => import("../../components/homePagePopularSearch"));
const TrustedCurriculum = React.lazy(() => import("../../components/trustedCurriculum"));


class Home extends React.Component {
  state = {featuredTutor: null};
  loaderFunction = () => {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "9999",
          top: "50%",
          left: "0",
        }}
      >
        <div className="text-center w-100">
          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#00b074",
            }}
            role="status"
          ></div>
          <h3
            className=" font-size-4 text-center"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            Loading...
          </h3>
        </div>
      </div>
    );
  };

  reviewsData = (reviewsdata) => {
    this.setState({featuredTutor: reviewsdata});
  }

  render() {
    return (
      
      <div>
        <Suspense fallback={this.loaderFunction()}>
          <HomePageHeader />
          <HomePageAccordionZone />
          <HomePageGetStarted />
          <HomeHeaderInputField />
          <HomePageAllTutorsCountry />
          <HomePageComfortZone />
          <HomepagePreplyWork />
          <HomePreplyBecomeTutor />
          <HomePageStartLearning />
          <HomePageTutorList featuredTutor={this.state.featuredTutor}/>
          <TrustedCurriculum />
          <HomePageOnlineCourse />
          <HomePageSuccessStory />
          <ReviewsTestimonial reviewsData={(reviewsdata) => this.reviewsData(reviewsdata)}/>
          <AboutFaqSection />
          <HomePagePopularCities />
          <HomePagePopularSearch />
        </Suspense>
      </div>
    );
  }
}

export default Home;
