/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/JobsByHd.module.css';

function CorporatesByHd({ hd }) {
  const [rawOne, setRawOne] = useState('');
  const [rawTwo, setRawTwo] = useState('');
  const [editOne, setEditOne] = useState('');
  const [editTwo, setEditTwo] = useState('');

  const actions = () => {
    const oneRaw = hd.rawCorporateOne.map((corporate) => (
      `${corporate.empresa} - ${corporate.evento}`
    ));
    setRawOne(oneRaw);

    const twoRaw = hd.rawCorporateTwo.map((corporate) => (
      `${corporate.empresa} - ${corporate.evento}`
    ));
    setRawTwo(twoRaw);

    const oneEdit = hd.editCorporateOne.map((corporate) => (
      `${corporate.empresa} - ${corporate.evento}`
    ));
    setEditOne(oneEdit);

    const twoEdit = hd.editCorporateTwo.map((corporate) => (
      `${corporate.empresa} - ${corporate.evento}`
    ));
    setEditTwo(twoEdit);
  };

  const hide = () => {
    setRawOne('');
    setRawTwo('');
    setEditOne('');
    setEditTwo('');
  };

  return (
    <div className={ styles.container }>
      <button
        type="sumbit"
        onClick={ actions }
        onDoubleClick={ hide }
      >
        Corporativo
      </button>
      {
        (rawOne, rawTwo, editOne, editTwo)
        && <table>
          <thead>
            <tr>
              <th>Bruto Um</th>
              <th>Bruto Dois</th>
              <th>Editado Um</th>
              <th>Editado Dois</th>
            </tr>
          </thead>
          <tbody>
            <td>
              {rawOne.map((corporate) => (
                <tr key={ corporate.id }>
                  {corporate}
                </tr>
              ))}
            </td>

            <td>
              {rawTwo.map((corporate) => (
                <tr key={ corporate.id }>
                  {corporate}
                </tr>
              ))}
            </td>

            <td>
              {editOne.map((corporate) => (
                <tr key={ corporate.id }>
                  {corporate}
                </tr>
              ))}
            </td>

            <td>
              {editTwo.map((corporate) => (
                <tr key={ corporate.id }>
                  {corporate}
                </tr>
              ))}
            </td>
          </tbody>
        </table>
      }
    </div>
  );
}

CorporatesByHd.propTypes = {
  hd: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    available: PropTypes.number,
    capacity: PropTypes.number,
    used: PropTypes.number,
    rawCorporateOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rawCorporateTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    editCorporateOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    editCorporateTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

export default CorporatesByHd;
