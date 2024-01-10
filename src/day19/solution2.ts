import { logCheckTest } from "../utils";
import type { Rule, Workflow, Part } from "./solution";
import { parse } from "./solution";

const MAX = 4000;
const MIN = 1;

const TEST = 167409079868000;

type Path = (Rule & { result: boolean })[];

type Node = {
  name: string;
  path: Path;
  children: Node[];
};

type AcceptedRanges = { [K in keyof Part]: [number, number] };

const createAcceptPathTree = (node: Node, workflow: Workflow): Node | null => {
  let rules = workflow[node.name];

  if (node.name === "A") return node;
  if (node.name === "R") return null;

  for (let rule of rules) {
    node.path.push({ ...rule, result: true });
    const next: Node = {
      name: rule.dest,
      path: [...node.path],
      children: []
    };
    const child = createAcceptPathTree(next, workflow);
    node.path.pop();
    node.path.push({ ...rule, result: false });
    if (child !== null) node.children.push(child);
  }

  node.path = []; // remove path for non-'A' nodes to save memory

  return node;
};

const walkTree = (root: Node, action: (node: Node) => void) => {
  action(root);
  for (let node of root.children) {
    walkTree(node, action);
  }
};

const getPathRanges = (path: Path) => {
  const ranges: AcceptedRanges = {
    x: [MIN, MAX],
    m: [MIN, MAX],
    a: [MIN, MAX],
    s: [MIN, MAX]
  };
  for (let { key, op, val, result } of path) {
    // reverse 'op' for false result
    if (!result) {
      if (op === ">") {
        val += 1;
        op = "<";
      } else if (op === "<") {
        val -= 1;
        op = ">";
      }
    }

    if (op === ">") {
      if (ranges[key][0] < val) ranges[key][0] = val + 1;
    }
    if (op === "<") {
      if (ranges[key][1] > val) ranges[key][1] = val - 1;
    }
  }
  return ranges;
};

const calcRangeCombos = (ranges: AcceptedRanges) =>
  Object.values(ranges).reduce(
    (acc, [start, end]) => acc * (end - start + 1),
    1
  );

export const solution2 = (data: string) => {
  const { workflow } = parse(data);

  const root: Node = {
    name: "in",
    path: [],
    children: []
  };

  createAcceptPathTree(root, workflow);

  // console.log(root);

  const acceptedPaths: Path[] = [];

  walkTree(root, (node) => {
    if (node.name === "A") acceptedPaths.push(node.path);
  });

  console.log(acceptedPaths);

  const result = acceptedPaths.reduce(
    (acc, path) => acc + calcRangeCombos(getPathRanges(path)),
    0
  );

  logCheckTest(result, TEST);

  return result;
};
