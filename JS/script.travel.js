// JAVASCRIPT DOC
function underConstruction() {
  alert("Under Construction :), please check out my resume or blog!!");
}

// set constant for transitioning of sushi images
const checkpoint = 900;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    // adjusting opacity based on how far you scroll
    opacity = 1 - currentScroll / checkpoint + 0.2;
  } else {
    opacity = 0;
  }
  document.querySelector(".front").style.opacity = opacity;
  console.log(opacity);
});
