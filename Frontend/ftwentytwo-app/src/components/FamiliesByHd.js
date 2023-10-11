/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/JobsByHd.module.css';

function FamiliesByHd({ hd }) {
  const [rawOne, setRawOne] = useState('');
  const [rawTwo, setRawTwo] = useState('');
  const [editOne, setEditOne] = useState('');
  const [editTwo, setEditTwo] = useState('');

  const actions = () => {
    const oneRaw = hd.rawFamilyOne.map((family) => (
      `${family.categoria} - ${family.nome}`
    ));
    setRawOne(oneRaw);

    const twoRaw = hd.rawFamilyTwo.map((family) => (
      `${family.categoria} - ${family.nome}`
    ));
    setRawTwo(twoRaw);

    const oneEdit = hd.editFamilyOne.map((family) => (
      `${family.categoria} - ${family.nome}`
    ));
    setEditOne(oneEdit);

    const twoEdit = hd.editFamilyTwo.map((family) => (
      `${family.categoria} - ${family.nome}`
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
        Família
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
              {rawOne.map((family) => (
                <tr key={ family.id }>
                  {family}
                </tr>
              ))}
            </td>

            <td>
              {rawTwo.map((family) => (
                <tr key={ family.id }>
                  {family}
                </tr>
              ))}
            </td>

            <td>
              {editOne.map((family) => (
                <tr key={ family.id }>
                  {family}
                </tr>
              ))}
            </td>

            <td>
              {editTwo.map((family) => (
                <tr key={ family.id }>
                  {family}
                </tr>
              ))}
            </td>
          </tbody>
        </table>
      }
    </div>
  );
}

FamiliesByHd.propTypes = {
  hd: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    available: PropTypes.number,
    capacity: PropTypes.number,
    used: PropTypes.number,
    editWeddingsOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    editWeddingsTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rawWeddingsOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rawWeddingsTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rawFamilyOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rawFamilyTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    editFamilyOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    editFamilyTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

export default FamiliesByHd;
