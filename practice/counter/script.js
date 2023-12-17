
let plus=document.getElementById('plus');
let minus=document.getElementById('minus');
 function addition(){
    let num=document.getElementById('number');
    let x=parseInt(num.innerText);
    x+=1;
    num.textContent=x.toString();
 }
 function subtraction(){
    let num=document.getElementById('number');
    let x=parseInt(num.innerText);
    x-=1;
    num.textContent=x.toString();
 }
// plus.addEventListener('click',function(){
//     let num=document.getElementById('number');
//     let x=parseInt(num.innerText);
//     x+=1;
//     num.innerText=x.toString();
// })
// minus.addEventListener('click',function(){
//     let num=document.getElementById('number');
//     let x=parseInt(num.innerText);
//     x-=1;
//     num.innerText=x.toString();
// })
