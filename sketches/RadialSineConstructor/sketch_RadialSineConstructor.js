let rotator;
let mouseHandler;
function setup() {
  mouseHandler = new MouseHandler();
  createCanvas(displayWidth, displayHeight);
  rotator = new Rotator(createVector(displayWidth/2, displayHeight/2), 100, 3, color(0,255,0));
  background(0);
  print(mouseIsPressed);
}


function draw() {
  background(0,0,0,64);
  rotator.update();
  if (mouseHandler.update()) {
    //print(mouseHandler.getLDragVector());
    rotator.addWave(mouseHandler.getLDragVector());
  }
  mouseHandler.draw();
  rotator.draw();
    
}

class Rotator {
  constructor(center = createVector(displayWidth/2, displayHeight/2), baseDistance = 100, rotationSpeed = 1, pointColor = color(0,255,0)) {
    this.center = center;
    this.baseDistance = baseDistance;
    this.pointColor = pointColor;
    this.rotationSpeed = rotationSpeed;
    
    this.position = createVector(0,0);
    this.oldPosition = createVector(this.position.x, this.position.y);
    this.rotationPosition = 0;
    this.waves = [createVector(0,0)];
  }
  
  addWave(vect) {
    append(this.waves, createVector(vect.x, vect.y));
    //this.waves[this.waves.length] = createVector.vect;
  }
  
  sinAdd() {
    let sinSum  = 0;
    let i = 0;
    for (i = 0; i < this.waves.length; i++) {
      sinSum = sinSum + sin(radians(this.rotationPosition) * this.waves[i].x/10) * this.waves[i].y/10;
      //print(sinSum);
    }
    //print('Final ', sinSum);
    return sinSum;
  }
  
  update(){
    this.rotationPosition += this.rotationSpeed*deltaTime/50;
    this.oldPosition.set(this.position.x, this.position.y);
    //this.position.set(this.center.x + sin(this.rotationPosition)*this.baseDistance + sin(this.rotationPosition*10)*5,
    //                  this.center.y + cos(this.rotationPosition)*this.baseDistance + cos(this.rotationPosition*10)*5);
    let sinInterference = this.sinAdd();
    this.position.set(this.center.x + sin(radians(this.rotationPosition))*(this.baseDistance + sinInterference),
                      this.center.y + cos(radians(this.rotationPosition))*(this.baseDistance + sinInterference));
    
  }
  
  draw() {
    push(); 
    strokeWeight(5);
    stroke(this.pointColor);
    line(this.oldPosition.x, this.oldPosition.y, this.position.x, this.position.y);
    pop();
  }
}
