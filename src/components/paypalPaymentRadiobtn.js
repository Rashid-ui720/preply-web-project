import React from "react";
class PaypalPaymentRadioBtn extends React.Component {
  state = { checked: false };
  render() {
    const { PaymentMethod, handlePaymentMethodChange } = this.props;
    return (
      <label
        className="radio radio--image radio--paypal"
        onClick={() => handlePaymentMethodChange("paypal")}
      >
        <input
          className="radio__input js-switcher js-paypal-radio"
          type="radio"
          name="payments"
          data-name="paypal"
          data-qa-id="paypal-payments"
          onChange={(e) => this.setState({ checked: e.target.value })}
          checked={PaymentMethod == "paypal" ? true : false}
        />
        <span className="radio__label">
          <img
            src="/image/svg/paypal.svg"
            width="78"
            height="19"
            alt="paypal"
            title="Paypal"
          />
        </span>
        <span className="radio__frame"></span>
      </label>
    );
  }
}

export default PaypalPaymentRadioBtn;
