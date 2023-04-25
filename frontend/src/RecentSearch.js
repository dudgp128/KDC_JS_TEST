class RecentSearch {
  $recentSearch = null;
  searchList = null;
  data = null;
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
    console.log("local", localStorage.getItem("searchList"));
  }

  setState(nextData) {
    this.data = nextData;
    this.wordList.push(this.data);
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
    } else {
      this.$recentSearch.innerHTML = `<p> nothing </p>`;
    }
  }
}
