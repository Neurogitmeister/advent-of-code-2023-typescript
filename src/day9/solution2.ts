export const parse = (data: string) => {
  return data.split("\n").map((it) => it.split(" ").map((it) => Number(it)));
};

const getSequence = (nums: number[]) => {
  const seq = nums.map((it, i) => nums[i + 1] - it);
  seq.pop();
  return seq;
};

export const solution2 = (data: string) => {
  const rows = parse(data);
  let sum = 0;
  for (let row of rows) {
    const first = [];
    let seq = row;
    while (!seq.every((it) => !it)) {
      seq = getSequence(seq);
      first.push(seq[0]);
    }
    first.unshift(row[0]);
    const prev = first.reduceRight((a, b) => b - a, 0);
    sum += prev;
  }
  return sum;
};
