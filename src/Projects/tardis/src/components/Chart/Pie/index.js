import React, { useEffect, useRef, Fragment } from "react";
import * as d3 from "d3";
import Legend from "../Legend/index.js";

const Pie = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(props.color);
  const format = d3.format(".0f");


  useEffect(
    () => {
      const data = createPie(props.data);
      const prevData = createPie(cache.current);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      const arcTween = (d, i) => {
        const interpolator = d3.interpolate(prevData[i], d);

        return t => createArc(interpolator(t));
      };
      if (props.stroke) {

        path
          .attr("class", "arc")
          .attr("fill", (d, i) => colors(i))
          .transition()
          .attr('stroke', '#fff')
          .attr('stroke-width', props.stokeWidth?props.stokeWidth:'3')
          .attrTween("d", arcTween);
      }
      else {
        path
          .attr("class", "arc")
          .attr("fill", (d, i) => colors(i))
          .transition()
          .attrTween("d", arcTween);
      }

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));
      if (props.innerRadius === 0) {
        text
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .style("fill", "white")
          .style("font-size", 12)
          .transition()
          .attr("transform", d => `translate(${createArc.centroid(d)})`)
          .tween("text", (d, i, nodes) => {
            const interpolator = d3.interpolate(prevData[i], d);

            return t => d3.select(nodes[i]).text(format(interpolator(t).value) + "%");
          });
      }
      else {
        group.append("text")
          .attr("text-anchor", "middle")
          .attr('font-size', '30')
          .attr('color', '#172b4d')
          .attr('font-family', 'Roboto-Regular')
          .attr('y', 5)
          .text("Failure");
        group.append("text")
          .attr("text-anchor", "middle")
          .attr('font-size', '14')
          .attr('font-family', 'Roboto-Regular')
          .attr('y', 25)
          .attr('color', '#172b4d')
          .text("Reasons");
        

      }
      groupWithUpdate.on("mouseover", (d) => {
        d3.select("#donuttooltip")
          .style("left", d3.event.layerX + "px")
          .style("top", d3.event.layerY + "px")
          .style("opacity", 1)
          .select("#value")
          .text(d.data.label);
      })
        .on("mouseout", function () {
          d3.select("#donuttooltip")
            .style("opacity", 0);;
        });
      cache.current = props.data;
    },
    [props.data]
  );

  return (
    <Fragment>
      <svg width={props.width} height={props.height}>
        <g
          ref={ref}
          transform={`translate(${props.outerRadius} ${props.outerRadius})`}
        />
      </svg>
      {props.legend ? <Legend {...props} /> : null}
    </Fragment>
  );
};

export default Pie;