import api from "./api.js";

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

  showDetail = async (cat) => {
    const { data } = await api.fetchInfo(cat.id);
    return this.setState({ visible: true, data });
  };

  setState(nextData) {
    this.data = nextData;
    this.setFade(nextData.visible);
    this.render();
  }

  closeImageInfo() {
    this.setState({
      visible: false,
      data: undefined,
    });
  }

  setFade(visible) {
    if (visible) {
      this.$imageInfo.classList.add("show");
    } else {
      this.$imageInfo.classList.remove("show");
    }
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

      // 모달 닫기
      document.addEventListener("click", (e) => {
        e.target.className === "close" || "ImageInfo"
          ? this.closeImageInfo()
          : null;
      });

      document.addEventListener("keyup", (e) => {
        e.key === "Escape" ? this.closeImageInfo() : null;
      });
    }
  }
}
export default ImageInfo;
