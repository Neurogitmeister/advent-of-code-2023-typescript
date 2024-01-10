export const parse = (data: string) => data.split(",");

export const hash = (str: string) => {
  let curr = 0;
  for (let c of str) {
    curr = ((curr + c.charCodeAt(0)) * 17) % 256;
  }
  return curr;
};

export const solution = (data: string) => {
  const seq = parse(data);

  return seq.reduce((acc, str) => (acc += hash(str)), 0);
};
