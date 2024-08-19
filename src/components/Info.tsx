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
        start: '200 bottom',
        end: '600 top',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });
    timeline
      .fromTo(
        toBeEl,
        { x: -400, opacity: 0 },
        { x: 0, opacity: 1, duration: 3 },
      )
      .fromTo(
        educatedEl,
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 3 },
        '-=3',
      )
      .to([toBeEl, educatedEl], { x: 0, opacity: 1, duration: 1 }, '+=1')
      .to(toBeEl, { x: 400, opacity: 0, duration: 3 })
      .to(educatedEl, { x: -400, opacity: 0, duration: 3 }, '-=3');

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.inner}>
        <div ref={toBeRef} className={styles.to_be}>
          <div className={styles.title}>
            <Lottie
              animationData={LottieRocket}
              style={{ width: 100, height: 100 }}
            />
            To be...
          </div>
          <div className={styles.content}>
            <div className={styles.content_container}>
              <p>꾸준한 성장을 원동력으로 삼는 개발자</p>
              <p>
                새로운 기술을 학습하는 것에 거부감이 없고 이를 적용시키고 익숙해
                지는 것에 성취감을 느낍니다.
                <br /> 이러한 성취감을 원동력으로 꾸준히 자신을 발전시키는
                개발자가 되고 싶습니다.
              </p>
            </div>
            <div className={styles.content_container}>
              <p>기록의 가치를 알고 이용할 수 있는 개발자</p>
              <p>
                새로운 기술을 공부하며 배웠던 것, 코딩 중 마주한 문제와 해결
                방법, 프로젝트 진행과정 등을 기록하고 있습니다.
                <br /> 이러한 기록들을 바탕으로 실수를 반복하지 않고 필요한
                정보를 이용하여 본인 뿐만아니라 팀원에게도 선한 영향력을 끼치고
                싶습니다.
              </p>
            </div>
            <div className={styles.content_container}>
              <p>뛰어난 커뮤니케이션 능력으로 누구와도 잘맞는 개발자</p>
              <p>
                대학 학창 시절 자동차공학부에 재학 하며 전시회, 대회 참가 등
                팀을 이뤄 다양한 환경에서 활동해본 경험이 있습니다.
                <br /> 힘들고 시간이 오래 걸리는 작업도 많았지만 함께였기에
                이겨내는 과정을 많이 겪었고 재밌는 추억으로 남았습니다.
                <br /> 개발을 하면서도 팀원들과 함께 어려운 상황을 직면해도
                이겨내고 성과를 도출하는 경험을 더 해보고 싶습니다.
              </p>
            </div>
          </div>
        </div>
        <div ref={educatedRef} className={styles.educated}>
          <div className={styles.title}>
            <Lottie
              animationData={LottieBook}
              style={{ width: 80, height: 80 }}
            />
            Educated
          </div>
          <div className={styles.content}>
            <div className={styles.content_container}>
              <p>호남대학교 미래 자동차 공학부</p>
              <p className={styles.content_date}>2017.03 - 2023.02</p>
              <p className={styles.content_text}>
                자율주행 동아리 (2021.03 ~ 2023.01)
              </p>
              <p className={styles.content_text}>
                졸업 작품 - 자율주행플랫폼(ERP-42)의 Lidar/Camera 센서 데이터 웹
                환경 렌더링
              </p>
            </div>
            <div className={styles.content_container}>
              <p>㈜포스코 미래창조아카데미 웹개발자 입문 과정</p>
              <p className={styles.content_date}>2023.01 - 2023.05</p>
              <p className={styles.content_text}>
                Project : Test-world / Dev-city
              </p>
              <div className={styles.content_skill}>
                <img src="/icon/html5.svg" alt="html5" />
                <img src="/icon/css3.svg" alt="css3" />
                <img src="/icon/sass.svg" alt="sass" />
                <img src="/icon/javascript.svg" alt="javascript" />
                <img src="/icon/node.svg" alt="node" />
                <img src="/icon/express.svg" alt="express" />
                <img src="/icon/mongodb.svg" alt="mongodb" />
                <img src="/icon/react.svg" alt="javascript" />
                <img src="/icon/redux.svg" alt="javascript" />
                <img src="/icon/git.svg" alt="javascript" />
              </div>
            </div>
            <div className={styles.content_container}>
              <p>서울시 뉴딜 풀스택 개발자 실무과정</p>
              <p className={styles.content_date}>2024.07 - 2024.08</p>
              <p className={styles.content_text}>
                Project : Highlightor / Portfolio
              </p>
              <div className={styles.content_skill}>
                <img src="/icon/html5.svg" alt="html5" />
                <img src="/icon/css3.svg" alt="css3" />
                <img src="/icon/sass.svg" alt="sass" />
                <img src="/icon/javascript.svg" alt="javascript" />
                <img src="/icon/node.svg" alt="node" />
                <img src="/icon/express.svg" alt="express" />
                <img src="/icon/mongodb.svg" alt="mongodb" />
                <img src="/icon/react.svg" alt="javascript" />
                <img src="/icon/typescript.svg" alt="javascript" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
