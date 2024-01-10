import type { SpringsRecord } from "./solution";
import { parse } from "./solution";

const N_UNFOLDS = 5; // 1 - solution for part 1

const cache: { [key: string]: string } = {};

const unfold = (records: SpringsRecord[]) => {
  return records.map(([springs, counts]) => {
    const unfoldedSprings = [];
    const unfoldedCounts = [];
    for (let i = 0; i < N_UNFOLDS; i++) {
      unfoldedSprings.push(...springs, "?");
      unfoldedCounts.push(...counts);
    }
    unfoldedSprings.pop();
    return [unfoldedSprings, unfoldedCounts] as SpringsRecord;
  });
};

const getArrangements = (springs: string[], counts: number[]): number => {
  if (!springs.length) return counts.length ? 0 : 1;
  if (!counts.length) return springs.includes("#") ? 0 : 1;
  let sum = 0;

  const key = springs.join("") + counts.join(",");

  if (cache[key]) {
    return Number(cache[key]);
  }

  if (".?".includes(springs[0])) {
    sum += getArrangements(springs.slice(1), counts);
  }
  if ("#?".includes(springs[0])) {
    if (
      counts[0] <= springs.length &&
      !springs.slice(0, counts[0]).includes(".") &&
      (counts[0] === springs.length || springs[counts[0]] !== "#")
    )
      sum += getArrangements(springs.slice(counts[0] + 1), counts.slice(1));
  }

  cache[key] = sum.toString();

  return sum;
};

export const solution2 = (data: string) => {
  const records = unfold(parse(data));
  // console.log(records);
  return records.reduce((acc, it) => acc + getArrangements(it[0], it[1]), 0);
};
