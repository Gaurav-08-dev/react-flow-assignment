import React from "react";
import { nodeTypesList } from "../constants";

const Sidebar = ({
  nodeName,
  setNodeName,
  selectedNode,
  setSelectedElements,
}) => {
  
  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  
  const handleInputChange = (e) => {
    setNodeName(e.target.value);
  };

  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-blue-100 w-64 h-screen text-black flex flex-col gap-4">
      {selectedNode ? (
        <div>
          <h3 className="text-xl mb-2 text-blue-900 font-bold">Update Node</h3>
          <label className="block mb-2 text-sm font-medium text-blue-900">
            Node Name
          </label>
          <input
            type="text"
            className="block w-full py-1 px-3  text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
            value={nodeName}
            onChange={handleInputChange}
          />
          <button
            className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            onClick={() => setSelectedElements([])}
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-xl md-4 text-blue-900 font-bold">Nodes Panel</h3>
          {nodeTypesList.map((item) => (
            <div
              className="bg-white p-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              draggable
              onDragStart={(e) => handleDragStart(e, item.nodeType)}
              key={nodeName}
            >
              {item.nodeName}
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

export default Sidebar;
