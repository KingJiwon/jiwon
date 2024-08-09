import React from 'react';

import style from '../style/components/Skill.module.scss';

export default function Skill() {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.first_column}>
          <div className={style.front_end_title}>Front-end</div>
          <div className={style.front_end_content}>
            <img src="/icon/javascript.svg" alt="javascript" />
            <img src="/icon/typescript.svg" alt="javascript" />
            <img src="/icon/sass.svg" alt="javascript" />
            <img src="/icon/react.svg" alt="javascript" />
            <img src="/icon/redux.svg" alt="javascript" />
          </div>
        </div>
        <div className={style.second_column}>
          <div className={style.back_end}>
            <div className={style.back_end_title}>Back-end</div>
            <div className={style.back_end_content}>
              <img src="/icon/next.svg" alt="javascript" />
              <img src="/icon/node.svg" alt="javascript" />
              <img src="/icon/express.svg" alt="javascript" />
              <img src="/icon/mongodb.svg" alt="javascript" />
            </div>
          </div>
          <div className={style.tools}>
            <div className={style.tools_title}>Colab / Tools</div>
            <div className={style.tools_content}>
              <img src="/icon/git.svg" alt="javascript" />
              <img src="/icon/github.svg" alt="javascript" />
              <img src="/icon/notion.svg" alt="javascript" />
              <img src="/icon/figma.svg" alt="javascript" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
