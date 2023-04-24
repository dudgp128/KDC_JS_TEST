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
        this.loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.hide();
          return this.setState(data);
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
      initialData: this.data,
      onClick: (image) => {
        api.fetchInfo(image.id).then(({ data }) => {
          return this.imageInfo.setState({
            visible: true,
            image: data,
          });
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
