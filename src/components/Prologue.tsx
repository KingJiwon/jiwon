import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../style/components/Prologue.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Prologue() {
  const roleRef = useRef<HTMLParagraphElement | null>(null);
  const mentRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerElement = containerRef.current;
    const roleElement = roleRef.current;
    const mentElement = mentRef.current;

    if (!roleElement || !mentElement || !containerElement) return undefined;

    // span으로 쪼개기
    const mentText = mentElement.textContent;
    mentElement.innerHTML = mentText
      ? mentText
          .split('')
          .map((char) => `<span>${char}</span>`)
          .join('')
      : '';

    const mentChars = mentElement.children;

    // GSAP animation  role, ment elements
    gsap.fromTo(
      roleElement,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1.5 },
    );

    gsap.fromTo(
      mentChars,
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.1,
      },
    );

    ScrollTrigger.create({
      trigger: containerElement,
      start: 'top bottom', // 컨테이너의 상단과 화면의 상단이 맞닿는 지점
      end: '+400 top', // 컨테이너의 하단이 화면의 상단과 맞닿는 지점

      scrub: 1,

      onLeave: () => {
        gsap.to([roleElement, mentChars], { opacity: 0 });
      },
      onEnterBack: () => {
        gsap.to([roleElement, mentChars], { opacity: 1 });
      },
      onLeaveBack: () => {
        gsap.to([roleElement, mentChars], { opacity: 0 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <p className={styles.role} ref={roleRef}>
        Front-end Developer
      </p>
      <p className={styles.ment} ref={mentRef}>
        세상과 끊임없이 대화하는 개발자가 되고싶은 박지원입니다.
      </p>
    </div>
  );
}
