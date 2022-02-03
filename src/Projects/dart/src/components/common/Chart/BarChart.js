import { useRef, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { select, scaleBand, scaleLinear, range } from 'd3';
import { widthAtom, heightAtom, marginAtom } from './chartStates';

export const BarChart = ({ data, xDomain, yDomain }) => {
  const width = useRecoilValue(widthAtom);
  const height = useRecoilValue(heightAtom);
  const { left, right, top, bottom } = useRecoilValue(marginAtom);
  const containerRef = useRef(null);
  const colorcode = ["#C2ADFB", "#E8E0FE" ,"#f4f1fd"]
  useLayoutEffect(() => {
    select(containerRef.current).selectAll('*').remove();

    const x = scaleBand()
      .domain(range(xDomain[1]))
      .range([left + 20, width - right]);
    const y = scaleLinear()
      .domain(yDomain)
      .range([height - (bottom + 20), top]);
    const barWidth = x.bandwidth() / (data.length + 1);

    data.forEach(([name, ...values], index) => {
      select(containerRef.current)
        .append('g')
        .selectAll('rect')
        .data(values)
        .join('rect')
        .attr('fill', colorcode[index])
        .attr('x', (_, i) => x(i) + barWidth * index)
        .attr('y', () => y(0))
        .attr('width', barWidth)
        .attr('height', 0);
    });

    data.forEach((_, index) => {
      select(containerRef.current)
        .selectAll('rect')
        .transition()
        .duration(400)
        .attr('y', (d) => y(d))
        .attr('height', (d) => (y(0) - y(d)) < 0 ? 0 : (y(0) - y(d)))
        .delay((_, i) => i * 400 * (index + 1));
    });
  }, [bottom, data, height, left, right, top, width, xDomain, yDomain, colorcode]);

  return <g ref={containerRef} />;
};
