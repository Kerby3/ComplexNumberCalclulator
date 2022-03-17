const button = document.querySelector('.calculate');
const signInput = document.getElementById('sign');
let realInput1 = document.querySelector('.real1Input');
let imaginaryInput1 = document.querySelector('.imaginary1Input');
let realInput2 = document.querySelector('.real2Input');
let imaginaryInput2 = document.querySelector('.imaginary2Input');
const ctx = document.getElementById('myChart') //объявления переменных

let complex = class Complex {
	constructor(real, imaginary) {
		this.real = real;
		this.imaginary = imaginary;
	}
} //класс complex

const checkNull = (expression) => {
	//console.log(expression);
	if (expression === 0) {
		return '';
	}
	return expression;
};//проверка наличия нуля для красивого вывода

const checkImaginary = (expression) => {
	if (Math.abs(expression) === 1 ) {
		return ``;
	}
	return expression;
}//проверка мнимой части для красиво вывода

const calculate = (realPart, imaginaryPart) => {
	//console.log(`${realPart}\n${imaginaryPart}`);
	//let parts = [];
	let realReturn = new Fraction(realPart);
	let realReturnFrac = realReturn.toFraction(true);
	let imaginaryReturn = new Fraction(imaginaryPart);
	//console.log(`1. imaginaryReturn: ${imaginaryReturn.s}`);
	let imaginaryReturnFrac = imaginaryReturn.toFraction(true);
	//console.log(`2. realReturnFrac: ${realReturnFrac}\nimaginaryReturnFrac: ${imaginaryReturnFrac}\nimaginaryReturn: ${imaginaryReturn}`);
	if (checkNull(realReturnFrac) == '' && checkNull(imaginaryReturnFrac) == '') {
		return 0;
	} else if (checkNull(imaginaryReturnFrac) == 0) {
		return realReturnFrac;
	} else if (checkNull(realReturnFrac) == 0) {
		return `${imaginaryReturnFrac}i`;
	} else {
		if (imaginaryReturn.s >= 0) {
			return (`${realReturnFrac} + ${checkImaginary(imaginaryReturnFrac)}i`);
		} else {
			//console.log(`3. ${checkImaginary(imaginaryReturn).abs().toFraction(true)}\n`)
			return (`${realReturnFrac} - ${checkImaginary(imaginaryReturn).abs().toFraction(true)}i`);
		}	
	}
			
};

const checkTextBoxValue = (num) => {
	if (num == '') {
		return 0;
	} else {
		return parseFloat(num);
	}
}

button.addEventListener('click', () => {
	let real1 = checkTextBoxValue(realInput1.value);
	let imaginary1 = checkTextBoxValue(imaginaryInput1.value);
	let real2 = checkTextBoxValue(realInput2.value);
	let imaginary2 = checkTextBoxValue(imaginaryInput2.value);
	let signOfSwitch = signInput.value;
	let complexNumber1 = new complex(real1, imaginary1);
	let complexNumber2 = new complex(real2, imaginary2);
	//let output = new
	switch (signOfSwitch) {
		case '+':
			alert(calculate(complexNumber1.real + complexNumber2.real, complexNumber1.imaginary + complexNumber2.imaginary));
			break;
		case '-':
			alert(calculate(complexNumber1.real - complexNumber2.real, complexNumber1.imaginary - complexNumber2.imaginary));
			break;
		case '*':
			alert(calculate(complexNumber1.real * complexNumber2.real - (complexNumber1.imaginary * complexNumber2.imaginary),  complexNumber1.real * complexNumber2.imaginary + complexNumber1.imaginary * complexNumber2.real));
			break;
		case '/':
			alert(calculate((complexNumber1.real * complexNumber2.real + complexNumber1.imaginary * complexNumber2.imaginary)/(complexNumber2.real * complexNumber2.real + complexNumber2.imaginary * complexNumber2.imaginary), (complexNumber2.real * complexNumber1.imaginary - complexNumber1.real * complexNumber2.imaginary)/(complexNumber2.real * complexNumber2.real + complexNumber2.imaginary * complexNumber2.imaginary)));
			break;
	}
	zingchart.render({
      id: 'myChart',
      data: chartConfig,
      output: 'canvas',
      height: '100%',
      width: '50%',
    });
		
});

let huoj1 = `-6:6:1`;
let huoj2 = `-4:4:1`

const fun = () => {
	let v = [];
	let endValue = 1;
	for (let i = 0; i <= 4; i++) {
		endValue = (6/4) * i;
		v.push([i, endValue]);
	}
	//v.push(0, endValue);
	return v;
};

let chartConfig = {
  type: 'line',
  theme: 'classic',
  backgroundColor: '#fff',
  flat: true,
  legend: {
    adjustLayout: true,
    margin: 'auto auto 10px auto',
    backgroundColor: '#FFF',
    borderRadius: '3px',
    layout: 'float',
    marker: {
      type: 'match',
      showLine: true
    },
    shadow: false
  },
  plot: {
    //aspect: 'spline',
    lineWidth: '2px',
    maxNodes: 9999,
    maxTrackers: 9999,
    shadow: false,
    animation: {
      effect: 'ANIMATION_SLIDE_LEFT',
      method: 'ANIMATION_REGULAR_EASE_OUT',
      sequence: 'ANIMATION_BY_PLOT',
      speed: 200,
    },
    marker: {
      visible: false
    },
    tooltip: {
      visible: false
    }
  },
  plotarea: {
    margin: 'dynamic'
  },
  scaleX: {
    //format: '%v°',
    values: huoj2,
    itemsOverlap: true,
    lineWidth: 1,
    minorTicks: 4,
    refValue: 0,
    step: 1,
    zooming: true,
    guide: {
      lineColor: '#33994a',
      lineStyle: 'solid'
    },
    item: {
      color: '#333'
    },
    minorGuide: {
      lineColor: '#33994a',
      lineStyle: 'solid'
    },
    minorTick: {
      visible: false
    },
    refLine: {
      lineColor: '#33994a',
      lineWidth: '2px',
      visible: true
    },
    tick: {
      lineColor: '#FFF',
      lineWidth: '1px',
      placement: 'ref-auto'
    }
  },
  scaleY: {
    values: huoj1,
    lineWidth: 0,
    minorTicks: 4,
    refValue: 0,
    step: 1,
    zooming: true,
    guide: {
      lineColor: '#33994a',
      lineStyle: 'solid'
    },
    item: {
      color: '#333'
    },
    minorGuide: {
      lineColor: '#33994a',
      lineStyle: 'solid'
    },
    minorTick: {
      visible: false
    },
    refLine: {
      lineColor: '#33994a',
      lineWidth: '1px'
    },
    tick: {
      visible: false
    }
  },
  crosshairX: {
    lineStyle: 'dashed',
    plotLabel: {
      text: '%data-equation',
      backgroundColor: '#b5e8c0',
      borderColor: '#33994a',
      borderRadius: '3px',
      borderWidth: '2px',
      color: 'white',
      decimals: 1,
      fontSize: '12px',
      htmlMode: true,
      multiple: true,
      padding: '4px 6px',
      shadow: false
    },
    scaleLabel: {
      visible: false
    }
  },
  series: [
    {
      text: 'Complex',
      values: fun(),
      //dataEquation: '<b><span style=\'color:#000;\'>sin(</span></b> %k° <b><span style=\'color:#000\'>)</span></b> = <b><span style=\'color:#000\'>%v</span></b>',
      lineColor: '#000'
    }//,
    /*{
      text: 'Cosine',
      values: cosv(),
      dataEquation: '<b><span style=\'color:#6e6c6c;\'>cos(</span></b> %k°<b><span style=\'color:#6e6c6c;\'>)</span></b> = <b><span style=\'color:#6e6c6c\'>%v</span></b>',
      lineColor: '#6e6c6c'
    },*/
    /*{
      text: 'Equation',
      values: eq(),
      dataEquation: '<b><span style=\'color:#000\'>sin(</span></b>%k°<b><span style=\'color:#000\'>)</span> + <span style=\'color:#6e6c6c;\'>cos(</span></b> %k°<b><span style=\'color:#6e6c6c;\'>)</span></b> = <b><span style=\'color:#3f0bff;\'>%v</span></b>',
      lineColor: '#3f0bff',
      lineStyle: 'dashed'
    }*/
  ]
};




