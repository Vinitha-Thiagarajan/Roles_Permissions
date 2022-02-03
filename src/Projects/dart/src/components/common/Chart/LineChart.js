import { useRef, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { interpolate, line, select, easeLinear, scaleLinear } from 'd3';
import { widthAtom, heightAtom, marginAtom } from './chartStates';

export const LineChart = ({ data, xDomain, yDomain }) => {
  const width = useRecoilValue(widthAtom);
  const height = useRecoilValue(heightAtom);
  const { left, right, top, bottom } = useRecoilValue(marginAtom);
  const containerRef = useRef(null);
  const colorcode = ["#C2ADFB", "#E8E0FE" ,"#f4f1fd"]

  useLayoutEffect(() => {
    select(containerRef.current).selectAll('*').remove();

    const x = scaleLinear()
      .domain(xDomain)
      .range([left+20, width - right]);
    const y = scaleLinear()
      .domain(yDomain)
      .range([height - (bottom + 20), top]);

    const lineFn = line()
      .x((_, i) => x(i))
      .y((d) => y(d));

    const reveal = (path) =>
      path
        .transition()
        .duration(400)
        .ease(easeLinear)
        .style("stroke-dasharray", ("3, 3"))
        .attrTween('stroke-dasharray', function () {
          const length = this.getTotalLength();
          return interpolate(`0, ${length}`, `${length}, ${length}`);
        });

    data.forEach(([_, ...values], index) => {
      select(containerRef.current)
        .append('path')
        .datum(values)
        .attr('fill', 'none')
        .attr('stroke', () => colorcode[index])
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineFn)
        .call(reveal);
    });
  }, [bottom, data, height, left, right, top, width, xDomain, yDomain, colorcode]);

  return <g ref={containerRef} />;
};
