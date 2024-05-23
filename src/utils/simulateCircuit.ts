import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";

export interface NodeData extends FlowNode {
  id: string;
  type: string;
  data: { label: string; value?: number };
  position: { x: number; y: number };
}

export interface EdgeData extends FlowEdge {
  source: string;
  target: string;
}

const getNodeOutput = (nodeType: string, inputs: number[]): number => {
  switch (nodeType) {
    case "and-gate":
      return inputs.every(Boolean) ? 1 : 0;
    case "or-gate":
      return inputs.some(Boolean) ? 1 : 0;
    case "not-gate":
      return inputs[0] ? 0 : 1;
    case "xor-gate":
      return inputs.reduce((a, b) => (a !== b ? 1 : 0), 0);
    case "nand-gate":
      return inputs.every(Boolean) ? 0 : 1;
    case "output":
      return inputs[0]; // Ensure output node simply returns its input
    default:
      return 0;
  }
};

const simulateCircuit = (nodes: NodeData[], edges: EdgeData[]) => {
  const nodeMap: { [key: string]: NodeData } = {};
  nodes.forEach((node) => {
    nodeMap[node.id] = node;
  });

  const edgeMap: { [key: string]: string[] } = {};
  edges.forEach((edge) => {
    if (!edgeMap[edge.target]) {
      edgeMap[edge.target] = [];
    }
    edgeMap[edge.target].push(edge.source);
  });

  const results: { [key: string]: number } = {};

  const processNode = (nodeId: string): number => {
    if (results[nodeId] !== undefined) {
      return results[nodeId];
    }

    const node = nodeMap[nodeId];
    const inputs = (edgeMap[nodeId] || []).map(processNode);
    const output = getNodeOutput(node.type, inputs);
    results[nodeId] = output;
    return output;
  };

  nodes.forEach((node) => {
    if (node.type === "input") {
      results[node.id] = node.data.value || 0;
    }
  });

  nodes.forEach((node) => {
    if (node.type !== "input") {
      processNode(node.id);
    }
  });

  return results;
};

export default simulateCircuit;
