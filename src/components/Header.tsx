import React from 'react';
import style from '../style/components/Header.module.scss';

export default function Header() {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <ul className={style.navigator}>
          <li>Prologue</li>
          <li>Info</li>
          <li>skills</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}
