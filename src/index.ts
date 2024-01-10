import "./styles.css";
import day1 from "./day1";
import day2 from "./day2";
import day3 from "./day3";
import day4 from "./day4";
import day5 from "./day5";
import day6 from "./day6";
import day7 from "./day7";
import day8 from "./day8";
import day9 from "./day9";
import day10 from "./day10";
import day11 from "./day11";
import day12 from "./day12";
import day13 from "./day13";
import day14 from "./day14";
import day15 from "./day15";
import day16 from "./day16";
import day17 from "./day17";
import day18 from "./day18";
import day19 from "./day19";
import day20 from "./day20";
import day21 from "./day21";
import day23 from "./day23";

const templateHtml = `
<h1>AdventOfCode 2023</h1>
<br/>
<a href="https://adventofcode.com/2023" target="_blank">https://adventofcode.com/2023</a>
<p>To pick a solution uncomment a line under 'html' variable in 'src/index.ts' and change a day like:</p>
<i>html = day1(); </i><span>(or <i>"day2", "day3",... etc.</i>)</span>
<p></p>
`;

let html = templateHtml;
html = day23();

document.getElementById("app")!.innerHTML = html;
