import { useRef } from 'react';
import styles from './Ticker.module.css';
import { TICKER_ITEMS } from '../data/portfolio';

export default function Ticker({ inverted = false }) {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className={`${styles.ticker} ${inverted ? styles.inverted : ''}`}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot} aria-hidden>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
