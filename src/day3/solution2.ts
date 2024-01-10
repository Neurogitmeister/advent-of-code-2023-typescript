const gearRegex = /\*/g;
const numberRegex = /\d+/g;
const MAX_NUM_LENGTH = 3;

const isOverlap = (
  a_start: number,
  a_end: number,
  b_start: number,
  b_end: number,
) => Math.max(a_start, b_start) < Math.min(a_end, b_end);

const getIntersectingMatches = (
  str: string,
  rx = numberRegex,
  start = 2,
  end = 5,
) => {
  const matches = [];
  let match;
  while ((match = rx.exec(str)) != null) {
    console.log(match.index, match.index + match[0].length, match[0]);
    if (isOverlap(match.index, match.index + match[0].length, start, end)) {
      console.log("include", match[0]);
      matches.push(match[0]);
    }
  }
  return matches;
};

export const solution2 = (data: string) => {
  return data
    .split("\n")
    .map((row, j, arr) => {
      const rx = gearRegex;
      let rowSum = 0;
      let match;
      while ((match = rx.exec(row)) != null) {
        const start = match.index - MAX_NUM_LENGTH;
        const end = match.index + 1 + MAX_NUM_LENGTH;
        const here = getIntersectingMatches(row.substring(start, end));
        const above = getIntersectingMatches(arr[j - 1]?.substring(start, end));
        const below = getIntersectingMatches(arr[j + 1]?.substring(start, end));
        const parts = [...here, ...above, ...below].filter((it) => it);
        const valid = parts.length === 2;
        console.log(parts, valid, Number(parts[0]) * Number(parts[1]), true);
        if (valid) rowSum += Number(parts[0]) * Number(parts[1]);
      }
      return rowSum;
    })
    .reduce((acc, it) => acc + it, 0);
};
