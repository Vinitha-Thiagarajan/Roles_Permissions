import { useRef, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { select, scaleLinear, axisLeft } from 'd3';
import { heightAtom, marginAtom } from './chartStates';

export const YAxis = ({ yDomain, tickCount }) => {
  const height = useRecoilValue(heightAtom);
  const { left, top, bottom } = useRecoilValue(marginAtom);
  const yAxisRef = useRef(null);

  useLayoutEffect(() => {
    const y = scaleLinear()
      .domain(yDomain)
      .range([height - (bottom+20) , top]);
    const axis = axisLeft;
    const yAxis = axis(y).ticks(tickCount).tickSizeOuter(0);

    select(yAxisRef.current).call(yAxis)
    .call(g => g.select(".domain").remove()).call(g =>g.selectAll(".tick line")
    .each(function (d, i) {
          this.remove();
    })).call(g =>g.selectAll(".tick text").attr("style","color:#9D9D9D;font-size:11px"));
  }, [bottom, height, tickCount, top, yDomain]);

  return <g transform={`translate(${left}, 0)`} ref={yAxisRef} />;
};
