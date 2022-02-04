import React, { Fragment } from "react";
import "./Table.scss";
import { TableHeader } from "../../assets/constant";
import MaintennaceRow from "./TableRow/MaintennaceRow";
import SourceConfig from "./TableRow/SourceConfig";
import SourceMapConfig from "./TableRow/SourceMapConfig";
import SlackRow from "./TableRow/SlackRow";
import Pagination from "./Pagination";
import AdminRow from "./TableRow/AdminRow"
import DetailRow from "./TableRow/DetailRow"
import TestCase from "./TableRow/TestCase"
import PermissionsRow from "./TableRow/PermissionsRow"
import Loader from '../Loader'

const Table = props => {
  const header  = TableHeader[props.name];
  if(props.dataSource && props.dataSource.isLoading)
  return <Loader />
  return (
 
    <Fragment>
      <section className="tablescroll">
        <table className="maintable">
          <thead>
            <tr>
              {header &&
                header.map((item, index) => {
                  return <th key={`th-${index}`} id={item.replace(" ","-")}>{item}</th>;
                })}
            </tr>
          </thead>
          {
          props.name === "Maintenance" ? (
            <MaintennaceRow dataSource={props.dataSource} LoadRecord={(data)=>props.LoadRecord(data)}/>
          ) : props.name === "SourceConfig" ? (
            <SourceConfig dataSource={props.dataSource}  LoadRecord={(data)=>props.LoadRecord(data)}/>
          ) : props.name === "SourceMapConfig" ? (
            <SourceMapConfig dataSource={props.dataSource} LoadRecord={(data)=>props.LoadRecord(data)}/>
          ) : props.name === "SlackIntegration" ? (
            <SlackRow dataSource={props.dataSource} LoadRecord={(data)=>props.LoadRecord(data)}/>
          ) : props.name === "Admin" ? (
            <AdminRow  dataSource={props.dataSource}/>
          ) : props.name === "Permissions" ? (
            <PermissionsRow />
          ) : props.name === "SourceDetailed" ? (
            <DetailRow dataSource={props.dataSource}/>
          ):props.name === "TestCase" ? (
            <TestCase dataSource={props.dataSource} LoadRecord={(data)=>props.LoadRecord(data)}/>
          ):null }
        </table>
      </section>
     {props.name !== "SourceDetailed" && props.name !== "Permissions" && props.name !== "TestCase"?  <Pagination dataSource={props.dataSource} LoadRecord={(data)=>props.LoadRecord(data)} />:null}
    </Fragment>
  );
};

export default Table;
