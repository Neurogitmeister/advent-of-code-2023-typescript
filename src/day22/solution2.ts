import { Block, Coord } from "./solution";
import { parse, stackBlocks, isBlockOnTopOfAnother } from "./solution";

const hashCoord = (coord: Coord) => `[${coord.x},${coord.y},${coord.z}]`;

const hashBlock = (block: Block) =>
  "" + hashCoord(block.start) + "-" + hashCoord(block.end);

type BlockNode = {
  id: string;
  block: Block;
  children: BlockNode[];
  parents: BlockNode[];
  visited?: boolean;
  visitedId?: string;
};

const createTreeRoot = (): BlockNode => {
  const floor: Block = {
    start: { x: 0, y: 0, z: 0 },
    end: { x: Infinity, y: Infinity, z: 0 },
  };

  return {
    id: hashBlock(floor),
    block: floor,
    children: [],
    parents: [],
  };
};

const generateTree = (root: BlockNode, blocks: Block[]): BlockNode => {
  const generateNodeRecursive = (node: BlockNode, blocks: Block[]) => {
    node.children = generateChildrenForNode(root, node, blocks);
    node.visited = true;
    node.children.forEach((child) => {
      if (!child.visited) generateNodeRecursive(child, blocks);
    });
  };

  generateNodeRecursive(root, blocks);

  return root;
};

const generateChildrenForNode = (
  root: BlockNode,
  node: BlockNode,
  blocks: Block[]
) => {
  const above = blocks.filter((it) => isBlockOnTopOfAnother(it, node.block));
  return above.map((block) => {
    const id = hashBlock(block);
    const existing = findNodeById(id, root);
    if (existing) {
      if (!existing.parents.map((it) => it.id).includes(node.id))
        existing.parents.push(node);
      return existing;
    }
    return {
      id,
      block,
      children: [],
      parents: [node],
    };
  });
};

const findNodeById = (id: string, root: BlockNode): BlockNode | undefined => {
  if (!root) return undefined;
  if (root.id === id) return root;

  for (let i = 0; i < root.children.length; i++) {
    const foundNode = findNodeById(id, root.children[i]);
    if (foundNode) return foundNode;
  }
  return undefined;
};

const resetVisited = (root: BlockNode) => {
  if (!root) return;
  root.visited = undefined;
  root.visitedId = undefined;
  root.children.forEach((child) => resetVisited(child));
};

const countChainFallScore = (root: BlockNode) => {
  if (!root) return 0;

  let count = 0;
  const fallen = new Set([root.id]);
  const queue = [...root.children];

  let node: BlockNode | undefined;
  while ((node = queue.shift())) {
    if (node.visitedId === root.id) continue;
    if (!node.parents.every((parent) => fallen.has(parent.id))) continue;
    node.visitedId = root.id;
    node.children.forEach((it) => queue.push(it));

    fallen.add(node.id);
    count += 1;
  }

  return count;
};

const sumChainFallScores = (root: BlockNode): number => {
  if (!root) return 0;

  if (root.visited) {
    return 0;
  }

  let count = countChainFallScore(root);

  root.children.forEach((child) => {
    count += sumChainFallScores(child);
  });

  root.visited = true;
  return count;
};

// bonus part 1 solution
const countRemovable = (root: BlockNode): number => {
  if (root.visited) return 0;

  let count = Number(root.children.every((child) => child.parents.length > 1));

  root.children.forEach((child) => {
    count += countRemovable(child);
  });

  root.visited = true;
  return count;
};

export const solution2 = (data: string) => {
  const blocks = parse(data).sort((a, b) => a.start.z - b.start.z);
  const stacked = stackBlocks(blocks);
  const tree = createTreeRoot();
  generateTree(tree, stacked);
  resetVisited(tree);
  const res = sumChainFallScores(tree) - stacked.length;
  resetVisited(tree);
  console.log("answer pt2 =", res);
  const removable = countRemovable(tree);
  console.log("answer pt1 = ", removable);
  return res;
};
