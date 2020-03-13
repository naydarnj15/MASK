function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, angle) {
    var scaleBy = 0.3;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }
    //console.log()
    var frame = this.spriteSheet;
    
    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = 250;
    tempCanvas.height = 250;
    var tempCanvasCtx = tempCanvas.getContext('2d');
    tempCanvasCtx.save();
    tempCanvasCtx.drawImage(this.spriteSheet,
        index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
        this.frameWidth, this.frameHeight,
        0, 0,
        this.frameWidth,
        this.frameHeight);


    var rotatedImage = Entity.prototype.rotateAndCache(tempCanvas, Math.PI / 180 * angle);

    ctx.rotate(Math.PI / 180 * angle / 200);
    ctx.drawImage(rotatedImage,
                  locX, locY,
                  this.frameWidth * scaleBy,
        this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}


//BACKGROUND CODE ****


var X_OFFSET = 60;
var Y_OFFSET = 0;
var PersonXOffset = 60;
var PersonYOffset = 0;
var SCOPE_OF_TILES = [];
var parkedCars;
var personList;
var movingCar;
//BACKGROUND CODE ***********************************
function Background(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.tileMap = new Array(4);
    this.distanceTraveledX = 638;
    this.distanceTraveledY = 345;
    for (var i = 0; i < 4; i++ ){
        this.tileMap[i] = new Array(6);   
    }
    this.tileMap[0][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,4.jpg"), width: 1515, height: 1535, 
                          buildings: []}; //{xL:, xR: ,yT:, yB:}
    this.tileMap[0][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"), width: 1515, height: 1535, 
                          buildings: [{xL:0, xR:1515, yT:0, yB:80}, {xL:1308, xR:1520, yT: 164, yB:1045},//
                                      {xL:1416, xR: 1515,yT:0, yB:164}, {xL:0, xR:475, yT:0, yB:1535},
                                      {xL:0, xR:1515, yT:1365, yB:1535}]};
    this.tileMap[0][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,2.jpg"), width: 1622, height: 1535, 
                          buildings: [{xL:0, xR:80 ,yT:0, yB:1045}, {xL:292, xR:1433,yT:0, yB:485},
                                      {xL:1519, xR: 1622,yT: 0, yB:546}, {xL: 0, xR:75 ,yT:1365, yB:1535},
                                      {xL:290, xR:907 ,yT:765, yB:1142}, {xL:840, xR:1440,yT:828, yB:1211},
                                      {xL:290, xR:764 ,yT:1208, yB:1535},{xL:1097, xR:1440,yT:1296, yB:1535},
                                      {xL:764, xR: 1096,yT:1508, yB:1535}]};
    this.tileMap[0][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,3.jpg"), width: 1620, height: 1535, 
                          buildings: [{xL:1612, xR:1620 ,yT:207, yB:1045},{xL:1612, xR:1620 ,yT:0, yB:122},
                                      {xL:283, xR: 1420,yT:0, yB:470},{xL:0, xR:190 ,yT:0, yB:546},
                                      {xL:285, xR:874 ,yT:854, yB:1208},{xL:874, xR:1422,yT:806, yB:1138},
                                      {xL:285, xR:609,yT:1296, yB:1535},{xL:609, xR:950 ,yT:1460, yB:1535},
                                      {xL:950, xR: 1421,yT:1204, yB:1535}]};
    this.tileMap[0][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,4.jpg"), width: 1515, height: 1535,
                          buildings: [{xL:600, xR:1515 ,yT:1380, yB:1535},{xL:0, xR: 204,yT:0, yB:120},
                                      {xL:1145, xR:1515 ,yT:0, yB:1535},{xL:0, xR:1515 ,yT:0, yB:75},
                                      {xL:0, xR:300,yT:207, yB:1045}]};
    this.tileMap[0][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"), width: 1515, height: 1535,
                          buildings: []};
    this.tileMap[1][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,0.jpg"), width: 1160, height: 1260,
                          buildings: [{xL:0, xR:1160 ,yT:0, yB:484},{xL:143, xR:343 ,yT:0, yB:560},
                                      {xL:0, xR:1160 ,yT:930, yB:1260}]};
    this.tileMap[1][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,1.jpg"), width: 1826, height: 1260,
                          buildings: [{xL:0, xR:1826 ,yT:0, yB:5},{xL:0, xR:1349 ,yT:0, yB:312},
                                      {xL:0, xR: 1051,yT:0, yB:610},{xL:0, xR:645 ,yT:927, yB:1260},
                                      {xL:645, xR:1212 ,yT:893, yB:1260},{xL:1212, xR: 1730,yT:941, yB:1260},
                                      {xL:1730, xR:1826 ,yT:910, yB:1260}]};
    this.tileMap[1][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,2.jpg"), width: 1623, height: 1259, 
                          buildings: [{xL:0, xR: 70,yT:-10, yB:5},{xL:289, xR:759,yT:0, yB:570},
                                      {xL:759, xR: 1454,yT:10, yB:570},{xL:293, xR:1430 ,yT:888, yB:1259},
                                      {xL:0, xR:70 ,yT:910, yB:1259}]}; 
    this.tileMap[1][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,3.jpg"), width: 1619, height: 1259,
                          buildings: [{xL:285, xR:1422 ,yT:888, yB:1259},{xL:1613, xR:1619 ,yT:910, yB:1259},
                                      {xL:253, xR:970,yT:2, yB:584},{xL:970, xR:1421 ,yT:0, yB:584}]};
    this.tileMap[1][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,4.jpg"), width: 1826, height: 1260,
                          buildings: [{xL:876, xR: 1826,yT:0, yB:600},{xL:600, xR:876 ,yT:0, yB:309},
                                      {xL:1282, xR:1826,yT:922, yB:1813},{xL:692, xR:1826 ,yT:901, yB:1260},
                                      {xL:172, xR:692 ,yT:946, yB:1260},{xL:0, xR:134 ,yT:910, yB:1260}]};
    this.tileMap[1][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,5.jpg"), width: 1160, height: 1260,
                          buildings: [{xL:0, xR: 1160,yT:940, yB:1260},{xL:0, xR:1160 ,yT:0, yB:477},
                                      {xL:951, xR:1160 ,yT:0,yB:554}]};
    this.tileMap[2][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,1.jpg"), width: 1021, height: 784,
                          buildings: [{xL: 0, xR: 1021, yT: 0, yB: 784}]};
    this.tileMap[2][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,2.jpg"), width: 1622, height: 784, 
                          buildings: [{xL:0, xR:70 ,yT:0, yB:784},{xL:285, xR:1427,yT:0, yB:260},
                                      {xL:1018, xR: 1436 ,yT:356, yB:784}]};
    this.tileMap[2][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,3.jpg"), width: 1618, height: 784,
                          buildings: [{xL:286, xR: 681,yT:356, yB:784},{xL:1611, xR:1618 ,yT:0, yB:784},
                                      {xL:286, xR:1422,yT:0, yB:260}]};
    this.tileMap[2][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,4.jpg"), width: 1028, height: 784, 
                          buildings: [{xL: 0, xR: 1028, yT: 0, yB: 784}]};
    this.tileMap[3][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,0.jpg"), width: 1158.5, height: 928, 
                          buildings: [{xL:0, xR:1160 ,yT:0, yB:283}, {xL:0,xR:1160,yT:588, yB:928}]};
    this.tileMap[3][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,1.jpg"), width: 1829, height: 924,
                         buildings: [{xL:0, xR:1829 ,yT:586, yB:924},{xL:1755, xR:1829 ,yT:0, yB:164},
                                     {xL:1183, xR:1829 ,yT:0, yB:304},{xL:0, xR:1829 ,yT:0, yB:280}]};
    this.tileMap[3][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,2.jpg"), width: 1621, height: 924, 
                          buildings: [{xL:0, xR:80,yT:596, yB:924}, {xL:0, xR:72 ,yT:0,yB:295},
                                      {xL:291, xR:1433,yT:543, yB:924}, {xL:1518, xR:1621,yT:545, yB:924},
                                      {xL:1018, xR:1436,yT:0,yB:217}]};
    this.tileMap[3][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,3.jpg"), width: 1618, height: 924, 
                          buildings: [{xL:0, xR:190 ,yT:523, yB:924},{xL:284, xR:1419 ,yT:545, yB:924},
                                      {xL:287, xR:681 ,yT:0, yB:236},{xL:1611, xR:1618 ,yT:0, yB:305},
                                      {xL:1612, xR:1618 ,yT:590, yB:928}]};
    this.tileMap[3][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,4.jpg"), width: 1829, height: 924, 
                          buildings: [{xL:0, xR:1829 ,yT:590, yB:924}, {xL:0, xR:795,yT:0, yB:305},
                                      {xL:790, xR: 1829 ,yT:0, yB:280}]};
    this.tileMap[3][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,5.jpg"), width: 1158.5, height: 928,
                          buildings: [{xL: 0,xR:1160,yT:621,yB:928}, {xL:0, xR:1160 ,yT:0, yB:276},
                                      {xL:922, xR:1160 ,yT:558, yB:928}, {xL:386, xR: 554,yT:0,yB:323}]};
    this.curTile = {row: 0, col: 1}; // 0,1
   
}

Background.prototype.draw = function () {
    SCOPE_OF_TILES = [];
    this.ctx.imageSmoothingQuality = 'medium';
    this.ctx.imageSmoothingEnabled = true;
    var tile = this.tileMap[this.curTile.row][this.curTile.col];
    // console.log("row" , this. curTile.row ," col: " ,this.curTile.col);
    // SCOPE_OF_TILES.push(tile);
    // this.distanceTraveledX; how far into tile   SX
    // this.distanceTraveledY;     SY
    //adjust resiizing
    // calc tiles in range and add to list mSCOPE_OF_TILES
    // place other tiles based on need 
    
    var XL = this.distanceTraveledX - 625;// each side
    var XR =  this.distanceTraveledX + 625;
    var YT =  this.distanceTraveledY - 285;
    var YB = this. distanceTraveledY + 285;
    this.ctx.drawImage(tile.img, XL, YT, 1250, 570, 0,0, 1250, 570);
    SCOPE_OF_TILES.push({row:this.curTile.row, col:this.curTile.col}); /// add OFFSETSSS 
      // (tile.img, Source x, source Y,  source width, source height, 0connect , 0connect, resizing w 1250, h 510);
    
   
     // IF ROW 1 SHIFT 1,0 AND 1,5  AND  ROW 3 IS GOOD
    try {
    var nextL;
    if (XL < 0) {//col --
            var t1;
            var col;
            if (this.curTile.col == 0) {
                col = 5;
                t1 = this.tileMap[this.curTile.row][col];
            } else {
                col = this.curTile.col - 1;
                t1 = this.tileMap[this.curTile.row][col];
            }
            var nextL = -t1.width + (625 - this.distanceTraveledX);
            this.ctx.drawImage(t1.img, 0, YT, t1.width, 570, nextL, 0, t1.width + 1.5, 570);
            SCOPE_OF_TILES.push({row:this.curTile.row, col:col});
         
    } 
} catch {
    console.log("skip left col");
} try {
    var nextR;
    if (XR > tile.width) {//col++{
            var t2;
            var col2;
            if (this.curTile.col == 5) {
                col2 = 0;
            } else {
                col2 = this.curTile.col + 1;
            }
            t2 = this.tileMap[this.curTile.row][col2];
            var nextR = 625 + (tile.width - this.distanceTraveledX);
            this.ctx.drawImage(t2.img, 0, YT, 1250, 570, nextR, 0, 1250, 570);
            SCOPE_OF_TILES.push({row:this.curTile.row, col:col2});
            //add scope of tiles .push 
       
    }
} catch {
    console.log("skip right col");
} try {
    if (YT < 0) {//row--    /UP
        var row2 = this.curTile.row == 0 ? 3 :  this.curTile.row - 1;

        var t4 = this.tileMap[row2][this.curTile.col];
        var nextU = -t4.height + (285 - this.distanceTraveledY);

        if (row2 == 0 && (this.curTile.col == 1 || this.curTile.col == 4)) {
            if (this.curTile.col == 1) {
                this.ctx.drawImage(t4.img, XL - 500, 0, t4.width, t4.height, -188, nextU, t4.width, t4.height);
            } else if (this.curTile.col == 4) {
                 this.ctx.drawImage(t4.img, XL, 0, t4.width, t4.height, 0, nextU, t4.width, t4.height);
             
            }
        }  else if (row2 == 3 && (this.curTile.col == 1 || this.curTile.col == 4)) { 
                if (this.curTile.col == 1) {
                    this.ctx.drawImage(t4.img, XL, 0, t4.width, t4.height, -312, nextU, t4.width, t4.height);
                  

                } else if (this.curTile.col == 4) {
                    this.ctx.drawImage(t4.img, XL, 0, t4.width, t4.height, 0, nextU, t4.width, t4.height);
                
                }  
        } else { 
           var scoot = tile.width - t4.width;
           this.ctx.drawImage(t4.img, XL, 0, 1250, t4.height, -1 - scoot, nextU, 1256, t4.height);

        }
        SCOPE_OF_TILES.push({row:row2, col:this.curTile.col});
        if (XR > tile.width) {
            //also do the bottom to the right
            var t5 = this.tileMap[row2][this.curTile.col + 1];
            this.ctx.drawImage(t5.img, 0, 0, 1250, t5.height, nextR - 1.25, nextU, 1252, t5.height);
            SCOPE_OF_TILES.push({row:row2, col: (this.curTile.col + 1)});
        }  else if (XL < tile.width) {
            var t5 =  this.tileMap[row2][this.curTile.col - 1];
            var nextl = -t5.width + (625 - this.distanceTraveledX);
            this.ctx.drawImage(t5.img, 0, 0, t5.width, t5.height, nextl + 2, nextU, t5.width+3, t5.height);
            SCOPE_OF_TILES.push({row:row2, col:(this.curTile.col - 1)});
        }
    } 
} catch {
    console.log("skip upper row");
} try {
    // var next4;
    if (YB > tile.height) {//row++   DOWN
        var row3 = this.curTile.row == 3 ? 0 :  this.curTile.row + 1;

        var t4 = this.tileMap[row3][this.curTile.col];
        var nextD = 285 + (tile.height - this.distanceTraveledY);
        if (row3 == 1 && (this.curTile.col == 1 || this.curTile.col == 4)) {
            if (this.curTile.col == 1) {
                this.ctx.drawImage(t4.img, XL, 0, t4.width, 570,-297, nextD, t4.width, 570);
            } else if (this.curTile.col == 4) {
                this.ctx.drawImage(t4.img, XL, 0, t4.width, 570, 0, nextD, t4.width, 570);
            }
        } else { 
            var scoot = tile.width - t4.width;
            this.ctx.drawImage(t4.img, XL, 0, 1250, 570, -1 - scoot, nextD, 1258, 570);
        }
        SCOPE_OF_TILES.push({row:row3, col:this.curTile.col});
        if (XR > tile.width) {
                //also do the bottom to the right
                var t5 = this.tileMap[row3][this.curTile.col + 1];
                this.ctx.drawImage(t5.img, 0, 0, 1250, 570, nextR, nextD, 1252, 570);
                SCOPE_OF_TILES.push({row:row3, col:(this.curTile.col+1)});
            }  else if (XL < tile.width) {
              //  console.log("col", this.curTile.col, " row: ", row);
                var t5 =  this.tileMap[row3][this.curTile.col - 1];
                var nextl = -t5.width + (625 - this.distanceTraveledX);
                this.ctx.drawImage(t5.img, 0, 0, t5.width, 570, nextl + .5, nextD, t5.width + 4, 570);
                SCOPE_OF_TILES.push({row:row3, col:(this.curTile.col - 1)});
        }

    }
} catch {
    console.log("skip lower row");
}

      /// ADJUST  TILE 2,2 AND 2,3 
      /// ADJUST 1,0 , 1,5
};
Background.prototype.update = function () {
    var tileW = this.tileMap[this.curTile.row][this.curTile.col].width;
    var tileH = this.tileMap[this.curTile.row][this.curTile.col].height;
    var row = this.curTile.row;
    var col = this.curTile.col;

    // console.log("distance X: " + this.distanceTraveledX + " \n distance Y: " + this.distanceTraveledY);
    
    if (this.distanceTraveledX > tileW){
        if ((row === 1 || row == 3) && col == 5) { // if row 1 or 3 
            this.curTile.col = 0;      
        } else {
            this.curTile.col++;
        }
        this.distanceTraveledX = 0;
        
    } else if (this.distanceTraveledX < 0) { // col change
        if ((row === 1 || row == 3) && col === 0) { // if row 1 or 3
            this.curTile.col = 5;
        } else {
            this.curTile.col--; 
        }
        this.distanceTraveledX = this.tileMap[this.curTile.row][this.curTile.col].width;
    } else if (this.distanceTraveledY> tileH) { // down
        if (row === 3 )  {
            this.curTile.row = 0;
        } else {
            this.curTile.row++;
        }
         this.distanceTraveledY = 0;
    } else if ( this.distanceTraveledY < 0) { // up
        if (row === 0 )  {
            this.curTile.row = 3;
        } else {
            this.curTile.row--;
        }
        this.distanceTraveledY = this.tileMap[this.curTile.row][this.curTile.col].height; // row change
    }
};

function PlayGame(game, x, y) {
    this.game = game;

    Entity.call(this, game, x, y);
}

PlayGame.prototype = new Entity();
PlayGame.prototype.constructor = PlayGame;

PlayGame.prototype.reset = function () {
    this.game.running = false;
}
PlayGame.prototype.update = function () {
    if (this.game.click && this.game.car.collide < 20) this.game.running = true;
}

PlayGame.prototype.draw = function (ctx) {
    if (!this.game.running) {
       
        ctx.font = "24pt Impact";
        ctx.fillStyle = "white";
        //if (this.game.mouse) { ctx.fillStyle = "navy"; }
        //ctx.fillText("Click to Play!", this.x, this.y);
        ctx.font = "18pt Impact";
        if (this.game.car.collide < 20) {
            //ctx.fillText("Use arrow keys/WASD to move the car and the person.",
            //this.x-200, this.y+100);
            ctx.fillStyle = "yellow";
            //console.log(this.game.car.src);
            if (!this.game.car.foundLambo && this.game.car.missionComplete !== true) {
                ctx.fillText("Mission: Find the yellow Corvette and bring it back to the starting location", this.x + 50, this.y - 300);
            } else if (this.game.car.missionComplete) {
                //console.log(this.game.car.missionComplete);
                ctx.fillText("You have completed the first mission", this.x + 50, this.y - 200);
            }
            //ctx.fillText("You can walk or use a near by car to find the yellow lamborghini.",
            //this.x-200, this.y+160);
        } 
    }
}



function Person(game, x, y) {
    this.game = game;
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RedPersonStanding.png"), 0, 0, 250, 250, 0.05, 1, true, true);
    this.straightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Red Person.png"), 0, 0, 250, 250, 0.06, 7, false, true);
    this.setNotIt();
    this.straight = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.prevX = 638;
    this.prevY = 345;
    this.maxSpeedPerson = 3;
    this.speed = 0;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.mod = 0;
    Entity.call(this, game, 638, 345);
}

Person.prototype = new Entity();
Person.prototype.constructor = Person;

Person.prototype.update = function () {
    if (this.game.d) {
        this.right = true;
        this.angle += 5;
    }
    if (this.game.s) {
        this.down = true;
        this.speed = 0;
    }
    if (this.game.w) {
        this.up = true;
        this.mod = 1;
        if (this.speed < this.maxSpeedPerson) {
            this.speed += 0.5;
        }
        
    }
    if (this.game.a) {
        this.left = true;
        this.angle -= 5;
    }

    if(this.game.space && this.it){
        for (var i = 0; i < this.game.entities.length; i++) { 
            var ent = this.game.entities[i];
            var dist = this.game.car.distance(this, ent);
            var distance = Math.abs(dist);
            if(distance <= 90 && ent !== this){
                this.removeFromWorld = true;
                X_OFFSET = PersonXOffset;
                Y_OFFSET = PersonYOffset;
                ent.setIt();
                if (ent.speed === undefined) {
                    this.game.car.swap(this.game.car, ent);             
                 }
                break;
            }
            
        }
    
    
        }
    if (this.right) {
        if (this.straightAnimation.isDone()) {
            this.straightAnimation.elapsedTime = 0;
            this.right = false;
        }
    }
    
    if (this.left) {
        if (this.straightAnimation.isDone()) {
            this.straightAnimation.elapsedTime = 0;
            this.left = false;
        }
    }
    if (this.up) {
        
        if (this.straightAnimation.isDone()) {
            this.straightAnimation.elapsedTime = 0;
            this.speed = 0;
            this.up = false;
        }
    }
    if (this.down) {
        if (this.straightAnimation.isDone()) {
            this.straightAnimation.elapsedTime = 0;
            this.down = false;
        }
    }
    // var col = this.game.Background.curTile.col;
    // var row = this.game.Background.curTile.row;
    // console.log("row " , row, "col: " , col);
    // //console.log(row);
    // //if(doPolygonsIntersect())
    
    
    // if (this.canPass(this.game.Background.distanceTraveledX, this.game.Background.distanceTraveledY,
    //              this.game.Background.tileMap[row][col].buildings) && !this.collidesWithCar(this.game)) { //******************************** */
    //              }
    // var travelX1 = (this.speed) * Math.cos(Math.PI / 180 * this.angle); //********* */
    // var travelY1 = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
    // this.x += travelX1;
    // this.y += travelY1;

    // this.prevOFFx = X_OFFSET; ////************ */
    // this.prevOFFy = Y_OFFSET; ///************** */
    // X_OFFSET += travelX1; //****
    // Y_OFFSET += travelY1; //*****
    // // STATIONARYX += travelX;
    // // STATIONARYY +=travelY;
    // this.prevX =  this.game.Background.distanceTraveledX;
    // this.prevY =  this.game.Background.distanceTraveledY;
    // this.game.Background.distanceTraveledX += travelX1; //*****
    // this.game.Background.distanceTraveledY += travelY1; //*****
    // this.x += (this.speed) * Math.cos(Math.PI / 180 * this.angle);
    //console.log(this.x);
    // this.y += (this.speed) * Math.sin(Math.PI / 180 * this.angle);
    //console.log(this.y);
    //console.log(this.x);

    Entity.prototype.update.call(this);
}

Person.prototype.draw = function (ctx) {
    
    var col = this.game.Background.curTile.col;
    var row = this.game.Background.curTile.row;
    //console.log("row " , row, "col: " , col);
    //console.log(row);
    //if(doPolygonsIntersect())
    
    
    if (this.canPass(this.game.Background.distanceTraveledX, this.game.Background.distanceTraveledY,
                 this.game.Background.tileMap[row][col].buildings) && !this.collidesWithCar(this.game)) { //******************************** */

        
        var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle); //********* */
        var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
        this.x += travelX;
        this.y += travelY;
        //console.log(X_OFFSET,Y_OFFSET);
        this.prevOFFx = PersonXOffset; ////************ */
        this.prevOFFy = PersonYOffset; ///************** */
        PersonXOffset += travelX; //****
        PersonYOffset += travelY; //*****
        this.prevX =  this.game.Background.distanceTraveledX;
        this.prevY =  this.game.Background.distanceTraveledY;
        this.game.Background.distanceTraveledX += travelX; //*****
        this.game.Background.distanceTraveledY += travelY; //*****
        X_OFFSET=PersonXOffset;
        Y_OFFSET = PersonYOffset;
                 
    }else {
        this.speed = 0;
        this.mod =0;
        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
        if(this.game.w){
                            this.game.w =false;
                        }
                        if(this.game.s){
                            this.game.s = false;
                        }
                        // var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle); //********* */
                        // var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
                        // this.game.Background.distanceTraveledX += travelX; //*****
                        // this.game.Background.distanceTraveledY += travelY;
                        //  X_OFFSET += travelX; //****
                        //  Y_OFFSET += travelY;
                        this.game.Background.distanceTraveledX = this.prevX; //*****
                        this.game.Background.distanceTraveledY = this.prevY; //*****
                        //  this.game.Background.distanceTraveledX -= travelX; //*****
                        
                
                    }
                

                 if (this.x <= -1450) {
            
                    PASSEDMAPS.LCount = Math.floor(this.x / 10094);
            
                } else if (this.x > 7600) {
                    PASSEDMAPS.LCount = Math.ceil(this.x / 16164);
                } else {
                    PASSEDMAPS.LCount = 0;
                }
            
                if (this.y  >= 0) {
                    PASSEDMAPS.HCount = Math.floor(this.y / 4400);
            
                } else if (this.y < 0) { 
                    PASSEDMAPS.HCount = Math.floor(this.y / 4750); ;
                }
            
            
            
                    //****************************
            
            //************************************************ */
                
                
                
    //var tempCanvas = document.createElement('canvas');
    //var tempCanvasCtx = tempCanvas.getContext('2d');
    //this.drawFrame(this.game.clockTick, tempCanvasCtx, this.x, this.y, this.angle);
    //var rotatedImage = Entity.prototype.rotateAndCache(tempCanvas, angle);
    //ctx.rotate(Math.PI / 180 * this.angle);
    
    if (this.right && this.speed > 0) {
       
        //this.drawFrame(this.game.clockTick, tempCanvas, this.x, this.y, angle);
        //var rotate = Entity.prototype.rotateAndCache(this.straightAnimation.spriteSheet, this.angle);
        //this.drawFrame(this.game.clockTick, tempCanvas, this.x, this.y, angle);
        //var rotate = Entity.prototype.rotateAndCache(this.spriteSheet, angle);
        //for (var i = 0; i < animations.length; i++) {
        //    animations[i].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.angle);
        //}
        this.straightAnimation.drawFrame(this.game.clockTick, ctx, this.x - PersonXOffset, this.y - PersonYOffset, this.angle);
    } else if (this.left && this.speed > 0) {
        this.straightAnimation.drawFrame(this.game.clockTick, ctx, this.x - PersonXOffset, this.y - PersonYOffset, this.angle);
    } else if (this.up) {
        //this.straightAnimation.loop = true;
        this.straightAnimation.drawFrame(this.game.clockTick, ctx, this.x - PersonXOffset, this.y - PersonYOffset, this.angle);
    } else {
        //this.straightAnimation.loop = false;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - PersonXOffset, this.y - PersonYOffset,this.angle);
    }
    Entity.prototype.draw.call(this);
}

Person.prototype.setIt = function () {
    this.it = true;
};

Person.prototype.setNotIt = function () {
    this.it = false;
};

Person.prototype.canPass = function (X,Y,tilePaths) { 
    var canPass = true;
   for (var i = 0; i < tilePaths.length; i++) {
       var paths = tilePaths[i]; 
       if ((X > paths.xL && X < paths.xR) &&
               (Y > paths.yT && Y < paths.yB)) {
               canPass = false;
               break;
       }
   }
   return canPass;
}

Person.prototype.collidesWithCar = function (game) {
    var colliding = false;
    for (var i = 0; i < parkedCars.length; i++) {
        for (var j = 0; j < SCOPE_OF_TILES.length; j++) {
            var col = SCOPE_OF_TILES[j].col;
            var row = SCOPE_OF_TILES[j].row;
            if (row == game.PK[i].tile.row && col == game.PK[i].tile.col) {

                if (doPolygonsIntersect(this.game.PK[i], this)) {//////////
                    colliding = true;
                    break;
                }
            }
        }
    }
    return colliding;
}
//*************************

//*************************

//************************************************************* */

function Person1(game, x, y, an, tiles, distanceToTravel, speed, sprite) {
    this.game = game;
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RedPersonStanding.png"), 0, 0, 250, 250, 0.05, 1, true, true);
    this.straightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/Red Person.png"), 0, 0, 250, 250, 0.1, 7, true, false);
    this.speed = speed;
    this.angle = an;
    this.tiles = tiles;
    this.distanceToTravel = distanceToTravel;
    this.facing = an;
    this.x2 = x;
    this.y2 = y;
    this.startX = x;
    this.startY = y;
    this.gameCoordX;
    this.gameCoordY;
    Entity.call(this, game, x, y);
}

Person1.prototype = new Entity();
Person1.prototype.constructor = Person1;

Person1.prototype.update = function () {
    this.speed = 2;
    
    this.gameCoordX = this.x2 + (PASSEDMAPS.LCount * 9217);
    this.gameCoordY = this.y2 + (PASSEDMAPS.HCount * 4502);

    var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle);
    var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
    this.x2 += travelX;
    this.y2 += travelY;
    if (this.facing === 0 || this.facing === 180) {
        if (this.facing === 0) {
            if (this.x2 >= this.distanceToTravel + this.startX) {
                this.angle = 180;
            } if (this.x2 <= this.startX) {
                this.angle = 0;
            }
        } else {
            if (this.x2 <= this.startX - this.distanceToTravel) {
                this.angle = 0;
            } if (this.x2 >= this.startX) {
                this.angle = 180;
            }
        }
    } else {
        if (this.facing == 90) {
            if (this.y2 >= this.distanceToTravel + this.startY) {
                this.angle = 270;
            } if (this.y2 <= this.startY) {
                this.angle = 90;
            }
        } else {
            if (this.y2 <= this.startY - this.distanceToTravel) {
                this.angle = 90;
            } if (this.y2 >= this.startY) {
                this.angle = 270;
            }
        }
    }

    Entity.prototype.update.call(this, this.gameCoordX - X_OFFSET, this.gameCoordY - Y_OFFSET);
}

Person1.prototype.draw = function (ctx) {
    
    for (var i = 0; i < this.tiles.length; i++) {
        for (var j = 0; j < SCOPE_OF_TILES.length; j++) {
            var c = SCOPE_OF_TILES[j].col;
            var r = SCOPE_OF_TILES[j].row;
            if (r == this.tiles[i].row && c == this.tiles[i].col) {
                this.straightAnimation.drawFrame(this.game.clockTick, ctx, this.gameCoordX - X_OFFSET, this.gameCoordY - Y_OFFSET, this.angle);
            }

        }
    }
    //this.straightAnimation.drawFrame(this.game.clockTick, ctx, this.x-X_OFFSET, this.y-Y_OFFSET, this.angle);
    Entity.prototype.draw.call(this);
}


//*************************

//*************************

//************************************************************* */

function Car(game,x,y) {                                                             
    this.tile = 5;
    this.game = game;
    this.x = 0;
    this.y = 0;
    
    this.speed = 0;
    this.maxSpeed = 10;
    this.minSpeed = -7;
    this.foundLambo = false;
    this.setNotIt();
    this.missionComplete = false;
    this.angle = 0;
    this.car = new Image();
    this.car.src = "./img/Audi.png";
    this.drag =0.95;
    this.angularDrag =0.95;
    this.turnSpeed = 0.002;
    this.collide = 0;
    game.collide.innerHTML = "Collision: " + this.collide;
    game.speed.innerHTML = "Speed: " + this.speed + " mph";
    this.radius = 100;
    this.ground = 400;
    this.prevX = 638; // *******************
    this.prevY = 345; // *******************
    this.prevOFFx = X_OFFSET; //*** */
    this.prevOFFy = Y_OFFSET;//**** */
    Entity.call(this, game, 638, 345); 

}

Car.prototype = new Entity();
Car.prototype.constructor = Car;
Car.prototype.update = function (ctx) {
    if (this.it) {

        this.game.collide.innerHTML = "Collision: " + this.collide;
        this.game.speed.innerHTML = "Speed: " + this.speed + "mph";
        // console.log("car x: " , this.x, " y : ", this.y);
        // console.log("angle: ", this.angle);
        if (this.game.w) {
            if (this.speed < this.maxSpeed) {
                this.speed += 2;
            }
            //this.game.startsound.pause();
            // this.game.driftsound.pause();
        }

        else if (this.game.s) {
            if (this.speed > this.minSpeed) {
                this.speed -= 2;
            }

            //this.game.driftsound.pause();
        }
        if (this.game.d) {
            if (this.speed !== 0) {
                if (this.speed > 0) {
                    this.angle += 3;
                } else {
                    this.angle -= 3;
                }
                //this.game.startsound.pause();
                //this.game.driftsound.play();
            }
        }

        else if (this.game.a) {
            if (this.speed !== 0) {

                if (this.speed > 0) {
                    this.angle -= 3;
                } else {
                    this.angle += 3;
                }
                //this.game.startsound.pause();
                //this.game.driftsound.play();
            }
            //this.speed +=1;  
        }
        if (this.speed > 0) this.speed -= 1;
        if (this.speed < 0) this.speed += 1;

        if (this.game.space && this.it && this.speed ===0) {
            
            var person1 = new Person(this.game);
            person1.setIt();
            this.game.person1 = person1;
            person1.x = this.x;
            person1.y = this.y;
            PersonXOffset = X_OFFSET;
            PersonYOffset = Y_OFFSET;
            
            this.game.addEntity(person1);
            this.setNotIt();

        }
        //console.log(this.collide);
        if (this.collide > 20) {
            var cop = new Police(this.game, X_OFFSET, this.y - Y_OFFSET);
            cop.angle = 0;
            this.game.addEntity(cop);
            this.it = false;
        } 
    }

         

    //console.log(this.car.src);
    if (this.car.src === "file:///C:/Users/NadirM/Downloads/MASK-master%20(3)/MASK-master/img/corvette.png") {
    //    //console.log("you have found the Car");
    //    //if (this.collide > 6) {

    //    //    console.log(" did you win?");

    //    //}
        //console.log(this.x);
        //console.log(this.y);
        this.foundLambo = true;
        if (this.game.Background.curTile.col === 1 && this.game.Background.curTile.row === 0) {
            this.missionComplete = true;

            //console.log("you have completed the mission");
        }
        //if ((this.x >= 600 && this.x <= 700) && (this.y >= 300 && this.y <= 400)) {
        //    //ctx.filltext("you have completed the first mission");
        //    missionComplete = true;
        //    console.log("you have completed the mission");
        //}
        //entity.prototype.update.call(this);
        
    }
}
Car.prototype.canPass = function (X,Y,tilePaths) { 
     var canPass = true;
    for (var i = 0; i < tilePaths.length; i++) {
        var paths = tilePaths[i]; 
        if ((X > paths.xL && X < paths.xR) &&
                (Y > paths.yT && Y < paths.yB)) {
                canPass = false;
                break;
        }
    }
    return canPass;
}
Car.prototype.draw = function (ctx) {
    console.log(X_OFFSET,Y_OFFSET);
    var col = this.game.Background.curTile.col;
    var row = this.game.Background.curTile.row;
    //console.log("row " , row, "col: " , col);
    //console.log(row);
    //if(doPolygonsIntersect())
    
    
    if (this.canPass(this.game.Background.distanceTraveledX, this.game.Background.distanceTraveledY,
                 this.game.Background.tileMap[row][col].buildings) && !this.collidesWithCar(this.game)) { //******************************** */

        
        var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle); //********* */
        var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
        this.x += travelX;
        this.y += travelY;

        this.prevOFFx = X_OFFSET; ////************ */
        this.prevOFFy = Y_OFFSET; ///************** */
        X_OFFSET += travelX; //****
        Y_OFFSET += travelY; //*****
        this.prevX =  this.game.Background.distanceTraveledX;
        this.prevY =  this.game.Background.distanceTraveledY;
        this.game.Background.distanceTraveledX += travelX; //*****
        this.game.Background.distanceTraveledY += travelY; //*****


        //*********************
       //************************************** */
        
       if (this.x <= -1450) {
            
        PASSEDMAPS.LCount = Math.floor(this.x / 10094);

    } else if (this.x > 7600) {
        PASSEDMAPS.LCount = Math.ceil(this.x / 16164);
    } else {
        PASSEDMAPS.LCount = 0;
    }

    if (this.y  >= 0) {
        PASSEDMAPS.HCount = Math.floor(this.y / 4400);

    } else if (this.y < 0) { 
        PASSEDMAPS.HCount = Math.floor(this.y / 4750); ;
    }



        //****************************

//************************************************ */
    } 
    
    else {
        this.speed = 0;
        if(this.game.w){
            this.game.w =false;
        }
        if(this.game.s){
            this.game.s = false;
        }
        // var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle); //********* */
        // var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
        this.collide += 1; 
        // this.game.Background.distanceTraveledX += travelX; //*****
        // this.game.Background.distanceTraveledY += travelY;
        //  X_OFFSET += travelX; //****
        //  Y_OFFSET += travelY;
        this.game.Background.distanceTraveledX = this.prevX; //*****
        this.game.Background.distanceTraveledY = this.prevY; //*****
        //  this.game.Background.distanceTraveledX -= travelX; //*****
        

    }

    var wasted = new Image();
    wasted.src = "./img/wasted.jpg";
    ctx.save();
    ctx.translate(this.x - X_OFFSET, this.y - Y_OFFSET); //*************
    //console.log("x: ", this.x, "y: ", this.y);

    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
    ctx.restore();

    Entity.prototype.draw.call(this);
}


Car.prototype.setIt = function () {
    this.it = true;
};

Car.prototype.setNotIt = function () {
    this.it = false;
};
Car.prototype.distance = function(a,b) {
    var dx =0; 
    var dy=0;
    //console.log("\n : ",b );
    if (b.speed !== undefined) {
        //console.log("und ",b.x,b.y);
        dx = a.x - b.x;
        dy = a.y - b.y;
    } else {
        //console.log("ent ",b.gameCoordX, b.gameCoordY);
        //console.log("ent ",a.gameCoordX, a.gameCoordY);
        dx = a.x - b.gameCoordX;
        dy = a.y - b.gameCoordY;
    }
    
    return Math.sqrt(dx * dx + dy * dy);
};
Car.prototype.swap = function (a, b) { // b is ent
    a.setIt();
    b.setNotIt();
    // console.log(b.car.src,b.gameCoordX,b.gameCoordY,b.angle2);
    // console.log(a.car.src,a.x,a.y,a.angle);
    // console.log(this.car.src,this.x,this.y,this.angle);
    var str = b.spritesheet.src;
    var xx = b.gameCoordX;
    var yy = b.gameCoordY;
    var an = b.angle2;


    b.spritesheet.src = this.car.src;
    b.x2 = this.x - (PASSEDMAPS.LCount * 9217);
    b.y2 = this.y - (PASSEDMAPS.HCount * 4502);
    b.angle2 = this.angle;

    this.angle = an;
    this.x = xx;
    this.y =yy;
    this.car.src = str;
    // console.log(b.car.src,b.gameCoordX,b.gameCoordY,b.angle2);
    // console.log(a.car.src,a.x,a.y,a.angle);
    // console.log(this.car.src,this.x,this.y,this.angle);
};

Car.prototype.collidesWithCar = function (game) {
    var colliding = false;
    for (var i = 0; i < parkedCars.length; i++) {
        for (var j = 0; j < SCOPE_OF_TILES.length; j++) {
            var col = SCOPE_OF_TILES[j].col;
            var row = SCOPE_OF_TILES[j].row;
            if (row == game.PK[i].tile.row && col == game.PK[i].tile.col) {

                if (doPolygonsIntersect(this.game.PK[i], this)) {//////////
                    colliding = true;
                    break;
                }
            }
        }
    }
    return colliding;
}

//****************************************************/
function rotatePoint(pivot, point, angle) {
    // Rotate clockwise, angle in radians
    var x = Math.round((Math.cos(angle) * (point[0] - pivot[0])) -
                       (Math.sin(angle) * (point[1] - pivot[1])) +
                       pivot[0]),
        y = Math.round((Math.sin(angle) * (point[0] - pivot[0])) +
                       (Math.cos(angle) * (point[1] - pivot[1])) +
                       pivot[1]);
    return [x, y];
  };


function getRectFourPoints(x,y, width, height, ang,isDeg =false,) {
   
    var pivot =[x+width/2, y+height/2];
    // console.log(x+width/2);
    // console.log(y+height/2);
	if(isDeg) ang = ang * (Math.PI / 180);
    var point = [];
    var point0 =rotatePoint(pivot,[x,y],ang);
    point.push(point0);


	var sinAng = Math.sin(ang);	
    var cosAng = Math.cos(ang);
    
	
    var point1= rotatePoint(pivot,[x + width,y],ang);
    point.push(point1);
	
    var point2= rotatePoint(pivot,[x, y + height],ang);

    point.push(point2);

    var point3= rotatePoint(pivot,[x +width,y + height],ang);

    point.push(point3);
	return point;
}


function doPolygonsIntersect (a, b) {
    //console.log(b.frameHeight);
    
    var pointsOfA = getRectFourPoints(a.gameCoordX,a.gameCoordY,a.w,a.h,a.angle2,true);
    var pointsOfB = getRectFourPoints(b.x,b.y,108,46,b.angle,true);//

    // console.log(b.width);
    // console.log(b.height);
    // console.log(pointsOfB[2]);
    // console.log(pointsOfB[3]);

    var polygons = [pointsOfA, pointsOfB];
    var minA, maxA, projected, i, i1, j, minB, maxB;
    //console.log(polygons.length);
    for (i = 0; i < polygons.length; i++) {
        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < 4; i1++) {
    
            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % 4;
            var p1 = polygon[i1];
            var p2 = polygon[i2];
            //console.log(p2[0]);
            //console.log(polygon.sec)
            //console.log(str2);;
            // find the line perpendicular to this edge
            var normal = [p2[1] - p1[1],  p1[0] - p2[0] ];

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            //console.log(a.length);
            for (j = 0; j < 4; j++) {
                projected = normal[0] * pointsOfA[j][0] + normal[1] * pointsOfA[j][1];
                //console.log(projected);
                if (minA===undefined || projected < minA) {
                    minA = projected;
                }
                if (maxA===undefined || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < 4; j++) {
                projected = normal[0] * pointsOfB[j][0] + normal[1] * pointsOfB[j][1];
                if (minB===undefined || projected < minB) {
                    minB = projected;
                }
                if (maxB===undefined || projected > maxB) {
                    maxB = projected;
                }
            }
            // console.log(maxA < minB);
            // console.log(maxB < minA);
            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                // console.log("polygons don't intersect!");
                return false;
            }
        }
    }
    // console.log(minA);
    // console.log(minB);
    // console.log(maxA);
    // console.log(maxB);
    return true;
};
//********************************************************* */



var PASSEDMAPS = { LCount: 0, HCount: 0};
// when car has been left behind DD TO PARKED CAR LIST WITH COORDS
//*************************************************** */
function Car2(game,x,y,spritesheet,tile, width, height, angle) {
    this.game = game;
    this.x2 = x;
    this.y2 = y;
    this.car = new Image();
    this.spritesheet = spritesheet;

    this.setNotIt();
    // this.origX = x;
    // this.origY = y;
    this.angle2 = angle;
    this.spritesheet = spritesheet;
    this.tile = tile;
    this.ctx1 = game.ctx;
    this.w = width
    this.h = height
    
    this.gameCoordX;
    this.gameCoordY;
Entity.call(this, game); 
}
Car2.prototype = new Entity();
Car2.prototype.update = function () {
    this.gameCoordX =  this.x2 + (PASSEDMAPS.LCount * 9217);
    this.gameCoordY = this.y2 + (PASSEDMAPS.HCount * 4502);
}

Car2.prototype.draw = function () {
        for (var j = 0; j < SCOPE_OF_TILES.length; j++) {
              var c = SCOPE_OF_TILES[j].col;
              var r = SCOPE_OF_TILES[j].row;
             if (r == this.tile.row && c == this.tile.col) {
                this.ctx1.drawImage(this.spritesheet, this.gameCoordX - X_OFFSET , this.gameCoordY  - Y_OFFSET);
             }
        }
    Entity.prototype.draw.call(this);

}


Car2.prototype.setIt = function () {
    this.it = true;
};

Car2.prototype.setNotIt = function () {
    this.it = false;
};

function Car4(game, x, y, spritesheet, tiles, angle, distanceToTravel) {
    this.game = game;
    this.speed = 0;
    this.angle = angle;
    this.tiles = tiles;

    this.car = new Image();
    this.car.src = spritesheet.src;
    this.spritesheet = spritesheet;
    this.ctx1 = game.ctx;
    this.distanceToTravel = distanceToTravel;
    this.facing = angle;
    this.x2 = x;
    this.y2 = y;
    this.startX = x;
    this.startY = y;
    this.gameCoordX;
    this.gameCoordY;
    Entity.call(this, game, x, y);
}

Car4.prototype = new Entity();
Car4.prototype.constructor = Car4;

Car4.prototype.update = function () {
    this.speed = 2;
    this.gameCoordX = this.x2 + (PASSEDMAPS.LCount * 9217);
    this.gameCoordY = this.y2 + (PASSEDMAPS.HCount * 4502);

    var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle);
    var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
    this.x2 += travelX;
    this.y2 += travelY;
    if (this.facing === 0 || this.facing === 180) {
        if (this.facing === 0) {
            if (this.x2 >= this.distanceToTravel + this.startX) {
                this.angle = 180;
                this.y2 = this.y2 - 50;
            } if (this.x2 <= this.startX) {
                this.angle = 0;
                this.y2 = this.y2 + 50;
            }
        } else {
            if (this.x2 <= this.startX - this.distanceToTravel) {
                this.angle = 0;
                this.y2 = this.y2 + 50;
            } if (this.x2 >= this.startX) {
                this.angle = 180;
                this.y2 = this.y2 - 50;
            }
        }
    } else {
        if (this.facing == 90) {
            if (this.y2 >= this.distanceToTravel + this.startY) {
                this.angle = 270;
                this.x2 = this.x2 + 50;
            } if (this.y2 <= this.startY) {
                this.angle = 90;
                this.x2 = this.x2 - 50;
            }
        } else {
            if (this.y2 <= this.startY - this.distanceToTravel) {
                this.angle = 90;
                this.x2 = this.x2 - 50;

            } if (this.y2 >= this.startY) {
                this.angle = 270;
                this.x2 = this.x2 + 50;
            }
        }
    }

    Entity.prototype.update.call(this, this.gameCoordX - X_OFFSET, this.gameCoordY - Y_OFFSET);
}

Car4.prototype.draw = function (ctx) {



    for (var i = 0; i < this.tiles.length; i++) {
        for (var j = 0; j < SCOPE_OF_TILES.length; j++) {
            var c = SCOPE_OF_TILES[j].col;
            var r = SCOPE_OF_TILES[j].row;
            if (r == this.tiles[i].row && c == this.tiles[i].col) {
                ctx.save();
                ctx.translate(this.gameCoordX - X_OFFSET, this.gameCoordY - Y_OFFSET); //*************
                ctx.rotate(Math.PI / 180 * this.angle);
                ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
                ctx.restore();

                //this.ctx1.drawImage(this.car, this.gameCoordX - X_OFFSET , this.gameCoordY  - Y_OFFSET);


            }

        }
    }
    Entity.prototype.draw.call(this);
}

function Person2(game, x, y, spritesheet, tile, width, height, angle) {
    this.game = game;
    this.x2 = x;
    this.y2 = y;
    this.car = new Image();
    this.spritesheet = spritesheet;

    //this.setNotIt();
    // this.origX = x;
    // this.origY = y;
    this.angle2 = angle;
    //this.spritesheet = spritesheet;
    this.tile = tile;
    this.ctx1 = game.ctx;
    this.w = width
    this.h = height

    this.gameCoordX;
    this.gameCoordY;
    Entity.call(this, game);
}
Person2.prototype = new Entity();
Person2.prototype.update = function () {
    this.gameCoordX = this.x2 + (PASSEDMAPS.LCount * 9217);
    this.gameCoordY = this.y2 + (PASSEDMAPS.HCount * 4502);
}

Person2.prototype.draw = function () {
    for (var j = 0; j < SCOPE_OF_TILES.length; j++) {
        var c = SCOPE_OF_TILES[j].col;
        var r = SCOPE_OF_TILES[j].row;
        if (r == this.tile.row && c == this.tile.col) {
            this.ctx1.drawImage(this.spritesheet, this.gameCoordX - X_OFFSET, this.gameCoordY - Y_OFFSET);

        }

    }
    Entity.prototype.draw.call(this);

}

function Police(game, x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.angle = 0;
    this.game = game;
    this.car = new Image();
    this.car.src = "./img/cop.png";
    this.width = this.car.width;
    this.height = this.car.height;
    Entity.call(this, game, x, y);


}

Police.prototype = new Entity();
Police.prototype.constructor = Police;
Police.prototype.update = function () {
    this.speed = 2;
    Entity.prototype.update.call(this);
}

Police.prototype.reset = function () {
}

Police.prototype.draw = function (ctx) {

    this.x += (this.speed) * Math.cos(Math.PI / 180 * this.angle);
    this.y += (this.speed) * Math.sin(Math.PI / 180 * this.angle);

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
    ctx.restore();

    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

//ASSET_MANAGER.queueDownload("./img/carRight.png");

// ASSET_MANAGER.queueDownload("./img/5.jpg");
// ASSET_MANAGER.queueDownload("./img/4.png");
ASSET_MANAGER.queueDownload("./img/FinalTiles/0,1.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/0,2.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/0,3.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/0,4.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/1,0.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/1,1.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/1,2.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/1,3.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/1,4.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/1,5.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/2,1.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/2,2.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/2,3.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/2,4.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,0.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,1.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,2.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,3.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,4.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,5.jpg");

ASSET_MANAGER.queueDownload("./img/muscleCar.png");//270
ASSET_MANAGER.queueDownload("./img/cop.png");

ASSET_MANAGER.queueDownload("./img/Black_viper.png"); // 0 
ASSET_MANAGER.queueDownload("./img/Audi.png"); // 0 
ASSET_MANAGER.queueDownload("./img/Mini_truck.png"); // 270
ASSET_MANAGER.queueDownload("./img/Mini_van.png"); // 270
ASSET_MANAGER.queueDownload("./img/Ambulance.png"); // 0
ASSET_MANAGER.queueDownload("./img/taxi.png"); // 270
ASSET_MANAGER.queueDownload("./img/lambo.png"); // 270 
ASSET_MANAGER.queueDownload("./img/mercedes.png"); // 0 
ASSET_MANAGER.queueDownload("./img/sedan.png"); // 270
ASSET_MANAGER.queueDownload("./img/corvette.png"); // 270
ASSET_MANAGER.queueDownload("./img/ferrari.png"); // 0
ASSET_MANAGER.queueDownload("./img/suv.png"); // 270
ASSET_MANAGER.queueDownload("./img/audiR8.png"); // 270
ASSET_MANAGER.queueDownload("./img/ferrari2.png"); // 0
ASSET_MANAGER.queueDownload("./img/astonMartin.png"); // 270 
ASSET_MANAGER.queueDownload("./img/lightBlueAudi.png"); // 270
ASSET_MANAGER.queueDownload("./img/Red Person.png"); // 0 
ASSET_MANAGER.queueDownload("./img/RedPersonStanding.png"); 
//ASSET_MANAGER.queueDownload("./img/RedPersonStandingSmall.png");
//ASSET_MANAGER.queueDownload("./img/jorgeSmall.png");
ASSET_MANAGER.queueDownload("./img/BlueOrangeGreen.png");
ASSET_MANAGER.queueDownload("./img/RedBluePants.png");
ASSET_MANAGER.queueDownload("./img/PurpleOrangeGreen.png");
ASSET_MANAGER.queueDownload("./img/YellowBlueGreen.png");
ASSET_MANAGER.queueDownload("./img/wasted.jpg"); 

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var collide = document.getElementById('collide');
    var speed = document.getElementById('speed');
    var ctx = canvas.getContext('2d');
    
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.collide = collide;
    gameEngine.speed = speed;
    //********************
    var BG = new Background(gameEngine);
    gameEngine.running = false;
    var person = new Person(gameEngine);
    

    person.setIt();
    var car = new Car(gameEngine);
    var pg = new PlayGame(gameEngine, 320, 350);
    movingCar = [//new Car4(gameEngine,1975,670,ASSET_MANAGER.getAsset("./img/suv.png"),[{row:0, col:2},{row:0, col:3}],0,2450),
        //new Car4(gameEngine,4405,626,ASSET_MANAGER.getAsset("./img/lightBlueAudi.png"),[{row:0, col:2},{row:0, col:3}],180,2450),
        //new Car4(gameEngine, 1615, 1609, ASSET_MANAGER.getAsset("./img/cop.png"), [{ row: 1, col: 2 }, { row: 2, col: 2 }, { row: 2, col: 3 }], 90, 2017),
        //new Car4(gameEngine, 1695, 3032, ASSET_MANAGER.getAsset("./img/audiR8.png"), [{ row: 1, col: 2 }, { row: 2, col: 2 }, { row: 2, col: 3 }], 270, 2017),
        new Car4(gameEngine, 1320, 2274, ASSET_MANAGER.getAsset("./img/Audi.png"), [{ row: 1, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 5 }, { row: 1, col: 4 }], 180, 2975),
        new Car4(gameEngine, 5355, 2332, ASSET_MANAGER.getAsset("./img/sedan.png"), [{ row: 1, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 5 }, { row: 1, col: 4 }], 0, 2975),
        new Car4(gameEngine, 1632, 3990, ASSET_MANAGER.getAsset("./img/mercedes.png"), [{ row: 3, col: 1 }, { row: 3, col: 0 }, { row: 3, col: 5 }, { row: 3, col: 4 }], 180, 2804),
        new Car4(gameEngine, 5053, 4040, ASSET_MANAGER.getAsset("./img/lambo.png"), [{ row: 3, col: 1 }, { row: 3, col: 0 }, { row: 3, col: 5 }, { row: 3, col: 4 }], 0, 2804),

        // new Car4(gameEngine,1690,714,ASSET_MANAGER.getAsset("./img/mercedes.png"),[{row:0, col:2},{row:1, col:2},{row:2, col:2},{row:3, col:2}],270,1000),
        // new Car4(gameEngine,1690,1814,ASSET_MANAGER.getAsset("./img/mercedes.png"),[{row:0, col:2},{row:1, col:2},{row:2, col:2},{row:3, col:2}],270,1000),
        // new Car4(gameEngine,1690,2714,ASSET_MANAGER.getAsset("./img/mercedes.png"),[{row:0, col:2},{row:1, col:2},{row:2, col:2},{row:3, col:2}],270,1000),
        // new Car4(gameEngine,1690,3714,ASSET_MANAGER.getAsset("./img/mercedes.png"),[{row:0, col:2},{row:1, col:2},{row:2, col:2},{row:3, col:2}],270,1000)
    ];

    gameEngine.car = car;
    gameEngine.Background = BG;
    gameEngine.pg = pg;
    personList = [new Person1(gameEngine, 1723, 514, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750),
    //             new Person1(gameEngine,4480,490,180,[{row:0, col:2},{row:0, col:3}],2750),
    //             new Person1(gameEngine,1723,514,90,[{row:0, col:2},{row:1, col:2}],1000),
    //             new Person1(gameEngine,1630,1500,270,[{row:0, col:2},{row:1, col:2}],1000),
    //             new Person1(gameEngine,2000,770,0,[{row:0, col:2},{row:0, col:3}],2450),
    //              new Person1(gameEngine,4405,726,180,[{row:0, col:2},{row:0, col:3}],2450),
    //              new Person1(gameEngine,1515,1609,90,[{row:1, col:2},{row:2, col:2},{row:2, col:3}],800),
    //              new Person1(gameEngine,1795,3032,270,[{row:1, col:2},{row:2, col:2},{row:2, col:3}],2017),
    //             new Person1(gameEngine,1320,2274,180,[{row:1, col:0},{row:1, col:5},{row:1, col:4}],2975),
    //             new Person1(gameEngine,5355,2332,0,[{row:1, col:1},{row:1, col:0},{row:1, col:5},{row:1, col:4}],0,2975),
    //             new Person1(gameEngine,1632,3860,180,[{row:3, col:1},{row:3, col:0},{row:3, col:5},{row:3, col:4}],2804),
    //             new Person1(gameEngine,5053,4100,0,[{row:3, col:1},{row:3, col:0},{row:3, col:5},{row:3, col:4}],2804),
    //new Person1(gameEngine, 1823, 510, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 4580, 490, 180, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2450, 2, "./img/RedBluePants.png"),
    //new Person1(gameEngine, 1853, 465, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750, .5, "./img/PurpleOrangeGreen.png"),
    //new Person1(gameEngine, 4580, 445, 180, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2350, .5, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 1823, 514, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750, 1, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 1843, 464, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2350, 1.5, "./img/PurpleOrangeGreen.png"),
    //new Person1(gameEngine, 4580, 445, 180, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750, 1.5, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 1823, 512, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750, 1, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 4560, 492, 180, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 2750, 1, "./img/RedBluePants.png"),

    //new Person1(gameEngine, 1775, 860, 90, [{ row: 0, col: 2 }, { row: 1, col: 2 }], 1250, 1, "./img/RedBluePants.png"),
    //new Person1(gameEngine, 1780, 900, 90, [{ row: 0, col: 2 }, { row: 1, col: 2 }], 1250, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 1780, 1980, 270, [{ row: 0, col: 2 }, { row: 1, col: 2 }], 1200, 1, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 1778, 1999, 270, [{ row: 0, col: 2 }, { row: 1, col: 2 }], 1290, 2.5, "./img/PurpleOrangeGreen.png"),
    //new Person1(gameEngine, 1775, 1970, 270, [{ row: 0, col: 2 }, { row: 1, col: 2 }], 1290, .6, "./img/RedBluePants.png"),

    //new Person1(gameEngine, 1775, 2400, 90, [{ row: 2, col: 2 }, { row: 1, col: 2 }, { row: 3, col: 2 }], 1336, 1, "./img/RedBluePants.png"),
    //new Person1(gameEngine, 1780, 2400, 90, [{ row: 2, col: 2 }, { row: 1, col: 2 }, { row: 3, col: 2 }], 1336, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 1780, 3784, 270, [{ row: 2, col: 2 }, { row: 1, col: 2 }, { row: 3, col: 2 }], 1336, 1, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 1778, 3764, 270, [{ row: 2, col: 2 }, { row: 1, col: 2 }, { row: 3, col: 2 }], 1336, 2.5, "./img/PurpleOrangeGreen.png"),
    //new Person1(gameEngine, 1775, 3780, 270, [{ row: 2, col: 2 }, { row: 1, col: 2 }, { row: 3, col: 2 }], 1315, .6, "./img/RedBluePants.png"),

    //new Person1(gameEngine, 1852, 728, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 1000, 1, "./img/RedBluePants.png")
    //new Person1(gameEngine, 1852, 730, 0, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 1000, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 2920, 720, 180, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 1000, 1, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 2920, 722, 180, [{ row: 0, col: 2 }, { row: 0, col: 3 }], 1000, 2.5, "./img/PurpleOrangeGreen.png"),

    new Person1(gameEngine, 3452, 728, 0, [{ row: 0, col: 3 }, { row: 0, col: 2 }], 1000, 1, "./img/RedBluePants.png")
    //new Person1(gameEngine, 3452, 730, 0, [{ row: 0, col: 3 }, { row: 0, col: 2 }], 1000, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 4500, 720, 180, [{ row: 0, col: 3 }, { row: 0, col: 2 }], 1000, 1, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 4500, 722, 180, [{ row: 0, col: 3 }, { row: 0, col: 2 }], 1000, 2.5, "./img/PurpleOrangeGreen.png"),

    //new Person1(gameEngine, 1842, 2382, 0, [{ row: 1, col: 2 }, { row: 1, col: 3 }], 1000, 1, "./img/RedBluePants.png"),
    //new Person1(gameEngine, 1845, 2376, 0, [{ row: 1, col: 2 }, { row: 1, col: 3 }], 1000, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 2404, 2390, 180, [{ row: 1, col: 2 }, { row: 1, col: 3 }], 1010, 1, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 2400, 2384, 180, [{ row: 1, col: 2 }, { row: 1, col: 3 }], 1010, 2.5, "./img/PurpleOrangeGreen.png")

    //new Person1(gameEngine, 3452, 2383, 0, [{ row: 1, col: 3 }, { row: 1, col: 2 }], 1000, 1, "./img/RedBluePants.png"),
    //new Person1(gameEngine, 3462, 2376, 0, [{ row: 1, col: 3 }, { row: 1, col: 2 }], 1000, 2, "./img/BlueOrangeGreen.png"),
    //new Person1(gameEngine, 4580, 2390, 180, [{ row: 1, col: 3 }, { row: 1, col: 2 }], 1010, 1, "./img/YellowBlueGreen.png"),
    //new Person1(gameEngine, 4580, 2382, 180, [{ row: 1, col: 3 }, { row: 1, col: 2 }], 1010, 2.5, "./img/PurpleOrangeGreen.png"),

    ];

    gameEngine.collide = collide;

    parkedCars = [
        new Car2(gameEngine, 590, 788,ASSET_MANAGER.getAsset("./img/mercedes.png"), {row:0, col:1},116,54, 0),
                    new Car2(gameEngine, 590, 950,ASSET_MANAGER.getAsset("./img/Audi.png"), {row:0, col:1},116,54, 0),
                    new Car2(gameEngine, 1080, 315,ASSET_MANAGER.getAsset("./img/Black_viper.png"), {row:0, col:1}, 116, 54, 0),
                    new Car2(gameEngine, 1080, 784,ASSET_MANAGER.getAsset("./img/ferrari2.png"), {row:0, col:1},116,54, 0), 
                    new Car2(gameEngine, -132, 2440,ASSET_MANAGER.getAsset("./img/sedan.png"), {row:1, col:1},116,54, 270), 
                    new Car2(gameEngine, 2950, 1085,ASSET_MANAGER.getAsset("./img/Mini_van.png"), {row:0, col:2},116,54, 270),
                    new Car2(gameEngine, 1951, 3670,ASSET_MANAGER.getAsset("./img/suv.png"), {row:3, col:2},116,54, 270), 
                    new Car2(gameEngine, 2263, 3040,ASSET_MANAGER.getAsset("./img/Mini_truck.png"), {row:2, col:2},116,54, 270), 
                    new Car2(gameEngine, 4121, 3040,ASSET_MANAGER.getAsset("./img/audiR8.png"), {row:2, col:3},116,54, 270),
                    new Car2(gameEngine, 4439, 3040,ASSET_MANAGER.getAsset("./img/taxi.png"), {row:2, col:3},116,54, 270), 
                    new Car2(gameEngine, 433, 3716,ASSET_MANAGER.getAsset("./img/astonMartin.png"), {row:3, col:3},116,54, 270),
                    new Car2(gameEngine, 3350, 1075,ASSET_MANAGER.getAsset("./img/lightBlueAudi.png"), {row:0, col:3},116,54, 270),
                    new Car2(gameEngine, 3355, 1200,ASSET_MANAGER.getAsset("./img/sedan.png"), {row:0, col:3},116,54, 270), 
                    new Car2(gameEngine, 5190, 864,ASSET_MANAGER.getAsset("./img/ferrari.png"), {row:0, col:4},116,54, 0), 
                    new Car2(gameEngine, 5685, 382,ASSET_MANAGER.getAsset("./img/Audi.png"), {row:0, col:4},116,54, 0), 
                    new Car2(gameEngine, 5690, 970,ASSET_MANAGER.getAsset("./img/ferrari2.png"), {row:0, col:4},116,54, 0), 
                    new Car2(gameEngine, 5857, 1225,ASSET_MANAGER.getAsset("./img/muscleCar.png"), {row:0, col:4},116,54, 0), 
                    new Car2(gameEngine, 5190, 395,ASSET_MANAGER.getAsset("./img/Black_viper.png"), {row:0, col:4},116,54, 0),
                    new Car2(gameEngine, 6450, 2496,ASSET_MANAGER.getAsset("./img/audiR8.png"), {row:1, col:4},116,54, 270), 
                    new Car2(gameEngine, 5570, 3815,ASSET_MANAGER.getAsset("./img/Mini_truck.png"), {row:3, col:4}, 116,54, 270), 
                    new Car2(gameEngine, -446, 3825,ASSET_MANAGER.getAsset("./img/lambo.png"), {row:3, col:0},116,54, 270), 
                    new Car2(gameEngine, 690, 4148,ASSET_MANAGER.getAsset("./img/suv.png"), {row:3, col:1},116,54, 270), 
                    new Car2(gameEngine, 4293, 3653,ASSET_MANAGER.getAsset("./img/corvette.png"), {row:3, col:3},116,54, 270),
                    new Car2(gameEngine, 2290, 3647,ASSET_MANAGER.getAsset("./img/astonMartin.png"), {row:3, col:2},116,54, 270),
                    new Car2(gameEngine, 3335, 180,ASSET_MANAGER.getAsset("./img/lambo.png"), {row:0, col:3},116,54, 270)
    ];
    
    gameEngine.PK = parkedCars;
    gameEngine.addEntity(BG);
    gameEngine.addEntity(pg);
    //people = [new Person2(gameEngine, 715, 200, ASSET_MANAGER.getAsset("./img/RedPersonStandingSmall.png"), { row: 0, col: 1 }, 70, 70, 0),
    //        new Person2(gameEngine, 710, 305, ASSET_MANAGER.getAsset("./img/jorgeSmall.png"), { row: 0, col: 1 }, 70, 70, 0)];
    gameEngine.addEntity(car);
   
    for (var i = 0; i < parkedCars.length; i++ ) {
            gameEngine.addEntity(parkedCars[i]);
    }

    //for (var i = 0; i < personList.length; i++) {
    //    gameEngine.addEntity(personList[i]);
    //} 
    //var people = 
     //gameEngine.addEntity(car1);
    for (var i = 0; i < movingCar.length; i++) {
        gameEngine.addEntity(movingCar[i]);
    } 

    gameEngine.addEntity(person); 
});