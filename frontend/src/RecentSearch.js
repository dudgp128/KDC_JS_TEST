class RecentSearch {
  $recentSearch = null;
  searchList = null;
  onClick = null;
  wordList = [];

  constructor({ $target, onClick }) {
    const $recentSearch = document.createElement("section");
    this.$recentSearch = $recentSearch;
    $target.appendChild($recentSearch);

    this.onClick = onClick;

    this.render();
  }

  setlocalStorage() {
    localStorage.setItem("searchList", JSON.stringify(this.wordList));
  }

  setState(nextData) {
    this.wordList.push(nextData);
    this.setlocalStorage();

    this.render();
  }

  render() {
    if (this.wordList.length != 0) {
      this.$recentSearch.innerHTML = this.wordList
        .map(
          (word) => `
       <li class = "item" > ${word} </li>
      `
        )
        .join("");
    }
    this.$recentSearch.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.wordList[index]);
      });
    });
  }
}
