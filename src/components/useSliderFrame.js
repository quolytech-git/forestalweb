import { useEffect, useState } from 'react';

// Upscaling beyond this factor makes phone photos look soft
const MAX_UPSCALE = 1.15;

// Sizes a large before/after slider from its photos: the frame follows the photos' own shape
// (between 4:5 and 16:9) and is never wider than the photos can show sharply.
// Returns null until both photos have loaded, so the default CSS frame is used meanwhile.
export default function useSliderFrame(beforeSrc, afterSrc, { maxWidth = 1140, maxHeight = 760 } = {}) {
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = (src) =>
      new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });

    Promise.all([load(beforeSrc), load(afterSrc)]).then(([before, after]) => {
      const imgs = [before, after].filter(Boolean);
      if (cancelled || !imgs.length) return;
      const ref = after || before;
      const aspect = Math.min(16 / 9, Math.max(0.8, ref.naturalWidth / ref.naturalHeight));
      const sharpWidth = Math.min(...imgs.map((img) => img.naturalWidth)) * MAX_UPSCALE;
      setFrame({ aspect, width: Math.round(Math.min(maxWidth, sharpWidth, maxHeight * aspect)) });
    });

    return () => {
      cancelled = true;
    };
  }, [beforeSrc, afterSrc, maxWidth, maxHeight]);

  return frame;
}
