import {
  TRACEABILITY_API_SUCCESS,
  TRACEABILITY_API_FAILURE,
  TRACEABILITY_API_LOADING,
  TRACEABILITY_API_RESET
} from "./traceability.types";
import axios from "axios";
import { config } from "../../Projects/dart/src/config";

export const resetTrace = () => async (dispatch) => {
  dispatch({
    type:TRACEABILITY_API_RESET
  })
}

export const getTraceability =
  (traceId, date, metric, brand, accessToken) => async (dispatch) => {
    //let tempQuery = `traceId: \"${traceId}\", date: \"${date}\"`;
    let tempQuery = `traceId: \"${traceId}\"`;
    if (metric) {
      tempQuery += `, metric: \"${metric}\"`;
    }
    if (brand) {
      tempQuery += `, brand: \"${brand}\"`;
    }
    dispatch({
      type: TRACEABILITY_API_LOADING,
      //payload: res.data,
    });

    try {
      const res = await axios.post(
        config.API_URL,
        {
          query: `{
          traceabilityFlow(${tempQuery}) {
            highlights
            allBrands
            allMetrics
            traceId
            metric
            brand
            varianceCount
            variancePercentage
            breakdown
            pipeline
            status
            recentRunDate
            stages {
              stage
              touchPoints {
                step
                touchPoint
                metricCount
              }
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
        type: TRACEABILITY_API_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: TRACEABILITY_API_FAILURE,
        payload: error,
      });
    }
  };

