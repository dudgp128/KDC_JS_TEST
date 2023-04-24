class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  showDetail(data) {
    api.fetchInfo(data.id).then(({ data }) => {
      return this.setState({
        visible: true,
        data,
      });
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeImageInfo() {
    this.$imageInfo.style.display = "none";
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.data;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      document.querySelector(".close").addEventListener("click", () => {
        return this.closeImageInfo();
      });

      document.addEventListener("click", (e) => {
        const popup = document.querySelector(".content-wrapper");
        return popup.contains(e.target) ? null : this.closeImageInfo();
      });

      document.addEventListener("keyup", (e) => {
        return e.key === "Escape" ? this.closeImageInfo() : null;
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
