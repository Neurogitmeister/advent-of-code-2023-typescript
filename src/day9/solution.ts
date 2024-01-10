export const parse = (data: string) => {
  return data.split("\n").map((it) => it.split(" ").map((it) => Number(it)));
};

const getSequence = (nums: number[]) => {
  const seq = nums.map((it, i) => nums[i + 1] - it);
  seq.pop();
  return seq;
};

export const solution = (data: string) => {
  const rows = parse(data);
  let sum = 0;
  for (let row of rows) {
    const last = [];
    let seq = row;
    while (!seq.every((it) => !it)) {
      seq = getSequence(seq);
      last.push(seq[seq.length - 1]);
    }
    const next = last.reduce((a, b) => a + b, 0) + row[row.length - 1];
    sum += next;
  }
  return sum;
};
