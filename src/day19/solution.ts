export type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
};

export type Rule = {
  key: keyof Part;
  op: "<" | ">";
  val: number;
  dest: string;
};

export type Workflow = { [name: string]: Rule[] };

const ops = {
  ">": (a: number, b: number) => a > b,
  "<": (a: number, b: number) => a < b
};

export const parse = (data: string) => {
  const [workflowStr, partsStr] = data.split("\n\n");

  const workflow = workflowStr.split("\n").reduce((acc, it, i) => {
    const [name, ...ruleStr] = it.split(/[{},]/g);
    ruleStr.pop();
    const rules = ruleStr.map((act) => {
      const [condition, dest] = act.split(":");
      if (!dest) {
        return { dest: condition } as Rule;
      }
      const op = condition.match(/[><]/)?.[0];
      const [key, val] = condition.split(/[><]/);
      return { op, key, val: Number(val), dest } as Rule;
    });
    acc[name] = rules;
    return acc;
  }, {} as Workflow);

  const parts = partsStr.split("\n").map((line) =>
    line
      .slice(1, -1)
      .split(",")
      .reduce((acc, it) => {
        const [name, val] = it.split("=");
        acc[name as keyof Part] = Number(val);
        return acc;
      }, {} as Part)
  );
  return { workflow, parts };
};

const process = (part: Part, rules: Rule[]) => {
  for (let rule of rules) {
    const { op, key, val, dest } = rule;
    if (!op) return dest;
    if (ops[op](part[key], val)) return dest;
  }
  return null;
};

const checkAccepted = (part: Part, workflow: Workflow, start: string) => {
  let next = process(part, workflow[start]);
  while (next && next !== "R" && next !== "A") {
    next = process(part, workflow[next]);
  }
  if (next === "A") return true;
  return false;
};

const countXmasRating = (accepted: Part[]) =>
  accepted.reduce((acc, { x, m, a, s }) => acc + x + m + a + s, 0);

export const solution = (data: string) => {
  const { workflow, parts } = parse(data);

  const start = "in";
  let accepted: Part[] = [];

  for (let part of parts) {
    if (checkAccepted(part, workflow, start)) accepted.push(part);
  }

  return countXmasRating(accepted);
};
