import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import LottieFront from '../lottie/front_end.json';
import LottieBack from '../lottie/back_end.json';
import LottieTool from '../lottie/tool.json';
import style from '../style/components/Skill.module.scss';

gsap.registerPlugin(ScrollTrigger);

type RefElements = {
  title: HTMLDivElement | null;
  left: HTMLDivElement | null;
  right: HTMLDivElement | null;
};

type SkillRefs = {
  front: RefElements;
  back: RefElements;
  tool: RefElements;
};

export default function Skill() {
  const contentRefs = useRef<SkillRefs>({
    front: { title: null, left: null, right: null },
    back: { title: null, left: null, right: null },
    tool: { title: null, left: null, right: null },
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { front, back, tool } = contentRefs.current;
    const containerEl = containerRef.current;
    if (!front || !back || !tool) return undefined;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: 'top bottom', // 애니메이션 시작 지점
        end: 'bottom top', // 애니메이션 종료 지점
        scrub: 1,
        toggleActions: 'play none none reverse',
        markers: true,
      },
    });
    timeline
      .fromTo(
        front.title,
        { y: -400, opacity: 0 },
        { y: 0, opacity: 1, duration: 3 },
      )
      .fromTo(
        front.left,
        { x: -400, y: -400, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        front.right,
        { x: 400, y: -400, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        back.title,
        { x: -400, opacity: 0 },
        { x: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        back.left,
        { x: -400, y: 400, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        back.right,
        { y: 400, opacity: 0 },
        { y: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        tool.title,
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        tool.left,
        { y: 400, opacity: 0 },
        { y: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      .fromTo(
        tool.right,
        { x: 400, y: 400, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 3 },
        0, // 동시에 시작
      )
      // 중앙에 머무름
      .to(
        [
          front.title,
          front.left,
          front.right,
          back.title,
          back.left,
          back.right,
          tool.title,
          tool.left,
          tool.right,
        ],
        { x: 0, y: 0, opacity: 1, duration: 1 },
        '+=3',
      )
      // 동시에 사라지는 애니메이션
      .to(front.title, { y: -400, opacity: 0, duration: 3 })
      .to(front.left, { x: -400, y: -400, opacity: 0, duration: 3 }, 0)
      .to(front.right, { x: 400, y: -400, opacity: 0, duration: 3 }, 0)
      .to(back.title, { x: -400, opacity: 0, duration: 3 }, 0)
      .to(back.left, { x: -400, y: 400, opacity: 0, duration: 3 }, 0)
      .to(back.right, { y: 400, opacity: 0, duration: 3 }, 0)
      .to(tool.title, { x: 400, opacity: 0, duration: 3 }, 0)
      .to(tool.left, { y: 400, opacity: 0, duration: 3 }, 0)
      .to(tool.right, { x: 400, y: 400, opacity: 0, duration: 3 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div ref={containerRef} className={style.container}>
      <div className={style.inner}>
        <div className={style.first_column}>
          <div
            ref={(el) => {
              contentRefs.current.front.title = el;
            }}
            className={style.front_end_title}
          >
            <Lottie
              className={style.front_end_title_rottie}
              animationData={LottieFront}
              style={{ width: 90, height: 90 }}
            />
            Front-end
          </div>
          <div className={style.front_end_content}>
            <div
              ref={(el) => {
                contentRefs.current.front.left = el;
              }}
              className={style.front_end_content_left}
            >
              <img src="/icon/javascript.svg" alt="javascript" />
              <img src="/icon/typescript.svg" alt="typescript" />
              <img src="/icon/sass.svg" alt="sass" />
            </div>
            <div
              ref={(el) => {
                contentRefs.current.front.right = el;
              }}
              className={style.front_end_content_right}
            >
              <img src="/icon/react.svg" alt="react" />
              <img src="/icon/redux.svg" alt="redux" />
            </div>
          </div>
        </div>
        <div className={style.second_column}>
          <div className={style.back_end}>
            <div
              ref={(el) => {
                contentRefs.current.back.title = el;
              }}
              className={style.back_end_title}
            >
              <Lottie
                className={style.back_end_title_rottie}
                animationData={LottieBack}
                style={{ width: 60, height: 60 }}
              />
              Back-end
            </div>
            <div className={style.back_end_content}>
              <div
                ref={(el) => {
                  contentRefs.current.back.left = el;
                }}
                className={style.back_end_content_left}
              >
                <img src="/icon/next.svg" alt="next" />
                <img src="/icon/node.svg" alt="node" />
              </div>
              <div
                ref={(el) => {
                  contentRefs.current.back.right = el;
                }}
                className={style.back_end_content_right}
              >
                <img src="/icon/express.svg" alt="express" />
                <img src="/icon/mongodb.svg" alt="mongodb" />
              </div>
            </div>
          </div>
          <div className={style.tools}>
            <div
              ref={(el) => {
                contentRefs.current.tool.title = el;
              }}
              className={style.tools_title}
            >
              <Lottie
                className={style.back_end_title_rottie}
                animationData={LottieTool}
                style={{ width: 70, height: 70 }}
              />
              Colab / Tools
            </div>
            <div className={style.tools_content}>
              <div
                ref={(el) => {
                  contentRefs.current.tool.left = el;
                }}
                className={style.tools_content_left}
              >
                <img src="/icon/git.svg" alt="git" />
                <img src="/icon/github.svg" alt="github" />
              </div>
              <div
                ref={(el) => {
                  contentRefs.current.tool.right = el;
                }}
                className={style.tools_content_right}
              >
                <img src="/icon/notion.svg" alt="javascript" />
                <img src="/icon/figma.svg" alt="javascript" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
