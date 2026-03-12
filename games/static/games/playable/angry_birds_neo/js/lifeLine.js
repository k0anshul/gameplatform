class LifeLine{

    constructor(id){
        this.width = 150;
        this.bottom = 0; 
        this.id = id;
        this.lifeLineEle = null;
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
    let keyFrame = document.createTextNode(`@keyframes lifeline${this.num}{
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
    
    this.lifeLineEle = document.createElement("img");
    this.lifeLineEle.src = "./images/coin.gif";
    const parentElm = document.getElementById('body');
    parentElm.appendChild(this.lifeLineEle);
    this.lifeLineEle.setAttribute('id',this.id);
    this.lifeLineEle.classList.add("lifeline");
    this.lifeLineEle.style.width = this.width + "px";
    this.lifeLineEle.style.position = 'absolute';
    this.lifeLineEle.style.bottom = -2 + "px";
    this.lifeLineEle.style.animationName = `lifeline${this.num}`;
    this.lifeLineEle.style.animationDuration = '8s';  
    this.lifeLineEle.style.animationFillMode= 'forwards';

   }


   
}



