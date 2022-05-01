import axios from "axios";

import { api } from "../../utils/api_routes";

//set payload
export const SetPayload = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_PAYLOAD_DATA",
      payload: payload,
    });
  };
};

//remove Payload Data
export const RemovePayload = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "REMOVE_PAYLOAD_DATA",
      payload: null,
    });
  };
};

//set payload
export const SetPackagesPayload = (payload, forceRedirectToCheckout) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_PACKAGES_PAYLOAD_DATA",
      payload: payload,
    });
    forceRedirectToCheckout();
  };
};

//remove Payload Data
export const RemovePackagessPayload = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "REMOVE_PACKAGES_PAYLOAD_DATA",
      payload: null,
    });
  };
};
