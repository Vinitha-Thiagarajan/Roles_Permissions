import React, { useEffect } from "react";
import "./Slack.scss";
import FilterContainer from "./Components/FilterContainer";
import { Table, TitleContainer } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SlackRecords, UpdateFilterPagination, FilterSlackRecords } from "../../../../../../../reducers/slack/actions"
import { paginationFilter } from '../../../../utils'
import Layout from '../../../../Layout';

const Slack = ({ SlackRecords, UpdateFilterPagination, FilterSlackRecords }) => {
  const slack = useSelector(state => state.slack);
  const { data } = slack;
  let history = useHistory();
  const onBackHandler = () => {
    history.push("/tardis/Configurations");
  };

  useEffect(() => {
    FilterSlackRecords();
    SlackRecords();
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      let result = paginationFilter(slack)
      UpdateFilterPagination(result)
    }
  }, [data])

  const LoadRecord = (filterdata) => {
    filterdata = { ...slack, ...filterdata }
    let result = paginationFilter(filterdata)
    UpdateFilterPagination(result)
  }
  return (
    <Layout>
      <div className="Slackpage page">
        <TitleContainer
          name="Slack Integration"
          img={Images.slack}
          onBack={() => {
            onBackHandler();
          }}
        />
        <FilterContainer LoadRecord={(data) => { LoadRecord(data) }} />
        <Table name="SlackIntegration" dataSource={slack} LoadRecord={(data) => { LoadRecord(data) }} />
      </div>
    </Layout>
  );
};

export default connect(
  null, { SlackRecords, UpdateFilterPagination, FilterSlackRecords }
)(Slack);