export type SpringsRecord = [string[], number[]];

export const parse = (data: string) =>
  data.split("\n").map((it) => {
    const [s, g] = it.split(" ");
    return [s.split(""), g.split(",").map((it) => Number(it))] as SpringsRecord;
  });

export const getArrangements = (
  springs: string[],
  counts: number[]
): number => {
  let sum = 0;
  const copy = [...springs];
  const unknown = copy.findIndex((it) => it === "?");

  if (unknown === -1) {
    if (isValid(copy, counts)) {
      // console.log("is valid", copy.join(""), counts);
      return 1;
    }
    return 0;
  }

  for (let next of ".#") {
    copy[unknown] = next;
    sum += getArrangements(copy, counts);
  }

  return sum;
};

export const isValid = (springs: string[], counts: number[]) => {
  let currCount = 0;
  let countIndex = 0;

  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    if (spring === "#") currCount++;
    if (currCount && (springs[i + 1] === undefined || springs[i + 1] === ".")) {
      if (currCount !== counts[countIndex]) return false;
      countIndex++;
      currCount = 0;
    }
    if (countIndex === counts.length) {
      return !springs.slice(i + 1).includes("#");
    }
  }
  return false;
};

export const solution = (data: string) => {
  const records = parse(data);
  return records.reduce((acc, it) => acc + getArrangements(it[0], it[1]), 0);
};
