/*! animadio v4.2.0 | https://animadio.org | MIT License */

"use strict";

class Animadio {

  static slider(timeout = 2000, auto = true, random = false) {
    new Slider(timeout, auto, random);
  }

  static canvas(width = 500, height = 500, line = 2, color = "blue") {
    new Canvas(width, height, line, color);
  }

  static ajax(url, callback = null, data = null) {
    new Ajax(url, callback, data);
  }

}

class Slider {
  /**
   * @param {number} timeout
   * @param {Boolean} auto
   * @param {Boolean} random
   */
  constructor(timeout = 2000, auto = true, random = false) {
    this.slider         = document.getElementById("slider");
    this.slidesTriggers = this.slider.querySelectorAll("input");
    this.slidesCount    = this.slidesTriggers.length;

    this.previous = document.getElementById("slider-previous");
    this.next     = document.getElementById("slider-next");

    this.index    = -1;
    this.timer    = null;
    this.timeout  = timeout;

    this.auto       = document.getElementById("slider-auto");
    this.autoIcon   = this.auto.querySelector("i");
    this.autoState  = auto;

    this.random       = document.getElementById("slider-random");
    this.randomIcon   = this.random.querySelector("i");
    this.randomState  = random;

    this.setControls();
    this.runSlider();
  }

  setControls() {
    this.previous.addEventListener("click", this.goPrevious.bind(this));
    this.next.addEventListener("click", this.goNext.bind(this));

    this.auto.addEventListener("click", this.checkAuto.bind(this));
    this.random.addEventListener("click", this.checkRandom.bind(this));

    document.addEventListener("keydown", this.setKeyboard.bind(this));
  }

  runSlider() {
    if (this.autoState) {
      this.timer = window.setInterval(
          this.goNext.bind(this),
          this.timeout
      );

    } else {
      this.goNext();
    }
  }

  /**
   * @param {number} min
   * @param {number} max
   * @return
   */
  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  refreshSlide() {
    for (let i = 0; i < this.slidesCount; i++) {

      if (this.slidesTriggers[i].hasAttribute("checked")) {
        this.slidesTriggers[i].removeAttribute("checked");
      }
    }

    this.slidesTriggers[this.index].setAttribute("checked", true);
  }

  goPrevious() {
    if (this.randomState) {
      this.index = this.getRandomInteger(0, this.slidesCount - 1);

    } else {
      this.index--;

      if (this.index < 0) {
        this.index = this.slidesCount - 1;
      }
    }

    this.refreshSlide();
  }

  goNext() {
    if (this.randomState) {
      this.index = this.getRandomInteger(0, this.slidesCount - 1);

    } else {
      this.index++;

      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    }

    this.refreshSlide();
  }

  checkAuto() {
    if (this.autoState) {
      this.setAuto(false, "Play", "fa-play", "fa-pause");
      window.clearInterval(this.timer);

    } else {
      this.setAuto(true, "Pause", "fa-pause", "fa-play");
      this.timer = window.setInterval(this.goNext.bind(this), this.timeout);
    }

    this.refreshSlide();
  }

  /**
   * @param {boolean} state
   * @param {string} title
   * @param {string} add
   * @param {string} remove
   */
  setAuto(state, title, add, remove) {
    this.autoState  = state;
    this.auto.title = title;

    this.setIcon(this.autoIcon, add, remove);
  }

  checkRandom() {
    if (this.randomState) {
      this.setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right");

    } else {
      this.setRandom(true, "Normal", "fa-long-arrow-alt-right", "fa-random");
    }

    this.refreshSlide();
  }

  /**
   * @param {boolean} state
   * @param {string} title
   * @param {string} add
   * @param {string} remove
   */
  setRandom(state, title, add, remove) {
    this.randomState  = state;
    this.random.title = title;

    this.setIcon(this.randomIcon, add, remove);
  }

  /**
   * @param {object} icon
   * @param {string} add
   * @param {string} remove
   */
  setIcon(icon, add, remove) {
    icon.classList.add(add);
    icon.classList.remove(remove);
  }

  /**
   * @param {Object} event
   */
  setKeyboard(event) {
    switch (event.code) {

      case "ArrowLeft":
        this.goPrevious();
        break;

      case "ArrowUp":
        this.checkAuto();
        break;

      case "ArrowDown":
        this.checkRandom();
        break;

      case "ArrowRight":
        this.goNext();
        break;
    }
  }
}

class Canvas {
  /**
   * @param {number} width
   * @param {number} height
   * @param {number} line
   * @param {string} color
   */
  constructor(width = 500, height = 500, line = 2, color = "blue") {
    this.startState = false;
    this.endState   = false;

    this.line  = null;
    this.color = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.canvas   = document.getElementById("canvas");
    this.context  = this.canvas.getContext("2d");
    
    this.cleaner = document.getElementById("canvas-cleaner");
    this.cleaner.addEventListener("click", this.cleanCanvas.bind(this));

    this.initCanvas(width, height);
    this.initOptions();
    this.initContext(line, color);
    this.initDraw();
  }

  /**
   * @param {number} width
   * @param {number} height
   */
  initCanvas(width, height) {
    this.canvas.width   = width;
    this.canvas.height  = height;
  }

  initOptions() {
    if (document.getElementById("canvas-line")) {
      this.line = document.getElementById("canvas-line");
      this.line.addEventListener("input", this.setLine.bind(this));
    }

    if (document.getElementById("canvas-color")) {
      this.color = document.getElementById("canvas-color");
      this.color.addEventListener("input", this.setColor.bind(this));
    }
  }

  setLine() {
    this.context.lineWidth = this.line.value;
  }

  setColor() {
    this.context.strokeStyle = this.color.value;
  }

  /**
   * @param {number} line
   * @param {string} color
   */
  initContext(line, color) {
    this.context.lineWidth    = line;
    this.context.strokeStyle  = color;
    this.context.lineCap      = "round";
    this.context.lineJoin     = "round";
  }

  initDraw() {
    this.canvas.addEventListener("mousedown", this.moveInCanvas.bind(this, "mouse"));
    this.canvas.addEventListener("mousemove", this.drawInCanvas.bind(this, "mouse"));
    this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("mouseout", this.stopDrawing.bind(this));

    this.canvas.addEventListener("touchstart", this.moveInCanvas.bind(this, "touch"));
    this.canvas.addEventListener("touchmove", this.drawInCanvas.bind(this, "touch"));
    this.canvas.addEventListener("touchend", this.stopDrawing.bind(this));
    this.canvas.addEventListener("touchcancel", this.stopDrawing.bind(this));
  }

  startDrawing() {
    this.startState = true;
    this.context.beginPath();
  }

  stopDrawing() {
    this.startState = false;
    this.endState   = true;
  }

  cleanCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.endState = false;
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
    }
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
      }
    }
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

class Ajax {
  /**
   * @param {string} url
   * @param {function} callback
   * @param {object} data
   * @param {boolean} isJson
   */
  constructor(url, callback = null, data = null, isJson = true) {
    this.request = new XMLHttpRequest();

    this.url      = url;
    this.callback = callback;
    this.data     = data;
    this.isJson   = isJson;

    this.setCallback();
    this.setAjax();
  }

  setCallback() {
    if (this.callback === null) {
      this.callback = this.showResponse;
    }
  }

  /**
   * @param response
   */
  showResponse(response) {
    alert(response);
  }

  setAjax() {
    if (this.data) {
      this.postAjax();
    } else {
      this.getAjax();
    }
  }

  getAjax() {
    this.request.open("GET", this.url);
    this.runAjax();
  }

  postAjax() {
    this.request.open("POST", this.url);
    this.runAjax();
  }

  runAjax() {
    this.listenAjax();
    this.checkJson();
    this.request.send(this.data);
  }

  checkJson() {
    if (this.data && this.isJson) {
      this.request.setRequestHeader("Content-Type", "application/json");
      this.data = JSON.stringify(this.data);
    }
  }

  listenAjax() {
    this.request.addEventListener("load", this.listenLoad.bind(this));
    this.request.addEventListener("error", this.listenError.bind(this));
  }

  listenLoad() {
    if (this.request.status >= 200 && this.request.status < 400) {
      this.callback(this.request.responseText);

    } else {
      alert(this.request.status + " " + this.request.statusText + " " + this.url);
    }
  }

  listenError() {
    alert("Network Error @URL => " + this.url);
  }
}

/*! Author: Philippe Beck <philippe@philippebeck.net>
 Updated: 4th Apr 2021 @ 12:50:33 PM */