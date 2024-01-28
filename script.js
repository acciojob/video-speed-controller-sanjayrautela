document.addEventListener('DOMContentLoaded', () => {
  const player = document.querySelector('.flex');
  const speedBar = document.querySelector('.speed-bar');

  let isMouseDown = false;

  function updateSpeedBar() {
    const playbackRate = player.playbackRate.toFixed(2);
    speedBar.textContent = `${playbackRate}×`;
  }

  function handleSpeedChange(e) {
    const scrubTime = (e.offsetX / speedBar.offsetWidth);
    const newPlaybackRate = scrubTime * 2; // Adjust as needed
    player.playbackRate = newPlaybackRate;
    updateSpeedBar();
  }

  speedBar.addEventListener('mousedown', () => (isMouseDown = true));
  document.addEventListener('mouseup', () => (isMouseDown = false));

  document.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      handleSpeedChange(e);
    }
  });

  // Listen for changes to the playbackRate property of the video element
  player.addEventListener('ratechange', updateSpeedBar);

  // Set initial speed and update speed bar
  player.playbackRate = 1; // Default speed
  updateSpeedBar();
});
