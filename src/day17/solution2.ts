import { parse, shortestPath } from "./solution";

const MIN_BEFORE_TURN = 4;
const MAX_STRAIGHT = 10;

export const solution2 = (data: string) => {
  const grid = parse(data);
  return shortestPath(grid, MAX_STRAIGHT, MIN_BEFORE_TURN);
};
