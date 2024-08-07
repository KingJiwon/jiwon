import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../style/pages/prologue.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Prologue() {
  const roleRef = useRef<HTMLParagraphElement | null>(null);
  const mentRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    const roleElement = roleRef.current;
    const mentElement = mentRef.current;

    if (!roleElement || !mentElement) return undefined;

    const fadeInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerElement,
        end: 'bottom 30%',
        toggleActions: 'play reverse play reverse',
        scrub: 1,
        markers: true,
        onLeave: () => {
          gsap.to([roleElement, mentElement], { opacity: 0, duration: 1 });
        },
        onEnterBack: () => {
          fadeInTimeline.play();
        },
      },
    });

    fadeInTimeline
      .fromTo(roleElement, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(
        mentElement,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.5',
      );

    return () => {
      if (fadeInTimeline.scrollTrigger) fadeInTimeline.scrollTrigger.kill();
      fadeInTimeline.kill();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.text_container} ref={containerRef}>
        <p className={styles.role} ref={roleRef}>
          Front-end Developer
        </p>
        <p className={styles.ment} ref={mentRef}>
          인트로입니다.
        </p>
      </div>
    </div>
  );
}
