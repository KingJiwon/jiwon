import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import style from '../style/components/Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const emailRef = useRef(null);
  const githubRef = useRef(null);
  const notionRef = useRef(null);
  const thanksRef = useRef(null);

  useEffect(() => {
    const elements = [
      thanksRef.current,
      emailRef.current,
      githubRef.current,
      notionRef.current,
    ];

    gsap.fromTo(
      elements,
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 0.7,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top top',
          toggleActions: 'play reverse play reverse',
          scrub: 1,
          markers: true,
        },
      },
    );
  }, []);

  return (
    <div className={style.container} ref={containerRef}>
      <div className={style.inner}>
        <div className={style.thanks} ref={thanksRef}>
          <p>Thanks for visiting!</p>
        </div>
        <div className={style.email} ref={emailRef}>
          <img src="/icon/mail.svg" alt="메일" />
          <p>wldnjs0401@naver.com</p>
        </div>
        <div className={style.github} ref={githubRef}>
          <img src="/icon/github2.svg" alt="깃허브" />
          <Link target="_blank" to="https://github.com/KingJiwon">
            Github
          </Link>
        </div>
        <div className={style.notion} ref={notionRef}>
          <img src="/icon/notion2.svg" alt="노션" />
          <Link
            target="_blank"
            to="https://www.notion.so/Jiwon-Dashboard-7d32861ac0764735a26b782ec26afbc2"
          >
            Notion
          </Link>
        </div>
      </div>
    </div>
  );
}
