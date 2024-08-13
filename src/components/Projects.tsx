import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import style from '../style/components/Project.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  skill: string[];
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const projects: Project[] = [
    { name: 'Test-World', skill: ['html5', 'sass', 'javascript'] },
    {
      name: 'Dev-City',
      skill: ['react', 'redux', 'express', 'mongodb', 'sass'],
    },
    { name: 'Highlightor', skill: ['next', 'mongodb', 'sass'] },
    { name: 'Portfolio', skill: ['react', 'typescript', 'sass'] },
  ];
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    projectRefs.current.forEach((project, i) => {
      // const card = project.children[0];
      gsap.fromTo(
        project,
        {
          y: 100 + i * 50,
          opacity: 0,
          scale: 0.6,
          rotateY: -180,
        },
        {
          y: -50,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
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
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={style.skill}
            ref={(el) => {
              if (el) projectRefs.current[index] = el;
            }}
          >
            <div className={style.card}>
              <div className={style.front}>{project.name}</div>
              <div className={style.back}>
                {project.skill.map((name) => (
                  <div key={name} className={style.img_container}>
                    <img alt={name} src={`/icon/${name}.svg`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
