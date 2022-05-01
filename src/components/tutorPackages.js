import React from "react";

class TutorPackages extends React.Component {
  state = {};
  render() {
    return (
      <div className="bg-white">
        <h6 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
          Please select a package
        </h6>
        <div className="table-responsive ">
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="pl-0 border-0 font-size-4 font-weight-normal"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="pl-4 border-0 font-size-4 font-weight-normal"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-color-2">
                <th scope="row" className="pl-6 border-0 py-7 min-width-px-235">
                  <div className="">
                    <a
                      href="jobdetails.html"
                      className="font-size-4 mb-0 font-weight-semibold text-black-2"
                    >
                      Senior Project Manager
                    </a>
                  </div>
                </th>
                <td className="table-y-middle py-7 min-width-px-135">
                  <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                    Full-Time
                  </h3>
                </td>
                <td className="table-y-middle py-7 min-width-px-125">
                  <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                    20$
                  </h3>
                </td>
                <td className="table-y-middle py-7 min-width-px-155">
                  <a
                    href="#"
                    className="font-size-3 font-weight-bold text-green text-uppercase"
                  >
                    Select
                  </a>
                </td>
              </tr>
              <tr className="border border-color-2">
                <th scope="row" className="pl-6 border-0 py-7 min-width-px-235">
                  <div className="">
                    <a
                      href="jobdetails.html"
                      className="font-size-4 mb-0 font-weight-semibold text-black-2"
                    >
                      Senior Project Manager
                    </a>
                  </div>
                </th>
                <td className="table-y-middle py-7 min-width-px-135">
                  <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                    Full-Time
                  </h3>
                </td>
                <td className="table-y-middle py-7 min-width-px-125">
                  <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                    20$
                  </h3>
                </td>
                <td className="table-y-middle py-7 min-width-px-155">
                  <a
                    href="#"
                    className="font-size-3 font-weight-bold text-green text-uppercase"
                  >
                    Select
                  </a>
                </td>
              </tr>
              <tr className="border border-color-2">
                <th scope="row" className="pl-6 border-0 py-7 min-width-px-235">
                  <div className="">
                    <a
                      href="jobdetails.html"
                      className="font-size-4 mb-0 font-weight-semibold text-black-2"
                    >
                      Senior Project Manager
                    </a>
                  </div>
                </th>
                <td className="table-y-middle py-7 min-width-px-135">
                  <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                    Full-Time
                  </h3>
                </td>
                <td className="table-y-middle py-7 min-width-px-125">
                  <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                    20$
                  </h3>
                </td>
                <td className="table-y-middle py-7 min-width-px-155">
                  <a
                    href="#"
                    className="font-size-3 font-weight-bold text-green text-uppercase"
                  >
                    Select
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TutorPackages;
