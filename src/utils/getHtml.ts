export const getHtml = (day = 1, result = 0, result2 = 0, log = true) => {
  if (log) {
    console.log(`day ${day} result`, result);
    console.log(`day ${day} result 2`, result2);
  }
  return `
  <h1>AdventOfCode 2023. Day ${day}</h1>
  <a href="https://adventofcode.com/2023/day/${day}" target="_blank">https://adventofcode.com/2023/day/${day}</a>
  <br/><br/>
  <span>Solution Part 1: ${result}</span>
  <br/>
  <span>Solution Part 2: ${result2}</span>`;
};
