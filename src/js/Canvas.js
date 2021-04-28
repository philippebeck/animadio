class Canvas {
  /**
   * @param {number} width
   * @param {number} height
   * @param {number} line
   * @param {string} color
   */
  constructor(width = 500, height = 500, line = 2, color = "black") {
    this.canvasElt  = null;
    this.lineElt    = null;
    this.colorElt   = null;
    this.cleanerElt = null;

    this.context = null;

    this.startState = false;
    this.endState   = false;

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.getCanvasElt();
    this.getLineElt();
    this.getColorElt();
    this.getCleanerElt();

    this.setCanvas(width, height);
    this.setContext(line, color);
    this.setPanelListeners();
    this.setCanvasListeners();
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

  getLineElt() {
    if (document.getElementById("canvas-line")) {
      this.lineElt = document.getElementById("canvas-line");

    } else {
      alert("No <input id=\"canvas-line\"> element is present!");
    }
  }

  getColorElt() {
    if (document.getElementById("canvas-color")) {
      this.colorElt = document.getElementById("canvas-color");

    } else {
      alert("No <input id=\"canvas-color\"> element is present!");
    }
  }

  getCleanerElt() {
    if (document.getElementById("canvas-cleaner")) {
      this.cleanerElt = document.getElementById("canvas-cleaner");

    } else {
      alert("No <button id=\"canvas-cleaner\"> element is present!");
    }
  }

  /*****************************/
  /********** SETTERS **********/
  /*****************************/

  /**
   * @param {number} width
   * @param {number} height
   */
  setCanvas(width, height) {
    if (this.canvasElt) {
      this.canvasElt.width   = width;
      this.canvasElt.height  = height;
    } 
  }

  /**
   * @param {number} line
   * @param {string} color
   */
  setContext(line, color) {
    if (this.canvasElt.getContext) {
      this.context = this.canvasElt.getContext("2d");

      this.context.lineWidth    = line;
      this.context.strokeStyle  = color;
      this.context.lineCap      = "round";
      this.context.lineJoin     = "round";

    } else {
      alert("Your browser doesn't support <canvas> element!");
    }
  }

  setPanelListeners() {
    if (this.lineElt) {
      this.lineElt.addEventListener("input", this.setLine.bind(this));
    }

    if (this.colorElt) {
      this.colorElt.addEventListener("input", this.setColor.bind(this));
    }

    if (this.cleanerElt) {
      this.cleanerElt.addEventListener("click", this.cleanCanvas.bind(this));
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

  /*******************************/
  /********** LISTENERS **********/
  /*******************************/


  setLine() {
    this.context.lineWidth = this.lineElt.value;
  }

  setColor() {
    this.context.strokeStyle = this.colorElt.value;
  }

  cleanCanvas() {
    this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
    this.endState = false;
  }

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
        alert("Event type must be \"mouse\" or \"touch\"!");
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
          alert("Event type must be \"mouse\" or \"touch\"!");
      }
    }
  }

  stopDrawing() {
    this.startState = false;
    this.endState   = true;
  }

  /***********************************/
  /********** GET LOCATIONS **********/
  /***********************************/

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
