import React, { useState, useEffect } from "react";
import "./Pagination.scss";
import { Images } from "../../../assets/images";

const Pagination = props => {

  const { size, totalPage, totalElements, page, pageBound, filterData } = props.dataSource;
  const { current,
    lowerbound,
    upperbound } = pageBound;
  const [selection, SetSelection] = useState(page);
  const [rowcount, setRowCount] = useState(size === totalElements ? "all" : size);
  const [pagecount, SetCount] = useState(current);
  const [upperbd, setUpper] = useState(upperbound);
  const [lowerbd, setLower] = useState(lowerbound);

  useEffect(() => {
    SetCount(current);
    setUpper(upperbound);
    setLower(lowerbound);
    SetSelection(page)
  }, [current,upperbound,lowerbound,page])

  const setPrevAndNextBtnClass = (listid,nav) => {
    props.LoadRecord({ size: size, page: listid, nav: nav})
  }

  const btnPrevClick = () => {
    if(selection > 1)
    {
      if ((selection - 1) % pagecount === 0) {
        let resultupper = (upperbd - pagecount)
        resultupper = resultupper > 0 ? resultupper : 0;
        let resultlower = (lowerbd - pagecount)
        resultlower = resultlower > 0 ? resultlower : 0;
        setUpper(resultupper);
        setLower(resultlower);

      }
      let listid = selection - 1;
      listid = listid > 0 ?listid :1;
      SetSelection(listid);
      setPrevAndNextBtnClass(listid,"Prev");
    }
  }
  const btnNextClick = () => {
    if(totalPage > selection){
      if ((selection) % pagecount === 0) {
        setUpper(upperbd + pagecount);
        setLower(lowerbd + pagecount);

      }
      let listid = selection + 1;
      SetSelection(listid);
      setPrevAndNextBtnClass(listid,"Next");
    }
  }

  const SelectPage = page => {
    SetSelection(page);
    props.LoadRecord({ size: size, page: page })
    setPrevAndNextBtnClass(page);
  };

  const onPageSelection = (e) => {
    let count = e.target.value;
    setRowCount(count)
    count = count !== "all" ? parseInt(count) : totalElements;
    props.LoadRecord({ size: count, page: selection })

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
          <select value={rowcount}  onChange={(e) => { onPageSelection(e) }}>
            <option value={"5"}>5</option>
            <option value={"15"}>15</option>
            <option value={"25"}>25</option>
            <option value={"150"}>150</option>
            <option value={"200"}>200</option>
            <option value={"all"}>All</option>
          </select>
        </label>
      <span>of {props.total? totalElements : filterData.length} entries</span>
      </div>
      <div className="rightpaginiation">
        <div
          className="prev"
          onClick={() => {
             btnPrevClick()
          }}
        >
          <img alt="" src={Images.prev} />
        </div>
        {pageNumbers &&
          pageNumbers.map((item, index) => {
            if (item === 1 && selection === 1) {
              return (
                <div
                  key={`pageno${index}`}
                  className={`pageno ${item === selection ? "selectedpageno" : ""}`}
                  onClick={() => {
                    SelectPage(item);
                  }}
                >
                  {item}
                </div>
              )
            }
            else if ((item < upperbd + 1) && item > lowerbd) {
              return (
                <div
                  key={`pageno${index}`}
                  className={`pageno ${item === selection ? "selectedpageno" : ""}`}
                  onClick={() => {
                    SelectPage(item);
                  }}
                >
                  {item}
                </div>
              )
            }
            return ''
          })}
        <div
          className="next"
          onClick={() => {
             btnNextClick()
          }}
        >
          <img alt="" src={Images.next} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
