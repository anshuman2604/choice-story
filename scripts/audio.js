let audioContext = null;
let backgroundMusic = null;
let gainNode = null;
let isInitialized = false;

async function createAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0;
        return true;
    } catch (error) {
        console.error('Failed to create audio context:', error);
        return false;
    }
}

async function initAudio() {
    if (isInitialized) return true;
  
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
  
      const response = await fetch('props/audio/background.mp3'); 
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
      backgroundMusic = audioContext.createBufferSource();
      backgroundMusic.buffer = audioBuffer;
      backgroundMusic.loop = true;
      backgroundMusic.connect(gainNode);
  
      isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      return false;
    }
  }
  
  
  
  async function toggleAudio() {
    const audioController = document.querySelector('.audio-controller');
  
    if (!isInitialized) {
      const success = await initAudio();
      if (!success) {
        console.error('Could not initialize audio');
        return;
      }
    }
  
    if (!backgroundMusic) return;
  
    if (!audioContext || audioContext.state === 'suspended') {
      await audioContext.resume(); 
    }
  
    if (!backgroundMusic.startTime) {
   
      backgroundMusic.start();
      backgroundMusic.startTime = audioContext.currentTime;
      gainNode.gain.value = 0.2; 
      audioController.classList.add('playing');
    } else {
 
      const isMuted = gainNode.gain.value === 0;
      gainNode.gain.value = isMuted ? 0.5 : 0;
      audioController.classList.toggle('playing', isMuted);
    }
  }
  
  
  

  let hoverAudio = null;

  function playHoverSound() {
    if (!hoverAudio) {
      hoverAudio = new Audio('props/audio/hover.mp3'); 
      hoverAudio.volume = 0.3; 
    }
  

    hoverAudio.currentTime = 0;
  
    hoverAudio
      .play()
      .catch(error => console.error('Hover sound failed:', error));
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.nav-link, .story-card, .audio-controller');
  
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', playHoverSound);
    });
  });
  
  


document.addEventListener('DOMContentLoaded', () => {
    const audioController = document.querySelector('.audio-controller');
    audioController.addEventListener('click', toggleAudio);


    const interactiveElements = document.querySelectorAll('.nav-link, .story-card, .audio-controller');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', playHoverSound);
    });
});