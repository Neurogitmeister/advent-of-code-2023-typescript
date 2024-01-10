import type { Point, Direction, PointDirectionTuple } from "./solution";
import { getChar, rotate, walk } from "./solution";

const directions: Direction[] = ["N", "E", "S", "W"];

const rotateRight = (d: Direction) =>
  directions[(directions.findIndex((it) => it === d) + 1) % 4];

const rotateLeft = (d: Direction) => {
  const index = directions.findIndex((it) => it === d);
  return directions[index ? index - 1 : 3];
};

const markPointSides = (
  area: string[][],
  point: Point,
  direction: Direction,
  mark: string
) => {
  let di = 1;
  let dj = 1;
  if (direction === "N" || direction === "S") {
    if (direction === "N") di = -1;
    let [i, j] = point;
    i += di;
    while (area[i]?.[j] && area[i][j] !== "#") {
      if (area[i][j] !== mark) {
        area[i][j] = mark;
      }
      i += di;
    }
  } else {
    if (direction === "W") dj = -1;
    let [i, j] = point;
    j += dj;
    while (area[i]?.[j] && area[i][j] !== "#") {
      if (area[i][j] !== mark) {
        area[i][j] = mark;
      }
      j += dj;
    }
  }
};

export const solution2 = (data: string) => {
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

  let loopEntry: PointDirectionTuple | undefined;

  for (let start of starts) {
    if (walk(map, start)) {
      console.log("found loop entry", loopEntry);
      loopEntry = start;
    }
  }

  if (!loopEntry) return 0;

  const area: string[][] = new Array(map.length)
    .fill("")
    .map((it) => new Array(M).fill("."));

  // console.log(area.map((it) => it.join("")));

  walk(map, loopEntry, (point) => {
    const [i, j] = point;
    area[i][j] = "#";
  });

  // console.log(area.map((it) => it.join("")));

  walk(map, loopEntry, (point, direction, symb) => {
    const left = rotateLeft(direction);
    const right = rotateRight(direction);
    const next = rotate(direction, symb);
    if (next === left) {
      markPointSides(area, point, direction, "R");
    }
    if (next === right) {
      markPointSides(area, point, direction, "L");
    }
    markPointSides(area, point, left, "L");
    markPointSides(area, point, right, "R");
  });

  // counting with 'markSide' is bugged, need to match symbols
  const areaStr = area.map((it) => it.join("")).join("\n");
  const countLeft = areaStr.match(/L/g)?.length || 0;
  const countRight = areaStr.match(/R/g)?.length || 0;

  // console.log(areaStr);
  // console.log(countLeft, countRight);

  const edges = [
    area[0],
    area[area.length - 1],
    area.map((row) => row[0]),
    area.map((row) => row[row.length - 1])
  ];

  // console.log(edges.map((it) => it.join("")));

  if (edges.find((edge) => edge.find((it) => it === "L"))) {
    return countRight;
  } else {
    return countLeft;
  }
};
