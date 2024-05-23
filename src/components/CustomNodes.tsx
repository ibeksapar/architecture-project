import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContainer } from "./StyledComponents";

const BaseNode: React.FC<{ label: string; isSelected: boolean }> = ({
  label,
  isSelected,
}) => (
  <NodeContainer
    $isSelected={isSelected}
    className={isSelected ? "selected-node" : ""}
  >
    {label}
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </NodeContainer>
);

export const AndGateNode: React.FC<{ isSelected: boolean }> = ({
  isSelected,
}) => <BaseNode label="AND Gate" isSelected={isSelected} />;
export const OrGateNode: React.FC<{ isSelected: boolean }> = ({
  isSelected,
}) => <BaseNode label="OR Gate" isSelected={isSelected} />;
export const NotGateNode: React.FC<{ isSelected: boolean }> = ({
  isSelected,
}) => (
  <NodeContainer
    $isSelected={isSelected}
    className={isSelected ? "selected-node" : ""}
  >
    NOT Gate
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </NodeContainer>
);
export const XorGateNode: React.FC<{ isSelected: boolean }> = ({
  isSelected,
}) => <BaseNode label="XOR Gate" isSelected={isSelected} />;
export const NandGateNode: React.FC<{ isSelected: boolean }> = ({
  isSelected,
}) => <BaseNode label="NAND Gate" isSelected={isSelected} />;

export const InputNode: React.FC<{
  data: { value: number; onChange: (value: number) => void };
  isSelected: boolean;
}> = ({ data, isSelected }) => {
  return (
    <NodeContainer
      $isSelected={isSelected}
      className={isSelected ? "selected-node" : ""}
    >
      <input
        type="number"
        value={data.value}
        onChange={(e) => data.onChange(Number(e.target.value))}
        min="0"
        max="1"
      />
      <Handle type="source" position={Position.Right} />
    </NodeContainer>
  );
};

export const OutputNode: React.FC<{
  data: { value: number };
  isSelected: boolean;
}> = ({ data, isSelected }) => (
  <NodeContainer
    $isSelected={isSelected}
    className={isSelected ? "selected-node" : ""}
  >
    Output: {data.value}
    <Handle type="target" position={Position.Left} />
  </NodeContainer>
);
