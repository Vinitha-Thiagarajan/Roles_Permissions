import { useState, useLayoutEffect } from 'react';

export const NumberFormatUS = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const PercentageFormatUS = (number) => {
  return Number(number / 100).toLocaleString(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  });
};

export const objToArray = (objectLiteral) => {
  var objOne = Object.keys(objectLiteral);
  var objTwo = Object.values(objectLiteral);
  var result = [];
  for (var i = 0; i < objOne.length; i++) {
    result.push([objOne[i], objTwo[i]]);
  }
  return result;
};

export const arrSum = (arr) => {
  var sum = 0;

  arr.forEach(function (item) {
    if (item[1] && !isNaN(Number(item[1]))) {
      sum += Number(item[1]);
    }
  });

  return sum;
};


export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
       
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
