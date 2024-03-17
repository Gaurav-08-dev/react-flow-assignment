let id = 0;
export const getId = () => {
  return `node_${id++}`;
};