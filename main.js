
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

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 0.5;
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

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
        index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
        this.frameWidth, this.frameHeight,
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
var SCOPE_OF_TILES = [];
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
    this.tileMap[0][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,4.jpg"),
                                         width: 1515, height: 1535, buildings: []}; //{xL:, xR: yT:, yB}
    this.tileMap[0][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"),
                                                        width: 1515, height: 1535, buildings: []};
    this.tileMap[0][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,2.jpg"),
                                                        width: 1622, height: 1535, buildings: []};
    this.tileMap[0][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,3.jpg"),
                                                        width: 1620, height: 1535, buildings: []};
    this.tileMap[0][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,4.jpg"),
                                                        width: 1515, height: 1535, buildings: []};
    this.tileMap[0][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"),
                                         width: 1515, height: 1535, buildings: []};
    this.tileMap[1][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,0.jpg"),
                                                        width: 1160, height: 1260, buildings: []};
    this.tileMap[1][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,1.jpg"),
                                                        width: 1812, height: 1260, buildings: []};
    this.tileMap[1][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,2.jpg"),
                                                        width: 1619, height: 1259, buildings: []}; // stretch
    this.tileMap[1][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,3.jpg"),
                                                        width: 1619, height: 1259, buildings: []};
    this.tileMap[1][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,4.jpg"),
                                                        width: 1826, height: 1260, buildings: []};
    this.tileMap[1][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,5.jpg"),
                                                        width: 1160, height: 1260, buildings: []};
    this.tileMap[2][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,1.jpg"), width: 1021, height: 784,
                          buildings: [{xL: 0, xR: 1021, yT: 0, yB: 784}]};
    this.tileMap[2][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,2.jpg"),
                                                        width: 1622, height: 784, buildings: []};
    this.tileMap[2][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,3.jpg"),
                                                       width: 1618, height: 784, buildings: []};
    this.tileMap[2][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,4.jpg"),
                          width: 1028, height: 784, buildings: [{xL: 0, xR: 1028, yT: 0, yB: 784}]};
    this.tileMap[3][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,0.jpg"),
                                                        width: 1160, height: 928, buildings: []};
    this.tileMap[3][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,1.jpg"),
                                                        width: 1829, height: 924, buildings: []};
    this.tileMap[3][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,2.jpg"),
                                                        width: 1621, height: 924, buildings: []};
    this.tileMap[3][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,3.jpg"),
                                                        width: 1618, height: 924, buildings: []};
    this.tileMap[3][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,4.jpg"),
                                                        width: 1829, height: 924, buildings: []};
    this.tileMap[3][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,5.jpg"),
                                                        width: 1160, height: 928, buildings: []};
    this.curTile = {row: 0, col: 1}; // 0,1
   
}

Background.prototype.draw = function () {
    this.ctx.imageSmoothingQuality = 'medium';
    this.ctx.imageSmoothingEnabled = true;
    var tile = this.tileMap[this.curTile.row][this.curTile.col];
    console.log("row" , this. curTile.row ," col: " ,this.curTile.col);
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
            this.ctx.drawImage(t1.img, 0, YT, t1.width, 570, nextL, 0, t1.width, 570);
         
    } 
} catch {
    console.log("skip left col");
} try {
    var nextR;
    if (XR > tile.width) {//col++{
            var t2;
            if (this.curTile.col == 5) {
                t2 = this.tileMap[this.curTile.row][0];
            } else {
                t2 = this.tileMap[this.curTile.row][this.curTile.col + 1];
            }
           
            var nextR = 625 + (tile.width - this.distanceTraveledX);
            this.ctx.drawImage(t2.img, 0, YT, 1250, 570, nextR, 0, 1250, 570);
            //add scope of tiles .push 
       
    }
} catch {
    console.log("skip right col");
} try {
    if (YT < 0) {//row--    /UP
        var row = this.curTile.row == 0 ? 3 :  this.curTile.row - 1;

        var t4 = this.tileMap[row][this.curTile.col];
        var nextU = -t4.height + (285 - this.distanceTraveledY);

        if (row == 0 && (this.curTile.col == 1 || this.curTile.col == 4)) {
            if (this.curTile.col == 1) {
                this.ctx.drawImage(t4.img, XL - 500, 0, t4.width, t4.height, -200, nextU, t4.width, t4.height);
            } else if (this.curTile.col == 4) {
                 this.ctx.drawImage(t4.img, XL, 0, t4.width, t4.height, 0, nextU, t4.width, t4.height);
             
            }
        }  else if (row == 3 && (this.curTile.col == 1 || this.curTile.col == 4)) { 
                if (this.curTile.col == 1) {
                    this.ctx.drawImage(t4.img, XL, 0, t4.width, t4.height, -312, nextU, t4.width, t4.height);
                  

                } else if (this.curTile.col == 4) { //// CHANGEEE
                    this.ctx.drawImage(t4.img, XL, 0, t4.width, t4.height, 0, nextU, t4.width, t4.height);
                
                }  
        } else { 
           var scoot = tile.width - t4.width;
           this.ctx.drawImage(t4.img, XL, 0, 1250, t4.height, -.75 - scoot, nextU, 1256, t4.height);

        }
        
        if (XR > tile.width) {
            //also do the bottom to the right
            var t5 = this.tileMap[row][this.curTile.col + 1];
            this.ctx.drawImage(t5.img, 0, 0, 1250, t5.height, nextR - 1.25, nextU, 1252, t5.height);
        }  else if (XL < tile.width) {
            var t5 =  this.tileMap[row][this.curTile.col - 1];
            var nextl = -t5.width + (625 - this.distanceTraveledX);
            this.ctx.drawImage(t5.img, 0, 0, t5.width, t5.height, nextl + 2, nextU, t5.width+3, t5.height);
        }
    } 
} catch {
    console.log("skip upper row");
} try {
    // var next4;
    if (YB > tile.height) {//row++   DOWN
        var row = this.curTile.row == 3 ? 0 :  this.curTile.row + 1;

        var t4 = this.tileMap[row][this.curTile.col];
        var nextD = 285 + (tile.height - this.distanceTraveledY);
        if (row == 1 && (this.curTile.col == 1 || this.curTile.col == 4)) {
            if (this.curTile.col == 1) {
                this.ctx.drawImage(t4.img, XL, 0, t4.width, 570,-297, nextD, t4.width, 570);
            } else if (this.curTile.col == 4) {
                this.ctx.drawImage(t4.img, XL, 0, t4.width, 570, 0, nextD, t4.width, 570);
            }
        } else { 
            var scoot = tile.width - t4.width;
            this.ctx.drawImage(t4.img, XL, 0, 1250, 570, -1 - scoot, nextD, 1258, 570);
        }

        if (XR > tile.width) {
                //also do the bottom to the right
                var t5 = this.tileMap[row][this.curTile.col + 1];
                this.ctx.drawImage(t5.img, 0, 0, 1250, 570, nextR, nextD, 1252, 570);
            }  else if (XL < tile.width) {
              //  console.log("col", this.curTile.col, " row: ", row);
                var t5 =  this.tileMap[row][this.curTile.col - 1];
                var nextl = -t5.width + (625 - this.distanceTraveledX);
                this.ctx.drawImage(t5.img, 0, 0, t5.width, 570, nextl, nextD, t5.width + 4, 570);
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

    console.log("distance X: " + this.distanceTraveledX + " \n distance Y: " +this.distanceTraveledY);
    
    if (this.distanceTraveledX > tileW){
        if ((row === 1 || row == 3) && col == 5) { // if row 1 or 3 
            this.curTile.col = 0;
            
        } else {
            this.curTile.col++;
        }
        this.distanceTraveledX = 1;
    } else if (this.distanceTraveledX < 0) { // col change
        if ((row === 1 || row == 3) && col === 0) { // if row 1 or 3
            this.curTile.col = 5;
        } else {
            this.curTile.col--; 
        }
        this.distanceTraveledX = this.tileMap[this.curTile.row][this.curTile.col].width - 1;
    } else if (this.distanceTraveledY> tileH) { // down
        if (row === 3 )  {
            this.curTile.row = 0;
        } else {
            this.curTile.row++;
        }
         this.distanceTraveledY = 1;
    } else if ( this.distanceTraveledY < 0) { // up
        if (row === 0 )  {
            this.curTile.row = 3;
        } else {
            this.curTile.row--;
        }
        this.distanceTraveledY = this.tileMap[this.curTile.row][this.curTile.col].height - 1; // row change
    }
};

//*************************

//*************************

//************************************************************* */

function Car(game,x,y) {
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carRight.png"), 0, 0, 256, 256, 0.2, 1, true, true);
    // this.upAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 0, 262, 250, 0.02, 1, false, true);
    // this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 250, 262, 250, 0.02, 1, false, true);
    // this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 0, 262, 250, 0.02, 1, false, true);
    // this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 250, 262, 250, 0.02, 1, false, true);
    this.game = game;                                                               
    this.tile = 5;

    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.maxSpeed = 7;
    this.minSpeed = -7;

    this.angle = 0;
    this.mod = 0;
    this.car = new Image();
    this.car.src = "./img/CarRight.png";

    this.drag =0.95;
    this.angularDrag =0.95;
    this.turnSpeed=0.002;
    this.collide =0;
    this.radius = 100;
    this.ground = 400;
    this.prevX = 638; // *******************
    this.prevY = 345; //**************** */

    Entity.call(this, game, 638, 345); 

}

Car.prototype = new Entity();
Car.prototype.constructor = Car;
Car.prototype.update = function () {

    if (this.game.d && this.speed > 0) {
       
        if(this.speed > 0){
            this.angle += 5;
        } else{
            this.angle -= 5;
        }
        this.left = true;
    } else if (this.game.s) {
        //this.mod = 0;
        if (this.speed > this.minSpeed) {
            this.speed -= 2;
        }
        this.down = true;

    } else if (this.game.a ) {
        if(this.speed > 0){
            this.angle -= 5;
        } else{
            this.angle += 5;
        }
        this.right = true;
    } else if (this.game.w) {
        if (this.speed < this.maxSpeed) {
            this.speed += 1;
        }
        this.up = true;
        this.mod = 1;
    }
    Entity.prototype.update.call(this);
}

Car.prototype.draw = function (ctx) {
    
    var col = this.game.Background.curTile.col;
    var row = this.game.Background.curTile.row
    if (canDrive(this.x, this.y, this.game.Background.tileMap[row][col].buildings)) { //******************************** */

        var travelX = (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle); //********* */
        var travelY = (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += travelX;
        this.y += travelY;

        X_OFFSET += travelX; //****
        Y_OFFSET += travelY; //*****
        this.game.Background.distanceTraveledX += travelX; //*****
        this.game.Background.distanceTraveledY += travelY; //*****


    } else {
        this.x = this.prevX;
        this.y = this.prevY;
        this.speed = 0;
        this.collide += 1; 
        this.game.Background.distanceTraveledX -= this.x - this.prevX; //*****
        this.game.Background.distanceTraveledY -= this.y - this.prevY; //*****

    }
    ctx.save();
    ctx.translate(this.x - X_OFFSET, this.y - Y_OFFSET); //*************
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
    ctx.restore();

    Entity.prototype.draw.call(this);
}
//****************************************************/
function canDrive(X, Y, tilePaths) {
    this.X = X - X_OFFSET; // need to take in count width and height 
    this.Y = Y - Y_OFFSET;
    this.canPass = true;
    this.tilePaths = tilePaths;
    for (var i = 0; i < this.tilePaths.length, i++;) {
        var paths = this.tilePaths[i];    
        if ((this.X >= paths.xL && this.X <= paths.xR) &&
                (this.Y >= paths.yT && this.Y <= paths.yB)) {
                canPass = false;
                break;
        }
    }
    return canPass;
}
//*************************************************** */


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
ASSET_MANAGER.queueDownload("./img/CarRight.png");
ASSET_MANAGER.queueDownload("./img/CarUp1.png");
ASSET_MANAGER.queueDownload("./img/police.png");


ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    
    var gameEngine = new GameEngine();
    //var bg = new Background(gameEngine);\
    //gameEngine.addEntity(bg);
    

    gameEngine.init(ctx);
    gameEngine.start();

    // gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/5.jpg"), 0, 0));
    // gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/4.png"), 0, 911));
    
    //********************
    var BG = new Background(gameEngine)
    gameEngine.Background = BG;
    gameEngine.addEntity(BG); 
    //********************

    var car = new Car(gameEngine);
    // var car1 = new Car1(gameEngine);
    // var car2 = new Car2(gameEngine);
    // var car3 = new Car3(gameEngine);
    gameEngine.car = car;
    gameEngine.addEntity(car);
    // gameEngine.addEntity(car1);
    // gameEngine.addEntity(car2);
    // gameEngine.addEntity(car3);
    // var police = new Police(gameEngine);
    // gameEngine.addEntity(police);
});

