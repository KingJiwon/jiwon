import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../style/pages/videobackground.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = video.currentSrc || video.src;

    const once = (
      el: EventTarget,
      event: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions,
    ) => {
      const onceFn = (e: Event) => {
        el.removeEventListener(event, onceFn);
        if (typeof fn === 'function') {
          fn(e);
        } else {
          (fn as EventListenerObject).handleEvent(e);
        }
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    };

    once(document.documentElement, 'touchstart', () => {
      video.play();
      video.pause();
    });

    const scrubTimeline = () => {
      gsap.to(video, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const duration = video.duration || 1;
            video.currentTime = duration * self.progress;
          },
        },
        ease: 'none',
      });
    };

    once(video, 'loadedmetadata', scrubTimeline);

    setTimeout(() => {
      fetch(src)
        .then((response) => response.blob())
        .then((response) => {
          const blobURL = URL.createObjectURL(response);
          const t = video.currentTime;

          once(document.documentElement, 'touchstart', () => {
            video.play();
            video.pause();
          });

          video.setAttribute('src', blobURL);
          video.currentTime = t + 0.03;

          scrubTimeline();
        });
    }, 500);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <video
        className={styles.video_background}
        ref={videoRef}
        muted
        playsInline
      >
        <source src="/video/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
