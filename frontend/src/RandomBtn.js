class RandomBtn {
  constructor({ $target, onClick }) {
    const $wraaper = document.createElement("section");
    const $randomBtn = document.createElement("button");
    this.$randomBtn = $randomBtn;

    $randomBtn.className = "RandomBtn";
    $randomBtn.textContent = "랜덤버튼";

    $wraaper.appendChild($randomBtn);
    $target.appendChild($wraaper);

    $randomBtn.addEventListener("click", (e) => {
      onClick();
    });
  }
  render() {}
}
