const data = [1, 3, 5, 7, 9];

console.log("All data:" + data);

data.map((r) => {
  if (r > 5) {
    console.log("Data big than 5: ", r);
  }
});

data.sort((a, b) => b - a);
console.log("Data big to small: ", data);

const sum = data.reduce((all, numbernow) => all + numbernow, 0);
console.log("Sum: ", sum);

let count = 0;
data.map((r) => {
  count += r;
});

console.log("Sum by map:", count);
