import React from "react";
class CardPaymentRadioBtn extends React.Component {
  state = { checked: false };
  render() {
    const { PaymentMethod, handlePaymentMethodChange } = this.props;
    return (
      <label
        className="radio radio--image w-100"
        onClick={() => handlePaymentMethodChange("card")}
      >
        <input
          className="radio__input js-switcher js-braintree-radio"
          type="radio"
          name="payments"
          data-name="braintree"
          data-qa-id="braintree-payments"
          onChange={(e) => this.setState({ checked: e.target.value })}
          checked={PaymentMethod == "card" ? true : false}
        />
        <span className="radio__label">
          <img
            src="/image/svg/visa.svg"
            width="40"
            height="11"
            alt="Visa"
            title="Visa"
          />
          <img
            src="/image/svg/mastercard.svg"
            width="30"
            height="25"
            alt="Mastercard"
            title="Mastercard"
          />
          <img
            src="/image/svg/amex.png"
            width="30"
            height="20"
            alt="American express"
            title="American express"
          />
          <img
            src="/image/svg/discover.svg"
            width="30"
            height="18"
            alt="Discover"
            title="Discover"
          />
        </span>
        <span className="radio__frame"></span>
      </label>
    );
  }
}

export default CardPaymentRadioBtn;
