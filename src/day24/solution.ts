export type Particle = { start: Coord; speed: Coord };
export type Box = { start: Coord; end: Coord };
export type Coord = { x: number; y: number; z: number };
export type Interval = [number, number];

const AREA_LOWER_BOUND = 7;
const AREA_UPPER_BOUND = 27;

const getFuncCoeffs = (p: Particle): [number, number] => {
  const a = p.speed.y / p.speed.x;
  const c = p.start.y - p.start.x * a;
  return [a, c];
};

const isCoordInPast = (start: number, speed: number, point: number) => {
  if (speed > 0) {
    return point < start;
  } else {
    return point > start;
  }
};

const isIntersectInPast = (p1: Particle, point: Coord) =>
  isCoordInPast(p1.start.x, p1.speed.x, point.x) ||
  isCoordInPast(p1.start.y, p1.speed.y, point.y);

const getIntersectionPoint = (p1: Particle, p2: Particle): Coord => {
  const [a, c] = getFuncCoeffs(p1);
  const [b, d] = getFuncCoeffs(p2);
  const x = (d - c) / (a - b);
  const y = a * x + c;
  const point = { x, y, z: 0 };
  if (isIntersectInPast(p1, point) || isIntersectInPast(p2, point))
    return { x: 0, y: 0, z: 0 };
  return point;
};

const isInInterval = (val: number, a: number, b: number) =>
  val >= a && val <= b;

const isInArea = (box: Box, p: Coord) =>
  isInInterval(p.x, box.start.x, box.end.x) &&
  isInInterval(p.y, box.start.y, box.end.y);

export const parse = (data: string): Particle[] =>
  data.split("\n").map((it) => {
    const [start, speed] = it.split("@").map((it) => {
      const [x, y, z] = it.split(", ").map((it) => Number(it));
      return { x, y, z };
    });
    return { start, speed };
  });

export const solution = (data: string) => {
  const particles = parse(data);
  const box: Box = {
    start: { x: AREA_LOWER_BOUND, y: AREA_LOWER_BOUND, z: AREA_LOWER_BOUND },
    end: { x: AREA_UPPER_BOUND, y: AREA_UPPER_BOUND, z: AREA_UPPER_BOUND },
  };
  // const res: [number, number][] = [];
  let count = 0;
  console.log(particles);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (isInArea(box, getIntersectionPoint(particles[i], particles[j]))) {
        // res.push([i, j]);
        count++;
      }
    }
  }
  // console.log(res);
  return count;
};
