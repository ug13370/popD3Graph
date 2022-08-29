const add = (arr: number[]) => {
  let sum = 0;
  arr.forEach((value, index) => {
    sum += value;
  });
  return sum*2;
};

export { add };
export * from './simpleBarGraph';

//npm link ../popD3Graph
