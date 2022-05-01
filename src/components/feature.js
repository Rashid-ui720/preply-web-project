import React from "react";
class Feature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reademore: false };
  }
  render() {
    const { title, description, icon, color } = this.props;
    return (
      <div className="col-12 mb-9">
        <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
          <div className="media align-items-center">
            <div
              className={`text-${color} bg-${color}-opacity-1 square-52 mr-6 rounded rounded-4  font-size-7`}
            >
              <i className={icon}></i>
            </div>

            <div>
              <h3 className="font-size-6 mb-0">
                <a
                  className="heading-default-color font-weight-semibold"
                  href="#"
                >
                  {title}
                </a>
              </h3>
            </div>
          </div>
          <div className=" pt-3">
            <p
              className={`font-size-3 text-justified ${
                this.state.reademore ? "" : "features-description"
              }`}
            >
              {description}
            </p>
            <a
              className="text-secondary font-size-3"
              onClick={() =>
                this.setState({ reademore: !this.state.reademore })
              }
            >
              {this.state.reademore ? "Reade less" : "Reade more"}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Feature;
