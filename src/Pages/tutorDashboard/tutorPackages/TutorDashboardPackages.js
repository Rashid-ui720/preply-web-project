import React from "react";
import TutorPackageCard from "../../../components/tutorPackageCard";
import AddPackageModal from "../../../components/addPackageModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { connect } from "react-redux";
import { getTutorPackages } from "../../../Redux/Actions/tutorPackagesActions";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
class TutorDashboardPackages extends React.Component {
  state = { selectedPackage: null };
  componentDidMount() {
    const { AuthData } = this.props;

    this.props.getTutorPackages(AuthData.id ? AuthData.id : AuthData.user_id);
  }
  opneAddPackageModal = (selectedPackage = null) => {
    if (selectedPackage !== null) {
      this.setState({
        selectedPackage: selectedPackage,
        addPackageModal: true,
      });
    } else {
      this.setState({ addPackageModal: true });
    }
  };

  onCloseAddPackageModal = () => {
    this.setState({ addPackageModal: false, selectedPackage: null });
  };
  render() {
    const {
      tutorPackages,
      tutorPackagesError,
      tutorPackagesLoader,
      currency,
      curency_rate,
    } = this.props;

    if (tutorPackagesLoader && tutorPackages.length == 0) {
      return <DashboardLoader />;
    }

    if (tutorPackagesError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
        />
      );
    }
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container">
          <div className="mb-5">
            <div className="row d-flex justify-content-end col-12 mb-8">
              <button
                className="btn btn-green"
                onClick={() => this.opneAddPackageModal()}
              >
                Add New Package
              </button>
            </div>
            <div className="row justify-content-start">
              {tutorPackages.map((Tutorpackage, index) => {
                return (
                  <TutorPackageCard
                    Tutorpackage={Tutorpackage}
                    index={index}
                    key={index}
                    currency={currency}
                    curency_rate={curency_rate}
                    opneAddPackageModal={(selectedPackage) =>
                      this.opneAddPackageModal(selectedPackage)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* Add package form Modal */}
        <Modal
          center
          open={this.state.addPackageModal}
          showCloseIcon={false}
          onClose={this.onCloseAddPackageModal}
        >
          <AddPackageModal
            onCloseAddPackageModal={this.onCloseAddPackageModal}
            selectedPackage={this.state.selectedPackage}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    tutorPackages: state.tutorPackages.tutorPackages,
    tutorPackagesError: state.tutorPackages.tutorPackagesError,
    tutorPackagesLoader: state.tutorPackages.tutorPackagesLoader,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorPackages: (user_id) => dispatch(getTutorPackages(user_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorDashboardPackages);
