import { getHtml } from "../utils";

import data from "./data";
import test from "./test";
import { solution } from "./solution";
import { solution2 } from "./solution2";
import { solution3 } from "./solution3";

const DAY = 21;

const day = () => {
  const result = solution(data);
  const result2 = solution2(data);
  // const result2 = solution3(data);

  return getHtml(DAY, result, result2);
};

export default day;
