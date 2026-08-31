export const playSound = (type: 'click' | 'cart' | 'success' | 'payment') => {
  try {
    if (type === 'payment') {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3?filename=magical-twinkle-73347.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.warn('Audio play prevented', e));
      return;
    }
    if (type === 'success') {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.warn('Audio play prevented', e));
      return;
    }
    if (type === 'cart') {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_73130d70eb.mp3?filename=pop-39222.mp3');
      audio.volume = 0.4;
      audio.play().catch(e => console.warn('Audio play prevented', e));
      return;
    }
    if (type === 'click') {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_104be66b59.mp3?filename=button-pressed-38129.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.warn('Audio play prevented', e));
      return;
    }

    // Fallback Web Audio API
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'success') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.3);
    }
  } catch (err) {
    console.error("Audio playback failed", err);
  }
};
