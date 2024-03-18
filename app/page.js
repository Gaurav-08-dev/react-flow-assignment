/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { ReactFlowProvider } from "reactflow";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Flow from "./components/Flow";

function Home() {
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeName, setNodeName] = useState("");

  return (
    <div className="flex flex-row min-h-screen lg:flex-row">
      <div className="flex-grow h-screen">
        <Flow
          nodeName={nodeName}
          setNodeName={setNodeName}
          setSelectedElements={setSelectedElements}
          selectedElements={selectedElements}
        />
      </div>
      <Sidebar
        nodeName={nodeName}
        setNodeName={setNodeName}
        selectedNode={selectedElements[0]}
        setSelectedElements={setSelectedElements}
      />
    </div>
  );
}
export default function FlowProvider() {
  return (
    <>
      <ReactFlowProvider>
        <Home />
        <ToastContainer />
      </ReactFlowProvider>
    </>
  );
}
