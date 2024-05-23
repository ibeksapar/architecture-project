export const saveCircuit = (nodes: any, edges: any) => {
  const circuit = { nodes, edges };
  localStorage.setItem("savedCircuit", JSON.stringify(circuit));
};

export const loadCircuit = () => {
  const savedCircuit = localStorage.getItem("savedCircuit");
  if (savedCircuit) {
    return JSON.parse(savedCircuit);
  }
  return { nodes: [], edges: [] };
};
