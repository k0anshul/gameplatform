class AngryBird{

    constructor(id){
        this.width = 150;
        this.bottom = 0; 
        this.id = id;
        this.aBirdElm = null;
        this.left = Math.floor(Math.random() * (20 - 1) + 1);
        this.left1 = Math.floor(Math.random() * (40 - 20) + 20);
        this.left2 = Math.floor(Math.random() * (50 - 40) + 40);
        this.left3 = Math.floor(Math.random() * (70 - 50) + 50);
        this.left4 = 100;
        this.bottom = Math.floor(Math.random() * (100 - 1) + 1);
        this.bottom1 = Math.floor(Math.random() * (100 - 1) + 1);
        this.bottom2 = Math.floor(Math.random() * (100 - 1) + 1);
        this.bottom3 = Math.floor(Math.random() * (100 - 1) + 1);
        this.bottom4 = Math.floor(Math.random() * (100 - 1) + 1);
        this.num = Math.floor(Math.random() * (10 - 1) + 1);
        this.createElement();
        this.createKeyFrame();
        
        
    }


    createKeyFrame(){
        /*creating css tag inside head*/  
    css.type = 'text/css';
    document.getElementsByTagName("head")[0].appendChild(css);
    let keyFrame = document.createTextNode(`@keyframes bird${this.num}{
        10% {
            left: ${this.left}%;
            bottom: ${this.bottom}%;
        }
        30% {
            left: ${this.left1}%;
            bottom: ${this.bottom1}%;
        }
        50% {
            left: ${this.left2}%;
            bottom: ${this.bottom2}%;
        }
        70% {
            left: ${this.left3}%;
            bottom: ${this.bottom3}%;
        }
        100% {
            left: ${this.left4}%;
            bottom: ${this.bottom4}%;
        }

    }`) 
    css.appendChild(keyFrame);
    }

   createElement(){
    
    this.aBirdElm = document.createElement("img");
    this.aBirdElm.src = "./images/bird1.gif";
    const parentElm = document.getElementById('body');
    parentElm.appendChild(this.aBirdElm);
    this.aBirdElm.setAttribute('id',this.id);
    this.aBirdElm.classList.add("angryBird");
    this.aBirdElm.style.width = this.width + "px";
    this.aBirdElm.style.position = 'absolute';
    this.aBirdElm.style.bottom = -2 + "px";
    this.aBirdElm.style.animationName = `bird${this.num}`;
    this.aBirdElm.style.animationDuration = '14s';  
    this.aBirdElm.style.animationFillMode= 'forwards';

   }


   
}



