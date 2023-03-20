/* eslint-disable react/prop-types */
import React from 'react';
import logo from '../assets/images/logof22_verdeBranco.png';

function Logo({ size }) {
  return (
    <section>
      <img width={ size } src={ logo } alt="logo f22" />
    </section>
  );
}

export default Logo;
