class Game {
  constructor() {
    this.bullet = 14;
    this.lifeLine = 1;
    this.counter = 0;
    this.audio = 0;
  }

  start() {
    const intervalId1 = setInterval(()=>{
        const newBird = new AngryBird();
        newBird.aBirdElm.addEventListener("click", (e) => {
          this.audio = 1;
          if(this.bullet>0)
          {
            newBird.aBirdElm.style.display = "none";
            newBird.aBirdElm.remove();
            document.getElementById("currentScore").innerHTML = ++this.counter;
          }
          
          
        });
    },1000)

    const intervalId2 = setInterval(()=>{
      const newBombBird = new BombBird();
      newBombBird.bBirdElm.addEventListener("click",(e)=>{   
        this.audio = 2;
        if(this.bullet>0)
        {
          newBombBird.bBirdElm.style.display = "none";
          newBombBird.bBirdElm.remove();
          if(this.lifeLine===0)
          {
          
            location.href = "./gameOver.html"
          }
          document.getElementById("currentScore").innerHTML = --this.counter;
          this.lifeLine = 0;
          document.getElementById("currentlifeLine").innerHTML = this.lifeLine;
        }
        
      })
    },3000)
    
    setTimeout(()=>{
      clearInterval(intervalId1)
      clearInterval(intervalId2)
    },12000)

    setTimeout(()=>{
      const newLifeLine = new LifeLine();
      newLifeLine.lifeLineEle.addEventListener("click",()=>{
        this.audio=3;
        newLifeLine.lifeLineEle.style.display = "none";
        newLifeLine.lifeLineEle.remove();    
        if(this.lifeLine===0)
        {
          document.getElementById("currentlifeLine").innerHTML = ++this.lifeLine;
          const b2 = setInterval(()=>{
            document.getElementById("lifeline").style.fontSize = 70 + "px"
            document.getElementById("lifeline").style.color = "Yellow"
          },1000)
          setTimeout(()=>{
            clearInterval(b2);
            document.getElementById("lifeline").style.fontSize = 40 + "px"
            document.getElementById("lifeline").style.color = "white"
          },2000)
        } 
        else
        {
          this.bullet = 14;
          document.getElementById("currentBullet").innerHTML = this.bullet;
          const b1 = setInterval(()=>{
            document.getElementById("bullets").style.fontSize = 70 + "px"
            document.getElementById("bullets").style.color = "Yellow"
          },1000)
          setTimeout(()=>{
            clearInterval(b1);
            document.getElementById("bullets").style.fontSize = 40 + "px"
            document.getElementById("bullets").style.color = "white"
          },2000)
          
        }
        
      })
    },6000)

    document.addEventListener("click",()=>{
  
      document.getElementById("currentBullet").innerHTML = --game.bullet;
      if(game.bullet<0)
      {
        alert("No Bullets Available");
      }
      
  
      setTimeout(()=>{
        if(game.counter === 12)
        {
          location.href = "./gameWon.html"
        }
        if(game.counter<12){
          console.log('gameover')
          location.href = "./gameOver.html"
        }
      },20000)
     
  
      const fire =  new Audio("./audio/shoot.mp3")
      const death =  new Audio("./audio/death.mp3")
      const bonus =  new Audio("./audio/bonus.mp3")
  
      switch(game.audio)
      {
        case 1:
          fire.play();
          break;
        case 2:
          death.play();
          break;
        case 3:
          bonus.play();
          break;
        default:
          fire.play();
          break;
      }
    
  })
   
  
  }


}
let css = document.createElement("style");
const game = new Game();

var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
    game.start()
  },610)
})





