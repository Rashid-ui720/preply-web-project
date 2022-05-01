import React from "react";
import TutorPackageCard from "../../../components/tutorPackageCard";
import AddPackageModal from "../../../components/addPackageModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { connect } from "react-redux";
import { getTutorPackages } from "../../../Redux/Actions/tutorPackagesActions";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
class TutorPackages extends React.Component {
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

  errorComp = () => {
    return (
      <div className="text-center mt-15 mb-30 w-100">
        <h4>
          An unknown error has accoured please rolaod the page to try again
        </h4>
        <button
          className="btn btn-red"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  };

  loaderComp = () => {
    return (
      <div className="text-center mt-15 mb-30 w-100">
        <div
          className="spinner-grow"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            color: "#00b074",
          }}
          role="status"
        ></div>
      </div>
    );
  };

  noPackageComp = () => {
    return (
      <div className="text-center mt-15 mb-30 w-100">
        <h4>Please add 1 or more package to complete your profile</h4>
      </div>
    );
  };
  render() {
    const {
      tutorPackages,
      tutorPackagesError,
      tutorPackagesLoader,
      currency,
      curency_rate,
    } = this.props;
    return (
      <div className="mb-5">
        <StepProgressBar
          startingStep={1}
          buttonWrapperClass="hide_everything"
          steps={[
            {
              label: "Info",
              name: "step 1",
            },
            {
              label: "Packages",
              name: "step 2",
            },
            {
              label: "Availability",
              name: "step 3",
            },
          ]}
        />
        <div className="row d-flex justify-content-end col-12 mb-8">
          <button
            className="btn btn-green"
            onClick={() => this.opneAddPackageModal()}
          >
            Add New Package
          </button>
        </div>
        <div className="row justify-content-start">
          {tutorPackagesLoader
            ? this.loaderComp()
            : tutorPackagesError !== null
            ? this.errorComp()
            : tutorPackages.length == 0
            ? this.noPackageComp()
            : tutorPackages.map((Tutorpackage, index) => {
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

          <div className="row d-flex justify-content-between col-12 ">
            <button
              className="btn btn-outline-black ml-6"
              onClick={() => this.props.previousStep(0)}
            >
              Previous
            </button>
            <button
              className="btn btn-green"
              onClick={() => this.props.nextStep(2)}
              disabled={tutorPackages.length == 0 ? true : false}
            >
              Next
            </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(TutorPackages);
