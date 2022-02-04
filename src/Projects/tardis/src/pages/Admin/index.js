import React, { useEffect } from "react";
import { Table, TitleContainer } from "../../components";
import FilterContainer from "./Components/FilterContainer";
import { Images } from "../../assets/images";
import "./Admin.scss";
import Layout from '../../Layout';
import { paginationFilter } from '../../utils'
import { connect, useSelector } from "react-redux";
import { AdminRecords, UpdateFilterPagination, GetGroup } from "../../../../../reducers/admin/actions"

const Admin = (props) => {
  const { UpdateFilterPagination, AdminRecords, GetGroup } = props;
  const admin = useSelector(state => state.admin);
  const { data } = admin;
  const LoadRecord = (filterdata) => {
    filterdata = { ...admin, ...filterdata }
    let result = paginationFilter(filterdata)
    UpdateFilterPagination(result)
  }
  useEffect(() => {
    GetGroup();
    AdminRecords();
  }, [])
  useEffect(() => {
    if (data.length > 0) {
      let result = paginationFilter(admin)
      UpdateFilterPagination(result)
    }
  }, [data])
  return (
    <Layout>
      <div className="AdminPage page">
        <TitleContainer
          name="Manage Permissions"
          img={Images.Admin}
        />
        <FilterContainer LoadRecord={(data) => { LoadRecord(data) }} />
        <Table name="Admin"  dataSource={admin} LoadRecord={(data) => { LoadRecord(data) }} />
      </div>
    </Layout>
  );
};

export default connect(
  null, { AdminRecords, UpdateFilterPagination, GetGroup }
)(Admin);

