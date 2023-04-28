class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  onNextPage = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";

    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  // 'el' 요소가 화면에 보이는지 (true/false)
  isElementViewport(el) {
    const lastElement = el.getBoundingClientRect();

    return (
      lastElement.top >= 0 &&
      lastElement.left >= 0 &&
      lastElement.bottom <= window.innerHeight &&
      lastElement.right <= window.innerWidth
    );
  }

  // 스크롤 event
  applyEventToEvent = (items) => {
    document.addEventListener("scroll", () => {
      items.forEach((el, index) => {
        if (this.isElementViewport(el) && this.data.length - 1 === index) {
          this.onNextPage();
        }
      });
    });
  };

  render() {
    if (this.data.length != 0) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} id=${cat.id}/>
          </li>
        `
        )
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
    } else {
      this.$searchResult.innerHTML = `
        <div> 
          <p> 해당 검색 결과가 없습니다. </p>
        </div>
      `;
    }
    let listItems = this.$searchResult.querySelectorAll(".item");
    this.applyEventToEvent(listItems);
  }
}
