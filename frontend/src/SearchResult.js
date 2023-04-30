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

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      // 아이템이 화면에 보일때
      if (item.isIntersecting) {
        // 이미지 로드하기
        item.target.querySelector("img").src =
          item.target.querySelector("img").dataset.src;
        // 마지막 요소가 보일때
        if (Number(item.target.dataset.index) + 1 === this.data.length) {
          console.log("다음페이지");
          this.onNextPage();
        }
      }
    });
  });

  render() {
    if (this.data.length != 0) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat, index) => `
          <li class="item" data-index=${index}>
            <img src="https://dummyimage.com/200x300/b5b3b5/fff.png" data-src=${cat.url} alt=${cat.name} id=${cat.id}/>
          </li>
        `
        )
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
        this.listObserver.observe($item);
      });
    } else {
      this.$searchResult.innerHTML = `
        <div> 
          <p> 해당 검색 결과가 없습니다. </p>
        </div>
      `;
    }
  }
}
export default SearchResult;
