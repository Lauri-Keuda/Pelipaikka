const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const player = document.getElementById("player");
const menu = document.getElementById("menu");
const pisteet = document.getElementById("pisteet");
let turning = false;
let gameOn = false;
let score = 0;

function start(){
    gameOn = true
    menu.style.display = "none";
    car1.style.animation = "car 5s infinite linear";
    car2.style.animation = "car 5s infinite linear";
    score = 0;
}

function back() {
    document.location.pathname = "/Pelipaikka";
}

function left(){
    if(!turning && gameOn){
        turning = true;
        let turnCount = 0;
        const turnInterval = setInterval(function(){
            const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
            if (turnCount < 17 && playerLeft > 80){
                const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
                player.style.left = playerLeft - 5 + "px";
            }
            if (turnCount > 25){
                clearInterval(turnInterval);
                turnCount = 0;
                turning = false;
            }
            turnCount++;
        }, 10);
    }
}

function right(){
    if(!turning && gameOn){
        turning = true;
        let turnCount = 0;
        const turnInterval = setInterval(function(){
            const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
            if (turnCount < 17 && playerLeft < 250){
                const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
                player.style.left = playerLeft + 5 + "px";
            }
            if (turnCount > 25){
                clearInterval(turnInterval);
                turnCount = 0;
                turning = false;
            }
            turnCount++;
        }, 10);
    }
}

setInterval(function(){
    const car1Left = parseInt(window.getComputedStyle(car1).getPropertyValue("left"));
    const car2Left = parseInt(window.getComputedStyle(car2).getPropertyValue("left"));
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    const car1Bottom = parseInt(window.getComputedStyle(car1).getPropertyValue("top")) + 100;
    const car2Bottom = parseInt(window.getComputedStyle(car2).getPropertyValue("top")) + 200;
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top")) + 200; //on aina 380

    const car1Lane = defineLane(car1Left, false);
    const car2Lane = defineLane(car2Left, false);
    const playerLanes = defineLane(playerLeft, true);
    document.getElementById("kaistat").innerHTML = playerLanes

    if((car1Bottom > playerTop && car1Bottom < 580) && playerLanes.includes(car1Lane) || (car2Bottom > playerTop && car2Bottom < 580) &&  playerLanes.includes(car2Lane)){
        gameOn = false;
        menu.style.display = "block";
        car1.style.animation = "none";
        car2.style.animation = "none";
        pisteet.innerHTML = "Pisteet: " + score;
    }
}, 10);

function defineLane(carLeft, isPlayer){
    if(isPlayer){
        let lanes = [];
        if(carLeft >= 80 && carLeft < 150){         //80-150
            lanes.push(1);
        }
        if(carLeft > 95 && carLeft < 180){         //95-250
            lanes.push(2);
        }
        if(carLeft > 180 && carLeft <= 250){        //180-250
            lanes.push(3);
        }
        return lanes;
    } else {
        let lane = 0;
        switch(carLeft){
            case 80:
                lane = 1;
                break;
            case 165:
                lane = 2;
                break;
            case 250:
                lane = 3;
                break;
            default:
                break;
        }
        return lane;
    }
}

function runAnimation(car){
    const speed = (Math.random() * 6) + 4;

    car.style.animation = "car " + speed + "s infinite linear";
}

car1.addEventListener("animationiteration", () => {
    /* runAnimation(car1); */
    const random = Math.floor(Math.random() * 2) + 1;
    switch(random){
        case 1:
            car1.style.left = 80 + "px";
            break;
        case 2:
            car1.style.left = 165 + "px";
            break;
        case 3:
            car1.style.left = 250 + "px"
            break;
        default:
            break;
    }
    score++;
})