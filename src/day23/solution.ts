import type { Point, Vector } from "../types/index";
import {
  getGridSize,
  getNextByVector,
  getValueByPoint,
  logGrid,
  pointsAreEqual,
  rotateLeft,
  rotateRight
} from "../utils";

export const parse = (data: string) =>
  data.split("\n").map((it) => it.split(""));

export const hash = (p: Point) => {
  return `[${p[0]},${p[1]}]`;
};

export const isWall = (grid: string[][], point: Point) => {
  const ch = getValueByPoint(grid, point);
  if (!ch || ch === "#") return true;
  return false;
};

export const isSlide = (grid: string[][], p: Point) =>
  ">v<^".includes(getValueByPoint(grid, p));

export const isSplit = (grid: string[][], p: Point, v: Vector) => {
  const left = getNextByVector(p, rotateLeft(v));
  const right = getNextByVector(p, rotateRight(v));

  if (!isWall(grid, left) || !isWall(grid, right)) {
    return true;
  }
  return false;
};

export const getNextInLine = (grid: string[][], p: Point, v: Vector) => {
  let count = 1;
  let next = p;
  let curr = next;
  while (true) {
    if (isSlide(grid, next) || isSplit(grid, next, v)) break;
    curr = getNextByVector(next, v);
    if (isWall(grid, curr)) break;
    next = curr;
    count++;
  }
  return { next, count };
};

export const reverse = (v: Vector) => [-v[0], -v[1]] as Vector;

let max = 0;

export const readMax = () => max;

export const walk = (
  grid: string[][],
  end: Point,
  point: Point,
  vect: Vector,
  path: string[],
  steps: number
) => {
  const [i, j] = point;

  if (pointsAreEqual(point, end)) {
    if (steps > max) max = steps;
    console.log("found", steps);
    console.log(path);
    return;
  }

  if (isWall(grid, point)) return;

  const ch = getValueByPoint(grid, point);
  let next: [Point, Vector][] = [];
  if (ch === ".") {
    next = ([
      [
        [i - 1, j],
        [-1, 0]
      ],
      [
        [i, j - 1],
        [0, -1]
      ],
      [
        [i + 1, j],
        [1, 0]
      ],
      [
        [i, j + 1],
        [0, 1]
      ]
    ] as [Point, Vector][]).filter(
      ([p, v]) => !pointsAreEqual(v, reverse(vect)) && !isWall(grid, p)
    );
  } else if (ch === ">") {
    next = [
      [
        [i, j + 1],
        [0, 1]
      ]
    ];
  } else if (ch === "v") {
    next = [
      [
        [i + 1, j],
        [1, 0]
      ]
    ];
  } else if (ch === "<") {
    next = [
      [
        [i, j - 1],
        [0, -1]
      ]
    ];
  } else if (ch === "^") {
    next = [
      [
        [i - 1, j],
        [-1, 0]
      ]
    ];
  }

  next.forEach(([p, v]) => {
    const { next, count } = getNextInLine(grid, p, v);
    const h = hash(next);

    if (path.find((it) => it === h)) {
      // console.log("repeat", h, steps, path);
      return;
    }

    walk(grid, end, next, v, [...path, h], steps + count);
  });
};

export const solution = (data: string) => {
  console.clear();
  max = 0;
  const grid = parse(data);
  const [N, M] = getGridSize(grid);
  // return 0;
  walk(grid, [N - 1, M - 2], [0, 1], [1, 0], [], 0);
  const res = max;
  max = 0;
  console.log("longest", res);
  return res;
};

// if (pointsAreEqual(next, [19, 13])) {
//   console.log(
//     getValueByPoint(grid, next),
//     p,
//     v,
//     next,
//     count,
//     isSplit(grid, next, v),
//     isSlide(grid, next)
//   );
// }
// if (pointsAreEqual(next, [18, 13])) {
//   console.log(
//     getValueByPoint(grid, next),
//     p,
//     v,
//     next,
//     count,
//     isSplit(grid, next, v),
//     isSlide(grid, next)
//   );
// }
