const square = (x) => x * x;
const diag = (x, y) => Math.sqrt(square(x) + square(y));

export default { square, diag };
