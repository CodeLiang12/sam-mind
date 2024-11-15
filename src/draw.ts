import { Text } from "@svgdotjs/svg.js";

export function drawNode(container, nodeData) {
  const data = getWidthAndHeight(nodeData);
  const nodeContainer = container
    .append("g")
    .attr("class", "node-container")
    .attr("transform", `translate(100, 100)`);

  const foreignObject = nodeContainer
    .append("foreignObject")
    .attr("width", Math.round(data.width) + 20)
    .attr("height", Math.round(data.height) + 20)
    .attr("x", 20)
    .attr("y", 20)
    .attr("fill", "pink");

  const div = foreignObject
    .append("xhtml:div")
    .attr("xmlns", "http://www.w3.org/1999/xhtml")
    .text(nodeData.title)
    .style("width", "calc(100% - 20px)")
    .style("height", "100%")
    .style("line-height", Math.round(data.height) + 20 + "px")
    .style("padding", "0 10px")
    .style("font-weight", nodeData.fontWeight)
    .style("font-family", nodeData.fontFamily)
    .style("font-size", nodeData.fontSize)
    .style("color", "red");

  // Use setTimeout or requestAnimationFrame to ensure the DOM is updated
  setTimeout(() => {
    drawContainer(nodeContainer, drawNode);
  }, 0);
}

export function getWidthAndHeight(data) {
  if (!data.title) {
    return { width: 0, height: 0 };
  }
  const node = new Text().text(data.title).font({
    size: data.fontSize || "16px",
    weight: data.fontWeight || "normal",
    family: data.fontFamily || "微软雅黑, 'Microsoft YaHei'",
  });
  const { width, height } = node.bbox();
  return {
    width,
    height,
  };
}

/**
 * 绘制容器
 * @param container
 */
export function drawContainer(container, nodeData) {
  const rect = container.node().getBoundingClientRect();
  const offset = nodeData.offset || 20;
  const borderRadius = nodeData.borderRadius || 10;
  const pathData = `
  M ${offset}, ${offset / 2}
  h ${rect.width + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},${borderRadius}
  v ${rect.height + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},${borderRadius}
  h -${rect.width + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 -${borderRadius},-${borderRadius}
  v -${rect.height + offset - borderRadius * 2}
  a ${borderRadius},${borderRadius} 0 0 1 ${borderRadius},-${borderRadius}
  z
`;
  container
    .append("path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);
}
