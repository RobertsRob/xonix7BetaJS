// this is a xonix game //

// variables -----
var ctx = myCanvas.getContext("2d");

const gameBegining = "gameBegining";
const gemeGo = "gemeGo";
const gameDied = "gameDied";
const gameLose = "gameLose";

let gameStatus = gameBegining;

let gameSpeed = 50;

let mainScore = 0;

const percentNeedToNextLvl = 60;

let hardnessMode = "easy";

let scorePrc = 0;

const liveCountInBegining = 3;
let liveRemains = liveCountInBegining;

let movement = "stop";
let keyA = false;
let keyS = false;
let keyD = false;
let keyW = false;

let keySpace = false;
var posPlOneB = {x: 0, y: 0};

const pixelSize = 10;

let numEnemies = 6;
let enemies = [];

let filled = 1;

let insideEnemies = 1;
let insideEnemiesArray = [];

//for cikles
let countSnake = 0;


// coordinate array creation -----
let widthL = myCanvas.width / pixelSize; 
let heightL = myCanvas.height / pixelSize; 

let arrayC = [];

for (let i = 0; i < heightL; i++)
{
    arrayC.push(Array(widthL).fill(0));
}
// end -----

let player = new MovingObject(myCanvas.width/2, 0, 10, 10, "white");
var pposPl = player.getPos();



// end -----

// start function -----
promtForHardnessInput();


function start()
{
    
    setInterval(update, gameSpeed);
    addEventListener( "keydown", keyDown );
    addEventListener( "keyup", keyUp );
    addBordersMap();

    for (let i = 0; i < numEnemies; i++)
    {
        let xE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
        let yE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
        enemies.push(new MovingObject(xE, yE, 10, 10, "red"));

        let rndX = Math.floor((Math.random() * 2) + 1);
        let rndY = Math.floor((Math.random() * 2) + 1);

        let vx = 0;
        let vy = 0;

        if(rndX == 1){vx = 10;}
        if(rndX == 2){vx = -10;}
        if(rndY == 1){vy = 10;}
        if(rndY == 2){vy = -10;}

        enemies[i].setSpeed(vx, vy);
    }

    for (let i = 0; i < insideEnemies; i++)
    {
        insideEnemiesArray.push(new MovingObject(0, i, 10, 10, "red"));

        let rndX = Math.floor((Math.random() * 2) + 1);
        let rndY = Math.floor((Math.random() * 2) + 1);

        let vx = 0;
        let vy = 0;

        if(rndX == 1){vx = 10;}
        if(rndX == 2){vx = -10;}
        if(rndY == 1){vy = 10;}
        if(rndY == 2){vy = -10;}

        insideEnemiesArray[i].setSpeed(vx, vy);
    }
    
}
// end -----

// keybord enter -----
function keyDown(key)
{
    // console.log(key.keyCode);
    if(key.keyCode == 87)
    {
        keyW = true; //w
    }
    if(key.keyCode == 83)
    {
        keyS = true; //s
    }
    if(key.keyCode == 68)
    {
        keyD = true; //d
    }
    if(key.keyCode == 65)
    {
        keyA = true; //a
    }
    if(key.keyCode == 32)
    {
        keySpace = true;
        gameStatus = gemeGo;
    }
}

function keyUp(key)
{
    if(key.keyCode == 87)
    {
        keyW = false; //w
    }
    if(key.keyCode == 83)
    {
        keyS = false; //s
    }
    if(key.keyCode == 68)
    {
        keyD = false; //d
    }
    if(key.keyCode == 65)
    {
        keyA = false; //a
    }
    if(key.keyCode == 32)
    {
        keySpace = false;
    }
}
// end -----


// add border map function -----
function addBordersMap()
{
    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++){
            
            if(x == 1 || x == 0 || x == arrayC[y].length - 1 || x == arrayC[y].length - 2 || y == 0 || y == 1 || y == arrayC.length - 1 || y == arrayC.length - 2)
            {
                arrayC[y][x] = 3;
            }
        }
    }
}
// end -----

// update function -----

function update()
{
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // game statuss -----
    if(gameStatus == gameBegining)
    {
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.fillText("Press SPACE to begin!", myCanvas.width/2-300,  myCanvas.height/2-30);
    }
    if(gameStatus == gameDied)
    {
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.fillText("Press SPACE to continue!", myCanvas.width/2-350, myCanvas.height/2-30);
    }





    if(gameStatus == gameDied || gameStatus == gameBegining)
    {
        // mainScore = mainScore + scorePrc;
        // let printSc = "Your score: " + mainScore + "!";
        // document.getElementById("scoreText").innerHTML = printSc;

        return;
    }
    //end ------




    var speedPl = player.getSpeed();
    var posPl = player.getPos();
    var sizePl = player.getSize();

    let lateArc = arrayC;



    // checking for winning
    if(scorePrc >= percentNeedToNextLvl)
    {
        winningNextLvl();
    }



    // updating text
    document.getElementById("lives").innerHTML = "Lives: " + liveRemains;
    document.getElementById("filled").innerHTML = "Filled: " + scorePrc + "%";
    document.getElementById("hardness").innerHTML = "Hardness: " + hardnessMode;



    // enemy colision -----
    for (let i = 0; i < numEnemies; i++)
    {
        let speedLE = enemies[i].getSpeed();
        let LatePosEnemy = enemies[i].getPos();
        enemies[i].update();
        let posEnemy = enemies[i].getPos();

        let nextX = Math.round(posEnemy.x / pixelSize);
        let nextY = Math.round(posEnemy.y / pixelSize);

        if (arrayC[nextY - 1][nextX] == 3 && arrayC[nextY][nextX - 1] == 3 || arrayC[nextY + 1][nextX] == 3 && arrayC[nextY][nextX - 1] == 3 || arrayC[nextY + 1][nextX] == 3 && arrayC[nextY][nextX + 1] == 3 || arrayC[nextY - 1][nextX] == 3 && arrayC[nextY][nextX + 1] == 3) {
            // Collision with corners, change y and x speed
            enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
        }else if (arrayC[nextY + 1][nextX] == 3 || arrayC[nextY - 1][nextX] == 3) {
            // Collision with upper or bottom wall, change only y speed
            enemies[i].setSpeed(speedLE.vx, -speedLE.vy);
        } else if (arrayC[nextY][nextX + 1] == 3 || arrayC[nextY][nextX - 1] == 3) {
            // Collision with right or left wall, change only x speed
            enemies[i].setSpeed(-speedLE.vx, speedLE.vy);
        } else if (arrayC[nextY + 1][nextX + 1] == 3) {
            enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
        } else if (arrayC[nextY + 1][nextX - 1] == 3) {
            enemies[i].setSpeed(-speedLE.vx, speedLE.vy);
        } else if (arrayC[nextY - 1][nextX + 1] == 3) {
            enemies[i].setSpeed(speedLE.vx, -speedLE.vy);
        } else if (arrayC[nextY - 1][nextX - 1] == 3) {
            enemies[i].setSpeed(speedLE.vx, speedLE.vy);
        }
        //check colision with players snake
        if(arrayC[nextY][nextX] == 2)
        {
            dieA();
        }
        if(arrayC[nextY][nextX] != 3)
        {
            arrayC[nextY][nextX] = 4;
            
        }
        else
        {
            // alert("Error colision!");
            enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
            if(arrayC[Math.round(LatePosEnemy.y / pixelSize)][Math.round(LatePosEnemy.x / pixelSize)] != 3)
            {
                enemies[i].setPos(LatePosEnemy.x, LatePosEnemy.y);
                // alert("Error fixed!");
            }
            else
            {
                alert("Error colision is failed!");
            }

        }
        

        if (arrayC[Math.round(LatePosEnemy.y / pixelSize)][Math.round(LatePosEnemy.x / pixelSize)] != 3) {
            arrayC[Math.round(LatePosEnemy.y / pixelSize)][Math.round(LatePosEnemy.x / pixelSize)] = 0;
        }
    }
    //end -----


    // movement variable change
    if (keyA == true) {
        movement = "left";
        
    } else if (keyS == true) {
        movement = "down";
    } else if (keyD == true) {
        movement = "right";
    } else if (keyW == true) {
        movement = "up";
    } else if (keySpace == true){
        movement = "stop";
    }

    switch (movement)
    {
        case "left":
            if(posPl.x - pixelSize >= 0){
                player.setSpeed(-pixelSize, 0);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "down":
            if(posPl.y + 2*pixelSize <= myCanvas.height){
                player.setSpeed(0, pixelSize);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "right":
            if(posPl.x + 2*pixelSize <= myCanvas.width){
                player.setSpeed(pixelSize, 0);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "up":
            if(posPl.y - pixelSize >= 0 && gameStatus == gemeGo){
                player.setSpeed(0, -pixelSize);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "stop":
            player.setSpeed(0, 0);
        break;
    }

    
    let blPx = 0;
    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            // console.log(arrayC[y][x]);

            // 0 => nothing
            // 1 => player
            // 2 => snake
            // 3 => fill
            // 4 => nothing enemy
            // 5 => fill enemy
            // 6 => filling thing

            if(arrayC[y][x] == 0)
            {
                ctx.fillStyle = "black";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
            if(arrayC[y][x] == 1)
            {
                ctx.fillStyle = "white";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
            if(arrayC[y][x] == 2)
            {
                if(x != 150 && x != 0 && x != 149 && y != 89 && y != 90 && y != 0)
                {
                    if(arrayC[y+1][x] == 0 && arrayC[y-1][x] == 0 && arrayC[y][x+1] == 0 && arrayC[y][x-1] == 0)
                    {
                        arrayC[y][x] = 0;
                    }
                }


                countSnake++;
                ctx.fillStyle = "green";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);

                //checking colisions
                if(posPl.x/pixelSize == x && posPl.y/pixelSize == y)
                {
                    // alert("DIE!");
                    dieA();
                }
            }
            if(arrayC[y][x] == 3)
            {
                if(x != 150 && x != 0 && x != 149 && y != 89 && y != 90 && y != 0)
                {
                    if(arrayC[y+1][x] == 0 && arrayC[y-1][x] == 0 && arrayC[y][x+1] == 0 && arrayC[y][x-1] == 0)
                    {
                        arrayC[y][x] = 0;
                    }
                }

                blPx++;
                ctx.fillStyle = "blue";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                
                // console.log(posPl.x/pixelSize == x && posPl.y/pixelSize == y && countSnake != 0);
                if(posPl.x/pixelSize == x && posPl.y/pixelSize == y && countSnake != 0)
                {
                    //fill
                    // alert("fill");
                    for (let i = 0; i < numEnemies; i++)
                    {
                        let posEnemy = enemies[i].getPos();
                        arrayC[Math.round(posEnemy.y/pixelSize)][Math.round(posEnemy.x/pixelSize)] = 6;
                    }
                    while(filled != 0)
                    {
                        fillRec();
                        
                    }

                    replacerFill();
                    for (let i = 0; i < numEnemies; i++)
                    {
                        let posEnemy = enemies[i].getPos();
                        arrayC[Math.round(posEnemy.y/pixelSize)][Math.round(posEnemy.x/pixelSize)] = 4;
                    }
                }
            }
            if(arrayC[y][x] == 4)
            {
                if(lateArc[y][x] == arrayC[y][x])
                {
                    arrayC[y][x] = 0;
                }

                ctx.fillStyle = "red";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
            if(arrayC[y][x] == 5)
            {
                // if(lateArc[y][x] == arrayC[y][x])
                // {
                //     arrayC[y][x] = 0;
                // }

                ctx.fillStyle = "purple";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }



            
            
        }
        
    }

    //count fill percent
    scorePrc = Math.round(blPx/13500*100-6.992592592592592);
    // console.log(scorePrc);

    //check for colision with enemy
    pposPl = player.getPos();
    if(arrayC[posPl.y/pixelSize][posPl.x/pixelSize] == 4)
    {
        dieA();
    }


    
    posPlOneB.x = posPl.x;
    posPlOneB.y = posPl.y;

    player.draw();
    player.update();


    pposPl = player.getPos();

    // arrayC[posPl.y/pixelSize][posPl.x/pixelSize] = 1;

    if(pposPl.y != posPlOneB.y && arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] != 3 || posPlOneB.x != pposPl.x && arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] != 3)
    {
        arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] = 2;
    }
    

    
    




    addBordersMap();
}

// end -----


// function fill recursion -----
function fillRec()
{
    
    filled = 0;
    for (let t = 0; t < arrayC.length; t++) {
        for (let c = 0; c < arrayC[t].length; c++) {
            if (arrayC[t][c] == 6) {
                if (arrayC[t + 1][c] === 0 && arrayC[t + 1][c] != 4) {
                    arrayC[t + 1][c] = 6;
                    filled++;
                }
                if (arrayC[t - 1][c] === 0 && arrayC[t - 1][c] != 4) {
                    arrayC[t - 1][c] = 6;
                    filled++;
                }
                if (arrayC[t][c + 1] === 0 && arrayC[t][c + 1] != 4) {
                    arrayC[t][c + 1] = 6;
                    filled++;
                }
                if (arrayC[t][c - 1] === 0 && arrayC[t][c - 1] != 4) {
                    arrayC[t][c - 1] = 6;
                    filled++;
                }
            }
        }
    }
}

function replacerFill()
{
    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            if(arrayC[y][x] == 0)
            {
                arrayC[y][x] = 3;
            }
            if(arrayC[y][x] == 2)
            {
                arrayC[y][x] = 3;
            }
        }
    }


    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            if(arrayC[y][x] == 6)
            {
                arrayC[y][x] = 0;
            }
        }
    }

    filled = 1;

}

// end -----


// function dying -----
function dieA()
{
    if(liveRemains >=1)
    {
        liveRemains--;
    }
    else
    {
        // alert(11);
        gameStatus = gameBegining;
        gameReset();
        
        return;
    }
    movement = "stop";
    gameStatus = gameDied;
    player.setPos(myCanvas.width/2, pixelSize);
    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            if(arrayC[y][x] == 2 || arrayC[y][x] == 1)
            {
                arrayC[y][x] = 0;
            }
        }
    }
    arrayC[pposPl.y/pixelSize][pposPl.x/pixelSize] = 0;
    arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] = 0;

}
// end -----

//function restart all game -----
function gameReset()
{
    arrayC = [];
    for (let i = 0; i < heightL; i++)
    {
        arrayC.push(Array(widthL).fill(0));
    }

    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++){
            
            if(x == 1 || x == 0 || x == arrayC[y].length - 1 || x == arrayC[y].length - 2 || y == 0 || y == 1 || y == arrayC.length - 1 || y == arrayC.length - 2)
            {
                arrayC[y][x] = 3;
            }
        }
    }

    
    Swal.fire({
        title: "You died ＞﹏＜",
        icon: "error",
        html: `
            <p id="scoreText">lol</p>
            <a href="#" onclick="location.reload();"><b>Choose hardness</b></a>`,
        showConfirmButton: true,
        confirmButtonText: 'Start NEW game'
    });

    // variable reset -----
    gameStatus == gameBegining;
    player.setPos(myCanvas.width/2, pixelSize);
    arrayC[pposPl.y/pixelSize][pposPl.x/pixelSize] = 0;
    arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] = 0;
    movement = "stop";


    if(hardnessMode == "easy")
    {
        numEnemies = 2;
        gameSpeed = 60;
    }
    if(hardnessMode == "normal")
    {
        numEnemies = 3;
        gameSpeed = 50;
    }
    if(hardnessMode == "hard")
    {
        numEnemies = 5;
        gameSpeed = 30;
    }
    if(hardnessMode == "asian")
    {
        numEnemies = 30;
        gameSpeed = 15;
    }
    enemies = [];
    for (let i = 0; i < numEnemies; i++)
    {
        let xE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
        let yE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
        enemies.push(new MovingObject(xE, yE, 10, 10, "red"));

        let rndX = Math.floor((Math.random() * 2) + 1);
        let rndY = Math.floor((Math.random() * 2) + 1);

        let vx = 0;
        let vy = 0;

        if(rndX == 1){vx = 10;}
        if(rndX == 2){vx = -10;}
        if(rndY == 1){vy = 10;}
        if(rndY == 2){vy = -10;}

        enemies[i].setSpeed(vx, vy);
    }

    liveRemains = liveCountInBegining;
    scorePrc = 0;




}
//end -----


// next level -----
function winningNextLvl()
{
    gameStatus = gameBegining;
    arrayC = [];
    for (let i = 0; i < heightL; i++)
    {
        arrayC.push(Array(widthL).fill(0));
    }

    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++){
            
            if(x == 1 || x == 0 || x == arrayC[y].length - 1 || x == arrayC[y].length - 2 || y == 0 || y == 1 || y == arrayC.length - 1 || y == arrayC.length - 2)
            {
                arrayC[y][x] = 3;
            }
        }
    }


    mainScore = mainScore + scorePrc;
    Swal.fire({
        title: "You win!!!",
        text: "Your score: " + mainScore + "!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: 'next level'
    });

    // variable reset -----
    gameStatus == gameBegining;
    player.setPos(myCanvas.width/2, pixelSize);
    arrayC[pposPl.y/pixelSize][pposPl.x/pixelSize] = 0;
    arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] = 0;
    movement = "stop";

    numEnemies = Math.round(numEnemies * 1.5);
    enemies = [];
    for (let i = 0; i < numEnemies; i++)
    {
        let xE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
        let yE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
        enemies.push(new MovingObject(xE, yE, 10, 10, "red"));

        let rndX = Math.floor((Math.random() * 2) + 1);
        let rndY = Math.floor((Math.random() * 2) + 1);

        let vx = 0;
        let vy = 0;

        if(rndX == 1){vx = 10;}
        if(rndX == 2){vx = -10;}
        if(rndY == 1){vy = 10;}
        if(rndY == 2){vy = -10;}

        enemies[i].setSpeed(vx, vy);
    }

    liveRemains = liveCountInBegining;
    scorePrc = 0;
}
//end -----





function promtForHardnessInput()
{
    Swal.fire({
        title: 'Input hardnes mode!',
        html: `
            <select name="hardness" id="hrD" style="width:40%; text-align:center; height:35px; font-size:22px; border-radius:5px;">
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
            <option value="asian">Asian</option>
            </select>`,
            didOpen: () => {
            const inputRange = Swal.getInput()
            

            document.getElementById("hrD").addEventListener("change", () => 
            {
                // console.log(document.getElementById("hrD").value);
                hardnessMode = document.getElementById("hrD").value;
            });
        },
    }).then(function(isConfirm) 
    {
        if (isConfirm) {
            variablesChangeWHST();
            start();
        }
    });
}

function variablesChangeWHST()
{
    if(hardnessMode == "easy")
    {
        numEnemies = 2;
        gameSpeed = 60;
    }
    if(hardnessMode == "normal")
    {
        numEnemies = 3;
        gameSpeed = 50;
    }
    if(hardnessMode == "hard")
    {
        numEnemies = 5;
        gameSpeed = 30;
    }
    if(hardnessMode == "asian")
    {
        numEnemies = 30;
        gameSpeed = 15;
    }
}
