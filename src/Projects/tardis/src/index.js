import React, { useEffect } from "react";
import "./index.scss";
import Main from "./pages";

function App() {
  useEffect(() => {
    const themeColor = localStorage.getItem("customColor");
    if (themeColor != null) {
      const par = JSON.parse(themeColor);
      document.documentElement.style.setProperty('--background-color', par.backgroundColor);
      document.documentElement.style.setProperty('--fontstyle', par.fontSize);
      document.documentElement.style.setProperty('--fontFamily', par.fontFamily);
      document.documentElement.style.setProperty('--container-color', par.containerColor);
      document.documentElement.style.setProperty('--color', par.textColor);
      // document.documentElement.style.setProperty('--fontstyleHead', par.headerValue);
    }
  }, []);
  return (
    <Main />
  );
}

export default App;
