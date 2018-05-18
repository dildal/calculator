var expression = "";
var temp = "";
var invalidDecimal;
var invalidOp;
var equals = false;

$('button').on("click", function(){
	var clicked = $(this).val();
	console.log(clicked);
	if(clicked === "="){
		invalidDecimal = false;
		invalidOp = false;
		equals = true;
		expression += temp;
		temp = "";
		if(/(\-?[\d]*\.?[\d]+)([\*\-\+\/])(\-?[\d]*\.?[\d]+)/.test(expression)
		  || /^-?\d+\.?\d*$/.test(expression)) {
			$('#sub-display').text(expression);
			expression = evaluate(expression);
			$('#main-display').text(expression);
		}
		else{
			console.log("error not a valid expression");
			expression = "";
			test = "";
			$('#main-display').empty();
			$("#sub-display").empty();
		}

	}
	else if(clicked === "ac"){
		invalidDecimal = false;
		invalidOp = false;
		expression = "";
		temp = '';
		$('#main-display').empty();
		$("#sub-display").empty();
	}
	else if(clicked === "ce"){
		//just clear the number thats was just typed no expression string
		invalidDecimal = false;
		invalidOp = false;
		temp ="";
		$('#main-display').empty();
	}
	else if(clicked === "."){
		if(!invalidDecimal){
			temp += "."
			ivalidDecimal = true;
		}

	}

	else if(clicked === "*" || clicked === "-" ||
			 clicked === "/" || clicked === "+")
	{
		invalidDecimal = false;
		if(!invalidOp){
			expression += temp;
			$('#main-display').text(clicked);
			$('#sub-display').text(expression)
			expression += clicked;
			temp = "";
			invalidOp = true;
			equals = false
		}

	}

	else {
		if(equals){
			expression = ""
			equals = false;
		}
		invalidOp = false;
		temp += clicked;
		$('#main-display').text(temp);
	}
});


function evaluate(expr){
	console.log("we in hea");
	console.log("expression string looks like : " + expr);
	while(expr.search(/(\d+\-)|[\+\*\/]/) != -1){
		if(expr.search(/[/\*]/) != -1){
			expr = expr.replace(/(\-?[\d]*\.?[\d]+)([\*])(\-?[\d]*\.?[\d]+)/,multiply);
			expr = expr.replace(/(\-?[\d]*\.?[\d]+)([\/])(\-?[\d]*\.?[\d]+)/,divide);
		}
		else {
			expr = expr.replace(/(\-?[\d]*\.?[\d]+)(\+)(\-?[\d]*\.?[\d]+)/, add);
			expr = expr.replace(/(\-?[\d]*\.?[\d]+)([-])(\-?[\d]*\.?[\d]+)/,subtract);
		}
		console.log("expression string looks like (might be stuck here) " + expr);
	}
	return expr;
}

function add(match, num1, op, num2, offset, string){
	return String(Number(num1) + Number(num2));
}

function subtract(match, num1, op, num2, offset, string){
	return String(Number(num1) - Number(num2));
}

function multiply(match, num1, op, num2, offset, string){
	return String(Number(num1) * Number(num2));
}

function divide(match, num1, op, num2, offset, string){
	return String(Number(num1) / Number(num2));
}

$('button').on("mouseenter", function(){
	$(this).css("background", "rgba(255, 255, 255, 0.1)");
});

$('button').on("mouseleave", function(){
	$(this).css("background", "black");
});

$('button').on("mousedown", function(){
     $(this).css("background", "black");
});

$('button').on("mouseup", function(){
     $(this).css("background", "rgba(255, 255, 255, 0.1)");
});


