// import React, { useEffect } from "react";
// import { useRecoilState } from 'recoil';
// import { widthAtom, heightAtom, marginAtom } from './chartStates';
// import { XAxis } from './XAxis';
// import { YAxis } from './YAxis';
// import { LineChart } from './LineChart';
// import { BarChart } from './BarChart';

// const Chart = ({ width, height, margin, data,datelist }) => {
//   const [, setWidth] = useRecoilState(widthAtom);
//   const [, setHeight] = useRecoilState(heightAtom);
//   const [, setMargin] = useRecoilState(marginAtom);

//   useEffect(() => {
//     setWidth(width);
//     setHeight(height);
//     if (margin) {
//       setMargin(margin);
//     }
//   }, [width, height, margin, setWidth, setHeight, setMargin]);

//   const keys = [];
//   let yMax = 0;
//   const longestColumn = data.columns.reduce((length, column) => {
//     keys.push(column[0]);
//     yMax = Math.max(yMax, Math.max(...column.slice(1)));
//     return Math.max(length, column.length);
//   }, 0);
//   const tickCount = Math.max(
//     data.type === 'bar' ? longestColumn - 1 : longestColumn - 2,
//     0
//   );
//   const xDomain = [0, tickCount];
//   const yDomain = [0, yMax];

//   return (
//     <svg width={width} height={height} viewBox={`-50, 0, ${width}, ${height}`}>
//         <BarChart data={data.columns} xDomain={xDomain} yDomain={yDomain} />
//         {/* <LineChart data={data.columns} xDomain={xDomain} yDomain={yDomain} /> */}
//         <XAxis  data={data.columns} margin={margin} xDomain={xDomain} tickCount={tickCount} datelist={datelist} />
//         <YAxis margin={margin} yDomain={yDomain} tickCount={5} />
//     </svg>
//   );
// };

// export default Chart;
import React, { useEffect } from 'react';
import Chart from "react-apexcharts";


const ChartGraph = ({ data, datelist, width }) => {
  const colorcode = ['#6b7bc7', "#f17f21" ,"#78be87"]
  const yaxismap = () => {
    let arraxis = [];
    for (let x in data) {
      if (x == 0) {
        arraxis.push({
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: colorcode[x]
          },
          labels: {
            style: {
              colors: colorcode[x]
            }
          },
          title: {
            text: data[x].name,
            style: {
              color: colorcode[x]
            }
          }
        });
      }
      else {
        arraxis.push({
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: colorcode[x]
          },
          labels: {
            style: {
              colors:colorcode[x]
            }
          },
          title: {
            text: data[x].name,
            style: {
              color:colorcode[x]
            }
          }
        })
      }
    }
    return arraxis;
  }
  var options = {
    chart: {
      height: 350,
      type: "bar"
    },
    dataLabels: {
      enabled: false
    },
    colors: colorcode,
    stroke: {
      width: 1,
    },
    plotOptions: {
      bar: {

      }
    },
    xaxis: {
      categories: datelist,
    },
    yaxis: yaxismap(),
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      horizontalAlign: "center",
      offsetX: 40
    }
  };
  //  {
  //   chart: {
  //     type: 'bar',
  //     height: 350,
  //     stacked: true,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //     },
  //   },
  //   stroke: {
  //     width: 1,
  //     colors: ['#fff']
  //   },
  //   xaxis: {
  //     categories: datelist,
  //     labels: {
  //       formatter: function (val) {
  //         return val 
  //       }
  //     }
  //   },
  //   yaxis: {
  //     title: {
  //       text: undefined
  //     },
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val 
  //       }
  //     }
  //   },
  //   fill: {
  //     opacity: 1
  //   },
  //   legend: {
  //     position: 'bottom',
  //     horizontalAlign: 'center',
  //     offsetX: 40
  //   }
  // };


  useEffect(() => {

  }, [])


  return (
    <Chart
      options={options}
      series={data}
      type="bar"
      width={width}
    />
  )
}
export default ChartGraph;
