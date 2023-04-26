console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkmodeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      // 검색창
      onSearch: (keyword) => {
        this.recentSearch.setState(keyword);
        this.searchCat(keyword);
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
        this.searchCat(keyword);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (data) => {
        this.imageInfo.showDetail(data);
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        data: null,
      },
    });
  }

  searchCat(keyword) {
    this.loading.show();
    api.fetchCats(keyword).then(({ data }) => {
      this.loading.hide();
      this.setState(data);
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
