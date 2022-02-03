import {
    AUDIT_API_SUCCESS,
    AUDIT_API_LOADING,
    AUDIT_API_FAILURE,
    AUDIT_FILTER_API_SUCCESS,
    AUDIT_FILTER_API_LOADING,
    AUDIT_FILTER_API_FAILURE,
    AUDIT_RESET_API_RECORD
  } from "./auditlog.types";
  import axios from "axios";
  import { config } from "../../Projects/dart/src/config";

export const resetRecord =()=> async (dispatch)=>{
  dispatch({
    type:AUDIT_RESET_API_RECORD
  })
}
export const getAuditlog = (
    accessToken
  ) => async (dispatch) => {
    dispatch({
      type: AUDIT_FILTER_API_LOADING,
    });
  
    try {
      const res = await axios.post(
        config.API_URL,
        {
          query: `{
                auditTableInfo{
                  allTables
                  allFilters{
                    columns
                    tableName
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
        type: AUDIT_FILTER_API_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUDIT_FILTER_API_FAILURE,
        payload: error,
      });
    }
  };
  export const getAuditlogRec = (
    table,
    filters,
    accessToken
  ) => async (dispatch) => {
    dispatch({
      type: AUDIT_API_LOADING,
    });
    let tempQuery = `table: \"${table}\"`;
    if (filters) {
      tempQuery += `, filtersKey: \"${Object.keys(filters)}\"`;
      tempQuery += `, filtersValue: \"${Object.values(filters)}\"`;
    }
    
    try {
      const res = await axios.post(
        config.API_URL,
        {
          query: `{
                auditLog(${tempQuery}){
                  auditLogs{mode, timestamp, jsonRecord, oldValue, newValue}
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
        type: AUDIT_API_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      try{
      dispatch({
        type: AUDIT_API_FAILURE,
        payload: "error",
      });}
      catch(e){
      }
    }
  };