document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.answer');//used to display the answer
    const resetButton = document.querySelector('.reset-key');
    const operatorButtons = document.querySelectorAll('.operator-btn');
    const digitButtons = document.querySelectorAll('.digit-keys');
    const dotButton = document.querySelector('.dot-key');
    const equalButton = document.querySelector('.equal-key');
    const delButton = document.querySelector('.del-key');//also used to change their bg colors

    //checkbox to change between colors
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const bodycolor = document.body;
    const toogle_switch = document.querySelector(".toggle-switch");
    const themeIndication = document.querySelectorAll(".text-color1");
    const display_screen = document.querySelector(".display-screen");//used to change between background colors
    const keypad = document.querySelector(".keypad");

    //create the operands and operator const
    let currentOperand = '';
    let previousOperand = '';
    let operator = null;


    //section of the program to change between theme colors

    option1.addEventListener("click", () =>{
        if(option1.checked){
            change_themes(bodycolor,"body-color1","body-color2","body-color3");
            change_themes(toogle_switch, "theme1-toogle-bg","theme2-toogle-bg","theme3-toogle-bg");
            change_themes(keypad, "theme1-toogle-bg","theme2-toogle-bg","theme3-toogle-bg");
                   
            themeIndication.forEach(theme => {
                change_themes(theme,"text-color1","text-color2","text-color3" )
            })
            digitButtons.forEach(digit => {
                change_themes(digit,"t1-key1-bgcolor","t2-key1-bgcolor","t3-key1-bgcolor");
            })
            operatorButtons.forEach(operator => {
                change_themes(operator, "t1-key1-bgcolor","t2-key1-bgcolor","t3-key1-bgcolor");
            })

            change_themes(display_screen, "display-screen-bg1","display-screen-bg2","display-screen-bg3");            
            change_themes(dotButton, "t1-key1-bgcolor","t2-key1-bgcolor","t3-key1-bgcolor");
            change_themes(delButton, "t1-key2-bgcolor","t2-key2-bgcolor","t3-key2-bgcolor");
            change_themes(resetButton, "t1-key2-bgcolor","t2-key2-bgcolor","t3-key2-bgcolor");   
            change_themes(equalButton, "t1-key3-bgcolor","t2-key3-bgcolor","t3-key3-bgcolor");
        }
    })
    option2.addEventListener("click", () =>{
        if(option2.checked){
            change_themes(bodycolor, "body-color2","body-color1","body-color3");
            change_themes(toogle_switch,"theme2-toogle-bg","theme1-toogle-bg","theme3-toogle-bg");
            change_themes(keypad, "theme2-toogle-bg","theme1-toogle-bg","theme3-toogle-bg");

            themeIndication.forEach(theme => {
                change_themes(theme,"text-color2","text-color1","text-color3");
            })
            digitButtons.forEach(digit => {
                change_themes(digit,"t2-key1-bgcolor","t1-key1-bgcolor","t3-key1-bgcolor");
            })
            operatorButtons.forEach(operator => {
                change_themes(operator, "t2-key1-bgcolor","t1-key1-bgcolor","t3-key1-bgcolor");
            })

            change_themes(display_screen,"display-screen-bg2","display-screen-bg1","display-screen-bg3");
            change_themes(dotButton,"t2-key1-bgcolor","t1-key1-bgcolor","t3-key1-bgcolor");
            change_themes(delButton, "t2-key2-bgcolor","t1-key2-bgcolor","t3-key2-bgcolor");
            change_themes(resetButton, "t2-key2-bgcolor","t1-key2-bgcolor","t3-key2-bgcolor");   
            change_themes(equalButton, "t2-key3-bgcolor","t1-key3-bgcolor","t3-key3-bgcolor");
        }
    })
    option3.addEventListener("click", () =>{
        if(option3.checked){
            change_themes(bodycolor, "body-color3","body-color2","body-color1");
            change_themes(toogle_switch, "theme3-toogle-bg","theme2-toogle-bg","theme1-toogle-bg");
            change_themes(keypad, "theme3-toogle-bg","theme2-toogle-bg","theme1-toogle-bg");

            themeIndication.forEach(theme => {
                change_themes(theme,"text-color3","text-color1","text-color2");
            })
            digitButtons.forEach(digit => {
                change_themes(digit, "t3-key1-bgcolor", "t2-key1-bgcolor","t1-key1-bgcolor");
            })
            operatorButtons.forEach(operator => {
                change_themes(operator, "t3-key1-bgcolor","t2-key1-bgcolor","t1-key1-bgcolor");
            })
            
            change_themes(display_screen, "display-screen-bg3","display-screen-bg2", "display-screen-bg1");
            change_themes(dotButton, "t3-key1-bgcolor", "t1-key1-bgcolor", "t2-key1-bgcolor");
            change_themes(delButton, "t3-key2-bgcolor", "t1-key2-bgcolor", "t2-key2-bgcolor");
            change_themes(resetButton, "t3-key2-bgcolor", "t1-key2-bgcolor", "t2-key2-bgcolor");   
            change_themes(equalButton, "t3-key3-bgcolor", "t1-key3-bgcolor", "t2-key3-bgcolor");
        }
    })

    function change_themes(cont_name, add_theme, remove_theme1, remove_theme2){
        cont_name.classList.add(add_theme);
        cont_name.classList.remove(remove_theme1);
        cont_name.classList.remove(remove_theme2);
    }


    //part of the program that handles collecting digits and then calculating them as they are asked
    digitButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            appendDigit(button.getAttribute('data-number'));
            updateDisplay();
        });
    });

    resetButton.addEventListener('click', function() {
        clear();
        updateDisplay();
    });

    delButton.addEventListener('click', function() {
        deleteDigit();
        updateDisplay();
    });

    dotButton.addEventListener('click', function() {
        appendDot();
        updateDisplay();
    });

    equalButton.addEventListener('click', function() {
        if (currentOperand !== '' && previousOperand !== '' && operator !== null) {
            calculate();
            operator = null;
            updateDisplay();
        }
    });

    function appendDigit(digit) {
        if (currentOperand === '0' && digit === '0') return;
        if (currentOperand === '0' && digit !== '0') currentOperand = '';
        currentOperand += digit;
    }

    function appendDot() {
        if (currentOperand.includes('.')) return;
        currentOperand += '.';
    }

    function deleteDigit() {
        currentOperand = currentOperand.toString().slice(0, -1);
        if (currentOperand === '') currentOperand = '0';
    }

    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operator = null;
    }
    
    operatorButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (currentOperand !== '') {
                if (previousOperand !== '') {
                    calculate();
                    updateDisplay(); 
                }
                operator = button.getAttribute('data-operator');
                previousOperand = currentOperand;
                currentOperand = '';
                
            }
            if (currentOperand === '' && previousOperand !== '') {
                operator = button.getAttribute('data-operator');
            }
        });
    });

    function calculate() {
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        let result;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        previousOperand = '';
    }

    function updateDisplay() {
        display.innerHTML = currentOperand;
    }

    clear();
});