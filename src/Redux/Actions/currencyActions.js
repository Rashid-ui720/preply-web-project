import axios from "axios";

export const SetCurrency = (currency) => {
  return (dispatch, getState) => {
    localStorage.setItem("selected_currency", currency);
    dispatch(getCurrencyRate(currency));
  };
};

const getDate = () => {
  var today = new Date();

  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
};

export const getCurrencyRate = (currency) => {
  return (dispatch, getState) => {
    let PreviousDate = localStorage.getItem("currency_date");
    if (PreviousDate !== getDate() && currency !== "GBP") {
      localStorage.setItem("currency_date", getDate());
      axios
        .get("https://api.exchangerate-api.com/v4/latest/GBP")
        .then((res) => {
          let USD_rate = res.data.rates.USD;
          localStorage.setItem("curency_rate", USD_rate);
          dispatch({
            type: "SET_CURRENCY_RATE_DATA",
            curency_rate: USD_rate,
            currency_date: getDate(),
          });
          dispatch({
            type: "SET_CURRENCY_DATA",
            payload: currency,
          });
        })
        .catch((err) => {
          console.error("eror in currency", err);
        });
    } else {
      dispatch({
        type: "SET_CURRENCY_DATA",
        payload: currency,
      });
    }
  };
};
