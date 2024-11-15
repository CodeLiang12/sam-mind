import * as d3 from "d3";
import { drawNode } from "./draw";
// import cursorImage from "./assets/default.png";
// import {
//   structureZoom,
//   handleMouseEnd,
//   handleMouseStart,
//   handleMouseMove,
// } from "./interaction";
// import { drawText } from "./draw";
// import { getTextWidthAndHeight } from "./node";

export let container = null;
export let containerWidth = null;
export let containerHeight = null;
export let svg = null;
export let middleContainer = null;

interface SamMindOption {
  containerId?: string;
  map: unknown;
  mainKey?: string;
}

export default class SamMind {
  constructor(option: SamMindOption) {
    setCursorStyle(option.containerId);
    initMind(option.containerId);
  }
}

function setCursorStyle(containerId) {
  const cursorArea = document.getElementById(containerId);
  // cursorArea.style.cursor = `url('${cursorImage}'), auto`;
}

const data = {
  width: 0,
  height: 0,
  fontWeight: "bolder",
  fontSize: "22px",
  title: "保持卡后来发觉",
};

function initMind(containerId: string) {
  container = document.getElementById(containerId);
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  // let zoom = structureZoom();
  svg = d3
    .select(container)
    .append("svg")
    .attr("id", "sam-mind-svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");
  // .call(zoom)
  // .on("mousedown", handleMouseStart)
  // .on("mousemove", handleMouseMove)
  // .on("mouseup", handleMouseEnd);
  middleContainer = svg.append("g").attr("class", "map-outter-container");
  // getTextWidthAndHeight({ text: "middleContainer" });
  // drawText(middleContainer, "保持卡后来发觉");
  drawNode(middleContainer, data);
}
