
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

//function Background(game) {
//    Entity.call(this, game, 0, 400);
//    this.radius = 200;
//}

//Background.prototype = new Entity();
//Background.prototype.constructor = Background;

//Background.prototype.update = function () {
//}

//Background.prototype.draw = function (ctx) {
//    ctx.fillStyle = "SaddleBrown";
//    ctx.fillRect(0, 500, 800, 300);
//    var back = new Image();
//    back.src = "./img/6.png";
//    ctx.drawImage(back, 0, 0);
//    Entity.prototype.draw.call(this);
//}

//BACKGROUND CODE ****
function Background(game, spritesheet, x, y) {

    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
    
};
Background.prototype.update = function () {
};



function Scrolling(carX, carY) {
    this.carX = carX;
    this.carY = carY;
    var panX = carX - 350;
    if (this.panX < 0) {
        this.panX = 0;
    }

    var panY = carY - 350;
     //(this.panY > 911) {
    //    this.panY = 0;
    //}
    return { xAXIS: panX, yAXIS: panY };
}


function Car(game) {
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carRight.png"), 0, 0, 256, 256, 0.2, 1, true, true);
    // this.upAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 0, 262, 250, 0.02, 1, false, true);
    // this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 0, 250, 262, 250, 0.02, 1, false, true);
    // this.leftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 0, 262, 250, 0.02, 1, false, true);
    // this.rightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/car1.png"), 262, 250, 262, 250, 0.02, 1, false, true);
    
    this.currentTile = new Image();
    this.currentTile.src = "./img/5.jpg";                                                                    
    this.tile = 5;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.maxSpeed = 7;
    this.minSpeed = -10;
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

    this.tilePaths = [[1],
    [1],
    [1],
    [1],
    [{ xLeft: 270, xRight: 1365, yTop: 0, yBottom: 410 }, { xLeft: 1000, xRight: 1360, yTop: 560, yBottom: 915 }],
    [{ xLeft: 189, xRight: 1450, yTop: 0, yBottom: 400 }, { xLeft: 1270, xRight: 2365, yTop: 810, yBottom: 1225 }],
    //{ xLeft: 1490, xRight: 1640, yTop: 580, yBottom: 925 }],
    [1],
    [1],
    [1]];
    for (var i = 0; i < this.tilePaths; i++) {
        console.log(this.tilePaths[i]);

    }


    Entity.call(this, game, 300, 600);


}

Car.prototype = new Entity();
Car.prototype.constructor = Car;
var chose;
Car.prototype.update = function () {

     if (this.game.w) {
        if (this.speed < this.maxSpeed) {
            this.speed += 2;
        }
    } 

    else if (this.game.s) {
        if (this.speed > this.minSpeed) {
            this.speed -= 2;
        }
        
    } 
    if (this.game.d ) {
        if(this.speed !==0){
        if(this.speed > 0){
            this.angle += 3;
        } else{
            this.angle -= 3;
    }
}
    } 
    
    else if (this.game.a) {
        if(this.speed !==0){
         
        if(this.speed > 0){
            this.angle -= 3;
        }else{
            this.angle += 3;
    }
}
      //this.speed +=1;  
    } 

    if(this.speed>0) this.speed-=1;
    if(this.speed<0) this.speed+=1;


    if (this.y > 911) {
        this.currentTile.src = "./img/4.png";
        this.tile = 4;
    } else {
        this.currentTile.src = "./img/5.jpg";
        this.tile = 5;
    }

    //console.log(this.angle);

    Entity.prototype.update.call(this);
}

Car.prototype.draw = function (ctx) {
    //var viewPort = Scrolling(this.x, this.y);// car coords
    //console.log(this.currentTile);
    //ctx.drawImage(this.currentTile, this.x, this.y,
    //    750, 750, 0, 0, 1681, 911);
    //ctx.drawImage(this.currentTile, 1681, 911);
    //var car = new Image();
    //car.src = "./img/carRight.png";
    
    if (canDrive(this.x, this.y, this.tile)) {
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += (this.speed) * Math.cos(Math.PI / 180 * this.angle);
        this.y += (this.speed) * Math.sin(Math.PI / 180 * this.angle);
    } else {
        this.x = this.prevX;
        this.y = this.prevY; 
    }
    console.log("x: ", this.x);
    console.log("y: ", this.y);
    ctx.save();
    ctx.translate(this.x, this.y);
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

//function Tiles() {
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
    return this.canPass;
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

//ASSET_MANAGER.queueDownload("./img/carRight.png");

ASSET_MANAGER.queueDownload("./img/5.jpg");
ASSET_MANAGER.queueDownload("./img/4.png");
ASSET_MANAGER.queueDownload("./img/CarRight.png");


ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    
    var gameEngine = new GameEngine();
    //var bg = new Background(gameEngine);
    
    

    //gameEngine.addEntity(bg);
    

    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/5.jpg"), 0, 0));
    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/4.png"), 0, 911));
    var car = new Car(gameEngine);
    gameEngine.addEntity(car);
});

