console.log("app is running!");

class App {
  $target = null;
  data = [];
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.darkmodeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      // 검색창
      onSearch: (keyword) => {
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          localStorage.setItem("lastWord", keyword);
          localStorage.setItem("lastResult", JSON.stringify(data));
          this.loading.hide();
          this.recentSearch.addKeyword(keyword);
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

    this.recentSearch = new RecentSearch({
      $target,
      onClick: (keyword) => {
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.hide();
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (data) => {
        this.imageInfo.showDetail(data);
      },

      onNextPage: () => {
        const lastWord = localStorage.getItem("lastWord");
        const page = this.page + 1;
        this.loading.show();
        api.fetchCatsPage(lastWord, page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState(newData);
          this.page = page;
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
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
