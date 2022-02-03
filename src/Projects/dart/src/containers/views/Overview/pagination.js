import React, { useState, useEffect } from "react";
import "./style.scss";
import Pagination from '@material-ui/lab/Pagination';

const PaginationC = props => {

  const { size, totalPages, totalElements, currentPage } = props.dataSource;

  const [selection, SetSelection] = useState(currentPage);
  const [rowcount, setRowCount] = useState(size === totalElements ? "all" : size);


  useEffect(() => {
    SetSelection(currentPage)
    setRowCount(size === totalElements ? "all" : size)
  }, [currentPage,size,totalElements])



  const onPageSelection = (e) => {
    let count = e.target.value;
    setRowCount(count)
    count = count !== "all" ? parseInt(count) : totalElements;
    props.LoadRecord({ size: count, page: 1 })

  }
  const handleChange = (event, value) => {
    SetSelection(value)
    props.LoadRecord({ size: rowcount, page: value })
  }
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalElements / size); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <div className="leftpaginiation">
        <span>Show</span>
        <label>
          <select value={rowcount} onChange={(e) => { onPageSelection(e) }}>
            <option value={"5"}>5</option>
            <option value={"10"}>10</option>
            <option value={"15"}>15</option>
            <option value={"25"}>25</option>
            <option value={"150"}>150</option>
            <option value={"200"}>200</option>
            <option value={"all"}>All</option>
          </select>
        </label>
        <span>entries</span>
      </div>
      <div className="rightpaginiation">
        <div className="page-navigation">
          <Pagination count={totalPages} variant="outlined" page={selection} onChange={(event, value) => { handleChange(event, value) }} />
        </div>
      </div>
    </div>
  );
};

export default PaginationC;
