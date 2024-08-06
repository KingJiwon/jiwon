import React from 'react';
import styles from '../style/pages/main.module.scss';

export default function Main() {
  return (
    <>
      <video
        src="/video/bg-video.mp4"
        playsInline
        webkit-playsinline="true"
        preload="auto"
        mutedvideo-background
        className=""
      >
        <track kind="captions" />
      </video>
      <div className={styles.container}>메인</div>;
    </>
  );
}
