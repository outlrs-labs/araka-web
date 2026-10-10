import React, { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Video() {
  const { ref, isVisible } = useScrollReveal();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  // Autoplay on page load (muted → allowed by autoplay policies; source element is muted/loop/playsinline)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Autoplay blocked — poster + Play button remain
      });
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setPlaying(true);
        }).catch(() => {
          // Autoplay policy may prevent playback
        });
      }
    }
  };

  return (
    <section id="video">
      <div ref={ref} className={`mx-auto w-full px-4 lg:px-6 xl:max-w-7xl pt-28 pb-24 sm:pt-40 sm:pb-36 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl mb-10 text-center">The Outlrs Lab team runs on Araka Bot</h2>
        <div>
          <button
            type="button"
            aria-label="Play launch trailer"
            aria-expanded={playing}
            data-video-card=""
            className="group bg-card relative aspect-video w-full cursor-pointer overflow-hidden rounded-3xl text-left"
            onClick={handlePlay}
          >
            <video
              ref={videoRef}
              src="assets/Araka Bot AI Teammates.mp4"
              poster="assets/Launch Trailer Poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            {!playing && (
              <span className="pointer-events-none absolute inset-0 flex items-center px-6 sm:px-10 lg:px-14">
                <span className="play-icon inline-flex items-center text-2xl leading-none font-medium text-white transition-transform duration-300 ease-out sm:text-4xl lg:text-5xl">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[1em] h-[1em]">
                    <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.89l11.02-6.86a1.05 1.05 0 0 0 0-1.78L9.56 4.25A1.05 1.05 0 0 0 8 5.14Z" />
                  </svg>
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Video;
