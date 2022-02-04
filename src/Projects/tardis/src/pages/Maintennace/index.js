import React ,{ useEffect }from "react";
import { Table, TitleContainer } from "../../components";
import FilterContainer from "./Components/FilterContainer"
import { Images } from "../../assets/images";
import "./Maintennace.scss"
import { connect, useSelector } from "react-redux";
import { MaintennaceRecords, UpdateFilterPagination, FilterMaintennaceRecords } from "../../../../../reducers/maintennace/actions"
import { paginationFilter } from '../../utils'
import Layout from '../../Layout';
const Maintennace = ({MaintennaceRecords, UpdateFilterPagination,FilterMaintennaceRecords}) => {
  const maintennace = useSelector(state => state.maintennace);
  const { data } = maintennace;

  useEffect(() => {
    FilterMaintennaceRecords();
    MaintennaceRecords();
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      let result = paginationFilter(maintennace)
      UpdateFilterPagination(result)
    }
  }, [data])


  const LoadRecord = (filterdata) => {
    filterdata = { ...maintennace, ...filterdata }
    let result = paginationFilter(filterdata)
    UpdateFilterPagination(result)
  }
  return (
    <Layout>
      <div className="MaintenancePage page" >
        <TitleContainer
          name="Maintenance"
          img={Images.Maintennace}
        />
        <FilterContainer LoadRecord={(data) => {LoadRecord(data)}}/>
        <Table name="Maintenance" dataSource={maintennace} LoadRecord={(data) => {LoadRecord(data)}}/>
      </div>
    </Layout>
  );
};

export default connect(
  null, { MaintennaceRecords, UpdateFilterPagination,FilterMaintennaceRecords }
)(Maintennace);
