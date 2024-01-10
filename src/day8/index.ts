import data from "./data";
import test from "./test";
import { solution } from "./solution";
import { solution2 } from "./solution2";
import { getHtml } from "../utils/getHtml";

const DAY = 8;

const day = () => {
  const result = solution(test);
  const result2 = solution2(test);

  return getHtml(DAY, result, result2);
};

export default day;
