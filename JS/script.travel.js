// JAVASCRIPT DOC
function underConstruction() {
  alert("Under Construction :), please check out my resume or blog!!");
}

const checkpoint = 900;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint + 0.2;
  } else {
    opacity = 0;
  }
  document.querySelector(".front").style.opacity = opacity;
  console.log(opacity);
});
