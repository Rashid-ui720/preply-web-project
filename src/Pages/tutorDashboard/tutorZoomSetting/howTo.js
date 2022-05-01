import React from "react";

class HowToGetZoomCredintials extends React.Component {
  render() {
    return (
      <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-10 pb-15">
        <h6 className="mb-8">
          Please follow the steps below to get required zoom credential
        </h6>
        <ul className="p-0">
          <li className="font-size-4 mb-3">
            First Sign up or Sign in here :{" "}
            <a href="https://marketplace.zoom.us/" target="__blank">
              Zoom Market Place Portal
            </a>
          </li>
          <li className="font-size-4 mb-3">
            Click on Top right side menu and click on build app : Create app
          </li>
          <li className="font-size-4 mb-3">Choose JWT App and Continue...</li>
          <li className="font-size-4 mb-3">
            After filling details click on credtional tab and bottom you will
            see JWT Token change token expiry accroding to your setting.
          </li>
          <li className="font-size-4 mb-3">
            Paste your zoom email and JWT token here and save.
          </li>
        </ul>
      </div>
    );
  }
}

export default HowToGetZoomCredintials;
