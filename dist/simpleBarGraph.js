"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barChart = void 0;
const d3 = require("d3");
const d3_tip_1 = require("d3-tip");
const responsivefy = function (svg) {
    const container = d3.select(svg.node().parentNode), width = parseInt(svg.style("width"), 10), height = parseInt(svg.style("height"), 10), aspect = width / height;
    svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);
    d3.select(window).on("resize." + container.attr("id"), resize);
    function resize() {
        const w = parseInt(container.style("width"));
        svg.attr("width", w);
        svg.attr("height", Math.round(w / aspect));
    }
};
const createSvg = function (selector, tip, svgDims, margin) {
    let svg = d3
        .select(selector.nativeElement)
        .append("svg")
        .attr("class", "svg")
        .attr("width", svgDims.width)
        .attr("height", svgDims.height)
        .call(responsivefy);
    return svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(tip);
};
const createTooltip = function (tooltip) {
    const tip = (0, d3_tip_1.default)()
        .attr("class", "d3-tip")
        .style("z-index", "999999999")
        .direction("e")
        .html((d) => {
        let key = d.key;
        let val = d.val;
        return eval("`" + tooltip.text + "`");
    })
        .style("padding", "1%")
        .style("border-radius", "9px")
        .style("background-color", tooltip.backgroundColor)
        .style("color", tooltip.color);
    return tip;
};
const createTooltipFollower = function (svg) {
    svg.append("circle").attr("id", "tip-follower");
};
const createXAxis = function (svg, contentDims, groups, xAxisTick) {
    let xAxis = d3
        .scaleBand()
        .domain(groups)
        .range([0, contentDims.width])
        .paddingInner([0.7])
        .paddingOuter([0.3]);
    svg
        .append("g")
        .attr("transform", `translate(0,${contentDims.height})`)
        .call(d3.axisBottom(xAxis).tickSizeOuter(0))
        .call((g) => {
        g.selectAll(".tick text")
            .style("font-size", xAxisTick.fontSize)
            .style("fill", xAxisTick.textColor);
    });
    // .call((g) => {
    //   g.selectAll(".tick").selectAll("line").style("opacity", 0);
    // });
    return xAxis;
};
const createYAxis = function (svg, contentDims, data, yAxisTick) {
    const findMaxY = () => {
        let ans = 0;
        data.forEach((obj) => {
            ans = Math.max(ans, obj.val);
        });
        return ans;
    };
    let yAxis = d3
        .scaleLinear()
        .domain([0, findMaxY()])
        .range([contentDims.height, 0]);
    svg
        .append("g")
        .call(d3.axisLeft(yAxis).tickSizeOuter(0))
        .call((g) => {
        g.selectAll(".tick text")
            .style("font-size", yAxisTick.fontSize)
            .style("fill", yAxisTick.textColor);
    });
    // .call((g) => {
    //   g.selectAll(".tick").selectAll("line").style("opacity", 0);
    // });
    return yAxis;
};
const createXAxisLabel = function (svg, contentDims, margin, xAxisLabel) {
    svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", contentDims.width / 2 + xAxisLabel.deltaX)
        .attr("y", contentDims.height + margin.top + xAxisLabel.deltaY)
        .style("font-size", xAxisLabel.fontSize)
        .style("font-weight", xAxisLabel.fontWeight)
        .style("fill", xAxisLabel.textColor)
        .text(xAxisLabel.text);
};
const createYAxisLabel = function (svg, margin, yAxisLabel) {
    console.log(yAxisLabel);
    svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -margin.left + yAxisLabel.deltaY)
        .attr("y", -margin.top + yAxisLabel.deltaX)
        .style("font-size", yAxisLabel.fontSize)
        .style("font-weight", yAxisLabel.fontWeight)
        .style("fill", yAxisLabel.textColor)
        .text(yAxisLabel.text);
};
const createBars = function (svg, contentDims, data, xAxis, yAxis, tip) {
    svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xAxis(d.key))
        .attr("width", xAxis.bandwidth())
        .attr("y", (d) => yAxis(0))
        .attr("fill", (d) => d.color)
        .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 0.7);
    })
        .on("mousemove", function (event, d) {
        let target = d3
            .select("#tip-follower")
            .attr("cx", d3.pointer(event)[0] + 25)
            .attr("cy", d3.pointer(event)[1])
            .node();
        tip.show(d, target);
    })
        .on("mouseleave", function (event, d) {
        d3.select(this).style("opacity", 1);
        let target = d3.select("#tip-follower").node();
        tip.hide(d, target);
    })
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", (d) => yAxis(d.val))
        .attr("height", (d) => contentDims.height - yAxis(d.val));
};
const createBarChart = function (svg, svgDims, contentDims, margin, data, tip, xAxisLabel, xAxisTick, yAxisLabel, yAxisTick) {
    let groups = [];
    data.forEach((elem) => {
        groups.push(elem.key);
    });
    let xAxis = createXAxis(svg, contentDims, groups, xAxisTick);
    let yAxis = createYAxis(svg, contentDims, data, yAxisTick);
    createXAxisLabel(svg, contentDims, margin, xAxisLabel);
    createYAxisLabel(svg, margin, yAxisLabel);
    createBars(svg, contentDims, data, xAxis, yAxis, tip);
};
const barChart = (selector, svgDims, margin, data, xAxisLabel, xAxisTick, yAxisLabel, yAxisTick, tooltip) => {
    let contentDims = {
        height: svgDims.height - margin.top - margin.bottom,
        width: svgDims.width - margin.right - margin.left,
    };
    let tip = createTooltip(tooltip);
    let svg = createSvg(selector, tip, svgDims, margin);
    createTooltipFollower(svg);
    createBarChart(svg, svgDims, contentDims, margin, data, tip, xAxisLabel, xAxisTick, yAxisLabel, yAxisTick);
};
exports.barChart = barChart;
//# sourceMappingURL=simpleBarGraph.js.map