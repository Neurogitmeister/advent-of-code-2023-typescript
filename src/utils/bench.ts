export const bench = (run: (...args: any[]) => any, n: number) => {
  let count = n;
  const start = Date.now();
  while (count--) {
    run();
  }
  const end = Date.now();
  console.log("bench", n, "total:", end - start, "average:", (end - start) / n);
};
