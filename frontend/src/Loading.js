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
    this.$loading.innerHTML = this.data.show
      ? `<div class="Loading">
             <p> 로딩중💦 </p>
        </div>`
      : ``;
  }
}
