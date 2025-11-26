import { Connection, Node } from "@/generated/prisma";
import toposort from "toposort";
import { inngest } from "./client";

export const topologiacalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  if (connections.length === 0) return nodes;

  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  const connectedNodeIds = new Set<string>();

  for (const conn of connections) {
    connectedNodeIds.add(conn.fromNodeId);
    connectedNodeIds.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  let sortedNodeIds: string[];

  try {
    sortedNodeIds = toposort(edges);
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (err) {
    if (err instanceof Error && err.message.includes("Cyclic")) {
      throw new Error("Workflow contains a circle");
    }
    throw err;
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};

export const sendWorkflowExecution = async (data: {
  workflowId: string;
  [key: string]: any;
}) =>
  inngest.send({
    name: "workflows/execute.workflow",
    data,
  });
