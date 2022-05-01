import React from "react";
import { connect } from "react-redux";
import {
  addTutorPackage,
  updateTutorPackage,
} from "../Redux/Actions/tutorPackagesActions";
class AddPackageModal extends React.Component {
  state = {
    title: "",
    pp_hour: "",
    class_duration: "1hr",
    total_hours: "",
    discount_detail: "",
  };

  componentDidMount() {
    const { selectedPackage } = this.props;
    if (selectedPackage !== null && selectedPackage !== undefined) {
      this.setState({
        title: selectedPackage.title,
        pp_hour: selectedPackage.pp_hour,
        class_duration: "1hr",
        total_hours: selectedPackage.total_hours,
        discount_detail: selectedPackage.discount_detail,
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedPackage } = this.props;
    if (selectedPackage !== null && selectedPackage !== undefined) {
      let params = new FormData();
      params.append("title", this.state.title);
      params.append("pp_hour", this.state.pp_hour);
      params.append("total_hours", this.state.total_hours);
      params.append("discount_detail", this.state.discount_detail);
      params.append(
        "user_id",
        this.props.AuthData.id
          ? this.props.AuthData.id
          : this.props.AuthData.user_id
      );
      params.append("id", selectedPackage.id);
      this.props.updateTutorPackage(
        params,
        this.props.onCloseAddPackageModal,
        this.props.AuthData.id
          ? this.props.AuthData.id
          : this.props.AuthData.user_id
      );
    } else {
      let params = new FormData();
      params.append("title", this.state.title);
      params.append("pp_hour", this.state.pp_hour);
      params.append("total_hours", this.state.total_hours);
      params.append("discount_detail", this.state.discount_detail);
      params.append(
        "user_id",
        this.props.AuthData.id
          ? this.props.AuthData.id
          : this.props.AuthData.user_id
      );
      this.props.addTutorPackage(
        params,
        this.props.onCloseAddPackageModal,
        this.props.AuthData.id
          ? this.props.AuthData.id
          : this.props.AuthData.user_id
      );
    }
  };

  render() {
    const { selectedPackage } = this.props;
    return (
      <div className=" max-width-px-840 position-relative">
        <button
          onClick={() => this.props.onCloseAddPackageModal()}
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-12">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="form-group  col-lg-6 col-md-6 col-sm-12">
                      <label
                        htmlFor="package_title"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Package Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="package name/ title"
                        id="title"
                        required
                        value={this.state.title}
                        onChange={(event) =>
                          this.setState({ title: event.target.value })
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <label
                        htmlFor="pp_hour"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Price/hour
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="price per hour"
                        id="pp_hour"
                        min="1"
                        required
                        step="0.1"
                        value={this.state.pp_hour}
                        onChange={(event) =>
                          this.setState({ pp_hour: event.target.value })
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <label
                        htmlFor="class_duration"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Class Duration
                      </label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        placeholder="class duration in hours"
                        id="class_duration"
                        required
                        value={this.state.class_duration}
                        onChange={(event) =>
                          this.setState({ class_duration: event.target.value })
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <label
                        htmlFor="price_per_month"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Total Hours
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Total hours of package"
                        id="total_hours"
                        required
                        min="1"
                        value={this.state.total_hours}
                        onChange={(event) =>
                          this.setState({ total_hours: event.target.value })
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6 col-md-6 col-sm-12">
                      <label
                        htmlFor="price_per_month"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Save <span>(please add amount)</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Total save amount"
                        id="discount"
                        min="0"
                        max="100"
                        value={this.state.discount_detail}
                        onChange={(event) =>
                          this.setState({ discount_detail: event.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group mb-8">
                    {selectedPackage !== null ? (
                      <div className="d-flex w-100 justify-content-between">
                        <button
                          className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                        type="submit"
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTutorPackage: (params, closeModal, user_id) =>
      dispatch(addTutorPackage(params, closeModal, user_id)),
    updateTutorPackage: (params, closeModal, user_id) =>
      dispatch(updateTutorPackage(params, closeModal, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackageModal);
