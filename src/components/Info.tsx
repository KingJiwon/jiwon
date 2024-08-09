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

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: '200 bottom', // 애니메이션 시작 지점
        end: '600 top', // 애니메이션 종료 지점
        scrub: 1,
        toggleActions: 'play none none reverse',
        markers: true,
      },
    });
    timeline
      .fromTo(
        toBeEl,
        { x: -400, opacity: 0 }, // 시작 상태
        { x: 0, opacity: 1, duration: 3 }, // 도착 상태
      )
      .fromTo(
        educatedEl,
        { x: 400, opacity: 0 }, // 시작 상태
        { x: 0, opacity: 1, duration: 3 }, // 도착 상태
        '-=3', // toBeEl과 동시에 시작하도록 설정
      )
      .to(
        [toBeEl, educatedEl],
        { x: 0, opacity: 1, duration: 1 }, // 중앙에 머무름
        '+=1', // 1초 동안 유지
      )
      .to(
        toBeEl,
        { y: -400, opacity: 0, duration: 3 }, // 종료 상태
      )
      .to(
        educatedEl,
        { y: -400, opacity: 0, duration: 3 }, // 종료 상태
        '-=3', // toBeEl과 동시에 종료하도록 설정
      );

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
