import React from "react";
import { api } from "../utils/api_routes";
import axios from "axios";
import { ToastContent } from "../components/Toast";
import { toast } from "react-toastify";
class TutorPackageCard extends React.Component {
  state = {message: false};
  
  deletePackage = (tutorpackage) => {
    axios
      .get(api.deletepackage + tutorpackage.id)
      .then((res) => {
        // toast.dismiss();
        toast.dismiss();
        toast(
          () => ToastContent("Package deleted successfully"),
          {
            toastId: "successToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.SUCCESS,
          }
        );
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () => ToastContent("Package in use cannot delete"),
          {
            toastId: "errorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };

  render() {
    const { Tutorpackage, index, currency, curency_rate, opneAddPackageModal } =
      this.props;
      const divStyle = {
        minWidth: '45px',
      };
    return (
      <div
        className=" col-lg-4 col-md-6 col-sm-11 mb-9"
        style={{ cursor: "pointer" }}
        key={index}
        
      >
        {/* <!-- card-header start --> */}
        <div className="card border-mercury rounded-8 mb-lg-3 mb-9 px-xl-12 px-lg-8 px-12  hover-shadow-hitgray">
          
          <div className="card-header bg-transparent border-hit-gray-opacity-5 text-center pt-6 pb-2">
            <div className="pricing-title text-center">
              <h5 className="font-weight-semibold font-size-6 text-black-2">
                {Tutorpackage.title}
              </h5>
            </div>
            <h2 className="mt-11 text-dodger">
              {Tutorpackage.pp_hour !== ""
                ? currency == "GBP"
                  ? "£ " + Tutorpackage.pp_hour
                  : "$ " +
                    parseInt(curency_rate * parseInt(Tutorpackage.pp_hour))
                : ""}
              <span className="font-size-4 text-smoke font-weight-normal">
                /hr
              </span>{" "}
            </h2>
          </div>

          <div className="card-body px-0 pt-2 pb-3 d-flex justify-content-center">
            <ul className="list-unstyled align-items-center justify-content-center d-flex flex-column">
              <li
                className="mb-6 text-primary font-weight-bold d-flex font-size-4"
                style={{ minHeight: "1.5rem" }}
              >
                {Tutorpackage.discount_detail == null ||
                Tutorpackage.discount_detail == "" ||
                Tutorpackage.discount_detail == "0"
                  ? ""
                  : `Save  ${
                      currency == "GBP"
                        ? "£" + Tutorpackage.discount_detail
                        : "$" +
                          parseInt(
                            curency_rate *
                              parseInt(Tutorpackage.discount_detail)
                          )
                    }`}
              </li>

              <li className="mb-6 text-black-2 d-flex font-size-4">
                <i className="fas fa-clock font-size-3 text-black-2 mr-3"></i>{" "}
                {Tutorpackage.total_hours} Total Hours
              </li>

              <li className="mb-6 text-black-2 d-flex font-size-4">
                <span className="text-primary mr-2">
                  {currency == "GBP"
                    ? "£ " +
                      parseFloat(Tutorpackage.total_hours) *
                        parseFloat(Tutorpackage.pp_hour)
                    : "$ " +
                      parseFloat(Tutorpackage.total_hours) *
                        parseFloat(parseFloat(Tutorpackage.pp_hour) * curency_rate)}
                </span>
                Package Price
              </li>
              <li>
                <button href="#" onClick={() => this.props.opneAddPackageModal(Tutorpackage)} class="btn btn-primary btn-sm" style={divStyle}><i className="fa fa-edit"></i></button>      
                <a type="button" onClick={() => this.deletePackage(Tutorpackage)} className="ml-1 btn btn-danger btn-sm" style={divStyle}><i className="fa fa-trash"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorPackageCard;
