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

    once(video, 'loadedmetadata', () => {
      gsap.to(video, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        currentTime: video.duration,
        ease: 'true', // 선형 애니메이션을 설정합니다.
      });
    });

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
          video.currentTime = t + 0.01;
        });
    }, 1000);
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
