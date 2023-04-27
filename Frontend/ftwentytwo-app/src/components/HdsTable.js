/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function HdsTable({ HdsList }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Espaço Disponível</th>
          </tr>
        </thead>
        <tbody>
          {HdsList.map((hd) => (
            <tr key={ hd.id }>
              <td><Link to={ `/hds/details/${hd.id}` }>{hd.name}</Link></td>
              <td>{hd.label}</td>
              <td>{hd.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

HdsTable.propTypes = {
  HdsList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default HdsTable;
