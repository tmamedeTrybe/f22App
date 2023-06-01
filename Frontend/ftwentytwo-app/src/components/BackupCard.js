/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BackupCard({ hdNumber = null, backupSize, backup }) {
  const [showInfo, setShowInfo] = useState(false);

  const showBackupInfos = () => {
    setShowInfo(true);
  };

  return (
    <div>
      <button
        disabled={ hdNumber == null }
        onClick={ showBackupInfos }
      >
        {
          showInfo
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
