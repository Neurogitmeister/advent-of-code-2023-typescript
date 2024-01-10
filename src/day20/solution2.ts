import { lcm, logCheckTest } from "../utils";
import type { ModuleMap, SimulationReturnFn } from "./solution";
import { parse, Pulse, getSources, simulate } from "./solution";

const createCheck = (map: ModuleMap) => {
  const end = "rx";

  // find 'rx' sources
  const sources = getSources(map, end);
  const conjunct = Object.keys(sources).find((it) => map[it].type === "&");
  if (!conjunct) {
    throw new Error(
      `Requires generic solution. No "Conjunction" module in sources of '${end}'. `
    );
  }
  const cjSources = Object.keys(map[conjunct].lastReceived);

  console.log("conjunction", map[conjunct]);
  console.log("conjunction sources", cjSources);

  const cycles = Object.fromEntries(cjSources.map((k) => [k, 0]));
  const seen = Object.fromEntries(cjSources.map((k) => [k, 0]));

  const fn: SimulationReturnFn<number> = ({ name, pulse, source }, i) => {
    if (name === conjunct && pulse === Pulse.high) {
      seen[source] += 1;

      if (cjSources.includes(source)) {
        cycles[source] = i;
      }
      if (Object.values(seen).every((i) => !!i)) {
        console.log("cycles", cycles);
        return lcm(Object.values(cycles));
      }
    }
  };

  return fn;
};

export const solution2 = (data: string) => {
  const signalMap = parse(data);
  const result = simulate(signalMap, createCheck(signalMap));
  logCheckTest(result, 0);
  return result;
};
