'use strict';
{
  const words = [
     '1','q','a','z','2','w','s','x','3','e','d','c','4','r','f','v','5','t','g','b','6','y','h','n','7','u','j','m','8','i','k',',','9','o','l','.','0','p',';','/','-','@',':','^','[',']',
  ];

  const fingers = [
     'leftpinkie','leftpinkie','leftpinkie','leftpinkie','leftring','leftring','leftring','leftring','leftmiddle','leftmiddle','leftmiddle','leftmiddle','leftindex','leftindex','leftindex','leftindex','leftindex','leftindex','leftindex','leftindex','rightindex','rightindex','rightindex','rightindex','rightindex','rightindex','rightindex','rightindex','rightmiddle','rightmiddle','rightmiddle','rightmiddle','rightring','rightring','rightring','rightring','rightpinkie','rightpinkie','rightpinkie','rightpinkie','rightpinkie','rightpinkie','rightpinkie','rightpinkie','rightpinkie','rightpinkie',
  ];
  
  let num = Math.floor(Math.random() * words.length);
  let word = words[num];
  let finger = fingers[num];

  let loc;
  let score;
  let miss;
  const timelimit = 300*1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scorelabel = document.getElementById('score');
  const misslabel = document.getElementById('miss');
  const timerlabel = document.getElementById('timer');

  const Leftpinkie = document.getElementById('leftpinkie');
  const Leftring = document.getElementById('leftring');
  const Leftmiddle = document.getElementById('leftmiddle');
  const Leftindex = document.getElementById('leftindex');
  const Leftthumb = document.getElementById('leftthumb');

  const Rightpinkie = document.getElementById('rightpinkie');
  const Rightring = document.getElementById('rightring');
  const Rightmiddle = document.getElementById('rightmiddle');
  const Rightindex = document.getElementById('rightindex');
  const Rightthumb = document.getElementById('rightthumb');
  

  function updateTarget(){
    target.textContent = word;
  }

  function updateFinger(){
    console.log(finger);
    if(finger === "leftpinkie"){
      Leftpinkie.classList.remove("nonactive");
      Leftpinkie.classList.add("inactive");
    }else if(finger === "leftring"){
      Leftring.classList.remove("nonactive");
      Leftring.classList.add("inactive");
    }else if(finger === "leftmiddle"){
      Leftmiddle.classList.remove("nonactive");
      Leftmiddle.classList.add("inactive");
    }else if(finger === "leftindex"){
      Leftindex.classList.remove("nonactive");
      Leftindex.classList.add("inactive");
    }else if(finger === "rightpinkie"){
      Rightpinkie.classList.remove("nonactive");
      Rightpinkie.classList.add("inactive");
    }else if(finger === "rightring"){
      Rightring.classList.remove("nonactive");
      Rightring.classList.add("inactive");
    }else if(finger === "rightmiddle"){
      Rightmiddle.classList.remove("nonactive");
      Rightmiddle.classList.add("inactive");
    }else if(finger === "rightindex"){
      Rightindex.classList.remove("nonactive");
      Rightindex.classList.add("inactive");
    }
  }

  function FingerReset(){
    if(Leftpinkie.classList.contains("inactive")){
      Leftpinkie.classList.remove("inactive");
      Leftpinkie.classList.add("nonactive");
    }else if(Leftring.classList.contains("inactive")){
      Leftring.classList.remove("inactive");
      Leftring.classList.add("nonactive");
    }else if(Leftmiddle.classList.contains("inactive")){
      Leftmiddle.classList.remove("inactive");
      Leftmiddle.classList.add("nonactive");
    }else if(Leftindex.classList.contains("inactive")){
      Leftindex.classList.remove("inactive");
      Leftindex.classList.add("nonactive");
    }else if(rightpinkie.classList.contains("inactive")){
      rightpinkie.classList.remove("inactive");
      rightpinkie.classList.add("nonactive");
    }else if(rightring.classList.contains("inactive")){
      rightring.classList.remove("inactive");
      rightring.classList.add("nonactive");
    }else if(rightmiddle.classList.contains("inactive")){
      rightmiddle.classList.remove("inactive");
      rightmiddle.classList.add("nonactive");
    }else if(rightindex.classList.contains("inactive")){
      rightindex.classList.remove("inactive");
      rightindex.classList.add("nonactive");
    }
  }


  function updateTimer(){
    const timeLeft = startTime + timelimit - Date.now();
    timerlabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if(timeLeft < 0){
      isPlaying = false;
      clearTimeout(timeoutId);
      timerlabel.textContent = '0.00';
      setTimeout(()=>{
        showResult();
      },100);

      FingerReset();
      target.textContent = `space to replay`;
    }

    
  }

  function showResult(){
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}%`);
  }

  window.addEventListener('keydown',(e)=> {
    
    if(e.key === " ")
    {
      if(isPlaying === true){
        return;
      }
      isPlaying = true;
  
      loc = 0;
      score = 0;
      miss = 0;
      scorelabel.textContent = score;
      misslabel.textContent = miss;
      word = words[num];
  
      target.textContent = word;
      updateFinger();
      startTime = Date.now();
      updateTimer();
      
      window.addEventListener('keydown',(e)=>{
        
        if(isPlaying !== true){
          return;
        }
        
        if(e.key === word[loc]){
          loc++;
          
          if(loc === word.length){
            num = Math.floor(Math.random() * words.length);
            word = words[num];
            finger = fingers[num];
            FingerReset();
            loc = 0;
          }
          
          updateTarget();
          updateFinger();
          
          score++;
          scorelabel.textContent = score;
        }else{
          miss++;
          misslabel.textContent = miss;
        }
        
      });
      
    }else{
      return;
    }
    
  });
}