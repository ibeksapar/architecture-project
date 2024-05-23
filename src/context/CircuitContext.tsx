import React, { createContext, useContext, useState, ReactNode } from "react";
import { loadCircuit } from "../utils/storage";

interface CircuitContextType {
  nodes: any[];
  edges: any[];
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
}

const CircuitContext = createContext<CircuitContextType | undefined>(undefined);

export const useCircuit = () => {
  const context = useContext(CircuitContext);
  if (!context) {
    throw new Error("useCircuit must be used within a CircuitProvider");
  }
  return context;
};

export const CircuitProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<any[]>(loadCircuit().nodes);
  const [edges, setEdges] = useState<any[]>(loadCircuit().edges);

  return (
    <CircuitContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
      {children}
    </CircuitContext.Provider>
  );
};
