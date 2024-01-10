export const gcd = function (a: number, b: number): number {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

export const lcm = (nums: number[]) =>
  nums.reduce((acc, n) => {
    return (acc * n) / gcd(acc, n);
  }, nums[0]);
