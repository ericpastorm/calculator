let num1 = 0;
let num2 = 0;
let resultTot = 0;
let operator = "";
let num1Done = false;
let num2Done = false;
let allDone = false;
let decimal = false;
let strScreen = "";
const btnsNumbers = []
const btnsOperators = []
const txtScreen = document.querySelector(".textScreen");

function operate(numa, numb, operator){
    numa = +numa;
    numb = +numb;
    switch (operator) {
        case "+":
            resultTot = (numa + numb);
            roundNumbers(resultTot);
            displayText(resultTot, false);
            break;
        case "-":
            resultTot = (numa - numb);
            roundNumbers(resultTot);
            displayText(resultTot, false);
            break;
        case "*":
            resultTot = (numa * numb);
            roundNumbers(resultTot);
            displayText(resultTot, false);
            break;
        case "/":
            resultTot = (numa / numb);
            roundNumbers(resultTot);
            displayText(resultTot, false);
        default:
            break;
    }
    num1 = +resultTot;
    num1Done = false;
    num2 = 0;
    num2Done = false;
    operator = "";
    allDone = false;
    sizeFontDinamic();
}
function roundNumbers(num){
 if(!Number.isInteger(num)){
    resultTot = resultTot.toFixed(1);
 } else {
    resultTot = resultTot.toFixed(0);
 }
 if(String(resultTot).length >= 16){
        resultTot = Number(resultTot).toExponential(10);
 }
}
function sizeFontDinamic(){
    if(txtScreen.textContent.length < 12){
        txtScreen.style.fontSize = "35px";
    } else if(txtScreen.textContent.length > 12 && txtScreen.textContent.length < 16){
        txtScreen.style.fontSize = "32px";
    } else if(txtScreen.textContent.length > 16 && txtScreen.textContent.length < 20){
        txtScreen.style.fontSize = "25px";
    } else if(txtScreen.textContent.length > 20 && txtScreen.textContent.length < 24){
        txtScreen.style.fontSize = "20px";
    } else if(txtScreen.textContent.length > 24 && txtScreen.textContent.length < 40){
        txtScreen.style.fontSize = "16px";
    } 
}
function displayText(str, add){
    if(!num1Done){
        if(add){
        txtScreen.textContent += str;
        } else{
        txtScreen.textContent = str;
        }
        strScreen = txtScreen.textContent;
    } else {
        if(add){
            if(str == "."){
                txtScreen.textContent = strScreen+num2+str;
            } else {
                txtScreen.textContent = strScreen+str;
            }
        } else{
        txtScreen.textContent = str;
        strScreen = txtScreen.textContent;
        }
    }
}
const concatenateNumbers = function(num1, num2) {
    if(num1 == 0){
        if(decimal){
            decimal = false;
            return "." + String(num2);
        } else{
            return String(num2)
        }
    } else {
        if(decimal){
            decimal = false;
            return String(num1) + "." +String(num2);
        } else{
            return String(num1) + String(num2);
        }
    }
};
function addNumbers(num){
    if(!num1Done){
        sizeFontDinamic();
        num1 = concatenateNumbers(num1, num);
        displayText(num1, false);
        num1 = +num1;
    } else if(!num2Done){
        sizeFontDinamic()
        num2 = concatenateNumbers(num2, num);
        displayText(num2, true)
        num2 = +num2;
    }
}
function addOperations(opt){
    if(!allDone){
        operator = opt;
        displayText(operator, true)
        if(num1Done){
            strScreen += operator;
        }
        num1Done = true;
        num2Done = false;
    }
    allDone = true;
}
function cleanAll(){
    num1 = 0;
    num2 = 0;
    operator = "";
    resultTot = 0;
    num1Done = false;
    displayText("");
    strScreen = "";
    allDone = false;
    decimal = false;
    sizeFontDinamic();
}
function deleteOne(){
    if(!num1Done){
        if(num1 == 0){

        } else {
            let tmp = txtScreen.textContent.slice(0, -1);
            displayText(tmp, false)
            if(!decimal){
                let tmpNum = +String(num1).slice(0, -1);
                num1 = tmpNum;
                displayText(num1, false)
            } else {
                decimal = false;
            }
            if(num1 == 0){
                displayText(num1, false)
            }
        }
    } else if(!num2Done){
        if(num2 == 0){

        } else {
            let tmp = txtScreen.textContent.slice(0, -1);
            displayText(tmp, false)
            if(!decimal){
                let tmpNum = +String(num2).slice(0, -1);
                num2 = tmpNum;
                displayText(num2, true)
            }else {
                decimal = false;
            }
            if(num2 == 0){
                displayText(num2, true)
            }
        }
    }
}
function makeDecimals(){
    if(!num1Done){
        if(Number.isInteger(num1) && !decimal){
        decimal = true;
        displayText(".", true)
        }
    } else if(!num2Done){
        if(Number.isInteger(num2) && !decimal){
        decimal = true;
        displayText(".", true)
        }
    }
}
function startOperators(){
    btnsOperators.push(document.querySelector("#btndot").addEventListener("click", function (e) {
        makeDecimals();
      }))
    btnsOperators.push(document.querySelector("#btndel").addEventListener("click", function (e) {
        deleteOne();
      }))
    btnsOperators.push(document.querySelector("#btnresult").addEventListener("click", function (e) {
        operate(num1, num2, operator);
      }))
    btnsOperators.push(document.querySelector("#btnAC").addEventListener("click", function (e) {
        cleanAll();
      }))
    btnsOperators.push(document.querySelector("#divide").addEventListener("click", function (e) {
        opt = "/";
        addOperations(opt);
      }))
    btnsOperators.push(document.querySelector("#multiply").addEventListener("click", function (e) {
        opt = "*";
        addOperations(opt);
      }))
    btnsOperators.push(document.querySelector("#substract").addEventListener("click", function (e) {
        opt = "-";
        addOperations(opt);
      }))
    btnsOperators.push(document.querySelector("#add").addEventListener("click", function (e) {
        opt = "+";
        addOperations(opt);
      }))
}
function startAll(){
    for (let i = 0; i < 10; i++) {
        btnsNumbers.push(document.querySelector("#btn"+i).addEventListener("click", function (e) {
        numBtn = i;
        addNumbers(numBtn);
      }))
    }
    startOperators();
}
startAll();