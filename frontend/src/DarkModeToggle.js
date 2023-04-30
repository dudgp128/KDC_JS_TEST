class DarkModeToggle {
  constructor({ $target }) {
    const $wraaper = document.createElement("section");
    const $darkModeToggle = document.createElement("input");
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = "checkbox";

    $darkModeToggle.className = "darkModeToggle";

    $wraaper.appendChild($darkModeToggle);
    $target.appendChild($wraaper);

    this.initColorMode();

    $darkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });
  }

  initColorMode() {
    // checkbox 초기화
    this.$darkModeToggle.checked = window.matchMedia(
      "(prefers-color-schema:dark)"
    ).matches;

    // html 초기화
    this.setColorMode(window.matchMedia("(prefers-color-schema:dark)").matches);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
  render() {}
}
export default DarkModeToggle;
