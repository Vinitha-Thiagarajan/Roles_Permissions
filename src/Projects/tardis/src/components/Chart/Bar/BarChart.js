import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer
} from 'recharts';


class CustomizedAxisTick extends PureComponent {
    render() {
      const {
        x, y, payload,
      } = this.props;
      const checklength =(value)=>{
        if(value.length > 25)
        {
            return value.substring(0,23)+"..."
        }
        else{
            return value
        }
      }
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={3} textAnchor="end" fill="#666" fontSize="14px" transform="rotate(-70)">{checklength(payload.value)}</text>
        </g>
      );
    }
  }

const BarGraph = (props) => {
    
  
    return (
        <div style={{ width: '100%', height: 650 }}>
            <ResponsiveContainer >
                {props.general?<BarChart
                    ref={(ref) => props.setChart(ref)}
                    width={500}
                    height={700}
                    data={props.data}
                    margin={props.export? {
                        top: 5, right: 0, left: 0, bottom: 5,
                    }:{
                        top: 5, right: 20, left: 0, bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" type="category" width={300} height={props.lable ==="By Date"?100:200} interval={0} angle={-80} textAnchor="end"  tick={<CustomizedAxisTick />}  >
                        <Label value={props.lable ==="By Date"?"Date":"Sources"} offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis type="number" allowDecimals={false}/>
                    <Tooltip />
                    
                    <Bar dataKey="Delay" stackId="a"fill={props.colors.delay} />
                    <Bar dataKey="Failure" stackId="a"fill={props.colors.failure} />
                    <Bar dataKey="Success"  stackId="a" fill={props.colors.success} />
                    
                </BarChart>:<BarChart
                    ref={(ref) => props.setChart(ref)}
                    width={500}
                    height={700}
                    data={props.data}
                    margin={{
                        top: 5, right: 20, left: 0, bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" type="category" width={300} height={200} interval={0} angle={-80} textAnchor="end"  tick={<CustomizedAxisTick />}  >
                        <Label value="Sources" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis type="number" allowDecimals={false}/>
                    <Tooltip />
                    
                    <Bar dataKey="Luigi Server Issue" stackId="a"fill={props.colors.Luigi} />
                    <Bar dataKey="Presto Issue" stackId="a"fill={props.colors.Presto} />
                    <Bar dataKey="Vendor Issue" stackId="a"fill={props.colors.Vendor} />
                    <Bar dataKey="Technical Issue (Dev-Ops)" stackId="a"fill={props.colors.TechnicalDev} />
                    <Bar dataKey="Bug" stackId="a"fill={props.colors.Bug} />
                    <Bar dataKey="Unfulfilled Dependency" stackId="a"fill={props.colors.Unfulfilled} />
                    <Bar dataKey="Technical Issue (not Dev-Ops)" stackId="a"fill={props.colors.TechnicalNDev} />
                    <Bar dataKey="Other" stackId="a"fill={props.colors.Other} />
                    
                </BarChart>}
            </ResponsiveContainer>
        </div>
    );
    
}
export default BarGraph;