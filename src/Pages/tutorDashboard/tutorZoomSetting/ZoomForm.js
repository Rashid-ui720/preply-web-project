import React from "react";
import { connect } from "react-redux";
import { UpdateZoomSetting } from "../../../Redux/Actions/tutorzoomSettingAction";

class ZoomForm extends React.Component {
  state = {
    jwt_token: "",
    zoom_email: "",
  };

  componentDidMount() {
    const { zoomSetting } = this.props;
    this.setState({
      jwt_token: zoomSetting.jwt_token,
      zoom_email: zoomSetting.zoom_email,
    });
  }

  //handle submit of form
  handleSubmit = (e) => {
    e.preventDefault();
    const { AuthData } = this.props;

    let params = new FormData();
    params.append("zoom_email", this.state.zoom_email);
    params.append("jwt_token", this.state.jwt_token);
    params.append("user_id", AuthData.id ? AuthData.id : AuthData.user_id);

    this.props.UpdateZoomSetting(
      params,
      AuthData.id ? AuthData.id : AuthData.user_id
    );
  };

  render() {
    return (
      <div>
        <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-10 pb-10">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <div className="row mb-xl-1 mb-9">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Zoom Email
                    </label>
                    <input
                      type="email"
                      className="form-control h-px-48"
                      id="namedash"
                      placeholder="example@zyx.com"
                      value={this.state.zoom_email}
                      required
                      onChange={(e) =>
                        this.setState({ zoom_email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className=" col-lg-12 no-gutters">
                  <div className="form-group">
                    <label
                      htmlFor="aboutTextarea"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      jwt_token of zoom
                    </label>
                    <textarea
                      name="textarea"
                      id="aboutTextarea"
                      cols="15"
                      rows="5"
                      className="border border-mercury text-gray w-100 pt-4 pl-6"
                      placeholder="jwt_token of zoom"
                      value={this.state.jwt_token}
                      required
                      onChange={(e) =>
                        this.setState({ jwt_token: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row"></div>
              <div className="row d-flex justify-content-end mr-3">
                <button className="btn btn-green" type="submit">
                  Update Setting
                </button>
              </div>
            </fieldset>
          </form>
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
    UpdateZoomSetting: (params, user_id) =>
      dispatch(UpdateZoomSetting(params, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoomForm);
