/*! animadio v4.2.9 | https://animadio.org | MIT License */

"use strict";

class Animadio {

  static slider(timeout = 2000, auto = true, random = false) {
    new Slider(timeout, auto, random);
  }

  static canvas(width = 500, height = 500, line = 2, color = "black") {
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
  constructor(timeout = 2000, 
              auto = true, 
              random = false) {

    this.sliderElt      = null;
    this.slidesTriggers = null;
    this.slidesCount    = 0;

    this.index    = -1;
    this.timer    = null;
    this.timeout  = timeout;

    this.previousElt = null;
    this.nextElt     = null;

    this.autoElt    = null;
    this.autoIcon   = null;
    this.autoState  = auto;

    this.randomElt    = null;
    this.randomIcon   = null;
    this.randomState  = random;

    this.setSlider();
    this.setSlidesTriggers();
    this.setOptions();
    this.setIcons();
    this.setListeners();

    this.runSlider();
  }

  /**********************************/
  /********** INIT METHODS **********/
  /**********************************/

  setSlider() {
    if (document.getElementById("slider")) {
      this.sliderElt = document.getElementById("slider");

    } else {
      alert("No <tag id=\"slider\"> element is present!");
    } 
  }

  setSlidesTriggers() {
    if (this.sliderElt.querySelectorAll("input")) {
      this.slidesTriggers = this.sliderElt.querySelectorAll("input");
      this.slidesCount    = this.slidesTriggers.length;
    } 
  }

  setOptions() {
    if (document.getElementById("slider-previous")) {
      this.previousElt = document.getElementById("slider-previous");
    }
    
    if (document.getElementById("slider-next")) {
      this.nextElt = document.getElementById("slider-next");
    }

    if (document.getElementById("slider-auto")) {
      this.autoElt = document.getElementById("slider-auto");
    }
  
    if (document.getElementById("slider-random")) {
      this.randomElt = document.getElementById("slider-random");
    }
  }

  setIcons() {
    if (this.autoElt.querySelector("i")) {
      this.autoIcon = this.autoElt.querySelector("i");
    }

    if (this.randomElt.querySelector("i")) {
      this.randomIcon = this.randomElt.querySelector("i");
    }
  }

  setListeners() {
    document.addEventListener("keydown", this.setKeyboard.bind(this));

    if (this.previousElt) {
      this.previousElt.addEventListener("click", this.goPrevious.bind(this));
    }

    if (this.nextElt) {
      this.nextElt.addEventListener("click", this.goNext.bind(this));
    }

    if (this.autoElt) {
      this.autoElt.addEventListener("click", this.checkAuto.bind(this));
    }

    if (this.randomElt) {
      this.randomElt.addEventListener("click", this.checkRandom.bind(this));
    }
  }

  runSlider() {
    if (this.autoState) {
      this.timer = window.setInterval(this.goNext.bind(this), this.timeout);

    } else {
      this.goNext();
    }
  }

  /************************************/
  /********** EVENTS METHODS **********/
  /************************************/

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

  checkRandom() {
    if (this.randomState) {
      this.setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right");

    } else {
      this.setRandom(true, "Normal", "fa-long-arrow-alt-right", "fa-random");
    }

    this.refreshSlide();
  }

  refreshSlide() {
    for (let i = 0; i < this.slidesCount; i++) {

      if (this.slidesTriggers[i].hasAttribute("checked")) {
        this.slidesTriggers[i].removeAttribute("checked");
      }
    }

    this.slidesTriggers[this.index].setAttribute("checked", true);
  }

  /****************************/
  /********** GETTER **********/
  /****************************/

  /**
   * @param {number} min
   * @param {number} max
   * @return
   */
   getRandomInteger(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*************************************/
  /********** OPTIONS SETTERS **********/
  /*************************************/

  /**
   * @param {boolean} state
   * @param {string} title
   * @param {string} add
   * @param {string} remove
   */
  setAuto(state, title, add, remove) {
    this.autoState      = state;
    this.autoElt.title  = title;

    this.setIcon(this.autoIcon, add, remove);
  }

  /**
   * @param {boolean} state
   * @param {string} title
   * @param {string} add
   * @param {string} remove
   */
  setRandom(state, title, add, remove) {
    this.randomState      = state;
    this.randomElt.title  = title;

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
}

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
 Updated: 28th Apr 2021 @ 12:56:51 PM */