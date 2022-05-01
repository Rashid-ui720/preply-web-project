import React, { useMemo } from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const useOptions = () => {
  const CARD_ELEMENT_OPTIONS = useMemo(() => ({
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "#6b6e6f",
        color: "#6b6e6f",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#6b6e6f",
        },
      },
      invalid: {
        color: "#6b6e6f",
        ":focus": {
          color: "#6b6e6f",
        },
      },
    },
  }));
  return CARD_ELEMENT_OPTIONS;
};

export default function CardSection() {
  const options = useOptions();
  return (
    <div className="row mt-6">
      <div className="col-12">
        <div className="font-size-3">Card Number</div>
        <CardNumberElement options={options} className="stripepaymentcard" />
      </div>
      <div className="row col-12 mt-4 pr-0">
        <div className="col-lg-6 col-md-6 col-sm-12 pr-0">
          <div className="w-100">
            <div className="font-size-3">
              Expiration date<span className="font-size-2 ml-1">(MM/YY)</span>
            </div>
            <CardExpiryElement
              options={options}
              className="stripepaymentcard"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 pr-0">
          <div className="w-100">
            <div className="font-size-3">
              CVV <span className="font-size-2 ml-1">(3 digits)</span>
            </div>
            <CardCvcElement options={options} className="stripepaymentcard" />
          </div>
        </div>
      </div>
    </div>
  );
}
