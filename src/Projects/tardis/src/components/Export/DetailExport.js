import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import "./Export.scss"
import moment from 'moment'
const Pdf = ({ headers, data }) => {
    window.scrollTo(0, 0);
    return (
        <div className="Pdf-container" id="exportpdf">
            <table>
                <thead>
                    <tr >
                        {headers.map((header, i) => {
                            return (

                                <th key={i}>{header}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <Fragment>
                                <tr key={i}>
                                    <td>
                                        {item["source"]["source"]}
                                    </td>
                                    <td>
                                        {item["status"]["status"]}
                                    </td>
                                    <td>
                                        {moment(item.lastUpdatedTs).format("MM-DD-YYYY hh:mm:ss a")}
                                    </td>
                                    <td>
                                        {item["comments"]}
                                    </td>
                                </tr>
                                {item.row ?<tr>
                                    <td colSpan="4">
                                        <table>
                                            <tbody>
                                                {item.row && item.row.map((row, j) => {
                                                    return (
                                                        <Row data={row} key={j} />
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>:
                                <DetailRow {...item} />}
                            </Fragment>
                        )

                    })}

                </tbody>
            </table>
        </div>
    )
}

const Row = (props) => {
    let item = props.data;
    return (
        <Fragment>
            <tr>
                <td>
                    {item["source"]["source"]}
                </td>
                <td>
                    {item["status"]["status"]}
                </td>
                <td>
                    {moment(item.lastUpdatedTs).format("MM-DD-YYYY hh:mm:ss a")}
                </td>
                <td>
                    {item["comments"]}
                </td>
            </tr>
            {item.row ?<tr>
                <td colSpan="4">
                    <table>
                        <tbody>
                            {item.row && item.row.map((row, i) => {
                                return (
                                    <Row key={i} data={row} />
                                )
                            })}
                        </tbody>
                    </table>
                </td>
            </tr>:
            <DetailRow {...item} />}
        </Fragment>
    )
}

const DetailRow = (props) => {
    return (
        (props.historylist && props.historylist.length > 0) || (props.audit && props.audit.length > 0 )? <tr>
            <td colSpan="4">
            {props.historylist && props.historylist.length > 0 ?
                <table>
                    <tbody>
                        <td colSpan="4" className="title">
                                History
                        </td>
                        {props.historylist.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {item["source"]["source"]}
                                    </td>
                                    <td>
                                        {item["status"]["status"]}
                                    </td>
                                    <td>
                                        {moment(item.lastUpdatedTs).format("MM-DD-YYYY hh:mm:ss a")}
                                    </td>
                                    <td>
                                        {item["comments"]}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : null}
            {props.audit && props.audit.length > 0 ? <table>
                <tbody>
                    <td colSpan="5" className="title">
                        Audit
                    </td>
                    {props.audit.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.status}</td>
                                <td>{item.additionalInfo}</td>
                                <td>{item.numRecords}</td>
                                <td>{item.fileSizeMb}</td>
                                <td>{moment(item.logdate).format("MM-DD-YYYY hh:mm:ss a")}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> : null}
            </td>
        </tr>:null
    )
}


Pdf.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Pdf;