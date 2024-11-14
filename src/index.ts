import * as d3 from "d3";

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

  d3.select(container)
    .append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(20,20)")
    .append("rect")
    .attr("width", 920)
    .attr("height", 460);
}
