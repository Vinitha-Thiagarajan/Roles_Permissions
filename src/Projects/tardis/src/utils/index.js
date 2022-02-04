import axios from 'axios'
import moment from 'moment'
import { apiUrl, apiDVUrl } from '../assets/constant'
import momenttz from 'moment-timezone';

export const permissioncheck = (name, type, permission) => {

  if (type === "view") {
    return permission.view ? permission.view.indexOf(name) > -1 : true;
  }
  else if (type === "add") {
    return permission.add ? permission.add.indexOf(name) > -1 : true;
  }
  else if (type === "change") {
    return permission.change ? permission.change.indexOf(name) > -1 : true;
  }
  else if (type === "delete") {
    return permission.delete ? permission.delete.indexOf(name) > -1 : true;
  }

}
export const fetchDV = (params) => {
  try {
    return axios({
      url: apiDVUrl,
      method: 'post',
      data: {
        query: params,
      }
    }).then(response => {
      return response
    })
      .catch(error => {
        return { status: 400 }
      });
  }
  catch (e) {
    return { status: 400 }
  }
}
export const fetchDVCreate = (data) => {
  try {
    return axios({
      url: apiDVUrl,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      return response
    })
      .catch(error => {
        return { status: 400 }
      });
  }
  catch (e) {
    return { status: 400 }
  }
}
export const fetch = (params) => {
  try {
    return axios({
      url: apiUrl,
      method: 'post',
      data: {
        query: params
      }
    }).then(response => {
      return response
    })
      .catch(error => {
        return { status: 400 }
      });
  }
  catch (e) {
    return { status: 400 }
  }
}
export const slugToText = (slug) => {
  let words = slug.split("_")
  words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return words.join(" ")
}
export const isDev = () => {
  const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  return development;
}

export const pagename = () => {
  var url = window.location.pathname;
  if (url.indexOf("maintenance") > -1) return "Maintenance";
  //else if (url.indexOf("support-link") > -1) return "Support Link";
  else if (url.indexOf("configurations") > -1 || url.indexOf("slack-integration") > -1) return "Configurations";
  else if (url.indexOf("admin") > -1) return "Admin";
  else if (url.indexOf("trend-chart") > -1) return "Trend Chart";
  else if (url.indexOf("source-details/") > -1 || url.indexOf("trend-source-chart/") > -1 || url.indexOf("/") > -1) return "Dashboard";
  else if (url.indexOf("profile") > -1) return "Profile";
};
export const IntialGen = (nameString) => {
  if (nameString && Object.keys(nameString).length > 0) {
    let fullName = "";
    if (nameString.firstName != "")
      fullName = (nameString["firstName"] + ' ' + nameString["lastName"]).split(' ');
    else
      fullName = (nameString["username"]).split(' ');
    let initials = "";
    if (fullName.length > 1)
      initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    else
      initials = fullName.shift().charAt(0);
    return initials.toUpperCase();
  }
  return "";
}
export const filterdata = (data, params) => {
  let result = data;
  for (var y of Object.keys(params)) {
    if (Array.isArray(params[y])) {
      result = result.filter(function (e) {
        if (typeof e[y] === "object" && e[y] !== null) {
          return params[y].indexOf(e[y]["source"]) > -1;
        }
        else {
          if (y === "slackChannels") {
            let datachannel = e[y].split(",");
            let check = false
            for (var s of datachannel) {
              check = params[y].indexOf(s) > -1;
              if (check)
                break;
            }
            return check;
          }
          else if (y === "groupsname") {
            let datachannel = e["groups"];
            let check = false
            for (var s of datachannel) {
              check = params[y].indexOf(s.name) > -1;
              if (check)
                break;
            }
            return check;
          }
          else
            return params[y].indexOf(e[y]) > -1;
        }
      })
    }
    else {
      result = result.filter(function (e) {

        if (typeof params[y] === "boolean") {
          if (params[y])
            return e[y] === params[y];
          else
            return e[y] !== true;
        }
        else if (typeof e[y] === "object" && e[y] != null) {
          if (y === "failureDelayReason")
            return e[y]["reason"] === params[y];
          else
            return e[y][y] === params[y];
        }
        else {
          if (y === "startLogdate" || y === "endLogdate") {
            let range = false;
            let date = moment(e["logdate"]);
            if (!(date.isBefore(params["startLogdate"]) || date.isAfter(params["endLogdate"]))) {
              range = true;
            }
            return range;
          }
          else
            return e[y] === params[y];
        }
      })
    }
  }
  return result;
}
export const paginationFilter = (dataSource) => {
  let { totalElements, size, data, filter, page, pageBound, nav } = dataSource;
  var resultdata = data;
  var isFilter = false;
  if (Object.keys(filter).length > 0) {
    resultdata = filterdata(resultdata, filter);
    isFilter = true;
  }
  let totalEle = isFilter ? resultdata.length : totalElements;
  let totalPage = Math.ceil(totalEle / size);
  if (totalPage < page || totalPage === 1) {
    page = 1
  }

  let pageBounds;

  if (totalPage > 5) {
    if (nav === "Next" && (page - 1) % 5 === 0) {
      let upperbound = (pageBound.upperbound + 5);
      let lowerbound = (pageBound.lowerbound + 5);
      pageBounds = { current: 5, upperbound: upperbound, lowerbound: lowerbound }
    }
    else if (nav === "Prev" && (page) % 5 === 0) {
      let upperbound = (pageBound.upperbound - 5);
      let lowerbound = (pageBound.lowerbound - 5);
      pageBounds = { current: 5, upperbound: upperbound, lowerbound: lowerbound }
    }
    else if (page < 6) {
      pageBounds = { current: 5, upperbound: 5, lowerbound: 0 }
    }
    else {
      pageBounds = pageBound;
    }

  }
  else {
    pageBounds = { current: totalPage, upperbound: totalPage, lowerbound: 0 }
  }

  return {
    filterData: resultdata,
    filter: filter,
    page: page,
    size: size,
    totalPage: totalPage,
    totalElements: totalElements,
    pageBound: pageBounds
  }
}

export const alert = (status, data) => {
  var x = document.getElementById("snackbar");
  x.className = `show " ${status === "success" ? "greenclr" : "redclr"}`;
  x.innerHTML = data.substring(0, 120)
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
export const vaildateEmail = (email) => {
  const expression = /\S+@\S+/
  return expression.test(String(email).toLowerCase())
}
export const vaildatePhoneNo = (phone) => {
  const phoneno = /^\d{10}$/;
  return phone.match(phoneno)
}
export const getDates = (startDate, stopDate) => {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("MMM DD"))
    currentDate = currentDate.add(1, "days");
  }
  return dateArray;
}
export const checkDates = (header, item) => {
  return header === moment(item).format("MMM DD")
}
export const showHide = (data, page, sub, timeZone) => {
  if (sub) {
    if (sub == "vaild") {
      try{
        let selectedrow =data;
        let arrowimg = `downimage${data}`;
        var trd = document.getElementById(selectedrow);
        if (trd.className.indexOf("hidden_row") > -1) {
          trd.classList.remove("hidden_row");
        }
        else {
          trd.classList.add("hidden_row");
        }
  
        var imageid = document.getElementById(arrowimg);
        try {
          if (imageid.className.indexOf("downarr") > -1) {
            imageid.classList.remove("downarr");
            imageid.classList.add("uparr");
          } else {
            imageid.classList.add("downarr");
            imageid.classList.remove("uparr");
          }
        }
        catch
        (e) { }
      }
      catch(e){

      }
    }
    else {
      let selectedrow = `sub_hidden_row${data.id}`;
      let arrowimg = `sub_downimage${data.id}`;
      var trd = document.getElementById(selectedrow);
      if (trd.className.indexOf("hidden_row") > -1) {
        trd.classList.remove("hidden_row");
      }
      else {
        trd.classList.add("hidden_row");
      }

      var imageid = document.getElementById(arrowimg);
      try {
        if (imageid.className.baseVal.indexOf("downarr") > -1) {
          imageid.classList.remove("downarr");
          imageid.classList.add("uparr");
        } else {
          imageid.classList.add("downarr");
          imageid.classList.remove("uparr");
        }
      }
      catch
      (e) { }
    }
  }
  else {

    let selectedrow = `hidden_row${data.id}`;
    let arrowimg = `downimage${data.id}`;
    var trd = document.getElementById(selectedrow);
    var isopen = false;
    if (trd.className.indexOf("hidden_row") > -1) {
      trd.classList.remove("hidden_row");
      isopen = true;
    }
    else {
      trd.classList.add("hidden_row");
      isopen = false;
    }

    var all = document.getElementsByClassName(`access-${data.id}`);
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = data.preview ? 'none' : 'flex';
    }

    var imageid = document.getElementById(arrowimg);
    try {
      if (imageid.className.indexOf("downarr") > -1) {
        imageid.classList.remove("downarr");
        imageid.classList.add("uparr");
      } else {
        imageid.classList.add("downarr");
        imageid.classList.remove("uparr");

      }
    }
    catch
    (e) { }
    if (isopen)
      for (var x of Object.keys(data)) {
        try {
          let name = `${x}-${data.id}`;
          if (page === "source") {
            document.getElementById(name).value = x === "type" ? data[x].type : x === "availabilitySchedule" ? TzChecker(data[x], timeZone) : data[x];
          }
          else if (page === "sourceMap" || page === "slack")
            document.getElementById(name).value = typeof data[x] == "object" && data[x] != null ? data[x].source : data[x] == null ? false : data[x];
          else if (page === "maintenance") {
            if (x === "logdate")
              document.getElementById(name).value = moment(data[x]).format("MM/DD/YYYY");
            else
              document.getElementById(name).value = typeof data[x] == "object" && data[x] != null ? x === "source" ? data[x].source : data[x].reason : data[x] == null ? false : data[x];
          }
          if (data.preview) {
            document.getElementById(name).setAttribute("disabled", true);
          }
          else {
            document.getElementById(name).removeAttribute("disabled");
          }
        }
        catch (e) { }
      }
  }
}
const convertUTCToLocal = (utcDt, utcDtFormat) => {
  var toDt = moment.utc(utcDt, utcDtFormat).toDate();
  return moment(toDt).format("HH:mm:ss");
}
const convertUTCToTimezone = (utcDt, utcDtFormat, timezone) => {
  return moment.utc(utcDt, utcDtFormat).tz(timezone).format("HH:mm:ss");
}
export const TzChecker = (availabilitySchedule, timeZone) => {
  let curtz = momenttz.tz.guess();
  if (timeZone === "UTC")
    return availabilitySchedule;
  if (timeZone === curtz)
    return convertUTCToLocal(availabilitySchedule, "HH:mm:ss");
  else
    return convertUTCToTimezone(availabilitySchedule, "HH:mm:ss", timeZone);
}
export const fullscreen = (callback) => {
  var mainscreen = document.getElementById("maincontent");
  var aside = document.getElementById("asidebar");
  if (mainscreen.className.indexOf("fullscreen") > -1) {
    mainscreen.classList.remove("fullscreen");
    mainscreen.classList.add("originalscreen");
    aside.classList.remove("displayblock");
    //setTimeout(() => { aside.style.display = "none"; }, 500)
    aside.style.display = "none";
    aside.classList.remove("sideopen");
    aside.classList.add("sideclose");

    document.body.style.overflowY = "auto";
    callback(false);

  } else {
    mainscreen.classList.add("fullscreen");
    aside.style.display = "block";
    aside.classList.remove("displaynone")
    aside.classList.remove("sideclose");
    aside.classList.add("sideopen");
    mainscreen.classList.remove("originalscreen");
    document.body.style.overflowY = "hidden";
    callback(true);
  }
};

export const ActionUpdate = (response, data, type, cb) => {
  if (type === "Update") {
    if (response.status === 200) {
      if (response.data.errors) {
        alert("error", response.data.errors[0].message);
      }
      else {
        alert("success", "Updated Successfully!!");
        const newObj = Object.assign(response.data.data);
        newObj.actiontype = "update"
        cb(newObj);
      }
    }
    else {
      alert("error", "Failed to fetch!");
    }
  }
  else if (type === "Delete") {
    if (response.status === 200) {
      if (response.data.errors) {
        alert("error", response.data.errors[0].message);

      }
      else {
        alert("success", "Deleted Successfully!!");
        const newObj = Object.assign({ selected: false }, data);
        newObj.actiontype = "delete"
        cb(newObj);
      }
    }
    else {
      alert("error", "Failed to fetch!");
    }
  }
  else if (type === "Add") {
    if (response.status === 200) {
      if (response.data && response.data.errors) {
        alert("error", response.data.errors[0].message);

      }
      else {
        alert("success", "Added Successfully!!");
        const newObj = Object.assign(response.data.data);
        cb(newObj);
      }
    }
    else {
      alert("error", "Failed to fetch!");
    }
  }
}

export const filterType = (data) => {
  let result = [];
  data.filter((e, i) => { return e.isgroup === true }).forEach((e) => {
    result.push(e.type)
  })
  return result;
}

