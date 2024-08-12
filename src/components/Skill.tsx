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

    // 위치 계산
    const calculateX = (element: HTMLDivElement | null) => {
      if (
        element === front.left ||
        element === back.title ||
        element === back.left
      ) {
        return -350;
      }
      if (
        element === front.right ||
        element === tool.title ||
        element === tool.right
      ) {
        return 350;
      }
      return 0;
    };

    const calculateY = (element: HTMLDivElement | null) => {
      if (
        element === front.title ||
        element === front.left ||
        element === front.right
      ) {
        return -350;
      }
      if (
        element === back.left ||
        element === back.right ||
        element === tool.left ||
        element === tool.right
      ) {
        return 350;
      }
      return 0;
    };

    // GSAP timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: '+250 bottom', // 애니메이션 시작 지점
        end: '+600 top', // 애니메이션 종료 지점
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    });

    // elements
    const elements = [
      front.title,
      front.left,
      front.right,
      back.title,
      back.left,
      back.right,
      tool.title,
      tool.left,
      tool.right,
    ];

    // Animate
    timeline
      .fromTo(
        elements,
        {
          opacity: 0,
          x: (index) => calculateX(elements[index]),
          y: (index) => calculateY(elements[index]),
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 15,
          stagger: 0,
          ease: 'power1.inOut',
        },
      )
      // 중앙에 머무름
      .to(elements, { x: 0, y: 0, opacity: 1, duration: 1 }, '+=3')
      // 동시에 사라지는 애니메이션
      .to(elements, {
        opacity: 0,
        x: (index) => calculateX(elements[index]),
        y: (index) => calculateY(elements[index]),
        duration: 15,
        stagger: 0,
        ease: 'power1.inOut',
      });

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
                <img src="/icon/notion.svg" alt="notion" />
                <img src="/icon/figma.svg" alt="figma" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
