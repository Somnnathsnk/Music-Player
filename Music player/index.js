const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const coverImg = document.getElementById('cover-img');

let currentSongIndex = 0;
let songs = Array.from(playlist.querySelectorAll('li'));

// Load a song
function loadSong(songEl) {
  audio.src = songEl.getAttribute('data-src');
  songTitle.textContent = songEl.textContent;
  artistName.textContent = songEl.getAttribute('data-artist');
  coverImg.src = songEl.getAttribute('data-cover');

  songs.forEach(li => li.classList.remove('active'));
  songEl.classList.add('active');
}

// Play
function playSong() {
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
}

// Pause
function pauseSong() {
  audio.pause();
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'inline-block';
}

// Next Song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

// Previous Song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  if (duration) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + '%';
  }

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

// Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Format time
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Volume control
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Playlist click
songs.forEach((songEl, index) => {
  songEl.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(songEl);
    playSong();
  });
});

// Event Listeners
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Load first song by default
loadSong(songs[currentSongIndex]);
