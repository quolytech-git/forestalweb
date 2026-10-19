import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Soft listening level used when a visitor turns the sound on (audio is also normalised quietly at encode time)
const SOUND_VOLUME = 0.22;
const FADE_MS = 1200;

// Muted, looping project video that plays only while visible.
// The sound button fades the audio in at a low volume; only one video plays sound at a time.
export default function GalleryVideo({ src, poster, label, lang = 'en' }) {
  const isSq = lang === 'sq';
  const videoRef = useRef(null);
  const fadeRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);

  // Play while on screen, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  const fadeTo = (target, onDone) => {
    const video = videoRef.current;
    if (!video) return;
    cancelAnimationFrame(fadeRef.current);
    const from = video.volume;
    const start = performance.now();
    const tick = (now) => {
      // The first frame timestamp can be slightly earlier than `start`, so clamp both values
      const t = Math.min(1, Math.max(0, (now - start) / FADE_MS));
      video.volume = Math.min(1, Math.max(0, from + (target - from) * t));
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(tick);
      } else if (onDone) {
        onDone();
      }
    };
    fadeRef.current = requestAnimationFrame(tick);
  };

  const mute = () => {
    fadeTo(0, () => {
      if (videoRef.current) videoRef.current.muted = true;
    });
    setSoundOn(false);
  };

  // Another video turned its sound on: fade this one out
  useEffect(() => {
    const handleOther = (e) => {
      if (e.detail !== videoRef.current && soundOn) mute();
    };
    window.addEventListener('gallery-video-sound', handleOther);
    return () => window.removeEventListener('gallery-video-sound', handleOther);
  });

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (soundOn) {
      mute();
      return;
    }
    window.dispatchEvent(new CustomEvent('gallery-video-sound', { detail: video }));
    video.volume = 0;
    video.muted = false;
    video.play().catch(() => {});
    fadeTo(SOUND_VOLUME);
    setSoundOn(true);
  };

  return (
    <div className={`gl-video-wrap ${isPortrait ? 'portrait' : 'landscape'}`}>
      <video
        ref={videoRef}
        className="gl-video"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onLoadedMetadata={(e) => setIsPortrait(e.currentTarget.videoHeight >= e.currentTarget.videoWidth)}
      />
      <button
        type="button"
        className={`gl-sound-btn ${soundOn ? 'on' : ''}`}
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? (isSq ? 'Hiq zërin' : 'Mute') : (isSq ? 'Aktivizo zërin' : 'Turn sound on')}
      >
        {soundOn ? <Volume2 size={15} strokeWidth={2.4} /> : <VolumeX size={15} strokeWidth={2.4} />}
        <span>{soundOn ? (isSq ? 'Zëri aktiv' : 'Sound on') : (isSq ? 'Pa zë' : 'Muted')}</span>
      </button>
    </div>
  );
}
