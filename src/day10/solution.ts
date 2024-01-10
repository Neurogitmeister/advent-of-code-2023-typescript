export type Point = [number, number];
export type Direction = "N" | "E" | "S" | "W" | undefined;
export type PointDirectionTuple = [Point, Direction];

export const getChar = (map: string[][], point: Point) =>
  map[point[0]]?.[point[1]];

export const rotate = (direction: Direction, symb: string): Direction => {
  switch (direction) {
    case "N": {
      if (symb === "|") return "N";
      if (symb === "F") return "E";
      if (symb === "7") return "W";
      return;
    }
    case "E": {
      if (symb === "-") return "E";
      if (symb === "J") return "N";
      if (symb === "7") return "S";
      return;
    }
    case "S": {
      if (symb === "|") return "S";
      if (symb === "J") return "W";
      if (symb === "L") return "E";
      return;
    }
    case "W": {
      if (symb === "-") return "W";
      if (symb === "L") return "N";
      if (symb === "F") return "S";
      return;
    }
  }
};

export const findNext = (
  map: string[][],
  currPoint: Point,
  currDirection: Direction
): PointDirectionTuple | undefined => {
  const [i, j] = currPoint;

  if (map[i]?.[j] === "S") return [currPoint, currDirection];

  const r = rotate(currDirection, map[i]?.[j]);
  switch (r) {
    case "N":
      return [[i - 1, j], r];
    case "E":
      return [[i, j + 1], r];
    case "S":
      return [[i + 1, j], r];
    case "W":
      return [[i, j - 1], r];
    default:
      return;
  }
};

export const walk = (
  map: string[][],
  start: PointDirectionTuple,
  action?: (point: Point, direction: Direction, symbol: string) => void
) => {
  let curr = findNext(map, start[0], start[1]);
  while (curr) {
    const [point, direction] = curr;
    const symb = getChar(map, point);
    if (symb === "S") {
      return true;
    }
    action && action(point, direction, symb);
    curr = findNext(map, point, direction);
  }
  return false;
};

export const solution = (data: string) => {
  const map = data.split("\n").map((it) => it.split(""));

  const M = map[0].length;
  const startPos = data.replace(/\n/g, "").indexOf("S");
  const start: Point = [Math.floor(startPos / M), startPos % M];

  if (getChar(map, start) !== "S") {
    throw new Error(
      `Starting point is wrong, found: [${start[0]},${start[1]}]=${
        map[start[0]][start[1]]
      }`
    );
  }

  const starts: PointDirectionTuple[] = [];

  const [i, j] = start;
  starts.push([[i - 1, j], "N"]);
  starts.push([[i, j + 1], "E"]);
  starts.push([[i + 1, j], "S"]);
  starts.push([[i, j - 1], "W"]);

  // console.log(
  //   starts,
  //   starts.map((it) => getChar(map, it[0]))
  // );

  let steps = 1;

  for (let start of starts) {
    if (
      walk(map, start, () => {
        steps++;
      })
    ) {
      return Math.ceil(steps / 2);
    }
  }

  return 0;
};
