import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Main from './routes'

function App() {
  useEffect(() => {
    const themeColor = localStorage.getItem("customColor");
    if (themeColor != null) {
      const par = JSON.parse(themeColor);
      document.documentElement.style.setProperty('--background-color', par.backgroundColor);
      document.documentElement.style.setProperty('--fontstyle', par.fontSize);
      document.documentElement.style.setProperty('--fontFamily', par.fontFamily);
      document.documentElement.style.setProperty('--container-color', par.containerColor);
      document.documentElement.style.setProperty('--color', par.textColor)
    }
  }, []);
  return (
    <Main />
  );
}
export default App;

