import RecentSearch from "./RecentSearch.js";

class SearchInput {
  constructor({ $target, onSearch, onClick }) {
    const $wraaper = document.createElement("section");
    $wraaper.className = "SearchInputSection";
    // 검색창
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    $searchInput.className = "SearchInput";
    this.$searchInput.value =
      localStorage.getItem("lastWord") != null
        ? localStorage.getItem("lastWord")
        : "";
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $wraaper.appendChild($searchInput);

    // 검색어 검색하기
    $searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
        this.RecentSearch.addKeyword(keyword);
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

    this.RecentSearch = new RecentSearch({
      $target: $wraaper,
      onSearch,
    });
  }

  initWord() {
    let initword = localStorage.getItem("lastWord");
    console.log(initword);
    this.$searchInput.textContent = initword;
  }
  render() {}
}
export default SearchInput;
