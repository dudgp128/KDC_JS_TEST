class RecentSearch {
  $recentSearch = null;
  data = null;

  constructor({ $target, onClick }) {
    const $recentSearch = document.createElement("section");
    this.$recentSearch = $recentSearch;
    $target.appendChild($recentSearch);

    this.onClick = onClick;

    this.init();
    this.render();
  }

  // 최근 검색 기록 가져오기
  init() {
    let words =
      localStorage.getItem("keywordHistory") === null
        ? []
        : localStorage.getItem("keywordHistory").split(",");
    words = words.slice(0, 5);
    this.setState(words);
  }

  // 최근 검색 기록 업데이트 하기
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
        this.onClick(this.data[index]);
      });
    });
  }
}
``;
