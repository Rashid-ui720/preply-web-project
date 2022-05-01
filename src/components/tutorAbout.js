import React from "react";
class TutorAbout extends React.Component {
  state = {};
  render() {
    const { detail } = this.props;
    return (
      <div className="bg-white pr-xl-0 pr-xxl-14 p-5 px-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
          About
        </h4>
        <p className="font-size-4 mb-8">
          {detail == "" ? "No description given yet" : detail}
        </p>
      </div>
    );
  }
}

export default TutorAbout;
