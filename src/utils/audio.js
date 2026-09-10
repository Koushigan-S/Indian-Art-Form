// Web Audio API ambient sound generator
// Synthesizes a warm, meditative acoustic tanpura drone using gentle sine/triangle oscillators
// No external MP3 downloads required; fully reliable and self-contained.

let audioCtx = null;
let masterGain = null;
let isPlaying = false;
let oscillators = [];

export const initAudio = () => {
  if (audioCtx) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  } catch (e) {
    console.warn("Web Audio API not supported", e);
  }
};

export const toggleAmbientSound = (onStateChange) => {
  if (!audioCtx) {
    initAudio();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (isPlaying) {
    // Fade out
    if (masterGain) {
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        oscillators = [];
      }, 1300);
    }
    isPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    // Start warm meditative drone chords: Pa (G#3 - 207.65Hz), Sa (C#3 - 138.59Hz), Sa (C#4 - 277.18Hz), Kharaj Sa (C#2 - 69.30Hz)
    const baseFreqs = [69.30, 138.59, 207.65, 277.18];
    oscillators = [];

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);
    filter.connect(masterGain);

    baseFreqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), audioCtx.currentTime);
      
      // Gentle pulsing LFO for organic breath
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.12 + (i * 0.04), audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();
      oscillators.push(lfo);

      oscGain.gain.setValueAtTime(0.08 / (i + 1), audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      oscillators.push(osc);
    });

    // Fade in
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 2.0);

    isPlaying = true;
    if (onStateChange) onStateChange(true);
    return true;
  }
};

export const playSubtleClick = () => {
  if (!audioCtx) initAudio();
  if (!audioCtx || audioCtx.state === 'suspended') return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(784, audioCtx.currentTime); // G5 gentle bell
    osc.frequency.exponentialRampToValueAtTime(392, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
};
