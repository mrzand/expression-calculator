function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
if (expr.match(/\(/) || expr.match(/\)/)) {
  let leftBracket = expr.match(/\(/g);
  let rightBracket = expr.match(/\)/g)
  if ((leftBracket !== null && rightBracket !== null) && leftBracket.length !== rightBracket.length) {
    throw new Error("ExpressionError: Brackets must be paired");
  }
  if ((leftBracket === null && rightBracket !== null) || (leftBracket !== null && rightBracket === null)) {
    throw new Error("ExpressionError: Brackets must be paired");
  }
}

function calculate(arr) {
  let count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr.length === 1 || typeof (arr) === 'number') return arr[0];

    if (arr.includes("/")) {
      let opIndex = arr.findIndex(el => el === "/");
      if (parseFloat(arr[opIndex + 1]) === 0) throw new Error("TypeError: Division by zero.");
      arr.splice(opIndex - 1, 3,
        parseFloat(arr[opIndex - 1]) / parseFloat(arr[opIndex + 1]));
      continue;
    }
    if (arr.includes("*")) {
      let opIndex = arr.findIndex(el => el === "*");
      arr.splice(opIndex - 1, 3,
        parseFloat(arr[opIndex - 1]) * parseFloat(arr[opIndex + 1]));
      continue;
    }
    if (arr.includes("-")) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "-") arr[i + 1] *= -1;
      }
      let result = arr.filter(el => el !== "-" && el !== "+").map(el => parseFloat(el));
      arr = result.reduce((sum, el) => sum + el);
      break;
    } else {
      let result = arr.filter(el => el !== "+").map(el => parseFloat(el));
      arr = result.reduce((sum, el) => sum + el);
      break;
    }
  }
  return arr;
}

function brackets(arr) {
  let brArr = [];
  arr.forEach((el, i) => {
    if (el === "(") brArr.push(i);
  });

  let left = brArr.pop();
  let right = arr.indexOf(")", left);
  let leftSide = arr.slice(0, left);
  let rightSide = arr.slice(right + 1);
  let inBrackets = calculate(arr.slice(left + 1, right));
  return leftSide.concat(inBrackets, rightSide);
}

let arr = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g);
let count = arr.length;
for (let i = 0; i < count; i++) {
  if (arr.length === 1) break;

  if (arr.includes("(")) {
    arr = brackets(arr);
    continue;
  }

  arr = calculate(arr);
  break;
}
return parseFloat(arr.toFixed(4));
}

module.exports = {
  expressionCalculator
}