import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import style from '../style/components/Project.module.scss';
import NotionModal from './NotionModal';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  skill: string[];
  notion: string;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<HTMLButtonElement[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notionId, setNotionId] = useState<string>('');

  const projects: Project[] = [
    {
      name: 'Test-World',
      skill: ['html5', 'sass', 'javascript'],
      notion: 'e8208609c2f94eb4b1fb37505f67429f',
    },
    {
      name: 'Dev-City',
      skill: ['react', 'redux', 'express', 'mongodb', 'sass'],
      notion: '80560c9efb7845479fc3eac6215f4bcf',
    },
    {
      name: 'Highlightor',
      skill: ['next', 'mongodb', 'sass'],
      notion: '68008e4e16d24680a5a7a8309a1ad600',
    },
    {
      name: 'Portfolio',
      skill: ['react', 'typescript', 'sass'],
      notion: '933ce2dbf1564107a1f87c0d2c7289e1',
    },
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

  const handleSkillClick = (url: string) => {
    setNotionId(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNotionId('');
  };

  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.inner}>
        {projects.map((project, index) => (
          <button
            key={project.name}
            type="button"
            onClick={() => {
              handleSkillClick(project.notion);
            }}
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
          </button>
        ))}
      </div>
      {isModalOpen && (
        <NotionModal handleCloseModal={handleCloseModal} notionId={notionId} />
      )}
    </div>
  );
}
