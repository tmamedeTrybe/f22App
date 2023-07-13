import React from 'react';
import styles from '../modules/Loading.module.css';

function Loading() {
  return (
    <div className={ styles.container }>
      <span> Carregando... </span>
    </div>
  );
}

export default Loading;
