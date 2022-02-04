export const menulist = [
  {
    name: "Dashboard",
    image: require("../../assets/images/Dashboard.svg"),
    selection: true,
    notify: false,
    path: "/tardis/dashboard"
  },
  {
    name: "Admin",
    image: require("../../assets/images/Admin.svg"),
    selection: false,
    notify: false,
    path: "/tardis/admin"
  },
  {
    name: "Maintenance",
    image: require("../../assets/images/Maintennace.svg"),
    selection: false,
    notify: false,
    path: "/tardis/maintenance"
  },
  {
    name: "Configurations",
    image: require("../../assets/images/Settings.svg"),
    selection: false,
    notify: false,
    path: "/tardis/configurations"
  },
  {
    name: "Trend Chart",
    image: require("../../assets/images/Chart.svg"),
    selection: false,
    notify: false,
    path: "/tardis/trend-chart"
  },
  // {
  //   name: "Support Link",
  //   image: require("../../assets/images/Support.svg"),
  //   selection: false,
  //   notify: false,
  //   path: "/support-link"
  // }
];

export const TableHeader = {
  Maintenance: [
    "",
    "VARIOUS SOURCES",
    "LOG DATE",
    "STATUS",
    "FAILURE REASONS",
    "COMMENTS",
    ""
  ],
  SourceConfig: [
    "",
    "SOURCES",
    "DESCRIPTION",
    "ALIAS",
    "TYPE",
    "ISACTIVE",
    "NUM_PREV_DAYS",
    "DASH_TRIGGER_ID",
    "AVAILABLITY_SCHEDULE",
    ""
  ],
  SourceMapConfig: ["", "SOURCES", "CHILD SOURCES", "ISOPTIONAL", ""],
  SlackIntegration: ["", "SOURCES", "ALERT LEVEL", "ISACTIVE" ,"SLACK CHANNEL", ""],
  Admin: ["", "EMAIL", "GROUP NAME",  "STATUS", ""],
  SourceDetailed: ["", "GROUP NAME", "SOURCEDATE", "TIMESTAMP", "COMMENTS", "STATICTICS"],
  Permissions: ["","PERMISSION GROUPS",""]
};

export const SearchBar = [
  "Maintenance",
  "Configurations",
  "Source Configuration",
  "Source Map Configuration",
  "Slack Integration",
  "Manage Permissions",
  "File Manager",
  "Chart"
];

export const array = [
  {
    startangle: 0.85 * Math.PI,
    endangle: 0.995 * Math.PI,
    color: "#ffffff"
  },
  {
    startangle: 0.995 * Math.PI,
    endangle: 1.0125 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.0125 * Math.PI,
    endangle: 1.1575 * Math.PI,
    color: "#ffffff"
  },
  {
    startangle: 1.1575 * Math.PI,
    endangle: 1.175 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.175 * Math.PI,
    endangle: 1.32 * Math.PI,
    color: "#4a97ff"
  },
  {
    startangle: 1.32 * Math.PI,
    endangle: 1.3375 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.3375 * Math.PI,
    endangle: 1.4825 * Math.PI,
    color: "#4a97ff"
  },
  {
    startangle: 1.4825 * Math.PI,
    endangle: 1.5 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.5 * Math.PI,
    endangle: 1.645 * Math.PI,
    color: "#4a97ff"
  },
  {
    startangle: 1.645 * Math.PI,
    endangle: 1.6625 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.6625 * Math.PI,
    endangle: 1.8093 * Math.PI,
    color: "#4a97ff"
  },
  {
    startangle: 1.8093 * Math.PI,
    endangle: 1.825 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.825 * Math.PI,
    endangle: 1.97 * Math.PI,
    color: "#4a97ff"
  },
  {
    startangle: 1.97 * Math.PI,
    endangle: 1.9875 * Math.PI,
    color: "#3976EB"
  },
  {
    startangle: 1.9875 * Math.PI,
    endangle: 0.1475 * Math.PI,
    color: "#4a97ff"
  },
  {
    startangle: 1.1475 * Math.PI,
    endangle: 0.165 * Math.PI,
    color: "#3976EB"
  }
];


export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s",
    width: "500px",
    borderWidth: "5px 0px 0px 0px",
    borderTopStyle: "solid",
    borderTopColor: "#3976eb",
    borderRadius: "0px",
    padding: "40px",
    overflow: "initial"
  },
  overlay: {
    backgroundColor: "rgb(21 21 21 / 75%)",
    zIndex: 101000,
    overflowY: "auto"
  }
};

export const customExportStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s",
    width: "800px",
    borderWidth: "5px 0px 0px 0px",
    borderTopStyle: "solid",
    borderTopColor: "#3976eb",
    borderRadius: "0px",
    padding: "40px",
    overflow: "auto",
    height: "90%",
    marginTop: "10px",
    marginBottom:"50px"
  },
  overlay: {
    backgroundColor: "rgb(21 21 21 / 75%)",
    zIndex: 101000,
    overflowY: "hidden"
  }
};

export const apiUrl = process.env.REACT_APP_API_URL;

export const apiDVUrl = process.env.REACT_APP_DV_API_URL;

export const sourcetype = ["Process", "Data", "Datasource", "Group", "Datasource Group", "Dashboard"];