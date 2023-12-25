const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector('[data-lengthNumber]');
const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copyBtn=document.querySelector('[data-copy]');
const copyMsg=document.querySelector('[data-copyMsg]');
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolsCheck=document.querySelector('#symbols');
const indicator=document.querySelector('[data-indicator]');
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll('input[type=checkbox]');

const symbols = "!@#$%^&*()-=+[]{}|;:,.<>?/";
let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();

function handleSlider(){
    passwordLength=inputSlider.value;
    lengthDisplay.innerText=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";

}
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


//setting Indicator functionalities
function setIndicator(colorCode){
    indicator.style.backgroundColor=colorCode;
    indicator.style.boxShadow = `0px 0px 12px 1px ${colorCode}`;
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasSymbols=false;
    let hasNumbers=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(symbolsCheck.checked) hasSymbols=true;
    if(numbersCheck.checked) hasNumbers=true;

    if(passwordLength>=8 && (hasLower||hasUpper) && (hasNumbers||hasSymbols)){
        setIndicator('#0f0');
    }
    else if(passwordLength>=6 && (hasUpper || hasLower) && (hasNumbers || hasSymbols)){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

// getting Random number 
function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

//getting random Uppercase letter
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));    
}
//getting random Lowercase letter
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
//getting random Number
function generateRandomInteger(){
    return getRndInteger(0,9);
}
//getting random Symbols
function generateSymbols(){
    return symbols.charAt(getRndInteger(0,symbols.length));
}


// adding Event Listeners 
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((individualBox)=>{
       if(individualBox.checked){
           checkCount++;
       }
    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        inputSlider.value=checkCount;
        handleSlider();
    }

}
allCheckBox.forEach((individualbox)=>{
    individualbox.addEventListener('click',handleCheckBoxChange)
});


function shufflePassword(shufflePass){
    for (let i = shufflePass.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [shufflePass[i], shufflePass[j]] = [shufflePass[j], shufflePass[i]];
      }
      let str="";
      shufflePass.forEach((el)=>{
        str+=el;
      })
      return str;
}

//Main event Listener 

generateBtn.addEventListener('click',()=>{
    password="";
    handleCheckBoxChange();
    if(checkCount==0){
        password="";
        passwordDisplay.value=password;
        return;
    }    
    let funcArray=[];
    if(uppercaseCheck.checked) funcArray.push(generateUpperCase);
    if(lowercaseCheck.checked) funcArray.push(generateLowerCase);
    if(numbersCheck.checked) funcArray.push(generateRandomInteger);
    if(symbolsCheck.checked) funcArray.push(generateSymbols);

    for(let i=0;i<funcArray.length;i++){
        password+=funcArray[i]();
    }

    for(let i=0;i<passwordLength-funcArray.length;i++){
        let tempIndex=getRndInteger(0,funcArray.length);
        password+=funcArray[tempIndex]();
    }

    //shuffling password
    password=shufflePassword(Array.from(password));

    passwordDisplay.value=password;
    calcStrength();

})

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed to copy";
    }
    copyMsg.classList.add('active');
    setTimeout(()=>{
        copyMsg.classList.remove('active');
    },2000);

}

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value) copyContent();
})