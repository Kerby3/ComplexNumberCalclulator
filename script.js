const button = document.querySelector('.calculate');
const signInput = document.getElementById('sign');
let realInput1 = document.querySelector('.real1Input');
let imaginaryInput1 = document.querySelector('.imaginary1Input');
let realInput2 = document.querySelector('.real2Input');
let imaginaryInput2 = document.querySelector('.imaginary2Input');
const ctx = document.getElementById('myChart') //объявления переменных
/*const radians = {
	0: 'Pi/2',
	0.2617993878: 'Pi/12',
	0.5235987756: 'Pi/6',
	0.7853981634: 'Pi/4',
	1.0471975512: 'Pi/3',
	1.308996939: '(5*Pi)/12',
	1.57079632679: 'Pi/2',
	1.83259571459: '(7*Pi)/12',
	2.09439510239: '(2*Pi)/3',
	2.35619449019: '(3*Pi)/4',
	2.61799387799: '(5*Pi)/6',
	2.87979326579: '(11*Pi)/12',
	3.14159265359: 'Pi',
	3.40339204139: '(13*Pi)/12',
	3.66519142919: '(7*Pi)/6',
	3.92699081699: '(5*Pi)/4',
	4.18879020479: '(4*Pi)/3',
	4.45058959259: '(17*Pi)/12',
	4.71238898038: '(3*Pi)/2',
	4.97418836818: '(19*Pi)/12',
	5.23598775598: '(5*Pi)/3',
	5.49778714378: '(7*Pi)/4',
	5.75958653158: '(11*Pi)/6',
	6.02138591938: '(23*Pi)/12',
}*/

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
	//console.log(`4. expression: ${expression}`)
	if (expression === 1 ) {
		return ``;
	} else if (expression === -1) {
		return `-`;
	}
	return expression;
}//проверка мнимой части для красиво вывода

const trigonometricNotation = (real, imag) => {
	//console.log(`real=${real} imag=${imag}`);
	let moduleOfNumber = Math.sqrt(real * real + imag * imag);
	//console.log(`typeof(moduleOfNumber): ${typeof(moduleOfNumber)}`)
	if (Number.isInteger(moduleOfNumber) != true) {
		moduleOfNumber = `√(${real * real + imag * imag})`;
	}
	//console.log(`real: ${real} imag: ${imag}`);
	let fiRad = Math.atan(imag/real);
	let fiDegs = radInDeg(fiRad);
	//console.log(`fiRad: ${fiRad}\tfiDegs:${fiDegs}`)
	let fiWithPi = radWithPi(fiRad, (fiDegs).toFixed(0));
	//alert(`fiWithPi: ${fiWithPi}`);
	/*for (let radian in radians) {
		console.log(`for..in: ${radian}`);
		if (fiRad == radian) {
			fiRad = radian;
		}
	}*/
	//console.log(`fiRad = ${fiRad}`)
	let trigonomtryNumber = '';
	if (fiRad < 0) {
		trigonomtryNumber = `${moduleOfNumber}(cos(${fiRad})-isin(${Math.abs(fiRad)}))`
	} else {
		trigonomtryNumber = `${moduleOfNumber}(cos(${fiRad})+isin(${fiRad}))`;
	}
	return trigonomtryNumber;
}

const radInDeg = (rad) => {
	let degs = (180/Math.PI) * rad;
	return degs;
}

const radWithPi = (rad, degs) => {
	for (let i = 90; i >= 2; i--) {
		if (180 % i == 0 && degs % i == 0) {
			//alert(`i = ${180 / i}`);
			return i;
			break;
		} else {
			return degs
		}
	}
	//let x = 180 / degs;
	
}

//alert(Math.PI);

const calculate = (realPart, imaginaryPart) => {
	//console.log(`${realPart}\n${imaginaryPart}`);
	//let parts = [];
	let returnedString = '';
	let realReturn = new Fraction(realPart);
	let realReturnFrac = realReturn.toFraction(true);
	let imaginaryReturn = new Fraction(imaginaryPart);
	//console.log(`1. imaginaryReturn: ${imaginaryReturn.s}`);
	let imaginaryReturnFrac = imaginaryReturn.toFraction(true);
	//console.log(`2. realReturnFrac: ${realReturnFrac}\nimaginaryReturnFrac: ${imaginaryReturnFrac}\nimaginaryReturn: ${imaginaryReturn}`);
	if (checkNull(realReturnFrac) == '' && checkNull(imaginaryReturnFrac) == '') {
		returnedString = `0`;
	} else if (checkNull(imaginaryReturnFrac) == 0) {
		returnedString = realReturnFrac;
	} else if (checkNull(realReturnFrac) == 0) {
		returnedString = `${imaginaryReturnFrac}i`;
	} else {
		if (imaginaryReturn.s >= 0) {
			returnedString = (`${realReturnFrac} +${checkImaginary(imaginaryReturnFrac)}i`);
		} else {
			//console.log(checkImaginary(imaginaryReturnFrac));
			returnedString = (`${realReturnFrac} ${checkImaginary(imaginaryReturnFrac)}i`);
		}	
	}

	if (checkNull(realPart) == '' && checkNull(imaginaryPart) == '') {
		return [0, returnedString, [realPart, checkImaginary(imaginaryPart), imaginaryPart]];
	} else if (checkNull(imaginaryPart) == 0) {
		return [realPart.toString(), returnedString, [realPart, checkImaginary(imaginaryPart), imaginaryPart]];
	} else if (checkNull(realPart) == 0) {
		return [`${imaginaryPart}i`, returnedString, [realPart, checkImaginary(imaginaryPart), imaginaryPart]];
	} else {
		if (imaginaryPart >= 0) {
			//console.log(`imaginaryPart: ${imaginaryPart}`);
			return ([`${(realPart)} +${checkImaginary(imaginaryPart)}i`, returnedString, [realPart, checkImaginary(imaginaryPart), imaginaryPart]]);
		} else {
			//console.log(checkImaginary(imaginaryReturnFrac));
			return ([`${(realPart)} ${checkImaginary(imaginaryPart)}i`, returnedString, [realPart, checkImaginary(imaginaryPart), imaginaryPart]]);
		}
	}
			
};

/*let fdfd1 = new complex(1, -1);
let fdfd2 = new complex(1, 0);
alert(`${calculate(fdfd1.real + fdfd2.real, fdfd1.imaginary + fdfd2.imaginary)}`);*/

const checkTextBoxValue = (num) => {
	if (num == '') {
		return 0;
	} else {
		return parseFloat(num);
	}
}

button.addEventListener('click', () => {
	
	let tmp = 0;
	let outputForPlot = {
		real: 0,
		imag: 0
	};
	let valuesX = '';
	let valuesY = '';
	let outputString = '';
	let outputArray = [];
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
			outputArray = calculate(complexNumber1.real + complexNumber2.real, complexNumber1.imaginary + complexNumber2.imaginary);
			break;
		case '-':
			outputArray = calculate(complexNumber1.real - complexNumber2.real, complexNumber1.imaginary - complexNumber2.imaginary);
			break;
		case '*':
			outputArray = calculate(complexNumber1.real * complexNumber2.real - (complexNumber1.imaginary * complexNumber2.imaginary),  complexNumber1.real * complexNumber2.imaginary + complexNumber1.imaginary * complexNumber2.real);
			break;
		case '/':
			outputArray = calculate((complexNumber1.real * complexNumber2.real + complexNumber1.imaginary * complexNumber2.imaginary)/(complexNumber2.real * complexNumber2.real + complexNumber2.imaginary * complexNumber2.imaginary), (complexNumber2.real * complexNumber1.imaginary - complexNumber1.real * complexNumber2.imaginary)/(complexNumber2.real * complexNumber2.real + complexNumber2.imaginary * complexNumber2.imaginary));
			break;
	}
	outputString = `${outputArray[0]}`;
	let trigonometricNotationOfNumber = trigonometricNotation(outputArray[2][0], outputArray[2][2]);
	alert(`тригонометрическая запись: ${trigonometricNotationOfNumber}\n\nалгебраическая запись: ${outputString}`);
	//alert(`outputArray[0]: ${outputArray[0]}`)
	if (outputArray[0].includes(' +')) {
		tmp = outputArray[0].split(' +');
		im = tmp[1].slice(0, -1);
		if (im == '') {
			im = 1;
		}
		outputForPlot = {
			real: tmp[0],
			imag: im
		}
		alert(`1. outputForPlot.real: ${outputForPlot.real}\noutputForPlot.imag: ${outputForPlot.imag}`)
	} else if (outputArray[0].includes(' ')) {
		tmp = outputArray[0].split(' ');
		im = tmp[1].slice(0, -1);
		if (im == '-') {
			im = -1;
		}
		outputForPlot = {
			real: tmp[0],
			imag: im
		}
		alert(`2. outputForPlot.real: ${outputForPlot.real}\noutputForPlot.imag: ${outputForPlot.imag}`)
	} else if (outputArray[0].includes('i')){
		tmp = outputArray[0].split('i');
		//console.log(outputArray)
		outputForPlot = {
			real: 0,
			imag: tmp[0]
		}
		alert(`3. outputForPlot.real: ${outputForPlot.real}\noutputForPlot.imag: ${outputForPlot.imag}`)
	} else {
		outputForPlot = {
			real: outputArray[0],
			imag: 0
		}
		alert(`4. outputForPlot.real: ${outputForPlot.real}\noutputForPlot.imag: ${outputForPlot.imag}`)
	}
	
	valuesX = `-10:10:1`;
	valuesY = `-10:10:1`;
	//console.log(valuesX);


	let chartConfig = {
  		type: 'line',
  		theme: 'classic',
  		backgroundColor: '#fff',
  		//flat: true,
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
    		/*animation: {
      		effect: 'ANIMATION_SLIDE_LEFT',
      		method: 'ANIMATION_REGULAR_EASE_OUT',
      		sequence: 'ANIMATION_BY_PLOT',
      		speed: 200,
    		},*/
    		marker: {
      			visible: false
    		},
    		tooltip: {
      			visible: false
    		}
  		},
  		/*plotarea: {
    		margin: 'dynamic'
  		},*/
  		scaleX: {
    		//format: '%v°',
    		values: valuesX,
    		//itemsOverlap: true,
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
	    	values: '-20:20:2',
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
	      		values: fun(outputForPlot.real, outputForPlot.imag),
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

	//console.log(`6. \noutputForPlot.real: ${outputForPlot.real}\noutputForPlot.imag: ${outputForPlot.imag}`);
	zingchart.render({
      id: 'myChart',
      data: chartConfig,
      output: 'canvas',
      height: '145%',
      width: '100%',
    });
		
});

const fun = (real, imag) => {
	//console.log(`real: ${real} imag: ${imag} ${imag/real}`);
	let v = [];
	let endValue = 0;
	if (real > 0) {
		for (let i = 0; i <= real; i+=0.1) {
			endValue = (imag/real) * i;
			v.push([i, endValue]);
			console.log(`i = ${i}\nendValue = ${endValue}\nv = ${v}\n`);
		}
	} else if (real < 0){
		//console.log('123123');
		for (let i = 0; i >= real; i-=0.1) {
			endValue = (imag/real) * i;
			
			v.push([i, endValue]);
			//console.log(`i = ${i}\nendValue = ${endValue}\nv = ${v}`);
		}
	} else {
		//alert(`real is 0`);
		if (imag > 0) {
			for (let i = 0; i <= imag; i += 0.1) {
				v.push([0, i]);
			}
		} else if (imag < 0) {
			for (let i = 0; i >= imag; i -= 0.1) {
				v.push([0, i]);
			}
		}
	}
	//v.push(0, endValue);
	return v;
};






