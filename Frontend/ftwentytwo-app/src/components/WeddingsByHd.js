/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function WeddingsByHd({ hd }) {
  const [rawWeddingsOne, setRawWeddingsOne] = useState('');
  const [rawWeddingsTwo, setRawWeddingsTwo] = useState('');
  const [editWeddingsOne, setEditWeddingsOne] = useState('');
  const [editWeddingsTwo, setEditWeddingsTwo] = useState('');

  const actions = () => {
    const weddingsRawOne = hd.rawWeddingsOne.map((wedding) => (
      `${wedding.noiva} & ${wedding.noivo}`
    ));
    setRawWeddingsOne(weddingsRawOne);
    const weddingsRawTwo = hd.rawWeddingsTwo.map((wedding) => (
      `${wedding.noiva} & ${wedding.noivo}`
    ));
    setRawWeddingsTwo(weddingsRawTwo);
    const weddingsEditOne = hd.editWeddingsOne.map((wedding) => (
      `${wedding.noiva} & ${wedding.noivo}`
    ));
    setEditWeddingsOne(weddingsEditOne);
    const weddingsEditTwo = hd.editWeddingsTwo.map((wedding) => (
      `${wedding.noiva} & ${wedding.noivo}`
    ));
    setEditWeddingsTwo(weddingsEditTwo);
  };

  const hide = () => {
    setEditWeddingsOne('');
    setRawWeddingsTwo('');
    setEditWeddingsOne('');
    setEditWeddingsTwo('');
  };

  return (
    <div>
      <button
        type="sumbit"
        onClick={ actions }
        onDoubleClick={ hide }
      >
        Casamentos
      </button>
      {
        (rawWeddingsOne, rawWeddingsTwo, editWeddingsOne, editWeddingsTwo)
        && <section>
          <table>
            <thead>
              <tr>
                <th>Raw Wedding One</th>
                <th>Raw Wedding Two</th>
                <th>Edit Wedding One</th>
                <th>Edit Wedding Two</th>
              </tr>
            </thead>
            <tbody>
              <td>
                {rawWeddingsOne.map((wedding) => (
                  <tr key={ wedding.id }>
                    {wedding}
                  </tr>
                ))}
              </td>

              <td>
                {rawWeddingsTwo.map((wedding) => (
                  <tr key={ wedding.id }>
                    {wedding}
                  </tr>
                ))}
              </td>

              <td>
                {editWeddingsOne.map((wedding) => (
                  <tr key={ wedding.id }>
                    {wedding}
                  </tr>
                ))}
              </td>

              <td>
                {editWeddingsTwo.map((wedding) => (
                  <tr key={ wedding.id }>
                    {wedding}
                  </tr>
                ))}
              </td>
            </tbody>
          </table>
        </section>
      }
    </div>
  );
}

WeddingsByHd.propTypes = {
  hd: PropTypes.shape({
    available: PropTypes.number,
    capacity: PropTypes.number,
    editWeddingsOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    editWeddingsTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    id: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    rawWeddingsOne: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rawWeddingsTwo: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    used: PropTypes.number,
  }).isRequired,
};

export default WeddingsByHd;
