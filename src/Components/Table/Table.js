import { Fragment } from 'react';
import TableElement from './TableElement';
import React from "react";
import './Table.css';
import {Dummy_Name} from "../../utils/mockdata"

const Table = (props) => {
    const nameList = Dummy_Name.map((data) => (
        <TableElement
            key={data.id}
            id={data.id}
            name={data.name}
            project={props.name}
            index={props.index}
        />
    ));

    return (
        <Fragment>
            <div className="app-container">
                <table className='myTable myTable-horizontal'>
                    <thead>
                        <tr>
                            <th>Group/User </th>
                            <th>Roles</th>
                            <th style={{textAlign:"center"}}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {nameList}
                </table>
            </div>
        </Fragment>
    );
};

export default Table;