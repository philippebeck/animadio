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
              lineColor = "blue") {

    this.canvasElt    = null;
    this.lineWidthElt = null;
    this.lineColorElt = null;
    this.cleanerElt   = null;

    this.context = null;

    this.startState = false;
    this.endState   = false;

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.getCanvasElt();
    this.getOptionsElt();

    this.setCanvasDimensions(canvasWidth, canvasHeight);
    this.setContext2d(lineWidth, lineColor);

    this.setCanvasListeners();
    this.setOptionsListeners();
  }

  /*****************************/
  /********** GETTERS **********/
  /*****************************/

  getCanvasElt() {
    if (document.getElementById("canvas")) {
      this.canvasElt = document.getElementById("canvas");

    } else {
      alert("No <canvas id=\"canvas\"> element is present!");
    }
  }

  getOptionsElt() {
    if (document.getElementById("line-color")) {
      this.lineColorElt = document.getElementById("line-color");
    }

    if (document.getElementById("line-width")) {
      this.lineWidthElt = document.getElementById("line-width");
    }

    if (document.getElementById("cleaner")) {
      this.cleanerElt = document.getElementById("cleaner");
    }
  }

  /**
   * @param {object} event
   */
   getMouseLocation(event) {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
  }

  /**
   * @param {object} event
   */
  getTouchLocation(event) {
    let position  = event.target.getBoundingClientRect();
    this.touchX   = event.targetTouches[0].clientX - position.left;
    this.touchY   = event.targetTouches[0].clientY - position.top;
  }

  /*****************************/
  /********** SETTERS **********/
  /*****************************/

  /**
   * @param {number} width
   * @param {number} height
   */
  setCanvasDimensions(width, height) {
    if (this.canvasElt) {
      this.canvasElt.width   = width;
      this.canvasElt.height  = height;
    } 
  }

  /**
   * @param {number} lineWidth
   * @param {string} strokeStyle
   */
  setContext2d(lineWidth, strokeStyle) {
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

  setCanvasListeners() {
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
   }

  setOptionsListeners() {
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

  /*******************************/
  /********** LISTENERS **********/
  /*******************************/

  /**
   * @param {string} type
   * @param {object} event
   */
  moveInCanvas(type, event) {
    this.startDrawing();
    switch (type) {

      case "mouse":
        this.getMouseLocation(event);
        this.moveTo(event, this.mouseX, this.mouseY);
        break;

      case "touch":
        this.getTouchLocation(event);
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
          this.getMouseLocation(event);
          this.lineTo(this.mouseX, this.mouseY);
          break;

        case "touch":
          this.getTouchLocation(event);
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
