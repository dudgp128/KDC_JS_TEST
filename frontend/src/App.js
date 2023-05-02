import DarkModeToggle from "./DarkModeToggle.js";
import SearchInput from "./SearchInput.js";
import ImageInfo from "./ImageInfo.js";
import Loading from "./Loading.js";
import RecentSearch from "./RecentSearch.js";
import SearchResult from "./SearchResult.js";
import api from "./api.js";

class App {
  $target = null;
  DEFAULT_PAGE = 1;
  data = {
    items: [],
    page: this.DEFAULT_PAGE,
  };

  constructor($target) {
    this.$target = $target;

    this.darkmodeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      // 검색창
      onSearch: (keyword, limitCount) => {
        this.loading.show();
        api.fetchCatsLimit(keyword, limitCount).then(({ data }) => {
          localStorage.setItem("lastWord", keyword);
          localStorage.setItem("lastResult", JSON.stringify(data));
          this.loading.hide();
          this.setState(data);
        });
      },

      // 랜덤버튼
      onClick: () => {
        this.loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.loading.hide();
          return this.setState(data);
        });
      },
    });

    this.loading = new Loading({
      $target,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (data) => {
        this.imageInfo.showDetail(data);
      },

      onNextPage: () => {
        const lastWord = localStorage.getItem("lastWord");
        const nextPage = this.data.page + 1;
        this.loading.show();
        api.fetchCatsPage(lastWord, nextPage).then(({ data }) => {
          let newData = this.data.items.concat(data);
          this.setState(newData);
          this.data.page = nextPage;
          this.loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        data: null,
      },
    });

    this.init();
  }

  init() {
    let lastResult =
      localStorage.getItem("lastResult") != null
        ? localStorage.getItem("lastResult")
        : [];
    this.setState(JSON.parse(lastResult));
  }

  setState(nextData) {
    console.log(this);
    this.data.items = nextData;
    this.searchResult.setState(nextData);
  }
}
export default App;
