export const solution = (data: string) => {
  return data
    .split("\n")
    .map((line: string) => {
      const match = line.match(/\d/g);
      if (!match) return 0;
      return Number(match[0] + match[match.length - 1]);
    })
    .reduce((acc, it) => it + acc, 0);
};
