import data from "./data";
import test from "./test";
import { solution } from "./solution";
import { solution2 } from "./solution2";
import { getHtml, bench } from "../utils";

const DAY = 18;

const day = () => {
  const result = solution(test);
  const result2 = solution2(test);
  // bench(() => solution2(data), 10);

  return getHtml(DAY, result, result2);
};

export default day;
