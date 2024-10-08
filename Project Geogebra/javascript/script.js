const myCos = (angle) => {
  angle %= 2 * Math.PI;
  let result = 0;
  let term = 1;
  let sign = 1;
  for (let i = 0; i <= 8; i += 2) {
    result += sign * term / factorial(i);
    term *= angle * angle;
    sign = -sign;
  }
  return result;
};

const myLn = (x) => {
  if (x <= 0) {
    return NaN; 
  }
  let result = 0;
  let term = (x - 1) / (x + 1);
  for (let i = 1; i <= 9; i += 2) {
    result += term / i;
    term *= (x - 1) * (x - 1) / ((x + 1) * (x + 1));
  }
  return 2 * result;
};

const mySqrt = (x) => {
  if (x < 0) {
    return NaN; 
  }
  return Math.sqrt(x);
};

const myTan = (angle) => {
  const tanValue = mySin(angle) / myCos(angle);
  return isFinite(tanValue) ? tanValue : NaN; 
};

const myExp = (x) => {
  let result = 1;
  let term = 1;
  for (let i = 1; i <= 9; i++) {
    term *= x / i;
    result += term;
  }
  return result;
};

// Factorial function for Taylor series
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

function evaluateExpression(expression, x) {
  expression = expression
    .replace(/sin/g, 'mySin')
    .replace(/cos/g, 'Math.cos')
    .replace(/sqrt/g, 'mySqrt')
    .replace(/ln/g, 'myLn')
    .replace(/tan/g, 'Math.tan')
    .replace(/e\^/g, 'Math.exp')
    .replace(/pi/g, 'Math.PI');

    const mySin = (angle) => {
    angle %= 2 * Math.PI;
    let result = 0;
    let term = angle;
    let sign = 1;
    for (let i = 1; i <= 9; i += 2) {
      result += sign * term / factorial(i);
      term *= angle * angle;
      sign = -sign;
    }
    return result;
  };

  // Factorial function for Taylor series
  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  return Function('x', `return ${expression};`)(x);
}
function plotEquation() {
  const equationInput = document.getElementById('equation-input');
  const plotContainer = document.getElementById('plot-container');

  plotContainer.innerHTML = '';

  const equation = equationInput.value;

  const points = [];
  for (let x = -100; x <= 100; x += 0.1) {
    const y = evaluateExpression(equation, x);
    if (!isNaN(y)) {
      points.push({ x, y });
    }
  }

  const minX = Math.min(...points.map(point => point.x));
  const maxX = Math.max(...points.map(point => point.x));
  const minY = Math.min(...points.map(point => point.y));
  const maxY = Math.max(...points.map(point => point.y));

  const scaleX = plotContainer.clientWidth / (maxX - minX);
  const scaleY = plotContainer.clientHeight / (maxY - minY);

  const xAxis = document.createElement('div');
  xAxis.style.position = 'absolute';
  xAxis.style.width = '100%';
  xAxis.style.height = '1px';
  xAxis.style.backgroundColor = 'black';
  xAxis.style.bottom = `${(0 - minY) * scaleY}px`;
  plotContainer.appendChild(xAxis);

  const yAxis = document.createElement('div');
  yAxis.style.position = 'absolute';
  yAxis.style.width = '1px';
  yAxis.style.height = '100%';
  yAxis.style.backgroundColor = 'black';
  yAxis.style.left = `${(0 - minX) * scaleX}px`;
  plotContainer.appendChild(yAxis);

  for (const point of points) {
    const plotPoint = document.createElement('div');
    plotPoint.style.position = 'absolute';
    plotPoint.style.left = `${(point.x - minX) * scaleX}px`;
    plotPoint.style.bottom = `${(point.y - minY) * scaleY}px`;
    plotPoint.style.width = '2px';
    plotPoint.style.height = '2px';
    plotPoint.style.backgroundColor = 'blue';
    plotContainer.appendChild(plotPoint);
  }
}
