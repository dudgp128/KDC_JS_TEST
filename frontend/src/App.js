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
      onSearch: (keyword) => {
        // 로딩 전
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.hide();
          return this.setState(data);
        });
        // 로딩 후
      },
    });

    this.loading = new Loading({
      $target,
    });

    this.randomBtn = new RandomBtn({
      $target,
      onClick: () => {
        api.fetchRandomCats().then(({ data }) => this.setState(data));
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
