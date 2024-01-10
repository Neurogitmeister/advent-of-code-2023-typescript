export const logFoundSeed = (...args: any[]) => {
  const [seed, range, step, loc, steps] = args;
  console.log(
    "found seed",
    seed,
    "in",
    range,
    "with step",
    step,
    "location",
    loc,
    steps ? `in ${steps}lookups` : ""
  );
};

export const logMaxStep = (loc: number, step: number) => {
  console.log("max location =", loc, "sqrt =", Math.sqrt(loc), "step =", step);
};
