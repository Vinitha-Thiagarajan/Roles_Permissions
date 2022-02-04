import React from "react";
import PropTypes from 'prop-types';
import "./Export.scss"

const Pdf = ({headers, data,children}) => {
    window.scrollTo(0, 0);
        return(
            <div className="Pdf-container" id="exportpdf">
                 {children}
                 <div className="graph-container">
                     <img id="graphimg" alt=""/>
                     <div class="loader" id="loader"></div>
                 </div>
                <table>
                    <thead>
                    <tr >
                        {headers.map((header,i)=>{
                            return(
                               
                                    <th key={i}>{header}</th>
                               )
                        })}
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item,i)=>{
                        return(
                        <tr key={i}>
                           {headers.map((header,j)=>{
                            return(
                                <td key={j}>
                                    {item[header]}
                                </td>)
                                 })}
                        </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
}


Pdf.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Pdf;