import {
  createEmptyGridCopy,
  logGrid,
  rotateLeft,
  rotateRight,
  getValueByPoint
} from "../utils";

export type Point = [number, number];
type Direction = -1 | -0 | 1;
export type Vector = [Direction, Direction];

export const parse = (data: string) =>
  data.split("\n").map((it) => it.split(""));

export const reflect = (v: Vector, symbol: string): Vector[] => {
  switch (symbol) {
    case "|": {
      if (v[0]) return [v];
      return [
        [-1, 0],
        [1, 0]
      ];
    }
    case "-": {
      if (v[1]) return [v];
      return [
        [0, -1],
        [0, 1]
      ];
    }
    case "/": {
      if (v[0]) return [rotateLeft(v)];
      if (v[1]) return [rotateRight(v)];
      break;
    }
    case "\\": {
      if (v[0]) return [rotateRight(v)];
      if (v[1]) return [rotateLeft(v)];
      break;
    }
    default:
      break;
  }
  return [v];
};

export const getNext = (point: Point, vect: Vector) =>
  [point[0] + vect[0], point[1] + vect[1]] as Point;

export const hash = (point: Point, vect: Vector) =>
  point.join(",") + ";" + vect.join(",");

export const walkGrid = (
  grid: string[][],
  visited: Set<string>,
  point: Point,
  vect: Vector,
  action: (point: Point, vec: Vector) => void
) => {
  if (!getValueByPoint(grid, point)) return;

  const h = hash(point, vect);
  if (visited.has(h)) return;
  visited.add(h);

  action(point, vect);

  for (const rv of reflect(vect, getValueByPoint(grid, point))) {
    walkGrid(grid, visited, getNext(point, rv), rv, action);
  }

  return;
};

export const energizeGrid = (
  grid: string[][],
  startPoint: Point,
  startVect: Vector
) => {
  const visited = new Set<string>();

  const energized = createEmptyGridCopy(grid, ".");

  const energizeCell = (point: Point) => {
    const [i, j] = point;
    if (energized[i]?.[j]) energized[i][j] = "#";
  };

  // 'grid' and 'visited' are passed by reference,
  // not multiplying in fn stack memory
  walkGrid(grid, visited, startPoint, startVect, energizeCell);

  return energized;
};

export const countEnergy = (grid: string[][]) =>
  grid.reduce((acc, row) => acc + row.filter((it) => it === "#").length, 0);

// alternative - counting energized cells as we walk:
export const walkAndCountEnergy = (
  grid: string[][],
  startPoint: Point,
  startVect: Vector
) => {
  const visited = new Set<string>();

  let length = 0;
  const increment = () => length++;

  walkGrid(grid, visited, startPoint, startVect, increment);

  return length;
};

export const solution = (data: string) => {
  const grid = parse(data);
  logGrid(grid);
  const energized = energizeGrid(grid, [0, 0], [0, 1]);
  logGrid(energized);
  return countEnergy(energized);
};
