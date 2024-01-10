import data from "./data";
import test from "./test";
import { solution } from "./solution";
import { solution2 } from "./solution2";
import { getHtml } from "../utils/getHtml";
import { bench } from "../utils";

const DAY = 14;

const day = () => {
  const result = solution(test);
  const result2 = solution2(data);
  // bench(() => solution2(data), 25);

  return getHtml(DAY, result, result2);
};

export default day;
