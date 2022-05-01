import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { contact_us } from "../../Redux/Actions/contactUsActions";
import { connect } from "react-redux";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
class Contact_us extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      email: "",
      mobile: "",
      message: "",
    };
  }

  sendMessage = () => {
    if (
      this.state.fname == "" ||
      this.state.email == "" ||
      this.state.mobile == "" ||
      this.state.message == ""
    ) {
      toast.dismiss();
      toast(() => ToastContent("Please fill all feilds"), {
        toastId: "infoToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    } else {
      let Params = {
        fname: this.state.fname,
        email: this.state.email,
        mobile: this.state.mobile,
        message: this.state.message,
      };

      this.props.contact_us(Params);
    }
  };
  render() {
    return (
      <div className="jobDetails-section bg-default pt-md-30 pt-sm-25 pt-23 pb-md-27 pb-sm-20 pb-17">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-md-12 pr-xl-15"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="">
                <h3 className="font-size-9 font-weight-bold mb-7 mb-lg-7">
                  Contact us
                </h3>
                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2">
                    Making Commitments the Right Way
                  </p>
                  <p className="font-size-3 m-0 text-justified">
                    Gain first-hand real exposure into our teaching curriculum,
                    meet with our certified tutors, and dive into our community
                    for no cost at all! We cherish your time and want you to
                    decide if Quran Teacher Live is the right place for you. We
                    ensure a complete certification after every course.
                  </p>
                </>

                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2">
                    Largest Pool of Tutors
                  </p>
                  <p className="font-size-3 m-0">
                    Register to study the Quran with our colony of expert tutors
                    renowned for their professional teaching practices. Choose a
                    tutor to match your learning goals.
                  </p>
                </>

                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2">
                    The Perfect Match
                  </p>
                  <p className="font-size-3 m-0">
                    From background checks, to pupil reviews, pick your perfect
                    tutor to match your learning needs.
                  </p>
                </>

                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2">
                    Grow Profoundly
                  </p>
                  <p className="font-size-3 m-0">
                    Keeping track of your learning progress, reach your goals at
                    your pace, and grow as your learning expands with the help
                    of a Quran Tutor.{" "}
                  </p>
                </>

                {/* one heading */}
                <>
                  <p className="font-size-4 font-weight-bold mb-2">
                    Stay in Touch.
                  </p>
                  <p className="font-size-3 m-0">
                    Want an insight into our community? Sign up for the
                    newsletter. Have an inquiry? Write to us below.
                  </p>
                </>
              </div>
            </div>
            <div
              className="col-xl-6 col-md-12"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="bg-white px-9 pt-9 pb-7 ">
                <div className="row">
                  <div className="col-12 mb-7">
                    <label
                      htmlFor=""
                      className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jhon Doe"
                      value={this.state.fname}
                      onChange={(e) => this.setState({ fname: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-lg-6 mb-7">
                    <label
                      htmlFor=""
                      className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                    >
                      E-mail
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="example@gmail.com"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-lg-6 mb-7">
                    <label
                      htmlFor=""
                      className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                    >
                      Phone number
                    </label>
                    <PhoneInput
                      className="regInput"
                      vlaue={this.state.mobile}
                      placeholder="Mobile Number"
                      onChange={(value) => this.setState({ mobile: value })}
                      required
                    />
                  </div>
                  <div className="col-lg-12 mb-7">
                    <label
                      htmlFor="message"
                      className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                    >
                      Message
                    </label>
                    <textarea
                      name=""
                      id=""
                      placeholder="Type your message"
                      className="form-control h-px-144"
                      value={this.state.message}
                      onChange={(e) =>
                        this.setState({ message: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="col-lg-12 pt-4">
                    <button
                      className="btn btn-primary text-uppercase w-100 h-px-48"
                      onClick={() => this.sendMessage()}
                    >
                      Send Now
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-size-4">Contact Information</h3>
                  <div className="media mb-2">
                    <div className="mr-6">
                      <i className="fas fa-map-marker-alt mt-2"></i>
                    </div>
                    <p className="font-size-4 mb-0">
                      58 Roberts Road, High Wycombe, Bucks, HP13 6XB
                    </p>
                  </div>
                  <div className="media mb-2">
                    <div className="mr-6">
                      <i className="fas fa-phone-alt mt-2"></i>
                    </div>
                    <p className="font-size-4 mb-0">07493320143</p>
                  </div>
                  <div className="media mb-2">
                    <div className="mr-6">
                      <i className="fas fa-envelope mt-2"></i>
                    </div>
                    <p className="font-size-4 mb-0">
                      contact@onlinequrantuition.co.uk
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contact_us: (params) => dispatch(contact_us(params)),
  };
};

export default connect(null, mapDispatchToProps)(Contact_us);
