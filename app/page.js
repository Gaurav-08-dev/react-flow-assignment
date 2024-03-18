/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  MarkerType
} from "reactflow";
import "../tailwind.config";
import "reactflow/dist/style.css";
import Sidebar from "./components/Sidebar";
import { useCallback, useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { flowKey } from "./constants";  
import { initialNode } from "./constants";
import { getId } from "./utils";
import TextNode from "./components/Textnode";

function Home() {
  const nodeTypes = useMemo(
    () => ({
      textnode: TextNode,
    }),
    []
  );
  const { setViewPort } = useReactFlow();
  
  const [flowObject, setFlowObject] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeName, setNodeName] = useState("");

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  // handle a new node addition
  const handleDragDrop = useCallback(
    (e) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) return;

      const position = flowObject.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [flowObject]
  );

  const handleEdgeConnect = useCallback(
    (e) => {
      setEdges((edge) => addEdge({...e,markerEnd: {
        type: MarkerType.Arrow,
      }}, edge));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((e, node) => {
    setSelectedElements([node]);
    setNodeName(node.data.label);
    setNodes((nodes) =>
      nodes.map((item) => ({
        ...item,
        selected: item.id === node.id,
      }))
    );
  }, []);

  const handleOnPaneClick = () => {
    setSelectedElements([]);
    setNodes((nodes) => nodes.map((item) => ({ ...item, selected: false })));
  };

  const isNodeUnconnected = useCallback(() => {
    const unConnectedNode = nodes.filter(
      (item) =>
        !edges.find((edge) => edge.source === item.id || edge.target == item.id)
    );
    return unConnectedNode.length > 0;
  }, [nodes, edges]);

  const checkEmptyTarget = () => {
    let emptyTargets = 0;
    edges.forEach((item) => {
      if (!item.targetHandle) {
        emptyTargets++;
      }
    });

    return emptyTargets;
  };

  // Saving Flow to local Storage
  const saveFlow = useCallback(() => {
    if (flowObject) {
      const emptyTarget = checkEmptyTarget();
      if (nodes.length > 1 && (emptyTarget > 1 || isNodeUnconnected())) {
        console.log("Here");
        toast.error("Flow has an empty target or some unconnected nodes ! ", {
          position: "bottom-right",
        });
      } else {
        const flow = flowObject.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        toast.success("Flow has been saved!", {
          position: "bottom-right",
        });
      }
    }
  }, [flowObject, nodes, isNodeUnconnected]);

  const handleRestoreFlow = useCallback(() => {
    const restoreFlow = async () => {
      const savedFlow = JSON.parse?.(localStorage.getItem(flowKey));
      if (savedFlow) {
        const { x = 0, y = 0, zoom = 1 } = savedFlow.viewport;
        setNodes(savedFlow.nodes || []);
        setEdges(savedFlow.edges || []);
        setViewPort(() => {
          x, y, zoom;
        });
      }
    };
    restoreFlow();
  }, [setNodes, setViewPort]);

  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedElements[0]?.id) {
            node.data = {
              ...node.data,
              label: nodeName,
            };
          }
          return node;
        })
      );
    } else {
      setNodeName(""); // Clear nodeName when no node is selected
    }
  }, [nodeName, selectedElements, setNodes]);
  
  return (
    <div className="flex flex-row min-h-screen lg:flex-row">
      <div className="flex-grow h-screen" >
        <ReactFlow
          edges={edges}
          onDragOver={handleDragOver}
          nodes={nodes}
          fitView
          onDrop={handleDragDrop}
          onNodesChange={onNodesChange}
          onInit={setFlowObject}
          style={{ backgroundColor: "#fff" }}
          onEdgesChange={onEdgesChange}
          onConnect={handleEdgeConnect}
          onNodeClick={onNodeClick}
          onPaneClick={handleOnPaneClick}
          nodeTypes={nodeTypes}
        >
          <Background variant="" gap={12} size={1} />
          <Controls />
          <MiniMap zoomable pannable />
          <Panel>
            <button className="m-2 button" onClick={saveFlow}>
              Save Flow
            </button>
            <button className="button" onClick={handleRestoreFlow}>
              Restore Flow
            </button>
          </Panel>
        </ReactFlow>
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
