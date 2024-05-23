import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Component from "./components/Component";
import Toolbar from "./components/Toolbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCircuit } from "./context/CircuitContext";
import { loadCircuit } from "./utils/storage";

const App: React.FC = () => {
  const { setNodes, setEdges } = useCircuit();
  const [simulationResults, setSimulationResults] = useState<string | null>(
    null
  );

  useEffect(() => {
    const savedCircuit = loadCircuit();
    setNodes(savedCircuit.nodes);
    setEdges(savedCircuit.edges);
  }, [setNodes, setEdges]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex flex-1">
          <div className="w-1/4 p-4 border-r overflow-y-auto">
            <Component type="Input" />
            <Component type="Output" />
            <Component type="AND Gate" />
            <Component type="OR Gate" />
            <Component type="NOT Gate" />
            <Component type="XOR Gate" />
            <Component type="NAND Gate" />
          </div>
          <div className="flex-1">
            <Board
              simulationResults={simulationResults}
              setSimulationResults={setSimulationResults}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
