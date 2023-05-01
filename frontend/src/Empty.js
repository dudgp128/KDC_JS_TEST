class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    $target.appendChild($empty);

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
      this.$empty.style.display = "block";
      this.$empty.innerHTML = this.data.show
        ? `<div class="Empty">
               <p> ❌ 검색 결과가 존재하지 않습니다. </p>
          </div>`
        : ``;
    } else {
      this.$empty.style.display = "none";
    }
  }
}
export default Empty;
