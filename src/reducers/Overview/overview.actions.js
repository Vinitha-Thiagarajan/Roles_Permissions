import {
  API_OVERVIEW_SUCCESS,
  API_OVERVIEW_FAILURE,
  API_OVERVIEW_LOADING,
  API_OVERVIEW_PIPELINE,
  API_OVERVIEW_SEARCH,
} from "./overview.types";
import axios from "axios";
import { config } from "../../Projects/dart/src/config";

export const UpdateList = (data) => (dispatch) => {
  dispatch({
    type: API_OVERVIEW_PIPELINE,
    payload: data,
  });
};
export const UpdateSearch = (data) => (dispatch) => {
  dispatch({
    type: API_OVERVIEW_SEARCH,
    payload: data,
  });
};
export const getDashboard = (
  sdate,
  edate,
  page,
  size,
  search,
  accesstoken
) => async (dispatch) => {
  let sdatequery = "";
  if (sdate) {
    sdatequery = `startDate: \"${sdate}\"`;
  }
  let edatequery = "";
  if (edate) {
    edatequery = `endDate: \"${edate}\"`;
  }
  let searchTxt = "";
  if (search) {
    searchTxt = `pipeline: \"${search}\"`;
  }
  dispatch({
    type: API_OVERVIEW_LOADING,
  });
  try {
    const res = await axios.post(
      config.API_URL,
      {
        query: `{
            dashboard(page:${page} size: ${size}, ${sdatequery} ${edatequery} ${searchTxt}) {
                totalElements,
                size,
                totalPages,
                currentPage,
                hasNextPage,
              results {
                successCount
                failureCount
                startDate
                endDate
                pipelineSet
                pipeline {
                  name
                  data{traceId,date,time,runTime,status}
                }
              }
            }
          }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + accesstoken,
        },
      }
    );
    dispatch({
      type: API_OVERVIEW_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: API_OVERVIEW_FAILURE,
      payload: error,
    });
  }
};
