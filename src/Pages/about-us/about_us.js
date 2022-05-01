import React from "react";
import OldAboutPage from "../../components/oldAboutPage";
import AboutwhoWorkSec from "../../components/aboutwhoWorkSec";
import AboutMissionSec from "../../components/aboutMissionSec";
import AboutFaqSection from "../../components/aboutFaqSection";
import AboutMeetExperts from "../../components/aboutMeetExperts";
class About_us extends React.Component {
  state = {};

  render() {
    return (
      <>
        {/* <OldAboutPage /> */}
        <AboutwhoWorkSec />
        <AboutMissionSec />
        {/* <AboutFaqSection /> */}
        <AboutMeetExperts />
      </>
    );
  }
}

export default About_us;
