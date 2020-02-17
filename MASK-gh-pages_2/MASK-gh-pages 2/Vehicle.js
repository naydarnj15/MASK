 class Vehicle{
     constructor(){
         
     }

 }


 function Car(game) {

    this.maxPower =0.075;
    this.maxReverse = 0.0375;
    this.powerFactor = 0.001;
    this.reverseFactor = 0.0005;

    this.drag =0.95;
    this.angularDrag =0.95;
    this.turnSpeed=0.002;


    this.positionX = 0;
    this.positionY = 0;
    this.velocityX=0;
    this.velocityY=0;
    this.power =0;
    this.reverse =0;
    this.angle =0;
    this.angularVelocity =0;
    this.isThrottling=false;
    this.isReversing=false;


//     positionX += velocityX
// positionY += velocityY
// velocityX *= drag
// velocityY *= drag
// angle += angularVelocity
// angularVelocity *= angularDrag
// velocityX += sin(angle) * power;
// velocityY += cos(angle) * power;
// angularVelocity += turnSpeed;
// drag and angularDrag =0.9
    // this.speed = 0;
    // this.maxSpeed = 20;
    // this.minSpeed = 0;
    // this.angle = 0;
    // this.mod = 0;
   
    Entity.call(this, game, 300, 460);


}
  
Car.prototype = new Entity();
Car.prototype.constructor = Car;

Car.prototype.getX = function getX () {
    return this.x;
};
Car.prototype.getY = function getY () {
    return this.y;
};
Car.prototype.update = function () {

    if (this.game.d) {
       if(this.speed !=0){
        if(this.speed > 0){
            this.angle += 5;
            this.speed =1;
        } else{
            this.angle -= 5;
            this.speed =-1;
        }
    }
        this.left = true;
        //ctx.drawImage(this.car, this.x, this.y);
        //this.ctx.rotateAndCache(this.car, this.angle);
    } else if (this.game.s) {
        //this.mod = 0;
        if (this.speed >= this.minSpeed) {
            this.speed -= 2;
        }
        this.down = true;

    } else if (this.game.a  ) {
        if(this.speed !=0){
        if(this.speed > 0){
            this.angle -= 5;
            this.speed =1;
        } else{
            this.angle += 5;
            this.speed =-1;
        }
    }
        this.right = true;
    } else if (this.game.w) {
        if (this.speed < this.maxSpeed) {
            this.speed += 1;
        }
        this.up = true;
        this.mod = 1;
    } else {
    }
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
        this.x += (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle);
        this.y += (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle);
    } else {
        this.x = this.prevX;
        this.y = this.prevY; 
        this.speed=0;
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