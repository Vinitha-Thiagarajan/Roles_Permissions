import { useRef, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { select, scaleLinear, axisBottom, scaleBand, range } from 'd3';
import { widthAtom, heightAtom, marginAtom } from './chartStates';

export const XAxis = ({ xDomain, tickCount, data, datelist }) => {
  const width = useRecoilValue(widthAtom);
  const height = useRecoilValue(heightAtom);
  const { left, right, bottom } = useRecoilValue(marginAtom);
  const xAxisRef = useRef(null);
  const xs = scaleBand()
    .domain(range(xDomain[1]))
    .range([left + 20, width - right]);
  const barWidth = (xs.bandwidth() / (data.length + 1)) * data.length;

  useLayoutEffect(() => {
    var weekdays = datelist;
    var formatDay = function (d) {
      return weekdays[d % 6];
    }

    const x = scaleLinear()
      .domain(xDomain)
      .range([left + 20, width - right]);
    const axis = axisBottom;
    const xAxis = axis(x).tickFormat(formatDay).ticks(tickCount).tickSizeOuter(0);

    select(xAxisRef.current).call(xAxis)
      .call(g => g.select(".domain").remove()).call(g => g.selectAll(".tick line")
        .each(function (d, i) {
          this.remove();
        })).call(g => g.selectAll(".tick")
          .each(function (d, i) {
            if (i == (tickCount))
              this.remove();
          })).call(g => g.selectAll(".tick text").attr("style", "color:#9D9D9D;font-size:11px"));
  }, [left, right, tickCount, width, xDomain]);

  return <g transform={`translate(${barWidth / 2}, ${height - bottom})`} ref={xAxisRef} />;
};
