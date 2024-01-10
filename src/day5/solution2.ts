import _sortBy from "lodash/sortBy";
import _sortedIndexBy from "lodash/sortedIndexBy";

import { parse } from "./solution";
import { logFoundSeed, logMaxStep } from "./utils";

/** 
Average complexity with sorting:
O(2 * log(√n) * l * log(m) + l * m * log(m))
where "m" is number of sorted seed intervals,"n" is number of all possible locations and "l" number of interval arrays (map parts)

1) m * log(m) - sort on an interval
2) 2*log(√n) - jump search and linear search per location
3) log(m) - binary search in intervals
4) l - multiplies sort and interval binary searches by number of map parts

Complexity without sorting:
O(2 * log(√n) * l * m)


Sorted intervals are ~3,3x faster 
(for l = 6, m = 36 (avg), n = 4294967296)

4294967296 max location (~4.3 billion)
sqrt(4294967296) = 65536 - optimal step
(interestingly 4294967296 is a perfect square of 65536)

*/

const findRangeForEl = (ranges: number[][], el: number) => {
  const i = _sortedIndexBy(ranges, [el], (range) => range[0]) - 1;

  if (ranges[i + 1]?.[0] === el) return ranges[i + 1];
  if (ranges[i]?.[1] >= el) return ranges[i];
};

export const solution2 = (data: string) => {
  let [seeds, maps] = parse(data);

  // re-map ranges for reverse lookup
  maps = maps.map((ranges) =>
    ranges.map(([dest, src, len]) => [dest, dest + len - 1, src])
  );

  // create ranges from parsed seeds
  let seedRanges: [number, number][] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  // sort all ranges
  seedRanges = _sortBy(seedRanges, (r) => r[0]);
  maps = maps.map((range) => _sortBy(range, (r) => r[0]));

  // calculate max step for jump search
  const maxLocation = Math.max(...maps[maps.length - 1].map(([_, end]) => end));
  const maxStep = Math.floor(Math.sqrt(maxLocation));
  let step = maxStep;

  // logMaxStep(maxLocation, maxStep);

  let location = 0;

  while (true) {
    let searchVal = location;

    for (let i = maps.length - 1; i >= 0; i--) {
      const [src, end, dest] = findRangeForEl(maps[i], searchVal) || [];
      if (end) searchVal = searchVal + dest - src;
    }

    const range = findRangeForEl(seedRanges, searchVal);

    if (range) {
      // logFoundSeed(n, range, step, location);
      if (step === 1) break;
      location -= step;
      step = 1;
    }
    location += step;
  }

  return location;
};
