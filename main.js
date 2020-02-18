
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
    this.tileMap[0][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,4.jpg"), width: 1515, height: 1535, 
                          buildings: []}; //{xL:, xR: ,yT:, yB:}
    this.tileMap[0][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"), width: 1515, height: 1535, 
                          buildings: [{xL:0, xR:1515, yT:0, yB:80}, {xL:1308, xR:1515, yT: 164, yB:1045},//
                                      {xL:1416, xR: 1515,yT:0, yB:164}, {xL:0, xR:475, yT:0, yB:1535},
                                      {xL:0, xR:1515, yT:1365, yB:1535}]};
    this.tileMap[0][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,2.jpg"), width: 1622, height: 1535, 
                          buildings: [{xL:0, xR:75 ,yT:0, yB:990}, {xL:292, xR:1433,yT:0, yB:485},
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
                          buildings: [{xL:600, xR:1515 ,yT:1380, yB:1535},{xL:0, xR: 204,yT:0, yB:122},
                                      {xL:1145, xR:1515 ,yT:0, yB:1535},{xL:0, xR:1515 ,yT:0, yB:75},
                                      {xL:0, xR:300,yT:207, yB:1045}]};
    this.tileMap[0][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"), width: 1515, height: 1535,
                          buildings: []};
    this.tileMap[1][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,0.jpg"), width: 1160, height: 1260,
                          buildings: [{xL:0, xR:1160 ,yT:0, yB:484},{xL:143, xR:343 ,yT:0, yB:560},
                                      {xL:0, xR:1160 ,yT:930, yB:1260}]};
    this.tileMap[1][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,1.jpg"), width: 1812, height: 1260,
                          buildings: [{xL:0, xR:1812 ,yT:0, yB:2},{xL:0, xR:1349 ,yT:0, yB:312},
                                      {xL:0, xR: 1051,yT:0, yB:610},{xL:0, xR:645 ,yT:927, yB:1260},
                                      {xL:645, xR:1212 ,yT:893, yB:1260},{xL:1212, xR: 1704,yT:941, yB:1260},
                                      {xL:1747, xR:1812 ,yT:910, yB:1260}]};
    this.tileMap[1][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,2.jpg"), width: 1623, height: 1259, 
                          buildings: [{xL:0, xR: 75,yT:0, yB:3},{xL:289, xR:759,yT:0, yB:570},
                                      {xL:759, xR: 1454,yT:10, yB:570},{xL:293, xR:1430 ,yT:888, yB:1259},
                                      {xL:0, xR:65 ,yT:910, yB:1259}]}; 
    this.tileMap[1][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,3.jpg"), width: 1619, height: 1259,
                          buildings: [{xL:285, xR:1422 ,yT:888, yB:1259},{xL:1613, xR:1619 ,yT:910, yB:1259},
                                      {xL:253, xR:970,yT:2, yB:584},{xL:970, xR:1421 ,yT:0, yB:584}]};
    this.tileMap[1][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,4.jpg"), width: 1826, height: 1260,
                          buildings: [{xL:876, xR: 1260,yT:0, yB:600},{xL:600, xR:876 ,yT:0, yB:309},
                                      {xL:1282, xR:1260 ,yT:922, yB:1813},{xL:692, xR:1282 ,yT:901, yB:1260},
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
    this.tileMap[3][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,0.jpg"), width: 1160, height: 928, 
                          buildings: [{xL:0, xR:1160 ,yT:0, yB:283}, {xL:0,xR:1160,yT:588, yB:928}]};
    this.tileMap[3][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,1.jpg"), width: 1829, height: 924,
                         buildings: [{xL:0, xR:1829 ,yT:586, yB:924},{xL:1755, xR:1829 ,yT:0, yB:164},
                                     {xL:1183, xR:1829 ,yT:0, yB:304},{xL:0, xR:1829 ,yT:0, yB:280}]};
    this.tileMap[3][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,2.jpg"), width: 1621, height: 924, 
                          buildings: [{xL:0, xR:80,yT:596, yB:924}, {xL:0, xR:72 ,yT:0,yB:295},
                                      {xL:291, xR:1433,yT:543, yB:924}, {xL:1518, xR:1621,yT:523, yB:924},
                                      {xL:1028, xR:1436,yT:0,yB:217}]};
    this.tileMap[3][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,3.jpg"), width: 1618, height: 924, 
                          buildings: [{xL:0, xR:190 ,yT:523, yB:924},{xL:284, xR:1419 ,yT:545, yB:924},
                                      {xL:287, xR:681 ,yT:0, yB:236},{xL:1611, xR:1618 ,yT:0, yB:305},
                                      {xL:1612, xR:1618 ,yT:590, yB:928}]};
    this.tileMap[3][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,4.jpg"), width: 1829, height: 924, 
                          buildings: [{xL:0, xR:1829 ,yT:590, yB:924}, {xL:0, xR:795,yT:0, yB:305},
                                      {xL:790, xR: 1829 ,yT:0, yB:280}]};
    this.tileMap[3][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,5.jpg"), width: 1160, height: 928,
                          buildings: [{xL: 0,xR:1160,yT:621,yB:928}, {xL:0, xR:1160 ,yT:0, yB:276},
                                      {xL:922, xR:1160 ,yT:558, yB:928}, {xL:386, xR: 554,yT:0,yB:323}]};
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

    console.log("distance X: " + this.distanceTraveledX + " \n distance Y: " + this.distanceTraveledY);
    
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
    this.game = game;                                                               
    this.tile = 5;

    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.maxSpeed = 7;
    this.minSpeed = -7;

    this.angle = 0;
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
    if (this.game.d ) {
        if(this.speed !==0){
        if(this.speed > 0){
            this.angle += 3;
        } else{
            this.angle -= 3;
    }
    //this.game.startsound.pause();
    //this.game.driftsound.play();
}
    } 
    
    else if (this.game.a) {
        if(this.speed !==0){
         
        if(this.speed > 0){
            this.angle -= 3;
        }else{
            this.angle += 3;
    }
    //this.game.startsound.pause();
    //this.game.driftsound.play();
}
      //this.speed +=1;  
    } 
    if(this.speed>0) this.speed-=1;
    if(this.speed<0) this.speed+=1;

    Entity.prototype.update.call(this);
}
Car.prototype.canPass = function (X,Y,tilePaths) {
    var canPass = true;
    console.log(canPass);
    for (var i = 0; i < tilePaths.length; i++) {
        var paths = tilePaths[i]; 
        var b ={x:paths.xL,y:paths.yT,width:paths.xR-paths.xL,height:paths.yB-paths.yT,angle:0,bool:true};
        if(doPolygonsIntersect(b,this)){
            canPass =false;
            break;
        }
        // if ((X > paths.xL && X < paths.xR) &&
        //         (Y > paths.yT && Y < paths.yB)) {
        //         canPass = false;
        //         break;
        // }
    }
    return canPass;
}
Car.prototype.draw = function (ctx) {
    
    var col = this.game.Background.curTile.col;
    var row = this.game.Background.curTile.row;
    //if(doPolygonsIntersect())
    if (this.canPass(this.game.Background.distanceTraveledX, this.game.Background.distanceTraveledY,
                 this.game.Background.tileMap[row][col].buildings)) { //******************************** */

        var travelX = (this.speed) * Math.cos(Math.PI / 180 * this.angle); //********* */
        var travelY = (this.speed) * Math.sin(Math.PI / 180 * this.angle);
        
        this.x += travelX;
        this.y += travelY;

        X_OFFSET += travelX; //****
        Y_OFFSET += travelY; //*****
        this.prevX =  this.game.Background.distanceTraveledX;
        this.prevY =  this.game.Background.distanceTraveledY;
        this.game.Background.distanceTraveledX += travelX; //*****
        this.game.Background.distanceTraveledY += travelY; //*****


    } 
    // console.log("x: ", this.x, "y: ", this.y, " speed: ", this.speed);
    else {
        this.speed = 0;
        this.collide += 1; 
        this.game.Background.distanceTraveledX = this.prevX; //*****
        this.game.Background.distanceTraveledY = this.prevY; //*****

    }

    ctx.save();
    ctx.translate(this.x - X_OFFSET, this.y - Y_OFFSET); //*************
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
    ctx.restore();

    Entity.prototype.draw.call(this);
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
    console.log(x+width/2);
    console.log(y+height/2);
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
    
    var pointsOfA = getRectFourPoints(a.x,a.y,a.width,a.height,a.angle,a.bool);
    var pointsOfB = getRectFourPoints(b.x,b.y,108,46,b.angle,true);

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
                console.log("polygons don't intersect!");
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

// Edit it
// function canDrive(X, Y, tilePaths,game) {
//     this.game = game;
//     var canPass = true;
//     console.log(canPass);
//     for (var i = 0; i < tilePaths.length; i++) {
//         var paths = tilePaths[i]; 
//         var b ={x:paths.xL,y:paths.yT,width:paths.xR-paths.xL,height:paths.yB-paths.yT,angle:0,bool:true};
//         if(doPolygonsIntersect(b,this.game.car)){
//             canPass =false;
//             break;
//         }
//         // if ((X > paths.xL && X < paths.xR) &&
//         //         (Y > paths.yT && Y < paths.yB)) {
//         //         canPass = false;
//         //         break;
//         // }
//     }
//     return canPass;
// }
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
ASSET_MANAGER.queueDownload("./img/CarRight1.png");
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

