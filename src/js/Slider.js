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
