import type { Particle } from "./solution";
import { parse } from "./solution";

const isCollideXY = (p1: Particle, p2: Particle) => {
  const dx = p2.start.x - p1.start.x;
  const dy = p2.start.y - p1.start.y;
  const dvx = p2.speed.x - p1.speed.x;
  const dvy = p2.speed.y - p1.speed.y;
  const eq = dx * dvy === dy * dvx;
  if (((dx === 0 && dvx === 0) || eq) && ((dy === 0 && dvy === 0) || eq)) {
    return true;
  }
  return false;
};

export const solution2 = (data: string) => {
  const particles = parse(data);

  const res: [number, number][] = [];
  let count = 0;
  console.log(particles);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (isCollideXY(particles[i], particles[j])) {
        res.push([i, j]);
        count++;
      }
    }
  }
  console.log(res);
  return count;
};

// data: [34, 59] - collide (in past?)
// test: [3,4] - collide in past
