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
