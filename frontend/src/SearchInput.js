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
        onSearch(e.target.value, limitCount[$options.selectedIndex]);
        this.RecentSearch.addKeyword(e.target.value);
      }
    });

    // 검색 결과 개수 제한하기
    const $options = document.createElement("select");
    this.$options = $options;

    const limitCount = [10, 25, 50];

    limitCount.forEach((e, i) => {
      let $option = document.createElement("option");
      $option.value = e;
      $option.textContent = String(e).concat("개");

      if (e === 50) {
        $option.selected = true;
      }
      $options.appendChild($option);
    });

    $wraaper.appendChild($options);

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
