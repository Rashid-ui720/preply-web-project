import React from "react";
import { localRoutes } from "../../../utils/local_routes";
class SettingSideBar extends React.Component {
  state = {
    links: [
      { name: "Account", link: localRoutes.student_dashboard_profile },
      {
        name: "Change Password",
        link: localRoutes.student_dashboard_password_change,
      },
      {
        name: "Packages History",
        link: localRoutes.student_dashboard_packages_history,
      },
      { name: "Student Report", link: localRoutes.student_dashboard_report },
      { name: "Wallet", link: localRoutes.student_dashboard_wallet },
      { name: "Parent Wizard", link: localRoutes.parent_wizards },
      { name: "Stats", link: localRoutes.student_dashboard },
    ],
  };
  render() {
    const { selectedLink, selectLink } = this.props;
    return (
      <div className="w-100 d-flex flex-column mb-6">
        {this.state.links.map((link, index) => {
          return (
            <div
              className={`setting-link  ${
                selectedLink == link.link ? "setting-link-active" : ""
              }`}
              key={index}
              onClick={() => selectLink(link.link)}
            >
              <p>{link.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SettingSideBar;
