import {
    ANAMOLY_API_SUCCESS,
    ANAMOLY_API_FAILURE,
    ANAMOLY_API_LOADING,
    ANAMOLY_API_SEARCH,
    ANAMOLY_SORT,
    ANAMOLY_API_SUCCESS_INITIAL,
    ANAMOLY_API_LOADING_INITIAL
  } from "./anamoly.types";
  import axios from "axios";
  import { config } from "../../Projects/dart/src/config";
  export const sortData = (
    datatype,
    sort
  ) => async (dispatch) => {
    dispatch({
      type: ANAMOLY_SORT,
      payload:sort,
      datatype
    });
  }
  export const getAnamoly = (
    search,
    accessToken
  ) => async (dispatch) => {
    let tempQuery = ``;
    if (search) {
      tempQuery = `pipeline: \"${search}\"`;
      dispatch({
        type: ANAMOLY_API_SEARCH,
        payload:search
      });
    }
    else{
      dispatch({
        type: ANAMOLY_API_SEARCH,
        payload:""
      });
    }
    dispatch({
      type: search? ANAMOLY_API_LOADING : ANAMOLY_API_LOADING_INITIAL,
    });
  
    try {
      const res = await axios.post(
        config.API_URL,
        {
          query: search? `{
            anomalyDetection(${tempQuery}){
              pipelines
              results{
                date
                insight
                insightDetails
              }
            }
          }`:`{
            anomalyDetection{
              pipelines
              results{
                date
                insight
                insightDetails
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
        type: search? ANAMOLY_API_SUCCESS:ANAMOLY_API_SUCCESS_INITIAL,
        payload: res.data,
      });
    } catch (error) {
      try{
      dispatch({
        type: ANAMOLY_API_FAILURE,
        payload: "error",
      });
      }
      catch(e){}
    }
  };
  