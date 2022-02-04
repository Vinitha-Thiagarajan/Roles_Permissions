import React, { useEffect } from "react";
import "./SourceMap.scss";
import FilterContainer from "./Components/FilterContainer";
import { Table, TitleContainer } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SourceMapRecords, UpdateFilterPagination, FilterMapRecords } from "../../../../../../../reducers/mapsource/actions"
import { paginationFilter } from '../../../../utils'
import Layout from '../../../../Layout';

const SourceMap = ({ SourceMapRecords, UpdateFilterPagination,FilterMapRecords }) => {
  let history = useHistory();
  const map = useSelector(state => state.map);
  const { data } = map;

  useEffect(() => {
    FilterMapRecords();
    SourceMapRecords();
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      let result = paginationFilter(map)
      UpdateFilterPagination(result)
    }
  }, [data])

  const onBackHandler = () => {
    history.push("/tardis/Configurations");
  };

  const LoadRecord = (filterdata) => {
    filterdata = { ...map, ...filterdata }
    let result = paginationFilter(filterdata)
    UpdateFilterPagination(result)
  }

  return (
    <Layout>
      <div className="SourceMappage page">
        <TitleContainer
          name="Source Map Configuration"
          img={Images.map}
          onBack={() => {
            onBackHandler();
          }}
        />
        <FilterContainer LoadRecord={(e) => LoadRecord(e)} />
        <Table name="SourceMapConfig" dataSource={map} LoadRecord={(e) => LoadRecord(e)} />
      </div>
    </Layout>
  );
};

export default connect(
  null, { SourceMapRecords, UpdateFilterPagination ,FilterMapRecords}
)(SourceMap);

