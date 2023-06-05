/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/BackupCard.module.css';

function BackupCard({ hdNumber = null, backupSize, backup }) {
  const [showInfo, setShowInfo] = useState(false);

  const showBackupInfos = () => {
    if (showInfo === true) {
      setShowInfo(false);
    } else setShowInfo(true);
    console.log(showInfo);
  };

  return (
    <div>
      <button
        disabled={ hdNumber == null }
        onClick={ showBackupInfos }
        className={ styles.backupCard }
      >
        {
          showInfo === true
            ? <section>
              <p>{`Hd${hdNumber}`}</p>
              <p>{`${backupSize}GB`}</p>
              </section> : <p>{ backup }</p>
        }
      </button>
    </div>
  );
}

BackupCard.propTypes = {
  hdNumber: PropTypes.number,
  backupSize: PropTypes.number.isRequired,
  backup: PropTypes.string.isRequired,
};

export default BackupCard;
