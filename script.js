const player = document.querySelector('.flex');
const progress = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button');
const volumeInput = document.querySelector('input[name="volume"]');
const playbackSpeedInput = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress');

// Add this part for handling CSS variable updates
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
// End of CSS variable handling

function togglePlay() {
  const method = player.paused ? 'play' : 'pause';
  player[method]();
}

function updateButton() {
  const icon = player.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

function skip() {
  player.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  player[this.name] = this.value;
}

function handleProgress() {
  const percent = (player.currentTime / player.duration) * 100;
  progress.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

player.addEventListener('click', togglePlay);
player.addEventListener('play', updateButton);
player.addEventListener('pause', updateButton);
player.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

volumeInput.addEventListener('change', handleRangeUpdate);
volumeInput.addEventListener('mousemove', handleRangeUpdate);

playbackSpeedInput.addEventListener('change', handleRangeUpdate);
playbackSpeedInput.addEventListener('mousemove', handleRangeUpdate);

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => (mousedown = true));
progressBar.addEventListener('mouseup', () => (mousedown = false));
