const reverseStr = (s?: string) => (s ? s.split("").reverse().join("") : "");

const letterNumMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const parseNum = (n?: string) => {
  if (!n) return "0";
  return letterNumMap[n as keyof typeof letterNumMap] || n;
};

const getRegexFromLetterNums = (arr: string[]) =>
  new RegExp(`\\d|(${arr.join(")|(")})`);

const regex = getRegexFromLetterNums(Object.keys(letterNumMap));
const regexReverseLetters = getRegexFromLetterNums(
  Object.keys(letterNumMap).map(reverseStr),
);

export const solution2 = (data: string) => {
  return data
    .split("\n")
    .map((line: string) => {
      const first = line.match(regex)?.[0];
      const second = reverseStr(
        reverseStr(line).match(regexReverseLetters)?.[0],
      );
      const num = Number(parseNum(first) + parseNum(second));
      console.log(num, first, second, line);
      return num;
    })
    .reduce((acc, it) => it + acc, 0);
};
