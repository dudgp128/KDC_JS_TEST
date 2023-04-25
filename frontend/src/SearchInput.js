const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const $wraaper = document.createElement("section");

    // 검색창
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    $searchInput.className = "SearchInput";
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $wraaper.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    // 랜덤 버튼
    const $randomBtn = document.createElement("button");
    this.$randomBtn = $randomBtn;
    $randomBtn.className = "RandomBtn";
    $randomBtn.textContent = "🎲랜덤";
    $wraaper.appendChild($randomBtn);

    $randomBtn.addEventListener("click", (e) => {
      onClick();
    });

    $target.appendChild($wraaper);
  }
  render() {}
}
