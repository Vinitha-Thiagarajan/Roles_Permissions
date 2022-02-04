import { useState, useEffect, Fragment } from "react";
import moment from 'moment'
import { DropDown, DatePicker, Button } from "../../../components";

export const TrendDataLoad = (sourceList, range, start, end) => {
    var source = sourceList;
    let request ={};
    if (range) {
        let datecount = 0;
        if (range == "Monthly") {
            datecount = 30
        }
        if (range == "Weekly") {
            datecount = 7
        }
        if (range == "Yearly") {
            datecount = 365
        }
        request = {
            sourceName: JSON.stringify(source),
            startLogdate: moment().subtract(datecount, 'days').format("YYYY-MM-DD"),
            endLogdate: moment().format("YYYY-MM-DD"),
        }
    }
    else {
        request = {
            sourceName: JSON.stringify(source),
            startLogdate: moment(start).format("YYYY-MM-DD"),
            endLogdate: moment(end).format("YYYY-MM-DD"),
        }
    }
    return request;
}

export const CombineRecords = (data, type) => {
    if (type === "failureDelayReason") {
        return data.reduce(function (pv, cv) {
            if (pv[cv.failureDelayReason.reason]) {
                pv[cv.failureDelayReason.reason] += 1;
            } else {
                pv[cv.failureDelayReason.reason] = 1;
            }
            return pv;
        }, Object.create(null));
    }
    else if (type === "source") {
        return data.reduce(function (pv, cv) {
            pv[cv.source.source] = pv[cv.source.source] || [];
            pv[cv.source.source].push(cv);
            return pv;
        }, Object.create(null));
    }
    else if (type === "logdate") {
        return data.reduce(function (pv, cv) {
            let logdate = moment(cv.logdate).format("MM-DD-YYYY")
            pv[logdate] = pv[logdate] || [];
            pv[logdate].push(cv);
            return pv;
        }, Object.create(null));
    }
    else if (type === "status") {
        return data.reduce(function (pv, cv) {
            let status = cv.status.toLowerCase() === "completed on time" ? "Complete" : cv.status;
            if (pv[status]) {
                pv[status] += 1;
            } else {
                pv[status] = 1;
            }
            return pv;
        }, Object.create(null));
    }
}

export const Failurecolors = {
    "Luigi": "#fc302e",
    "Presto": "#fd5d5d",
    "Vendor": "#87133a",
    "TechnicalDev": "#d00148",
    "Bug": "#44020e",
    "Unfulfilled": "#c38d97",
    "TechnicalNDev": "#b9597a",
    "Other": "#d474c8"
};
export const Generalcolors = {
    "delay": "#ff9f00",
    "failure": "#f53c56",
    "success": "#35b27d"
};

export const Overallcolors = ["#fc302e", "#fd5d5d", "#87133a", "#d00148", "#44020e", "#c38d97", "#b9597a", "#ffdee4"];

