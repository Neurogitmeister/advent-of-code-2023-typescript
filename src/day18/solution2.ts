import { logCheckTest } from "../utils";

type Direction = -1 | 0 | 1;
type Vector = [Direction, Direction];
type Point = [number, number];
type Command = { vect: Vector; count: number };

const dirToVec: { [k: string]: Vector } = {
  0: [0, 1],
  1: [1, 0],
  2: [0, -1],
  3: [-1, 0]
};

export const parse = (data: string) =>
  data.split("\n").map((it) => {
    const code = it.split(" ")[2].match(/\(#(.*)\)/)?.[1];

    if (!code) throw new Error("Yikes...");
    const vect = dirToVec[code.slice(-1)];
    const count = parseInt(code.slice(0, -1), 16);

    return { vect, count } as Command;
  });

const createPerimeterPath = (start: Point, commands: Command[]) => {
  const path: Point[] = [start];
  let length = 0;
  let [i, j] = start;
  for (const { vect, count } of commands) {
    const [di, dj] = vect;
    if (dj) {
      length += count;
      j += count * dj;
    }
    if (di) {
      length += count;
      i += count * di;
    }
    path.push([i, j]);
  }
  if (!pointsEqual(path[0], path[path.length - 1]))
    throw Error("path is not a perimeter");
  path.pop();
  return { path, length };
};

const pointsEqual = (c1: Point, c2: Point) =>
  c1[0] === c2[0] && c1[1] === c2[1];

// Shoelace's theorem
const getShoelaceArea = (points: Point[]) =>
  Math.abs(
    points.reduce((acc, c, i) => {
      const prev = points[i === 0 ? points.length - 1 : i - 1];
      const next = points[i === points.length - 1 ? 0 : i + 1];
      const val = c[0] * (next[1] - prev[1]);
      return acc + val;
    }, 0) / 2
  );

export const solution2 = (data: string) => {
  const commands = parse(data);
  const { path, length } = createPerimeterPath([0, 0], commands);
  const area = getShoelaceArea(path);
  const result = length + (area - length / 2 + 1); // Pick's theorem

  logCheckTest(result, 952408144115);
  return result;
};
