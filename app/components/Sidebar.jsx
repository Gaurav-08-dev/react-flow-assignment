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
    <aside className="border-[0.5] border-l-2 border-gray-200 text-sm bg-white w-64 h-screen text-black flex flex-col gap-4">
      <div className="border-[0.5] border-b-2 font-bold text-black-900 p-2 text-center">
        {selectedNode ? (
          <div className="flex flex-row justify-start gap-10 items-center">
            <button
              className="text-white text-xl"
              onClick={() => setSelectedElements([])}
            >
              ⬅️
            </button>
            Update Node
          </div>
        ) : (
          "Node Panel"
        )}
      </div>

      {selectedNode ? (
        <div className="p-2 border-b-2">
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Text
          </label>
          <input
            type="text"
            className="text-wrap min-h-[60px] block w-full px-1 text-gray-700 border border-gray-300 rounded bg-white focus:outline-none focus:border-gray-400 mb-4"
            value={nodeName}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="p-2 w-full flex-wrap">
          
          {nodeTypesList.map((item) => (
            <div
              className="w-[115px] flex flex-col items-center bg-white p-2 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 text-center"
              draggable
              onDragStart={(e) => handleDragStart(e, item.nodeType)}
              key={nodeName}
            >
              <span>📝</span> {item.nodeName}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
