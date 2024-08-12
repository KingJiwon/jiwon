import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import style from '../style/components/Project.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    projectRefs.current.forEach((project, i) => {
      gsap.fromTo(
        project,
        {
          y: 100 + i * 50,
          opacity: 0,
          scale: 0.6,
        },
        {
          y: -50,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerEl,
            start: '+250 bottom', // 애니메이션 시작 지점
            end: '+600 top', // 애니메이션 종료 지점
            scrub: true,
            toggleActions: 'play reverse play reverse',
          },
        },
      );
    });
  }, []);

  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.inner}>
        {['Test-World', 'Dev-City', 'Highlightor', 'Portfolio'].map(
          (project, index) => (
            <div
              key={project}
              className={style.skill}
              ref={(el) => {
                if (el) projectRefs.current[index] = el;
              }}
            >
              <div className={style.card}>
                <div className={style.front}>{project}</div>
                <div className={style.back}>
                  <p>More info about {project}</p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
