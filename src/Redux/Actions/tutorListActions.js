import axios from "axios";

import { api } from "../../utils/api_routes";

//get tutor list
export const getTutorList = (
  pageNumber,
  country_id,
  language_id,
  name,
  level,
  course_id,
  per_hr_rate_from,
  per_hr_rate_to
) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_TUTOR_LIST_LOADER",
      payload: true,
    });
    axios
      .get(
        api.getTutorsLits +
          "?page=" +
          parseInt(pageNumber) +
          "&country_id=" +
          country_id +
          "&language_id=" +
          language_id +
          "&name=" +
          name +
          "&level=" +
          level +
          "&course=" +
          course_id.course_id +
          "&per_hr_rate_from=" +
          per_hr_rate_from +
          "&per_hr_rate_to=" +
          per_hr_rate_to,
      )
      .then((res) => {
        dispatch({
          type: "TUTOR_LIST_FETCH_SUCCESS",
          payload: res.data.instructors,
          countries: res.data.countries,
          languages: res.data.languages,
          featured_instructors: res.data.featuredinstructors,
          courses: res.data.courses,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TUTOR_LIST_ERROR",
          payload: err,
        });
      });
  };
};
