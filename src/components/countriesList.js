import React, { Component } from "react";
import { connect } from "react-redux";
import { getTutorList } from "../Redux/Actions/tutorListActions";
class CountiresList extends Component {
  state = {};

  selectCountry = (country) => {
    const { handleCountry_or_language_select } = this.props;

    handleCountry_or_language_select("country_id", country);
  };

  async componentDidMount() {
    this.props.getTutorList(0, "", "", "", "", "");
  }

  getCountryName = () => {
    const { country_id, tutorListLoader, tutorCountiresList, tutorSignup } =
      this.props;

    for (let i = 0; i < tutorCountiresList.length; i++) {
      if (country_id.country_id == tutorCountiresList[i].country_id) {
        return tutorCountiresList[i].nicename;
      }
    }
  };
  render() {
    const { country_id, tutorListLoader, tutorCountiresList, tutorSignup } =
      this.props;
      
    return (
      <div className=" position-relative w-100">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none", zIndex: "2" }}
        >
          <a
            className="nav-link dropdown-toggle gr-toggle-arrow countrySecectorHeader"
            id="navbarDropdown"
            href="#features"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {country_id.country_id == "" || country_id.country_id == null
              ? "country"
              : this.getCountryName()}
          </a>
          <ul
            className="gr-menu-dropdown dropdown-menu country-selector"
            style={{ maxHeight: tutorSignup ? "" : "9rem" }}
            aria-labelledby="navbarDropdown"
          >
            {tutorListLoader ? (
              <li className="drop-menu-item ">
                <a>Loading...</a>
              </li>
            ) : (
              tutorCountiresList.map((country, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => this.selectCountry(country)}
                    className={`drop-menu-item ${
                      country_id.country_id == country.country_id
                        ? "selectedLanguage"
                        : ""
                    }`}
                  >
                    <a>{country.nicename}</a>
                  </li>
                );
              })
            )}
          </ul>
        </li>
        {true ? null : (
          <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
            <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tutorListError: state.tutorList.tutorListError,
    tutorListLoader: state.tutorList.tutorListLoader,
    tutorCountiresList: state.Auth.AuthData.countries_list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorList: (pageNumber, country_id, language_id, name, level, course) =>
      dispatch(
        getTutorList(pageNumber, country_id, language_id, name, level, course)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CountiresList);
