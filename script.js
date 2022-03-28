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
	//console.log(`4. expression: ${expression}`)
	if (expression === 1 ) {
		return ``;
	} else if (expression === -1) {
		return `-`;
	}
	return expression;
}//проверка мнимой части для красиво вывода

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
		returnedString = 0;
	} else if (checkNull(imaginaryReturnFrac) == 0) {
		returnedString = realReturnFrac;
	} else if (checkNull(realReturnFrac) == 0) {
		return `${imaginaryReturnFrac}i`;
	} else {
		if (imaginaryReturn.s >= 0) {
			returnedString = (`${realReturnFrac} +${checkImaginary(imaginaryReturnFrac)}i`);
		} else {
			//console.log(checkImaginary(imaginaryReturnFrac));
			returnedString = (`${realReturnFrac} ${checkImaginary(imaginaryReturnFrac)}i`);
		}	
	}

	if (checkNull(realPart) == '' && checkNull(imaginaryPart) == '') {
		return 0;
	} else if (checkNull(imaginaryPart) == 0) {
		return realPart;
	} else if (checkNull(realPart) == 0) {
		return `${imaginaryPart}i`;
	} else {
		if (imaginaryPart >= 0) {
			//console.log(returnedString);
			return ([`${(realPart).toFixed(5)} +${(checkImaginary(imaginaryPart)).toFixed(5)}i`, returnedString]);
		} else {
			//console.log(checkImaginary(imaginaryReturnFrac));
			return ([`${(realPart).toFixed(5)} ${(checkImaginary(imaginaryPart)).toFixed(5)}i`, returnedString]);
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
	outputString = `${outputArray[1]}`
	alert(outputString);
	if (outputArray[0].includes(' +')) {
		tmp = outputArray[0].split(' +');
		outputForPlot = {
			real: tmp[0],
			imag: tmp[1].slice(0, -1)
		}
	} else if (outputArray[0].includes(' ')) {
		tmp = outputArray[0].split(' ');
		outputForPlot = {
			real: tmp[0],
			imag: tmp[1].slice(0, -1)
		}
	} else if (outputArray[0].includes('i')){
		tmp = outputArray[0].split('i');
		console.log(outputArray)
		outputForPlot = {
			real: 0,
			imag: tmp[0]
		}
	} else {
		outputForPlot = {
			real: outputArray[0],
			imag: 0
		}
	}

	valuesX = `-10:10:1`;
	valuesY = `-10:10:1`;
	console.log(valuesX);


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
	    	values: '-20:20:1',
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
      height: '120%',
      width: '100%',
    });
		
});

const fun = (real, imag) => {
	console.log(`real: ${real} imag: ${imag} ${imag/real}`)
	let v = [];
	let endValue = 0;
	if (real >= 0) {
		for (let i = 0; i <= real; i+=0.1) {
			endValue = (imag/real) * i;
			v.push([i, endValue]);
			console.log(`i = ${i}\nendValue = ${endValue}\nv = ${v}`);
		}
	} else {
		console.log('123123');
		for (let i = 0; i >= real; i-=0.1) {
			endValue = (imag/real) * i;
			
			v.push([i, endValue]);
			console.log(`i = ${i}\nendValue = ${endValue}\nv = ${v}`);
		}
	}
	//v.push(0, endValue);
	return v;
};






