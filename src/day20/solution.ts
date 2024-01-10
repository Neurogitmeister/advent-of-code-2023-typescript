import { logCheckTest } from "../utils";

export enum Pulse {
  low = 0,
  high = 1
}

export type ModuleType = "&" | "%" | "b";

export type Module = {
  name: string;
  dest: string[];
  type: ModuleType;
  mode: Pulse;
  lastReceived: { [src: string]: Pulse };
};

export type ModuleMap = { [key: string]: Module };

export type PulseQueue = {
  name: string;
  pulse: Pulse;
  source: string;
}[];

export type SimulationReturnFn<T> = (
  queueEntry: PulseQueue[number],
  i: number
) => T | undefined;

const N = 1000;

export const parse = (data: string) => {
  const map = data.split("\n").reduce((acc, it) => {
    const [src, dest] = it.split(" -> ");

    let name = src.slice(1);
    const type = src.slice(0, 1) as ModuleType;
    if (type === "b") name = type + name;
    acc[name] = {
      name,
      dest: dest.split(", "),
      type,
      mode: Pulse.low,
      lastReceived: {}
    };
    return acc;
  }, {} as ModuleMap);

  Object.entries(map)
    .filter(([key, module]) => module.type === "&")
    .forEach(([conName, conModule]) => {
      map[conName].lastReceived = getSources(map, conName);
    });

  return map;
};

export const getSources = (map: ModuleMap, name: string) =>
  Object.fromEntries(
    Object.entries(map)
      .filter(([key, module]) => module.dest.includes(name))
      .map(([key]) => [key, Pulse.low])
  );

export const setSignal = (module: Module, pulse: Pulse, src: string) => {
  if (!module) return;

  switch (module.type) {
    case "%": {
      if (pulse === Pulse.low) {
        if (module.mode === Pulse.low) {
          module.mode = Pulse.high;
        } else {
          module.mode = Pulse.low;
        }
      }
      break;
    }
    case "&": {
      module.lastReceived[src] = pulse;
      let mode = Pulse.high;
      if (Object.values(module.lastReceived).every((it) => it === Pulse.high)) {
        mode = Pulse.low;
      }
      module.mode = mode;
      break;
    }
    case "b": {
      module.mode = pulse;
    }
  }
};

export const simulate = (
  signalMap: ModuleMap,
  checkReturn: SimulationReturnFn<number>
) => {
  const start: PulseQueue[number] = {
    name: "broadcaster",
    pulse: Pulse.low,
    source: "button"
  };

  const pulseDataQueue: PulseQueue = [];

  let i = 0;
  while (true) {
    i++;
    pulseDataQueue.push(start);
    while (pulseDataQueue.length) {
      const pulseData = pulseDataQueue.pop()!;
      let result = checkReturn(pulseData, i);
      if (result) return result;

      const { name, pulse, source } = pulseData;

      const module = signalMap[name];

      if (!module) continue;

      if (module.type === "%" && pulse === Pulse.high) continue;

      setSignal(module, pulse, source);

      for (let dest of module.dest) {
        const next = { name: dest, pulse: module.mode, source: module.name };
        pulseDataQueue.unshift(next);
      }
    }
  }
};

export const solution = (data: string) => {
  const signalMap = parse(data);
  // return 0;
  console.log(signalMap);

  let lowCount = 0;
  let highCount = 0;

  const result = simulate(signalMap, ({ pulse }, i) => {
    if (i === N + 1) return lowCount * highCount;

    if (pulse === Pulse.low) {
      lowCount++;
    } else {
      highCount++;
    }
  });

  logCheckTest(highCount, 2750);
  logCheckTest(lowCount, 4250);
  logCheckTest(result, 2750 * 4250);

  return lowCount * highCount;
};
