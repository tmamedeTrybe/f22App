/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import HdContext from '../context/HdContext';

function HdDetails() {
  const [hd, setHd] = useState('');
  const { hdsFounded } = useContext(HdContext);
  const { id } = useParams();

  useEffect(() => {
    console.log(hdsFounded);
    const hdFilter = hdsFounded.filter((hdItem) => hdItem.id === Number(id));
    console.log(hdFilter);
    setHd(hdFilter[0]);
  }, []);

  console.log(hd, 'hd selecionado');

  return (
    <div>
      <HeaderLogo title="HD Details" />
      <main>
        <section>
          <h2>{`HD ${hd.name} - ${hd.label}`}</h2>
          <p>{`Capacidade - ${hd.capacity}GB`}</p>
          <p>{`Usados - ${hd.used}GB`}</p>
          <p>{`Espaço disponível - ${hd.available}GB`}</p>
        </section>
      </main>
    </div>
  );
}

export default HdDetails;
