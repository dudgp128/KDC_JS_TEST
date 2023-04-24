class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;
    $target.appendChild($loading);

    this.data = {
      show: false,
    };

    this.render();
  }

  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
        <div>
            <h3> 로딩 </h3>
        </div>
        `;
    } else {
      this.$loading.innerHTML = `
      <div>
        <h3> 로딩 완료 </h3>
      </div>
    `;
    }
    // this.$loading.innerHTML = this.data.show
    //   ? `<div class="Loading">
    // <h1>로딩</h1>
    // </div>`
    //   : ``;
  }
}
