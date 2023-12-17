async function utility(){

    let delhimausam=new Promise((resolve,reject)=>{
      setTimeout(function(){
        resolve("Delhi bahut garmi hei");
      },2000);
  })
    let banglore=new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve("Banglore is cool");
      },8000);
    })
   let d= delhimausam;
    let b= banglore;
  return [d,b];
  
  }
  console.log("HYelloooooooo");
  function hai(){
    console.log("Hai printed!!!");
  }
