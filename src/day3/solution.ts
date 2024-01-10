const symbolRegex = /[^0-9.]+/g;
const numberRegex = /\d+/g;

export const solution = (data: string) => {
  return data
    .split("\n")
    .map((row, j, arr) => {
      const rx = numberRegex;
      let rowSum = 0;
      let match;
      while ((match = rx.exec(row)) != null) {
        const iLeft = match.index - 1;
        const iRight = match.index + match[0].length;
        const left = row.charAt(iLeft);
        const right = row.charAt(iRight);
        const above = arr[j - 1]?.substring(iLeft, iRight + 1) || ".";
        const below = arr[j + 1]?.substring(iLeft, iRight + 1) || ".";
        const valid = !!(left + right + above + below).match(symbolRegex)?.[0];
        // console.log(match[0], left, right, above, below, valid);
        if (valid) rowSum += Number(match[0]);
      }
      return rowSum;
    })
    .reduce((acc, it) => acc + it, 0);
};
