const initState = {
  currency:
    localStorage.getItem("selected_currency") == null
      ? "GBP"
      : localStorage.getItem("selected_currency"),
  currency_date: localStorage.getItem("currency_date"),
  curency_rate: localStorage.getItem("curency_rate"),
};

const CurrencyReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENCY_DATA":
      return {
        ...state,
        currency: action.payload,
      };
    case "SET_CURRENCY_RATE_DATA":
      return {
        ...state,
        curency_rate: action.curency_rate,
        currency_date: action.currency_date,
      };

    default:
      return state;
  }
};

export default CurrencyReducer;
