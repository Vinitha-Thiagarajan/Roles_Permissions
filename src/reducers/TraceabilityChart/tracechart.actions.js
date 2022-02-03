import {
  TRACECHART_API_SUCCESS,
  TRACECHART_API_FAILURE,
  TRACECHART_API_LOADING,
  TRACECHART_API_PIPELINE,
  TRACECHART_API_RESET,
  TRACECHART_API_SUCCESS_TOUCH
} from "./tracechart.types";
import axios from "axios";
import { config } from "../../Projects/dart/src/config";
import moment from "moment";
export const getPipelineAll = (
  accessToken
) => async (dispatch) => {

  try {
    dispatch({
      type: TRACECHART_API_RESET
    });
    const res = await axios.post(
      config.API_URL,
      {
        query: `{
            chart
            {
              allPipelines
            }
          }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + accessToken,
        },
      }
    );
    dispatch({
      type: TRACECHART_API_PIPELINE,
      payload: res.data,
    });
  } catch (error) {

  }
}

export const getPipeline = (
  pipeline,
  touchpoint,
  brand,
  varianceFlag,
  accessToken,
  start,
  end
) => async (dispatch) => {
  let tempQuery = `pipeline: \"${pipeline}\"`;

  if (start) {
    tempQuery += `, startDate:\"${moment(start).format("YYYY-MM-DD")}\"`;
  }
  if (end) {
    tempQuery += `, endDate:\"${moment(end).format("YYYY-MM-DD")}\"`;
  }
  if (touchpoint && touchpoint.length > 0) {
    tempQuery += `, touchPoints:[${touchpoint.map((e)=>`"${e}"`)}]`;
  }
  if (brand) {
    tempQuery += `, brand: \"${brand}\"`;
  }
  if (varianceFlag) {
    tempQuery += `, varianceFlag:1`
  }
  dispatch({
    type: TRACECHART_API_LOADING,
  });

  try {
    const res = await axios.post(
      config.API_URL,
      {
        query: touchpoint && touchpoint.length > 0 ? `{
            chart(${tempQuery})
            {
              allBrands
              allPipelines
              allTouchPoints{
                step
                stepDetail
              }
              brand
              dataAndVariancePerDay{
                metricName
                metricData{
                date
                data
                steps}
              }
            }
          }`: `{
            chart(${tempQuery})
            {
              allBrands
              allPipelines
              allTouchPoints{
                step
                stepDetail
              }
            }
          }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + accessToken,
        },
      }
    );
    dispatch({
      type: touchpoint && touchpoint.length > 0 ?TRACECHART_API_SUCCESS:TRACECHART_API_SUCCESS_TOUCH,
      payload: res.data,
    });
  } catch (error) {
    try {
      dispatch({
        type: TRACECHART_API_FAILURE,
        payload: error,
      });
    }
    catch (e) { }
  }
};
