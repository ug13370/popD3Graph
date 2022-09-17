declare type svgDims = {
    height: number;
    width: number;
};
declare type margin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
declare type data = {
    key: string;
    val: {
        key: string;
        val: number;
        color: string;
    }[];
}[];
declare type xAxisTick = {
    fontSize: number;
    fontWeight: number;
    textColor: string;
};
declare type yAxisTick = {
    fontSize: number;
    fontWeight: number;
    textColor: string;
};
declare type xAxisLabel = {
    text: string;
    deltaX: number;
    deltaY: number;
    fontSize: number;
    fontWeight: number;
    textColor: string;
};
declare type yAxisLabel = {
    text: string;
    deltaX: number;
    deltaY: number;
    fontSize: number;
    fontWeight: number;
    textColor: string;
};
declare type tooltip = {
    text: string;
    color: string;
    backgroundColor: string;
};
declare const stackedBarChart: (selector: any, svgDims: svgDims, margin: margin, data: data, xAxisLabel: xAxisLabel, xAxisTick: xAxisTick, yAxisLabel: yAxisLabel, yAxisTick: yAxisTick, tooltip: tooltip) => void;
export { stackedBarChart };
