import { Heap } from "heap-js";

import type { Point, Vector } from "../types/index";
import { getGridSize, pointsAreEqual, rotateLeft, rotateRight } from "../utils";

const MIN_BEFORE_TURN = 0;
const MAX_STRAIGHT = 3;

export type Node = {
  point: Point;
  direction: Vector;
  cost: number;
  sameDirection: number;
};

export const parse = (data: string) =>
  data.split("\n").map((it) => it.split("").map((it) => Number(it)));

export const hash = (node: Node) => {
  return `[${node.point[0]},${node.point[1]}]->[${node.direction[0]},${node.direction[1]}]x(${node.sameDirection})`;
};

// Dijkstra with min-heap proirity queue
export const shortestPath = (
  grid: number[][],
  maxStraight = 0,
  minBeforeTurn = 0
) => {
  const [N, M] = getGridSize(grid);

  const end: Point = [N - 1, M - 1];

  const seen = new Set<string>();

  const priorityQ = new Heap<Node>((a, b) => a.cost - b.cost);

  priorityQ.push(
    {
      point: [0, 0],
      direction: [0, 1],
      cost: 0,
      sameDirection: 1
    },
    {
      point: [0, 0],
      direction: [1, 0],
      cost: 0,
      sameDirection: 1
    }
  );

  while (priorityQ.length) {
    const curr = priorityQ.pop() as Node;

    const { point, direction, cost, sameDirection } = curr;

    if (pointsAreEqual(point, end) && sameDirection >= minBeforeTurn) {
      console.log(priorityQ);
      return cost;
    }

    const h = hash(curr);
    if (seen.has(h)) continue;
    seen.add(h);

    // same direction
    if (sameDirection < maxStraight) {
      const i = point[0] + direction[0];
      const j = point[1] + direction[1];
      if (i >= 0 && i < N && j >= 0 && j < M)
        priorityQ.push({
          point: [i, j],
          direction: direction,
          cost: cost + grid[i][j],
          sameDirection: sameDirection + 1
        });
    }

    // turns
    if (sameDirection >= minBeforeTurn) {
      for (let nextDirection of [
        rotateLeft(direction),
        rotateRight(direction)
      ]) {
        const i = point[0] + nextDirection[0];
        const j = point[1] + nextDirection[1];
        if (i >= 0 && i < N && j >= 0 && j < M)
          priorityQ.push({
            point: [i, j],
            direction: nextDirection,
            cost: cost + grid[i][j],
            sameDirection: 1
          });
      }
    }
  }
};

export const solution = (data: string) => {
  const grid = parse(data);
  return shortestPath(grid, MAX_STRAIGHT, MIN_BEFORE_TURN);
};
