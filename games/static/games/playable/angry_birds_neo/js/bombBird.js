class BombBird{

    constructor(id){
        this.width = 150;
        this.bottom = 0; 
        this.id = id;
        this.bBirdElm = null;
        this.right = Math.floor(Math.random() * (20 - 1) + 1);
        this.right1 = Math.floor(Math.random() * (40 - 20) + 20);
        this.right2 = Math.floor(Math.random() * (50 - 40) + 40);
        this.right3 = Math.floor(Math.random() * (70 - 50) + 50);
        this.right4 = 100;
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
    let keyFrame = document.createTextNode(`@keyframes bombBird${this.num}{
        10% {
            right: ${this.right}%;
            bottom: ${this.bottom}%;
        }
        30% {
            right: ${this.right1}%;
            bottom: ${this.bottom1}%;
        }
        50% {
            right: ${this.right2}%;
            bottom: ${this.bottom2}%;
        }
        70% {
            right: ${this.right3}%;
            bottom: ${this.bottom3}%;
        }
        100% {
            right: ${this.right4}%;
            bottom: ${this.bottom4}%;
        }

    }`) 
    css.appendChild(keyFrame);
    }

   createElement(){
    
    this.bBirdElm = document.createElement("img");
    this.bBirdElm.src = "./images/bomb1.gif";
    const parentElm = document.getElementById('body');
    parentElm.appendChild(this.bBirdElm);
    this.bBirdElm.setAttribute('id',this.id);
    this.bBirdElm.classList.add("bombBird");
    this.bBirdElm.style.width = this.width + "px";
    this.bBirdElm.style.transform = "scaleX(-1)"
    this.bBirdElm.style.position = 'absolute';
    this.bBirdElm.style.bottom = 10 + "px";
    this.bBirdElm.style.animationName = `bombBird${this.num}`;
    this.bBirdElm.style.animationDuration = '8s';  
    this.bBirdElm.style.animationFillMode= 'forwards';

   }


   
}