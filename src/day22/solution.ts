export type Block = { start: Coord; end: Coord };
export type Coord = { x: number; y: number; z: number };
export type Interval = [number, number];

export const parse = (data: string): Block[] =>
  data.split("\n").map((it) => {
    const [start, end] = it.split("~").map((it) => {
      const [x, y, z] = it.split(",").map((it) => Number(it));
      return { x, y, z };
    });
    return { start, end };
  });

export const isBlocksIntersectXY = (block1: Block, block2: Block) =>
  isInvervalsIntersect(
    [block1.start.x, block1.end.x],
    [block2.start.x, block2.end.x]
  ) &&
  isInvervalsIntersect(
    [block1.start.y, block1.end.y],
    [block2.start.y, block2.end.y]
  );

const isInvervalsIntersect = (a: Interval, b: Interval) => {
  if (Math.max(a[0], b[0]) > Math.min(a[1], b[1])) return false;
  return true;
};

export const stackBlocks = (blocks: Block[]) => {
  let processed = [];
  for (let block of blocks) {
    const blocksBelow = processed.filter((it) =>
      isBlocksIntersectXY(it, block)
    );
    const z = Math.max(...blocksBelow.map((it) => it.end.z), 0);
    const lowered: Block = { start: { ...block.start }, end: { ...block.end } };
    lowered.end.z = lowered.end.z - (lowered.start.z - z) + 1;
    lowered.start.z = z + 1;
    processed.push(lowered);
  }
  return processed;
};

export const isBlockOnTopOfAnother = (block1: Block, block2: Block) =>
  block1.start.z - block2.end.z === 1 && isBlocksIntersectXY(block1, block2);

export const findRemovable = (blocks: Block[]) => {
  let result = [];
  for (let block of blocks) {
    // console.log('block', block);
    const above = blocks.filter((it) => isBlockOnTopOfAnother(it, block));
    // console.log('above', above);
    const removable = above.every(
      (blockAbove) =>
        blocks.filter((it) => isBlockOnTopOfAnother(blockAbove, it)).length > 1
    );
    // console.log(removable ? 'is removable' : 'is not removable');
    if (removable) {
      result.push(block);
    }
  }
  return result;
};

export const solution = (data: string) => {
  const blocks = parse(data).sort((a, b) => a.start.z - b.start.z);
  console.log(blocks);
  const stacked = stackBlocks(blocks);
  const removable = findRemovable(stacked);
  console.log("removable:", removable);
  console.log("answer:", removable.length);
  return removable.length;
};
