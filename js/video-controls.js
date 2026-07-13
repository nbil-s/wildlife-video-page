(function () {
  "use strict";

  const video = document.getElementById("wildlife-video");
  const videoWrapper = document.getElementById("video-wrapper");
  const toggleBtn = document.getElementById("toggle-video-btn");

  if (!video || !videoWrapper || !toggleBtn) {
    return;
  }

  function isVideoVisible() {
    return !videoWrapper.classList.contains("is-hidden");
  }

  function updateButtonLabel() {
    if (!isVideoVisible()) {
      toggleBtn.textContent = "Show & Play Video";
      toggleBtn.setAttribute("aria-expanded", "false");
      return;
    }

    if (video.paused) {
      toggleBtn.textContent = "Play Video";
    } else {
      toggleBtn.textContent = "Hide Video";
    }

    toggleBtn.setAttribute("aria-expanded", "true");
  }

  function hideVideo() {
    video.pause();
    videoWrapper.classList.add("is-hidden");
    updateButtonLabel();
  }

  function showAndPlayVideo() {
    videoWrapper.classList.remove("is-hidden");
    video.play().catch(function () {
      /* Autoplay may be blocked; native controls remain available. */
    });
    updateButtonLabel();
  }

  toggleBtn.addEventListener("click", function () {
    if (!isVideoVisible()) {
      showAndPlayVideo();
      return;
    }

    if (video.paused) {
      video.play().catch(function () {
        /* Playback blocked; user can use native controls. */
      });
      updateButtonLabel();
      return;
    }

    hideVideo();
  });

  video.addEventListener("play", updateButtonLabel);
  video.addEventListener("pause", updateButtonLabel);
  video.addEventListener("ended", updateButtonLabel);

  updateButtonLabel();
})();
