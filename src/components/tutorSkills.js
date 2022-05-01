import React from "react";

class TutorSkills extends React.Component {
  state = {};
  render() {
    const { languages } = this.props;
    return (
      <>
        {languages.length > 0 ? (
          <div className="col-12">
            <div className="row bg-white rounded mt-2">
              <div className="p-5">
                <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                  Speaks
                </h4>
                <ul className="list-unstyled d-flex align-items-center flex-wrap pl-5">
                  {languages?.map((lang, index) => {
                    return (
                      <li className="mr-6 d-flex" key={index}>
                        <a
                          className="bg-polar text-black-2   px-7 mt-2 mb-2 font-size-2 rounded-3  d-flex align-items-center"
                          href="#"
                        >
                          {lang?.language?.name}
                        </a>
                        <span
                          className={`badge pt-1 pb-1 pl-3 pr-3 font-size-2 font-waight-normal mt-2 mb-2
                                      badge-info
                                      `}
                          style={{
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            fontWeight: "normal",
                          }}
                        >
                          {lang?.level}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default TutorSkills;
