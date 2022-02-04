import React, { useEffect,useState } from "react";
import "./TestConfiguration.scss";
import FilterContainer from "./Components/FilterContainer.js";
import { Table, TitleContainer } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SourceRecords } from "../../../../../../../reducers/configuration/actions"
import Layout from '../../../../Layout';

const TestCase = ({ SourceRecords }) => {
  const [data, setData] =useState([])
  const [update, setUpdate] =useState(false)

  let history = useHistory();
  const onBackHandler = () => {
   history.push("/tardis/Configurations");
  };
  useEffect(() => {
    SourceRecords();
  }, [])


  const LoadRecord = (e) => {
    setData(e);
    setUpdate(!update);
  }

 
  return (
    <Layout>
      <div className="Testcase page">
        <TitleContainer
          name="Test Case Configuration"
          img={Images.Settings}
          onBack={() => {
            onBackHandler();
          }}
        />
        <FilterContainer LoadRecord={(e) => LoadRecord(e)} data={data} />
        <Table name="TestCase" dataSource={{data:data}} LoadRecord={(e) => LoadRecord(e)} />
      </div>
    </Layout>
  );
};

export default connect(
  null, { SourceRecords }
)(TestCase);
