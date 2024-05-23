import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
} from "react-flow-renderer";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { BoardContainer } from "./StyledComponents";
import { useCircuit } from "../context/CircuitContext";
import {
  AndGateNode,
  OrGateNode,
  NotGateNode,
  XorGateNode,
  NandGateNode,
  InputNode,
  OutputNode,
} from "./CustomNodes";
import { saveCircuit } from "../utils/storage";
import simulateCircuit, { NodeData, EdgeData } from "../utils/simulateCircuit";

interface BoardProps {
  simulationResults: string | null;
  setSimulationResults: (results: string | null) => void;
}

const nodeTypes = {
  "and-gate": AndGateNode,
  "or-gate": OrGateNode,
  "not-gate": NotGateNode,
  "xor-gate": XorGateNode,
  "nand-gate": NandGateNode,
  input: InputNode,
  output: OutputNode,
};

const Board: React.FC<BoardProps> = ({
  simulationResults,
  setSimulationResults,
}) => {
  const { nodes, edges, setNodes, setEdges } = useCircuit();
  const [internalNodes, setInternalNodes, onNodesChange] =
    useNodesState<Node[]>(nodes);
  const [internalEdges, setInternalEdges, onEdgesChange] =
    useEdgesState<Edge[]>(edges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    setNodes(internalNodes);
    setEdges(internalEdges);
    saveCircuit(internalNodes, internalEdges);
  }, [internalNodes, internalEdges, setNodes, setEdges]);

  const onConnect = (params: any) =>
    setInternalEdges((eds: any) => addEdge(params, eds));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: any, monitor: any) => {
      const offset = monitor.getClientOffset();
      const newNode: Node = {
        id: `${Date.now()}`,
        type: item.type.toLowerCase().replace(" ", "-"),
        data: { label: item.type, value: 0 },
        position: { x: offset!.x, y: offset!.y },
      };
      setInternalNodes((prevNodes) => [...prevNodes, newNode]);
    },
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  const handleInputChange = (id: string, value: number) => {
    setInternalNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, value } } : node
      )
    );
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedNode) {
        setInternalNodes((nodes) =>
          nodes.filter((node) => node.id !== selectedNode.id)
        );
        setInternalEdges((edges) =>
          edges.filter(
            (edge) =>
              edge.source !== selectedNode.id && edge.target !== selectedNode.id
          )
        );
        setSelectedNode(null);
      }
    },
    [selectedNode, setInternalNodes, setInternalEdges]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const results = simulateCircuit(
      internalNodes as NodeData[],
      internalEdges as EdgeData[]
    );
    setSimulationResults(JSON.stringify(results, null, 2));
  }, [internalNodes, internalEdges, setSimulationResults]);

  return (
    <BoardContainer ref={drop} $isActive={isActive}>
      <ReactFlow
        nodes={internalNodes.map((node) => {
          if (node.type === "input") {
            return {
              ...node,
              data: {
                ...node.data,
                onChange: (value: number) => handleInputChange(node.id, value),
                isSelected: node.id === selectedNode?.id,
              },
            };
          }
          if (node.type === "output") {
            return {
              ...node,
              data: {
                ...node.data,
                value: simulationResults
                  ? JSON.parse(simulationResults)[node.id]
                  : 0,
                isSelected: node.id === selectedNode?.id,
              },
            };
          }
          return {
            ...node,
            data: {
              ...node.data,
              isSelected: node.id === selectedNode?.id,
            },
          };
        })}
        edges={internalEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </BoardContainer>
  );
};

export default Board;
