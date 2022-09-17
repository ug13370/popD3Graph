const add = (arr: number[]) => {
  let sum = 0;
  arr.forEach((value, index) => {
    sum += value;
  });
  return sum;
};

export { add };
export * from "./simpleBarGraph";
export * from "./stackedBarGraph";
export * from "./groupedBarGraph";

//npm link ../popD3Graph
