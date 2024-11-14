import { zoom as d3zoom } from "d3-zoom";

export function structureZoom(svgEle) {
  const zoom = d3zoom()
    .scaleExtent([0.1, 10])
    .filter((event) => event.ctrlKey && event.buttons <= 1)
    .wheelDelta((event) => (-event.deltaY * (event.deltaMode ? 120 : 1)) / 500)
    .on("zoom", (event) => {
      svgEle && svgEle.attr("transform", () => event.transform);
    });
  return zoom;
}
