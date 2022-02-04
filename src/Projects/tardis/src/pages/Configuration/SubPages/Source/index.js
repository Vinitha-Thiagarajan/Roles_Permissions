import React, { useEffect } from "react";
import "./Source.scss";
import FilterContainer from "./Components/FilterContainer";
import { Table, TitleContainer } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SourceRecords, UpdateFilterPagination } from "../../../../../../../reducers/configuration/actions"
import { paginationFilter } from '../../../../utils'
import Layout from '../../../../Layout';

const Source = ({ SourceRecords, UpdateFilterPagination }) => {
  const source = useSelector(state => state.source);
  const { data } = source;
  useEffect(() => {
    SourceRecords();
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      let result = paginationFilter(source)
      UpdateFilterPagination(result)
    }
  }, [data])

  const LoadRecord = (filterdata) => {
    filterdata = { ...source, ...filterdata }
    let result = paginationFilter(filterdata)
    UpdateFilterPagination(result)
  }

  let history = useHistory();
  const onBackHandler = () => {
    history.push("/tardis/Configurations");
  };

  return (
    <Layout>
      <div className="Sourcepage page">
        <TitleContainer
          name="Source Configuration"
          img={Images.Settings}
          onBack={() => {
            onBackHandler();
          }}
        />
        <FilterContainer LoadRecord={(e) => LoadRecord(e)} />
        <Table name="SourceConfig" dataSource={source} LoadRecord={(e) => LoadRecord(e)} />
      </div>
    </Layout>
  );
};


export default connect(
  null, { SourceRecords, UpdateFilterPagination }
)(Source);
