class Canvas {
  /**
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {number} lineWidth
   * @param {string} lineColor
   */
  constructor(canvasWidth = 500, 
              canvasHeight = 500, 
              lineWidth = 2, 
              lineColor = "black") {

    this.canvasElt  = null;
    this.context    = null;

    this.startState = false;
    this.endState   = false;

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.lineWidthElt = null;
    this.lineColorElt = null;
    this.cleanerElt   = null;

    this.setCanvas(canvasWidth, canvasHeight);
    this.setContext(lineWidth, lineColor);
    this.setOptions();
    this.setListeners();
  }

  /**********************************/
  /********** INIT SETTERS **********/
  /**********************************/

  /**
   * @param {number} width
   * @param {number} height
   */
  setCanvas(width, height) {
    if (document.getElementById("canvas")) {
      this.canvasElt        = document.getElementById("canvas");
      this.canvasElt.width  = width;
      this.canvasElt.height = height;

    } else {
      alert("No <canvas id=\"canvas\"> element is present!");
    }
  }

  /**
   * @param {number} lineWidth
   * @param {string} strokeStyle
   */
  setContext(lineWidth, strokeStyle) {
    if (this.canvasElt.getContext) {
      this.context = this.canvasElt.getContext("2d");

      this.context.lineWidth    = lineWidth;
      this.context.strokeStyle  = strokeStyle;
      this.context.lineCap      = "round";
      this.context.lineJoin     = "round";

    } else {
      alert("Your browser doesn't support <canvas> element!");
    }
  }

  setOptions() {
    if (document.getElementById("canvas-line-color")) {
      this.lineColorElt = document.getElementById("canvas-line-color");
    }

    if (document.getElementById("canvas-line-width")) {
      this.lineWidthElt = document.getElementById("canvas-line-width");
    }

    if (document.getElementById("canvas-cleaner")) {
      this.cleanerElt = document.getElementById("canvas-cleaner");
    }
  }

  setListeners() {
    if (this.canvasElt) {
 
     this.canvasElt.addEventListener("mousedown", this.moveInCanvas.bind(this, "mouse"));
     this.canvasElt.addEventListener("mousemove", this.drawInCanvas.bind(this, "mouse"));
     this.canvasElt.addEventListener("mouseup", this.stopDrawing.bind(this));
     this.canvasElt.addEventListener("mouseout", this.stopDrawing.bind(this));
 
     this.canvasElt.addEventListener("touchstart", this.moveInCanvas.bind(this, "touch"));
     this.canvasElt.addEventListener("touchmove", this.drawInCanvas.bind(this, "touch"));
     this.canvasElt.addEventListener("touchend", this.stopDrawing.bind(this));
     this.canvasElt.addEventListener("touchcancel", this.stopDrawing.bind(this));
    }

    if (this.lineWidthElt) {
      this.lineWidthElt.addEventListener("input", this.setLineWidth.bind(this));
    }

    if (this.lineColorElt) {
      this.lineColorElt.addEventListener("input", this.setStrokeStyle.bind(this));
    }

    if (this.cleanerElt) {
      this.cleanerElt.addEventListener("click", this.clearCanvas.bind(this));
    }
  }

  /************************************/
  /********** EVENTS METHODS **********/
  /************************************/

  /**
   * @param {string} type
   * @param {object} event
   */
  moveInCanvas(type, event) {
    this.startDrawing();
    switch (type) {

      case "mouse":
        this.setMouseLocation(event);
        this.moveTo(event, this.mouseX, this.mouseY);
        break;

      case "touch":
        this.setTouchLocation(event);
        this.moveTo(event, this.touchX, this.touchY);
        break;

      default:
        alert("Event type must be mouse or touch!");
    }
  }

  /**
   * @param {string} type
   * @param {object} event
   */
   drawInCanvas(type, event) {
    if (this.startState) {
      switch (type) {

        case "mouse":
          this.setMouseLocation(event);
          this.lineTo(this.mouseX, this.mouseY);
          break;

        case "touch":
          this.setTouchLocation(event);
          this.lineTo(this.touchX, this.touchY);
          break;

        default:
          alert("Event type must be mouse or touch!");
      }
    }
  }

  stopDrawing() {
    this.startState = false;
    this.endState   = true;
  }

  setLineWidth() {
    this.context.lineWidth = this.lineWidthElt.value;
  }

  setStrokeStyle() {
    this.context.strokeStyle = this.lineColorElt.value;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
    this.endState = false;
  }

  /**************************************/
  /********** LOCATION SETTERS **********/
  /**************************************/

  /**
   * @param {object} event
   */
  setMouseLocation(event) {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
  }

  /**
   * @param {object} event
   */
  setTouchLocation(event) {
    let position  = event.target.getBoundingClientRect();
    this.touchX   = event.targetTouches[0].clientX - position.left;
    this.touchY   = event.targetTouches[0].clientY - position.top;
  }

  /*************************************/
  /********** CONTEXT METHODS **********/
  /*************************************/

  startDrawing() {
    this.startState = true;
    this.context.beginPath();
  }

  /**
   * @param {object} event
   * @param {number} x
   * @param {number} y
   */
  moveTo(event, x, y) {
    this.context.moveTo(x, y);
    event.preventDefault();
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  lineTo(x, y) {
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}
