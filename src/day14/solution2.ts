import {
  logGrid,
  parse,
  transpose,
  reverseRows,
  roll,
  countWeight
} from "./solution";

const N = 1000000000;
const N_SAFE = 10000;

const logAnswer = (spins: number[], period: number, weight: number) => {
  const lastSpin = spins[spins.length - 1];
  console.log("found weight group", { [weight]: spins }, "where");
  console.log(`last = ${lastSpin} and period = ${period}`);
  const coef = Math.floor((N - lastSpin) / period);
  console.log(
    `such that ${lastSpin} + ( ${period} * ${coef} ) = ${
      lastSpin + coef * period
    }`
  );
  console.log(`which is equal to N = ${N}`);
};

const spin = (grid: string[][]) => {
  let result = grid;

  // north
  result = transpose(reverseRows(roll(reverseRows(transpose(result)))));

  // west
  result = reverseRows(roll(reverseRows(result)));

  // south
  result = transpose(roll(transpose(result)));

  // east
  result = roll(result);

  return result;
};

// alternative - but still same amount of operations
// if 'left' roll was coded instead of 'right'
const spin2 = (grid: string[][]) => {
  let result = grid;
  for (let i = 0; i < 4; i++) {
    // 1) transpose
    // 2) roll left (results in roll up)
    // 3) reverse rows
  }
};

const spinResultGroups = new Map<number, number[]>();

const getSpinPeriod = (spins: number[]) => {
  if (spins.length < 3) return 0;
  const last = spins.length - 1;
  const period = spins[last] - spins[last - 1];
  const period2 = spins[last - 1] - spins[last - 2];
  if (period === period2) return period;
  return 0;
};

export const solution2 = (data: string) => {
  let grid = parse(data);

  let result = 0;

  for (let i = 1; i < N_SAFE; i++) {
    grid = spin(grid);
    const weight = countWeight(grid);
    const spins = spinResultGroups.get(weight) || [];
    const period = getSpinPeriod(spins);
    if (period > 1) {
      const lastSpin = spins[spins.length - 1];
      if (!((N - lastSpin) % period)) {
        logGrid(grid);
        logAnswer(spins, period, weight);
        result = weight;
        break;
      }
    } else {
      spins.push(i);
      spinResultGroups.set(weight, spins);
    }
  }

  if (!result) {
    console.log("no result found in", N_SAFE, "steps");
  }

  return result;
};
