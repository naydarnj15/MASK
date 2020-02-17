
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
    this.distanceTraveledX = 645;
    this.distanceTraveledY = 320;
    for (var i = 0; i < 4; i++ ){
        this.tileMap[i] = new Array(6);   
    }
    this.tileMap[0][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"),
                                                       width: 1515, height: 1535};
    this.tileMap[0][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,2.jpg"),
                                                        width: 1620, height: 1535};
    this.tileMap[0][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,3.jpg"),
                                                        width: 1620, height: 1535};
    this.tileMap[0][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,4.jpg"),
                                                        width: 1515, height: 1535};
    this.tileMap[1][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,0.jpg"),
                                                        width: 1160, height: 928};
    this.tileMap[1][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,1.jpg"),
                                                        width: 1812, height: 1260};
    this.tileMap[1][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,2.jpg"),
                                                        width: 1619, height: 1259};
    this.tileMap[1][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,3.jpg"),
                                                        width: 1619, height: 1259};
    this.tileMap[1][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,4.jpg"),
                                                        width: 1826, height: 1260};
    this.tileMap[1][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,5.jpg"),
                                                        width: 1160, height: 928};
    this.tileMap[2][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,2.jpg"),
                                                        width: 2130, height: 784};
    this.tileMap[2][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/2,3.jpg"),
                                                        width: 2130, height: 784};
    this.tileMap[3][0] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/0,1.jpg"),
                                                        width: 1160, height: 928};
    this.tileMap[3][1] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,1.jpg"),
                                                        width: 1829, height: 924};
    this.tileMap[3][2] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,2.jpg"),
                                                        width: 1621, height: 924};
    this.tileMap[3][3] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,3.jpg"),
                                                        width: 1618, height: 924};
    this.tileMap[3][4] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/3,4.jpg"),
                                                        width: 1829, height: 924};
    this.tileMap[3][5] = {img: ASSET_MANAGER.getAsset("./img/FinalTiles/1,5.jpg"),
                                                        width: 1160, height: 928};
    this.curTile = {row: 0, col: 1}; // 0,1
   
}

Background.prototype.draw = function () {
    var tile = this.tileMap[this.curTile.row][this.curTile.col];
    // console.log("row: " + this.curTile.row + "    col: " + this.curTile.col);
    SCOPE_OF_TILES.push(tile);
    // var 
    // 320 on each size of car 
    // 110 top and bottom 

    // this.distanceTraveledX; how far into tile   SX
    // this.distanceTraveledY;     SY
    //adjust resiizing
    // calc tiles in range and add to list mSCOPE_OF_TILES
    // place other tiles based on need 

    // var panX = this.distanceTraveledX - 320;
    // var panY



      this.ctx.drawImage(tile.img, this.distanceTraveledX - 635, this.distanceTraveledY - 150, 1250, 570, 0,0, 1250, 570 )

    // (tile.img, Source x, source Y,  source width, source height, 0connect , 0connect, resizing w 1250, h 510);
    //    this.ctx.drawImage(tile.img, 0, 0); // 1250, 570 

};
Background.prototype.update = function () {
    var tileW = this.tileMap[this.curTile.row][this.curTile.col].width;
    var tileH = this.tileMap[this.curTile.row][this.curTile.col].height;
    var row = this.curTile.row;
    var col = this.curTile.col;

    var CAR_X = this.distanceTraveledX;
    var CAR_Y = this.distanceTraveledY;
    console.log("distance X: " + this.distanceTraveledX + " , distance Y: " +this.distanceTraveledY);
    
    if (CAR_X > tileW){
        if ((row === 1 || row == 3) && col == 5) { // if row 1 or 3 
            this.curTile.col = 0;
        } else {
            this.curTile.col++;
        }
        this.distanceTraveledX = 1;
    } else if (CAR_X < 0) { // col change
        if ((row === 1 || row == 3 && col === 0)) { // if row 1 or 3
            this.curTile.col = 5;
        } else {
            this.curTile.col--; 
        }
        this.distanceTraveledX = this.tileMap[this.curTile.row][this.curTile.col].width - 1;
    } else if (CAR_Y > tileH) { // down
        // this.curTile.row = row === 3 ? 0 : row++; 
        if (row === 3 )  {
            this.curTile.row = 0;
        } else {
            this.curTile.row++;
        }
         this.distanceTraveledY = 1;
    } else if (CAR_Y < 0) { // up
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
    // this.currentTile = new Image();
    // this.currentTile.src = "./img/5.jpg";                                                                    
    this.tile = 5;

    // this.x = 0;
    // this.y = 0;
    // this.speed = 0;
    // this.maxSpeed = 20;
    // this.minSpeed = 1;

    // this.angle = 0;
    // this.mod = 0;
    // this.car = new Image();
    // this.car.src = "./img/CarRight.png";

    // this.drag =0.95;
    // this.angularDrag =0.95;
    // this.turnSpeed=0.002;
    // this.collide =0;
    // this.radius = 100;
    // this.ground = 400;
    // this.prevX = 0;
    // this.prevY =  400;


    // this.game =game;
    // this.currentTile = new Image();
    // this.currentTile.src = "./img/5.jpg";                                                                    
    // this.tile = 5;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.maxSpeed = 7;
    this.minSpeed = -7;
    this.angle = 0;
    this.mod = 0;
    this.car = new Image();
    this.car.src = "./img/CarRight.png";
    this.jumping = false;
    this.left = false;
    this.right = false;
    this.down = false;
    this.up = false;
    this.radius = 100;
    this.ground = 400;
    this.prevX = 0;
    this.prevY =  400;
    this.collide =0;
    //game.speed.innerHTML = "Speed: " + this.speed;
    //game.collide.innerHTML = "Collision: " + this.collide;

    Entity.call(this, game, 645, 320);


}

Car.prototype = new Entity();
Car.prototype.constructor = Car;
// Car.prototype.getX = function getX () {
//     return this.x;
// };
// Car.prototype.getY = function getY () {
//     return this.y;
// };
Car.prototype.update = function () {
    //sound1.playStartingSound();
    //this.game.startsound.play();
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
    //this.game.driftsound.pause();
    //this.game.speed.innerHTML = "Speed: " + this.speed;

    if(this.speed>0) this.speed-=1;
    if(this.speed<0) this.speed+=1;

    Entity.prototype.update.call(this);
}

Car.prototype.draw = function (ctx) {
    // if (canDrive(this.x, this.y, this.tile)) {
    //     this.prevX = this.x;
    //     this.prevY = this.y;
    //     this.x += (this.speed) * Math.cos(Math.PI / 180 * this.angle);
    //     this.y += (this.speed) * Math.sin(Math.PI / 180 * this.angle);
    // } else {
    //     this.collide +=1;
    //     this.x = this.prevX;
    //     this.y = this.prevY; 
    // }
    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(Math.PI / 180 * this.angle);
    // ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
    // ctx.restore();
    
    // Entity.prototype.draw.call(this);


    if (canDrive(this.x, this.y, this.tile)) {
        var travelX = (this.speed ) * Math.cos(Math.PI / 180 * this.angle); //********* */
        var travelY = (this.speed ) * Math.sin(Math.PI / 180 * this.angle);
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
        this.speed =22;
        this.collide +=1; 
        this.game.Background.distanceTraveledX -= this.x - this.prevX; //*****
        this.game.Background.distanceTraveledY -= this.y - this.prevY; //*****

    }
    console.log("collision: ", this.collide);
    console.log("x: ", this.x);
    console.log("y: ", this.y);
    ctx.save();
    ctx.translate(this.x - X_OFFSET, this.y - Y_OFFSET); //*************
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
    ctx.restore();
    //var car = new Image();
    //car.src = "./img/carRight.png";
    //ctx.drawImage(this.car, 100, 100);
    //ctx.rotateAndCache(this.car, this.angle);
    //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}

function getRectFourPoints(x,y, width, height, ang, isDeg = false) {
    
	if(isDeg) ang = ang * (Math.PI / 180);
    var point = [];

    point.push([x,y]);


	var sinAng = Math.sin(ang);	
    var cosAng = Math.cos(ang);
    
	//console.log(ang);
	var upDiff = sinAng * width;
	var sideDiff = cosAng * width;

    point.push([x + sideDiff,y + upDiff]);
	
	var upDiff1 = cosAng * height;//45
    var sideDiff1 = sinAng * height;//0
    
    point.push([x + sideDiff1, -(y + upDiff1)]);
	

    point.push([x + sideDiff,-(y + upDiff1)]);
	return point;
}


function doPolygonsIntersect (a, b) {
    //console.log(b.frameHeight);
    
    var pointsOfA = getRectFourPoints(a.x,a.y,105,45,a.angle,true);
    var pointsOfB = getRectFourPoints(b.x,b.y,105,45,b.angle,true);
    


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
// function Car1(game,x,y) {
//     //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carRight.png"), 0, 0, 125, 125, 0.2, 1, true, true);
//     // this.upAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 0, 262, 250, 0.02, 1, false, true);
//     // this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 250, 262, 250, 0.02, 1, false, true);
//     // this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 0, 262, 250, 0.02, 1, false, true);
//     // this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 250, 262, 250, 0.02, 1, false, true);
//     this.game = game;
//     this.currentTile = new Image();
//     this.currentTile.src = "./img/5.jpg";                                                                    
//     this.tile = 5;

//     this.x = 0;
//     this.y = 0;
//     this.speed = 0;
//     this.maxSpeed = 20;
//     this.minSpeed = 1;

//     this.angle = 0;
//     this.mod = 0;
//     this.car = new Image();
//     this.car.src = "./img/CarRight.png";

//     this.drag =0.95;
//     this.angularDrag =0.95;
//     this.turnSpeed=0.002;
//     this.collide =0;
//     this.radius = 100;
//     this.ground = 400;
//     this.prevX = 0;
//     this.prevY =  400;

//     // this.maxPower =2;
//     // this.maxReverse = 1;
//     // this.powerFactor = 0.1;
//     // this.reverseFactor = 0.05;

//     // this.drag =0.95;
//     // this.angularDrag =0.95;
//     // this.turnSpeed=0.002;


//     // this.positionX = 100;
//     // this.positionY = 400;
//     // this.velocityX=0;
//     // this.velocityY=0;
//     // this.power =0;
//     // this.reverse =0;
//     // this.angle =0;
//     // this.angularVelocity =0;
//     // this.isThrottling=false;
//     // this.isReversing=false;


//     Entity.call(this, game, 500, 1380);


// }

// Car1.prototype = new Entity();
// Car1.prototype.constructor = Car1;
// Car1.prototype.getX = function getX () {
//     return this.x;
// };
// Car1.prototype.getY = function getY () {
//     return this.y;
// };
// Car1.prototype.update = function () {
//     this.speed =2;
//     this.mod =1;
//     this.angle=0;

//     if (this.y > 911) {
//         this.currentTile.src = "./img/4.png";
//         this.tile = 4;
//     } else {
//         this.currentTile.src = "./img/5.jpg";
//         this.tile = 5;
//     }

//     //console.log(this.angle);

//     Entity.prototype.update.call(this);
// }

// Car1.prototype.draw = function (ctx) {
//     //var viewPort = Scrolling(this.x, this.y);// car coords
//     //console.log(this.currentTile);
//     //ctx.drawImage(this.currentTile, this.x, this.y,
//     //    750, 750, 0, 0, 1681, 911);
//     //ctx.drawImage(this.currentTile, 1681, 911);
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
    
//     if (canDrive(this.x, this.y, this.tile)) {
//         this.prevX = this.x;
//         this.prevY = this.y;
//         if(this.x >1400){
//             this.x =0;
//         }
//         this.x += (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle);
//         this.y += (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
//     } else {
//         this.x -= 400;
//         this.y -= (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
//         this.speed =0;
//         this.collide +=1; 
//     }
//     console.log("collision: ", this.collide);
//     console.log("x: ", this.x);
//     console.log("y: ", this.y);
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(Math.PI / 180 * this.angle);
//     ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
//     ctx.restore();
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
//     //ctx.drawImage(this.car, 100, 100);
//     //ctx.rotateAndCache(this.car, this.angle);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

//     Entity.prototype.draw.call(this);
// }




// function Car2(game,x,y) {
//     //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carRight.png"), 0, 0, 125, 125, 0.2, 1, true, true);
//     // this.upAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 0, 262, 250, 0.02, 1, false, true);
//     // this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 250, 262, 250, 0.02, 1, false, true);
//     // this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 0, 262, 250, 0.02, 1, false, true);
//     // this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 250, 262, 250, 0.02, 1, false, true);
//     this.game = game;
//     this.currentTile = new Image();
//     this.currentTile.src = "./img/5.jpg";                                                                    
//     this.tile = 5;

//     this.x = 0;
//     this.y = 0;
//     this.speed = 0;
//     this.maxSpeed = 20;
//     this.minSpeed = 1;

//     this.angle = 0;
//     this.mod = 0;
//     this.car = new Image();
//     this.car.src = "./img/CarUp1.png";

//     this.drag =0.95;
//     this.angularDrag =0.95;
//     this.turnSpeed=0.002;
//     this.collide =0;
//     this.radius = 100;
//     this.ground = 400;
//     this.prevX = 0;
//     this.prevY =  400;

//     // this.maxPower =2;
//     // this.maxReverse = 1;
//     // this.powerFactor = 0.1;
//     // this.reverseFactor = 0.05;

//     // this.drag =0.95;
//     // this.angularDrag =0.95;
//     // this.turnSpeed=0.002;


//     // this.positionX = 100;
//     // this.positionY = 400;
//     // this.velocityX=0;
//     // this.velocityY=0;
//     // this.power =0;
//     // this.reverse =0;
//     // this.angle =0;
//     // this.angularVelocity =0;
//     // this.isThrottling=false;
//     // this.isReversing=false;


//     Entity.call(this, game, 120, 1560);


// }

// Car2.prototype = new Entity();
// Car2.prototype.constructor = Car2;
// Car2.prototype.getX = function getX () {
//     return this.x;
// };
// Car2.prototype.getY = function getY () {
//     return this.y;
// };
// Car2.prototype.update = function () {
//     this.speed =3;
//     this.mod =0.5;
//     this.angle=0;

//     if (this.y > 911) {
//         this.currentTile.src = "./img/4.png";
//         this.tile = 4;
//     } else {
//         this.currentTile.src = "./img/5.jpg";
//         this.tile = 5;
//     }

//     //console.log(this.angle);

//     Entity.prototype.update.call(this);
// }

// Car2.prototype.draw = function (ctx) {
//     //var viewPort = Scrolling(this.x, this.y);// car coords
//     //console.log(this.currentTile);
//     //ctx.drawImage(this.currentTile, this.x, this.y,
//     //    750, 750, 0, 0, 1681, 911);
//     //ctx.drawImage(this.currentTile, 1681, 911);
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
    
//     if (canDrive(this.x, this.y, this.tile)) {
//         this.prevX = this.x;
//         this.prevY = this.y;
//         if( this.y<0){
//             this.y = 1400;
//         }
//         this.x += (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
//         this.y -= (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle);
//     } else {
//         this.x -= 400;
//         this.y -= (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
//         this.speed =0;
//         this.collide +=1; 
//     }
//     console.log("collision: ", this.collide);
//     console.log("x: ", this.x);
//     console.log("y: ", this.y);
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(Math.PI / 180 * this.angle);
//     ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
//     ctx.restore();
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
//     //ctx.drawImage(this.car, 100, 100);
//     //ctx.rotateAndCache(this.car, this.angle);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

//     Entity.prototype.draw.call(this);
// }

// function Car3(game,x,y) {
//     //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carRight.png"), 0, 0, 256, 256, 0.2, 1, true, true);
//     // this.upAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 0, 262, 250, 0.02, 1, false, true);
//     // this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 250, 262, 250, 0.02, 1, false, true);
//     // this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 0, 262, 250, 0.02, 1, false, true);
//     // this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 250, 262, 250, 0.02, 1, false, true);
//     this.game = game;
//     this.currentTile = new Image();
//     this.currentTile.src = "./img/5.jpg";                                                                    
//     this.tile = 5;

//     this.x = 0;
//     this.y = 0;
//     this.speed = 0;
//     this.maxSpeed = 20;
//     this.minSpeed = 1;

//     this.angle = 0;
//     this.mod = 0;
//     this.car = new Image();
//     this.car.src = "./img/CarUp1.png";

//     this.drag =0.95;
//     this.angularDrag =0.95;
//     this.turnSpeed=0.002;
//     this.collide =0;
//     this.radius = 100;
//     this.ground = 400;
//     this.prevX = 0;
//     this.prevY =  400;

//     // this.maxPower =2;
//     // this.maxReverse = 1;
//     // this.powerFactor = 0.1;
//     // this.reverseFactor = 0.05;

//     // this.drag =0.95;
//     // this.angularDrag =0.95;
//     // this.turnSpeed=0.002;


//     // this.positionX = 100;
//     // this.positionY = 400;
//     // this.velocityX=0;
//     // this.velocityY=0;
//     // this.power =0;
//     // this.reverse =0;
//     // this.angle =0;
//     // this.angularVelocity =0;
//     // this.isThrottling=false;
//     // this.isReversing=false;


//     Entity.call(this, game, 580, 480);


// }

// Car3.prototype = new Entity();
// Car3.prototype.constructor = Car3;
// Car3.prototype.getX = function getX () {
//     return this.x;
// };
// Car3.prototype.getY = function getY () {
//     return this.y;
// };
// Car3.prototype.update = function () {
//     this.speed =0;
//     this.mod =0;
//     this.angle=0;
//     if (this.y > 911) {
//         this.currentTile.src = "./img/4.png";
//         this.tile = 4;
//     } else {
//         this.currentTile.src = "./img/5.jpg";
//         this.tile = 5;
//     }

//     //console.log(this.angle);

//     Entity.prototype.update.call(this);
// }

// Car3.prototype.draw = function (ctx) {
//     //var viewPort = Scrolling(this.x, this.y);// car coords
//     //console.log(this.currentTile);
//     //ctx.drawImage(this.currentTile, this.x, this.y,
//     //    750, 750, 0, 0, 1681, 911);
//     //ctx.drawImage(this.currentTile, 1681, 911);
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
    
//     if (canDrive(this.x, this.y, this.tile)) {
//         this.prevX = this.x;
//         this.prevY = this.y;
//         this.x += (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle);
//         this.y += (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
//     } else {
//         this.x = this.prevX;
//         this.y = this.prevY;
//         this.speed =0;
//         this.collide +=1; 
//     }
//     console.log("collision: ", this.collide);
//     console.log("x: ", this.x);
//     console.log("y: ", this.y);
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(Math.PI / 180 * this.angle);
//     ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
//     ctx.restore();
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
//     //ctx.drawImage(this.car, 100, 100);
//     //ctx.rotateAndCache(this.car, this.angle);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

//     Entity.prototype.draw.call(this);
// }






// function Police(game,x,y) {
//     //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carRight.png"), 0, 0, 256, 256, 0.2, 1, true, true);
//     // this.upAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 0, 262, 250, 0.02, 1, false, true);
//     // this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 250, 262, 250, 0.02, 1, false, true);
//     // this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 0, 262, 250, 0.02, 1, false, true);
//     // this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 250, 262, 250, 0.02, 1, false, true);
    
//     this.currentTile = new Image();
//     this.currentTile.src = "./img/5.jpg";
//     this.game = game;                                                                    
//     this.tile = 5;
//     this.x = 0;
//     this.y = 0;
//     this.speed = 0;
//     this.maxSpeed = 20;
//     this.minSpeed = 1;

//     this.angle = 0;
//     this.mod = 0;
//     this.car = new Image();
//     this.car.src = "./img/police.png";

//     this.drag =0.95;
//     this.angularDrag =0.95;
//     this.turnSpeed=0.002;

//     this.radius = 100;
//     this.ground = 400;
//     this.prevX = 0;
//     this.prevY =  400;

//     // this.maxPower =2;
//     // this.maxReverse = 1;
//     // this.powerFactor = 0.1;
//     // this.reverseFactor = 0.05;

//     // this.drag =0.95;
//     // this.angularDrag =0.95;
//     // this.turnSpeed=0.002;


//     // this.positionX = 100;
//     // this.positionY = 400;
//     // this.velocityX=0;
//     // this.velocityY=0;
//     // this.power =0;
//     // this.reverse =0;
//     // this.angle =0;
//     // this.angularVelocity =0;
//     // this.isThrottling=false;
//     // this.isReversing=false;

//     Entity.call(this, game, -100, -360);


// }

// Police.prototype = new Entity();
// Police.prototype.constructor = Police;
// var chose;
// Police.prototype.update = function () {

//     Entity.prototype.update.call(this);
// }

// Police.prototype.draw = function (ctx) {
//     if(this.game.car.collide >=5){
//         if (canDrive(this.x, this.y, this.tile)) {
//             this.prevX = this.x;
//             this.prevY = this.y;
//             this.x = this.game.car.x-800;
//             this.y = this.game.car.y;
//         } else {
//             this.x = this.prevX-10;
//             this.y = this.prevY; 
//         }
//     }
//     console.log("x: ", this.x);
//     console.log("y: ", this.y);
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(Math.PI / 180 * this.game.car.angle);
//     ctx.drawImage(this.car, -(this.car.width / 2), -(this.car.height / 2));
//     ctx.restore();
//     //var car = new Image();
//     //car.src = "./img/carRight.png";
//     //ctx.drawImage(this.car, 100, 100);
//     //ctx.rotateAndCache(this.car, this.angle);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//     //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

//     Entity.prototype.draw.call(this);
// }

// //function Tiles() {
//    this.tilePaths = [[1],
//    [1],
//    [1],
//    [1],
//    [{ xLeft: 270, xRight: 1365, yTop: 0, yBottom: 410 }, { xLeft: 1000, xRight: 1360, yTop: 560, yBottom: 915 }],
//    [{ xLeft: 1000, xRight: 1360, yTop: 0, yBottom: 250 }, { xLeft: 270, xRight: 1365, yTop: 610, yBottom: 925 },
//    { xLeft: 1490, xRight: 1640, yTop: 580, yBottom: 925 }],
//    [1],
//    [1],
//        [1]];
//    for (var i = 0; i < this.tilePaths; i++) {
//        console.log(this.tilePaths[i]);

//    }

//} 

function five() {
    var paths = [];
    paths.push({ xLeft: 189, xRight: 1450, yTop: -15, yBottom: 455 });
   // paths.push({ xLeft: 922, xRight: 1385, yTop: 550, yBottom: 1235 });
    //paths.push({ xLeft: 183, xRight: 1425, yTop: 1455, yBottom: 1800 });
 
    return paths;
}

function canDrive(X, Y, tileNum) {
    this.X = X; // need to take in count width and height 
    this.Y = Y;
    this.canPass = true;
    this.tilePaths = { xLeft: 189, xRight: 1450, yTop: -15, yBottom: 455 } ;
    this. tile2 = { xLeft: 922, xRight: 1385, yTop: 550, yBottom: 1235 };
    this.tile3 = { xLeft: 183, xRight: 1425, yTop: 1455, yBottom: 1800 };
  //  this.tileNum = tileNum;
    //var paths = {xLeft: 189, xRight: 1450, yTop: -15, yBottom: 445 }; //{ xLeft: 1270, xRight: 2365, yTop: 810, yBottom: 1225 }];
    
   // for (var i = 0; i < 3, i++;) {
     //   var paths = this.tilePaths[i];
     
        if ((this.X >= this.tilePaths.xLeft && this.X <= this.tilePaths.xRight) &&
            (this.Y >= this.tilePaths.yTop && this.Y <= this.tilePaths.yBottom)) {
            
            canPass = false;
          //  break;
    }
    if ((this.X >= this.tile2.xLeft && this.X <= this.tile2.xRight) &&
        (this.Y >= this.tile2.yTop && this.Y <= this.tile2.yBottom)) {

        canPass = false;
        //  break;
    }
    if ((this.X >= this.tile3.xLeft && this.X <= this.tile3.xRight) &&
        (this.Y >= this.tile3.yTop && this.Y <= this.tile3.yBottom)) {

        canPass = false;
        //  break;
    }
   // }
    return true;
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
ASSET_MANAGER.queueDownload("./img/FinalTiles/2,2.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/2,3.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,1.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,2.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,3.jpg");
ASSET_MANAGER.queueDownload("./img/FinalTiles/3,4.jpg");
ASSET_MANAGER.queueDownload("./img/CarRight.png");
ASSET_MANAGER.queueDownload("./img/CarUp1.png");
ASSET_MANAGER.queueDownload("./img/police.png");


ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var lives = document.getElementById('lives');

    var ctx = canvas.getContext('2d');
    
    var gameEngine = new GameEngine();
    //var bg = new Background(gameEngine);
    
    

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

