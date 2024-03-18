import { getId } from "../utils";
export const flowKey = "flow";
export const initialNode = [
  {
    id: getId(),
    position: { x: 0, y: 0 },
    data: { label: "Text Node" },
    position: { x: 250, y: 5 },
    type:'Text Node'
  },
];

export const nodeTypesList = [
  {
    nodeName:"Message Node",
    nodeType:"Text Node",
  },
]