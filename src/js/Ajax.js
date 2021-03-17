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
