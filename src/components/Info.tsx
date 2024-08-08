import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import LottieRocket from '../lottie/rocket.json';
import LottieBook from '../lottie/books2.json';
import styles from '../style/components/Info.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Info() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toBeRef = useRef<HTMLDivElement | null>(null);
  const educatedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const toBeEl = toBeRef.current;
    const educatedEl = educatedRef.current;

    if (!containerEl || !toBeEl || !educatedEl) return undefined;

    ScrollTrigger.create({
      trigger: containerEl,
      start: '+400 bottom', // 애니메이션 시작 지점
      end: '+300 top', // 애니메이션 종료 지점
      scrub: 1,
      onEnter: () => {
        gsap.to(toBeEl, { x: 0, opacity: 1, duration: 1 });
        gsap.to(educatedEl, { x: 0, opacity: 1, duration: 1 });
      },
      onLeave: () => {
        gsap.to(toBeEl, { x: -400, opacity: 0 });
        gsap.to(educatedEl, { x: +400, opacity: 0, duration: 1 });
      },
      onEnterBack: () => {
        gsap.to([toBeEl, educatedEl], { x: 0, opacity: 1, duration: 1 });
      },
      onLeaveBack: () => {
        gsap.to(toBeEl, { x: -400, opacity: 0, duration: 1 });
        gsap.to(educatedEl, { x: 400, opacity: 0, duration: 1 });
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.inner}>
        <div ref={toBeRef} className={styles.to_be}>
          <div className={styles.to_be_title}>
            <Lottie
              animationData={LottieRocket}
              style={{ width: 100, height: 100 }}
            />
            To be...
          </div>
          <div className={styles.to_be_content} />
        </div>
        <div ref={educatedRef} className={styles.educated}>
          <div className={styles.educated_title}>
            <Lottie
              animationData={LottieBook}
              style={{ width: 80, height: 80 }}
            />
            Educated
          </div>
          <div className={styles.educated_content} />
        </div>
      </div>
    </div>
  );
}
/*
start: '+400 bottom', // 애니메이션 시작 지점
      end: '+300 top', // 애니메이션 종료 지점
*/
