const video = document.getElementById("wildlifeVideo");
const actionButton = document.getElementById("videoActionBtn");
const statusMessage = document.getElementById("statusMessage");

function updateButtonAndStatus() {
  if (video.paused) {
    actionButton.textContent = "Play Video";
    actionButton.setAttribute("aria-label", "Play video");
    statusMessage.textContent = "Video is paused.";
  } else {
    actionButton.textContent = "Hide Video";
    actionButton.setAttribute("aria-label", "Hide video");
    statusMessage.textContent = "Video is playing.";
  }
}

actionButton.addEventListener("click", () => {
  const videoIsHidden = video.hidden;

  if (videoIsHidden) {
    video.hidden = false;
    video.play().catch(() => {
      statusMessage.textContent = "Unable to autoplay. Press play on the video controls.";
    });
    return;
  }

  if (video.paused) {
    video.play().catch(() => {
      statusMessage.textContent = "Unable to autoplay. Press play on the video controls.";
    });
  } else {
    video.hidden = true;
    statusMessage.textContent = "Video hidden.";
  }

  updateButtonAndStatus();
});

video.addEventListener("play", () => {
  video.hidden = false;
  updateButtonAndStatus();
});

video.addEventListener("pause", updateButtonAndStatus);
video.addEventListener("ended", updateButtonAndStatus);

updateButtonAndStatus();
