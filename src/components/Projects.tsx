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
  font: string;
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
      notion: '356844e5e83b45369a9e700871df8af6',
      font: 'Galmuri9',
    },
    {
      name: 'Dev-City',
      skill: ['react', 'redux', 'express', 'mongodb', 'sass'],
      notion: 'c86bbf8a088a460cbcd0b7bdc15c97c3',
      font: 'Pretendard-Bold',
    },
    {
      name: 'Highlightor',
      skill: ['next', 'mongodb', 'sass'],
      notion: '986f1157b5bd49d4a34055346bc7b36d',
      font: 'LeferiPointBlackOblique',
    },
    {
      name: 'Portfolio',
      skill: ['react', 'typescript', 'sass'],
      notion: '9968aad1232d4133928e5981c78f17fa',
      font: 'Pretendard-Bold',
    },
  ];

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    projectRefs.current.forEach((project, i) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: 'top bottom', // 애니메이션 시작 지점
          end: 'bottom top', // 애니메이션 종료 지점
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      });
      timeline
        .fromTo(
          project,
          {
            y: +400 + i * 100,
            opacity: 0,
            scale: 0.6,
            rotateY: -180,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 2,
          },
        )
        .fromTo(
          project,
          { y: 0, opacity: 1, scale: 1, rotateY: 0 },
          {
            y: -400 - i * 100,
            opacity: 0,
            scale: 0.6,
            rotateY: -180,
            duration: 2,
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
              <div className={style.front} style={{ fontFamily: project.font }}>
                {project.name}
              </div>
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
