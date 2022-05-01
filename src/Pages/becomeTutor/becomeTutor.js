import React from "react";
import BecomeTutorHeader from "../../components/becomeTutorHeader";
import TutorCourseStep from "../../components/tutorCourseStep";
import TutorVideoSection from "../../components/tutorVideoSection";
import TutorGetStartedSection from "../../components/tutorGetStartedSection";
import TutorReviewsCommunity from "../../components/tutorReviewsCommunity";

class BecomeTutor extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <BecomeTutorHeader />
        <TutorCourseStep />
        <TutorVideoSection />
        <TutorGetStartedSection />
        <TutorReviewsCommunity />
      </div>
    );
  }
}

export default BecomeTutor;
