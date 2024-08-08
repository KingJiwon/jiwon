import React from 'react';

import Lottie from 'lottie-react';
import LottieRocket from '../lottie/rocket.json';
import LottieBook from '../lottie/books2.json';
import styles from '../style/components/Info.module.scss';

export default function Info() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.to_be}>
          <div className={styles.to_be_title}>
            <Lottie
              animationData={LottieRocket}
              style={{ width: 100, height: 100 }}
            />
            To be...
          </div>
          <div className={styles.to_be_content} />
        </div>
        <div className={styles.educated}>
          <div className={styles.educated_title}>
            <Lottie
              animationData={LottieBook}
              style={{ width: 80, height: 80 }}
            />
            Educated
          </div>
          <div className={styles.educated_content} />
        </div>
      </div>
    </div>
  );
}
