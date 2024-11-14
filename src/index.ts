import * as d3 from "d3";
import { structureZoom } from "./viewOperations";

interface SamMindOption {
  containerId?: string;
}

export default class SamMind {
  constructor(option: SamMindOption) {
    initMind(option.containerId);
  }
}

function initMind(containerId: string) {
  const container = document.getElementById(containerId);
  let svgEle = null;
  let zoom = structureZoom(svgEle);
  const svg = d3
    .select(container)
    .append("svg")
    .attr("id", "sam-mind-svg")
    .attr("width", container.clientWidth)
    .attr("height", container.clientHeight)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("background", "#red")
    .call(zoom);
  svgEle = svg
    .append("circle")
    .attr("id", "test1")
    .attr("cx", 350)
    .attr("cy", 200)
    .attr("r", 20)
    .attr("fill", "pink");
}
