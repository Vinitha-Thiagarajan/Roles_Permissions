import React from "react";
import { Images } from "../../assets/images";
import { useHistory } from "react-router-dom";
import { TitleContainer, FolderWrapper } from "../../components";
import "./Chart.scss";
import { useSelector } from "react-redux";
import Layout from '../../Layout';
const Chart = () => {
  let history = useHistory();
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  const onPagenavigation = page => { 
    if (page === "General" && (permission.view && permission.view.indexOf("maintenancereason")>-1)) {
      history.push("/tardis/trend-chart-general");
    }
    else if (page === "Failure" && (permission.view && permission.view.indexOf("maintenancereason")>-1)) {
      history.push("/tardis/trend-chart-overall");
    }
    else if (page === "Statistics" && (permission.view && permission.view.indexOf("maintenancereason")>-1)) {
      history.push("/tardis/trend-chart-failure");
    }
  };
  return (
    <Layout>
      <div className="Chart-page page">
        <TitleContainer
          name="Chart"
          img={Images.Chart}
          onSearch={(text) => {

          }}
        />
        <div className="quickaccess">
          <div className="titlequick">
            <span>Quick Access</span>
          </div>
          <div className={`folder-wrapper`}>
            <FolderWrapper
              titlename="Status Trends"
              subname="Trends"
              selection={permission.view ? permission.view.indexOf("maintenancereason")>-1:true}
              img={Images.trendUp}
              OnClick={() => {
                onPagenavigation("General");
              }}
            />
            <FolderWrapper
              titlename="Failure Reasons"
              subname="Trends"
              selection={permission.view ? permission.view.indexOf("maintenancereason")>-1:true}
              img={Images.trendDown}
              OnClick={() => {
                onPagenavigation("Failure");
              }}
            />
            <FolderWrapper
              titlename="Failure Trends"
              subname="Trends"
              selection={permission.view ? permission.view.indexOf("maintenancereason")>-1:true}
              img={Images.Statistics}
              OnClick={() => {
                onPagenavigation("Statistics");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chart;
