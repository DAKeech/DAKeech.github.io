class MouseHandler {
  constructor() {
    // initialize button flags.
    this.leftFlag = false;
    
    // left click drag vars
    this.leftDragStartPos = createVector(0,0);
    this.leftDragCurrPos = createVector(0,0);
    this.leftDragVector = createVector(0,0);
  }
  
  update() {
    if (mouseButton == LEFT && mouseIsPressed) {
      if (!this.leftFlag) {
        this.leftFlag = true;
        this.leftDragStartPos.set(mouseX, mouseY);
      }
      else {
        this.leftDragCurrPos.set(mouseX, mouseY);
      }
    }
    else if (!mouseIsPressed && this.leftFlag){
      this.leftFlag = false;
      this.leftDragVector.set(this.leftDragCurrPos.x - this.leftDragStartPos.x,
                              this.leftDragCurrPos.y - this.leftDragStartPos.y);
      this.leftDragCurrPos.set(0,0);
      this.leftDragStartPos.set(0,0);
      return true;
    }
    return false;
  }
  
  getLDragVector() {
    return this.leftDragVector;
  }
  
  draw(displayBool = true) {
    push();
    if (!displayBool) {return;}
      if (this.leftFlag) {
        
        stroke(255,255,255);
        strokeWeight(1);
        line(this.leftDragStartPos.x, this.leftDragStartPos.y, this.leftDragCurrPos.x, this.leftDragCurrPos.y);
        
      }
    pop();
  }
}
