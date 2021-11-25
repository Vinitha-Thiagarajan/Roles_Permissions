import {Fragment} from 'react';
import TableElement from './TableElement';
import React from "react";

import './Table.css';
const Dummy_Name= [{
    id:1,
    name: 'All Users'
},
{   id:2,
    name: 'Group'
},
{   id:3,
    name: 'Evie'
},
{   id:4,
    name: 'Lari'
},
{   id:5,
    name: 'Maris'
},
];

const Table = (props) => {
    const nameList = Dummy_Name.map((data) => (
      <TableElement
        key={data.id}
        id={data.id}
        name={data.name}
        index={props.index}
      />
    ));
  
    return (
        <Fragment>
            <div className = "app-container">
            <table className = 'myTable myTable-horizontal'>
            <thead>
            <tr>
                <th>Group/User </th>
                <th>project name</th>
                <th>Roles</th>
                <th>View</th>
                <th>Edit</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Filter</th>
                
                
            </tr>
            </thead>
            {nameList}
          
          </table>
          
            </div>
        </Fragment>
    );
  };
  
  export default Table;