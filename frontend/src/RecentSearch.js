class RecentSearch {
  $recentSearch = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $recentSearch = document.createElement("section");
    this.$recentSearch = $recentSearch;
    $recentSearch.className = "RecentSearch";
    $target.appendChild($recentSearch);

    this.onSearch = onSearch;

    this.init();
    this.render();
  }

  // localStorage('keywordHistory') 불러오기
  getKeywordHistory() {
    return localStorage.getItem("keywordHistory") === null
      ? []
      : localStorage.getItem("keywordHistory").split(",");
  }

  // 'keywordHistory' 추가하기
  addKeyword(keyword) {
    let filterWords = this.getKeywordHistory().filter(
      (word) => word != keyword
    );
    filterWords.unshift(keyword);
    localStorage.setItem("keywordHistory", filterWords.join(","));

    this.init();
  }

  // 가장 최근에 검색한 상위 키워드 5개 가져오기
  init() {
    let words = this.getKeywordHistory().slice(0, 5);
    this.setState(words);
  }

  // 'keywordHistory' 업데이트 하기
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$recentSearch.innerHTML = this.data
      .map(
        (word) => `
         <li> <button> ${word} </button> </li>
        `
      )
      .join("");

    this.$recentSearch.querySelectorAll("li button").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onSearch(this.data[index]);
      });
    });
  }
}
export default RecentSearch;
